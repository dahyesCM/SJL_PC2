import { randomUUID } from "node:crypto";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentAccount, demoEnabled } from "../../lib/demo";
import { ReportForm } from "../forms";
export const dynamic = "force-dynamic";
export default async function Reportar() {
  if (!demoEnabled || !await currentAccount()) redirect("/login?next=/reportar");
  return <main id="contenido" className="narrow" tabIndex={-1}>
    <p className="district">Versión piloto</p>
    <h1>Nuevo reporte</h1>
    <p>Selecciona el sector, el tipo de incidente y el trimestre. Puedes revisar el estado en Mis reportes.</p>
    <p className="notice">El reporte queda en SJL Previene. Para una emergencia o denuncia oficial, consulta <Link href="/orientacion">los canales de atención</Link>.</p>
    <ReportForm requestId={randomUUID()} />
  </main>;
}
