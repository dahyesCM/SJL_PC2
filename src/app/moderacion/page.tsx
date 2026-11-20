import Link from "next/link";
import { currentAccount } from "../../lib/accounts";
import { listReports } from "../../lib/reports";
import { statuses } from "../../lib/catalog";
import { review } from "../actions";
export const dynamic = "force-dynamic";

export default async function Moderacion({ searchParams }: { searchParams: Promise<{ resultado?: string }> }) {
  const account = await currentAccount();
  if (account?.role !== "moderator") return <main id="contenido" tabIndex={-1}><h1>Acceso restringido</h1><p>El panel requiere una cuenta moderadora.</p><Link href="/login">Ir al acceso</Link></main>;
  const queue = await listReports(account, true);
  const result = (await searchParams).resultado;
  return <main id="contenido" tabIndex={-1}>
    <p className="district">Datos de demostración</p>
    <h1>Moderación</h1>
    {result && <p role="status">{result === "guardado" ? "Decisión registrada." : "La transición ya no está disponible."}</p>}
    {queue.length === 0 ? <p>La cola está al día.</p> : <ul className="report-list">
      {queue.map(item => <li key={item.id}>
        <strong>{item.category}</strong><span>{item.sector} · {item.period}</span><span className="status">{statuses[item.status]}</span>
        {item.detail && <p className="report-detail"><strong>Detalle</strong><br />{item.detail}</p>}
        <form action={review} className="review-actions">
          <input type="hidden" name="id" value={item.id} />
          {item.status === "pending" ? <>
            <button className="button" name="decision" value="validated">Validar</button>
            <button className="button secondary" name="decision" value="rejected">Rechazar</button>
          </> : <button className="button" name="decision" value="attended">Marcar atendido</button>}
        </form>
      </li>)}
    </ul>}
  </main>;
}
