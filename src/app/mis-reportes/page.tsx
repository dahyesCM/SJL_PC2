import Link from "next/link";
import { redirect } from "next/navigation";
import { currentAccount, database, type Report } from "../../lib/demo";
import { statuses } from "../../lib/catalog";
import { logout } from "../actions";
export const dynamic = "force-dynamic";

export default async function History({ searchParams }: { searchParams: Promise<{ enviado?: string }> }) {
  const account = await currentAccount();
  if (!account) redirect("/login");
  const reports = database().prepare(`
    SELECT id, category, sector, period, status,
      EXISTS(SELECT 1 FROM report_locations l WHERE l.report_id = reports.id) AS has_location
    FROM reports WHERE account_id = ? ORDER BY id DESC
  `).all(account.id) as Report[];
  return <main id="contenido" tabIndex={-1}>
    <p className="district">Versión piloto</p>
    <h1>Mis reportes</h1>
    <p>Sesión iniciada como {account.alias}.</p>
    {(await searchParams).enviado === "1" && <p role="status" className="notice">Reporte recibido para revisión en SJL Previene.</p>}
    <div className="actions">
      <Link className="button" href="/reportar">+ Nuevo reporte</Link>
      {account.role === "moderator" && <Link className="button secondary" href="/moderacion">Moderación</Link>}
      <form action={logout}><button className="button secondary">Cerrar sesión</button></form>
    </div>
    {reports.length === 0 ? <p>Aún no tienes reportes.</p> : <ul className="report-list">
      {reports.map(item => <li key={item.id}><strong>{item.category}</strong><span>{item.sector} · {item.period}</span><span className="status">{statuses[item.status]}</span>{Boolean(item.has_location) && <small>Ubicación aproximada adjunta</small>}</li>)}
    </ul>}
  </main>;
}
