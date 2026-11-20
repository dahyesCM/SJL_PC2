import Link from "next/link";
import { redirect } from "next/navigation";
import { currentAccount, demoEnabled } from "../lib/demo";
import { AccessForm } from "./forms";

export async function AccessPage({ register = false }: { register?: boolean }) {
  if (await currentAccount()) redirect("/mis-reportes");
  return <main id="contenido" className="narrow" tabIndex={-1}>
    <p className="district">Cuenta de demostración</p>
    <h1>{register ? "Crea tu cuenta" : "Inicia sesión"}</h1>
    <p>Usa un correo ficticio como vecino@example.test y una contraseña exclusiva para esta prueba.</p>
    {!demoEnabled && <p role="status">El acceso está disponible en el entorno local de demostración.</p>}
    <AccessForm register={register} disabled={!demoEnabled} />
    <p>{register ? "¿Ya tienes cuenta?" : "¿Primera visita?"} <Link href={register ? "/login" : "/register"}>{register ? "Inicia sesión" : "Crea una cuenta demo"}</Link></p>
    <Link href="/mapa">Continuar como explorador</Link>
  </main>;
}
