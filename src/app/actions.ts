"use server";

import { redirect } from "next/navigation";
import { categories, periods, reportDetailLimit, sectors } from "../lib/catalog";
import { suggestSector } from "../lib/location";
import { closeSession, currentAccount, database, demoEnabled, moderate, openSession, passwordHash, passwordMatches } from "../lib/demo";

export type FormState = { message: string; errors?: Record<string, string> };
const unavailable = { message: "El entorno local de demostración no está habilitado." };
const field = (data: FormData, name: string) => String(data.get(name) ?? "").trim();

export async function access(mode: "login" | "register", _state: FormState, data: FormData): Promise<FormState> {
  if (!demoEnabled) return unavailable;
  const email = field(data, "email").toLowerCase();
  const password = String(data.get("password") ?? "");
  const errors: Record<string, string> = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 100) errors.email = "Ingresa un correo válido.";
  if (password.length < 10 || password.length > 128) errors.password = "Ingresa de 10 a 128 caracteres.";
  if (mode === "register") {
    const alias = field(data, "alias");
    const name = field(data, "name");
    if (!/^[\p{L}\p{M}][\p{L}\p{M} .'’\-]{1,99}$/u.test(name)) errors.name = "Ingresa el nombre completo.";
    if (!/^\d{8}$/.test(field(data, "dni"))) errors.dni = "El DNI debe tener 8 dígitos.";
    if (!/^(?:\+51)?9\d{8}$/.test(field(data, "phone").replace(/[\s()-]/g, ""))) errors.phone = "Ingresa un celular peruano de 9 dígitos.";
    if (!/^[\p{L}\p{N}_-]{3,24}$/u.test(alias)) errors.alias = "Usa de 3 a 24 letras, números, guiones o guiones bajos.";
    if (password !== String(data.get("confirm") ?? "")) errors.confirm = "Las contraseñas deben coincidir.";
    if (Object.keys(errors).length) return { message: "Revisa los campos indicados.", errors };
    const result = database().prepare("INSERT INTO accounts(email, alias, password) VALUES (?, ?, ?) ON CONFLICT(email) DO NOTHING").run(email, alias, passwordHash(password));
    if (result.changes === 0) return { message: "No se pudo crear la cuenta. Si ya tienes una, inicia sesión." };
    await openSession(Number(result.lastInsertRowid));
  } else {
    if (Object.keys(errors).length) return { message: "Revisa los campos indicados.", errors };
    const result = database().prepare("SELECT id, password FROM accounts WHERE email = ?").get(email) as { id: number; password: string } | undefined;
    if (!passwordMatches(password, result?.password) || !result) return { message: "Correo o contraseña incorrectos." };
    await openSession(result.id);
  }
  redirect(field(data, "next") === "/reportar" ? "/reportar" : "/mis-reportes");
}

export async function logout() {
  await closeSession();
  redirect("/");
}

export async function submitReport(_state: FormState, data: FormData): Promise<FormState> {
  const account = await currentAccount();
  if (!account) redirect("/login");
  const sector = sectors.find(value => value === field(data, "sector"));
  const category = categories.find(value => value === field(data, "category"));
  const period = periods.find(value => value === field(data, "period"));
  const requestId = field(data, "requestId");
  const detail = field(data, "detail");
  if (!sector || !category || !period || !/^[a-f0-9-]{36}$/.test(requestId) || data.get("demo") !== "on") {
    return { message: "Elige un sector, una categoría y un periodo y confirma el uso de la versión piloto." };
  }
  if (detail && (category !== "Otro" || detail.length > reportDetailLimit || /\p{Cc}/u.test(detail.replace(/[\r\n\t]/g, "")))) {
    return { message: `El detalle se admite en la categoría Otro y debe tener hasta ${reportDetailLimit} caracteres.` };
  }
  const position = field(data, "position");
  const parts = position.split(",");
  const [latitude, longitude] = parts.map(Number);
  if (position && (parts.length !== 2 || !parts.every(value => /^-\d+\.\d{2}$/.test(value)) || !suggestSector(latitude, longitude))) {
    return { message: "La ubicación aproximada está fuera del área disponible. Retírala o vuelve a intentarlo." };
  }
  const db = database();
  const result = db.prepare(`
    INSERT INTO reports(account_id, request_id, sector, category, period)
    VALUES (?, ?, ?, ?, ?) ON CONFLICT(account_id, request_id) DO NOTHING RETURNING id
  `);
  db.exec("BEGIN IMMEDIATE");
  try {
    const created = result.get(account.id, requestId, sector, category, period) as { id: number } | undefined;
    if (created && position) db.prepare("INSERT INTO report_locations VALUES (?, ?, ?)").run(created.id, latitude, longitude);
    if (created && detail) db.prepare("INSERT INTO report_details (report_id, detail) VALUES (?, ?)").run(created.id, detail);
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
  redirect("/mis-reportes?enviado=1");
}

export async function review(data: FormData) {
  const account = await currentAccount();
  if (account?.role !== "moderator") redirect("/login");
  const id = Number(field(data, "id"));
  const decision = field(data, "decision");
  if (!Number.isSafeInteger(id) || id < 1 || (decision !== "validated" && decision !== "attended" && decision !== "rejected")) {
    redirect("/moderacion?resultado=invalido");
  }
  redirect(moderate(id, account.id, decision) ? "/moderacion?resultado=guardado" : "/moderacion?resultado=conflicto");
}
