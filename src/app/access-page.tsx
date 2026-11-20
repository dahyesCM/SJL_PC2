import Link from "next/link";
import { redirect } from "next/navigation";
import { currentAccount, accountsEnabled } from "../lib/accounts";
import { AccessForm } from "./forms";

export async function AccessPage({ register = false, next }: { register?: boolean; next?: string }) {
  const returnPath = next === "/reportar" ? next : undefined;
  const switchPath = register ? "/login" : "/register";
  if (await currentAccount()) redirect(returnPath ?? "/mis-reportes");
  return <main id="contenido" className="access-layout" tabIndex={-1}>
    <aside className="access-aside">
      <p className="district">SJL PREVIENE</p>
      <h2>Tu cuenta, tus reportes</h2>
      <p>Usa tu cuenta para enviar reportes de demostración y consultar su estado.</p>
      <Link className="button secondary" href="/mapa">Explorar sin cuenta</Link>
    </aside>
    <section className="access-content" aria-labelledby="access-title">
      <h1 id="access-title">{register ? "Crea tu cuenta" : "Inicia sesión"}</h1>
      {returnPath && <p>Después de iniciar sesión podrás completar el reporte.</p>}
      {register && <p className="notice"><strong>Privacidad de tus datos.</strong> Tu correo no aparece en el mapa. El nombre, DNI y celular solo se validan en formato y se descartan en esta versión. Usa datos de prueba en esos tres campos.</p>}
      {!accountsEnabled() && <p role="status">El acceso aún no está habilitado en este entorno.</p>}
      <AccessForm register={register} disabled={!accountsEnabled()} next={returnPath} />
      <p>{register ? "¿Ya tienes cuenta?" : "¿Primera visita?"} <Link href={returnPath ? { pathname: switchPath, query: { next: returnPath } } : switchPath}>{register ? "Inicia sesión" : "Crea una cuenta"}</Link></p>
    </section>
  </main>;
}
