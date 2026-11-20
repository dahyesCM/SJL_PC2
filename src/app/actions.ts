"use server";

import { redirect } from "next/navigation";
import { categories, periods, sectors } from "../lib/catalog";
import { closeSession, currentAccount, database, demoEnabled, moderate, openSession, passwordHash, passwordMatches } from "../lib/demo";

export type FormState = { message: string };
const unavailable = { message: "El entorno local de demostración no está habilitado." };
const field = (data: FormData, name: string) => String(data.get(name) ?? "").trim();

export async function access(mode: "login" | "register", _state: FormState, data: FormData): Promise<FormState> {
  if (!demoEnabled) return unavailable;
  const email = field(data, "email").toLowerCase();
  const password = String(data.get("password") ?? "");
  if (!/^[^\s@]+@example\.(test|invalid)$/.test(email) || email.length > 100 || password.length < 10 || password.length > 128) {
    return { message: "Usa un correo ficticio @example.test y una contraseña de 10 a 128 caracteres." };
  }
  if (mode === "register") {
    const alias = field(data, "alias");
    if (!/^[\p{L}\p{N}_-]{3,24}$/u.test(alias)) return { message: "Usa un alias de 3 a 24 letras, números, guiones o guiones bajos." };
    const result = database().prepare("INSERT INTO accounts(email, alias, password) VALUES (?, ?, ?) ON CONFLICT(email) DO NOTHING").run(email, alias, passwordHash(password));
    if (result.changes === 0) return { message: "No se pudo crear la cuenta. Prueba otro correo ficticio o inicia sesión." };
    await openSession(Number(result.lastInsertRowid));
  } else {
    const result = database().prepare("SELECT id, password FROM accounts WHERE email = ?").get(email) as { id: number; password: string } | undefined;
    if (!passwordMatches(password, result?.password) || !result) return { message: "Correo o contraseña incorrectos." };
    await openSession(result.id);
  }
  redirect("/mis-reportes");
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
  if (!sector || !category || !period || !/^[a-f0-9-]{36}$/.test(requestId) || data.get("demo") !== "on") {
    return { message: "Elige un sector, una categoría y un periodo y confirma que es un ensayo ficticio." };
  }
  database().prepare(`
    INSERT INTO reports(account_id, request_id, sector, category, period)
    VALUES (?, ?, ?, ?, ?) ON CONFLICT(account_id, request_id) DO NOTHING
  `).run(account.id, requestId, sector, category, period);
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
