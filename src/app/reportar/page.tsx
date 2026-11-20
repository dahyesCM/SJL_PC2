import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { currentAccount, demoEnabled } from "../../lib/demo";
import { ReportForm } from "../forms";
export const dynamic = "force-dynamic";
export default async function Reportar() {
  if (!demoEnabled || !await currentAccount()) redirect("/login");
  return <main id="contenido" className="narrow" tabIndex={-1}>
    <p className="district">Datos de demostración</p>
    <h1>Nuevo reporte</h1>
    <p>Ensaya con una situación inventada. Para una emergencia o denuncia real, usa los canales oficiales.</p>
    <ReportForm requestId={randomUUID()} />
  </main>;
}
