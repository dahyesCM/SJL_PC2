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
      (SELECT d.detail FROM report_details d WHERE d.report_id = reports.id) AS detail,
      EXISTS(SELECT 1 FROM report_locations l WHERE l.report_id = reports.id) AS has_location
    FROM reports WHERE account_id = ? ORDER BY id DESC
  `).all(account.id) as Report[];
  return <main id="contenido" tabIndex={-1}>
    <p className="district">Versión piloto</p>
    <h1>Mi perfil</h1>
    <section className="account-card" aria-label="Datos de mi cuenta">
      <span aria-hidden="true" className="profile-badge">{Array.from(account.alias)[0]?.toUpperCase()}</span>
      <div><h2>{account.alias}</h2><p>{account.email}</p></div>
      <span className="status">{account.role === "moderator" ? "Moderación" : "Cuenta vecinal"}</span>
    </section>
    {(await searchParams).enviado === "1" && <p role="status" className="notice">Reporte recibido para revisión en SJL Previene.</p>}
    <div className="actions">
      <Link className="button" href="/reportar">+ Nuevo reporte</Link>
      {account.role === "moderator" && <Link className="button secondary" href="/moderacion">Moderación</Link>}
      <form action={logout}><button className="button secondary">Cerrar sesión</button></form>
    </div>
    <section aria-labelledby="report-history-title">
      <h2 id="report-history-title">Mis reportes</h2>
      {reports.length === 0 ? <p>Aún no tienes reportes.</p> : <ul className="report-list">
        {reports.map(item => <li key={item.id}>
          <strong>{item.category}</strong><span>{item.sector} · {item.period}</span><span className="status">{statuses[item.status]}</span>
          {Boolean(item.has_location) && <small>Ubicación aproximada adjunta</small>}
          {item.detail && <p className="report-detail"><strong>Detalle</strong><br />{item.detail}</p>}
        </li>)}
      </ul>}
    </section>
  </main>;
}
