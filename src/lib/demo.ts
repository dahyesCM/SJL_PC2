import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { Status } from "./catalog";

export const demoEnabled = process.env.NODE_ENV === "development" || process.env.SJL_LOCAL_DEMO === "1";
const cookieName = "sjl_demo_session";
const duration = 60 * 60 * 8;
let connection: DatabaseSync | undefined;

export function database() {
  if (!demoEnabled) throw new Error("La persistencia local de demostración está desactivada.");
  if (connection) return connection;
  const directory = join(process.cwd(), ".sjl-local");
  mkdirSync(directory, { recursive: true });
  connection = new DatabaseSync(join(directory, "demo.sqlite"));
  connection.exec(`
    PRAGMA foreign_keys = ON;
    PRAGMA busy_timeout = 5000;
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE, alias TEXT NOT NULL,
      password TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'citizen'
        CHECK (role IN ('citizen', 'moderator'))
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY, account_id INTEGER NOT NULL REFERENCES accounts(id),
      expires INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY, account_id INTEGER NOT NULL REFERENCES accounts(id),
      request_id TEXT NOT NULL, sector TEXT NOT NULL, category TEXT NOT NULL, period TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','validated','attended','rejected')),
      UNIQUE (account_id, request_id)
    );
    CREATE TABLE IF NOT EXISTS decisions (
      id INTEGER PRIMARY KEY, report_id INTEGER NOT NULL REFERENCES reports(id),
      moderator_id INTEGER NOT NULL REFERENCES accounts(id), status TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TRIGGER IF NOT EXISTS audit_report_status
    AFTER UPDATE OF status ON reports WHEN OLD.status <> NEW.status
    BEGIN
      INSERT INTO decisions(report_id, moderator_id, status)
      VALUES (NEW.id, moderation_actor(), NEW.status);
    END;
  `);
  connection.function("moderation_actor", () => moderatorActor ?? null);
  return connection;
}

let moderatorActor: number | undefined;

export function moderate(id: number, actor: number, next: Status) {
  const previous = next === "attended" ? "validated" : "pending";
  moderatorActor = actor;
  try {
    return database().prepare("UPDATE reports SET status = ? WHERE id = ? AND status = ?").run(next, id, previous).changes === 1;
  } finally {
    moderatorActor = undefined;
  }
}

export type Account = { id: number; alias: string; role: "citizen" | "moderator" };
export type Report = { id: number; category: string; sector: string; period: string; status: Status };

const digest = (token: string) => createHash("sha256").update(token).digest("hex");

export function passwordHash(password: string, salt = randomBytes(16).toString("hex")) {
  return salt + ":" + scryptSync(password, salt, 64).toString("hex");
}

const dummyHash = "0".repeat(32) + ":" + "0".repeat(128);

export function passwordMatches(password: string, stored = dummyHash) {
  const [salt] = stored.split(":");
  return timingSafeEqual(Buffer.from(passwordHash(password, salt)), Buffer.from(stored));
}

export async function currentAccount() {
  if (!demoEnabled) return undefined;
  const token = (await cookies()).get(cookieName)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return undefined;
  return database().prepare(`
    SELECT a.id, a.alias, a.role FROM sessions s JOIN accounts a ON a.id = s.account_id
    WHERE s.token = ? AND s.expires > ?
  `).get(digest(token), Date.now()) as Account | undefined;
}

export async function openSession(accountId: number) {
  await closeSession();
  const token = randomBytes(32).toString("hex");
  database().prepare("INSERT INTO sessions VALUES (?, ?, ?)").run(digest(token), accountId, Date.now() + duration * 1000);
  (await cookies()).set(cookieName, token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: duration, secure: process.env.NODE_ENV === "production" && process.env.SJL_LOCAL_DEMO !== "1" });
}

export async function closeSession() {
  const jar = await cookies();
  const token = jar.get(cookieName)?.value;
  if (token && demoEnabled) database().prepare("DELETE FROM sessions WHERE token = ?").run(digest(token));
  jar.delete(cookieName);
}
