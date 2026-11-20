import Link from "next/link";
import { redirect } from "next/navigation";
import { currentAccount, database, type Report } from "../../lib/demo";
import { statuses } from "../../lib/catalog";
import { logout } from "../actions";
export const dynamic = "force-dynamic";

export default async function History({ searchParams }: { searchParams: Promise<{ enviado?: string }> }) {
  const account = await currentAccount();
  if (!account) redirect("/login");
  const reports = database().prepare("SELECT id, category, sector, period, status FROM reports WHERE account_id = ? ORDER BY id DESC").all(account.id) as Report[];
  return <main id="contenido" tabIndex={-1}>
    <p className="district">Datos de demostración</p>
    <h1>Mis reportes</h1>
    <p>Sesión iniciada como {account.alias}.</p>
    {(await searchParams).enviado === "1" && <p role="status" className="notice">Reporte recibido para revisión en la demo.</p>}
    <div className="actions">
      <Link className="button" href="/reportar">+ Nuevo reporte</Link>
      {account.role === "moderator" && <Link className="button secondary" href="/moderacion">Moderación</Link>}
      <form action={logout}><button className="button secondary">Cerrar sesión</button></form>
    </div>
    {reports.length === 0 ? <p>Aún no tienes reportes de demostración.</p> : <ul className="report-list">
      {reports.map(item => <li key={item.id}><strong>{item.category}</strong><span>{item.sector} · {item.period}</span><span className="status">{statuses[item.status]}</span></li>)}
    </ul>}
  </main>;
}
