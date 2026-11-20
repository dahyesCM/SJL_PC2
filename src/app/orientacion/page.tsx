import Link from "next/link";

export const metadata = { title: "Orientación | SJL Previene" };

export default function Orientacion() {
  return (
    <main id="contenido" tabIndex={-1}>
      <p className="district">SAN JUAN DE LURIGANCHO · LIMA</p>
      <h1>¿Qué necesitas hacer?</h1>
      <p className="intro">Encuentra el canal adecuado según lo que está ocurriendo.</p>
      <section className="emergency" aria-labelledby="emergency-title">
        <div><h2 id="emergency-title">Hay una emergencia</h2><p>Si necesitas atención policial inmediata, comunícate con la Policía Nacional del Perú.</p></div>
        <a className="button" href="tel:105">Llamar al 105</a>
      </section>
      <div className="orientation-options">
        <details open><summary>Quiero presentar una denuncia</summary><p>Si necesitas registrar una denuncia por un presunto delito, revisa el trámite del Ministerio Público y sus indicaciones.</p><a className="button secondary" href="https://www.gob.pe/es/11324-presentar-denuncia-ante-el-ministerio-publico">Consultar el trámite oficial</a></details>
        <details><summary>Quiero avisar a la Policía sobre un incidente</summary><p>Mi Policía Digital ofrece un canal para dar aviso a la Policía Nacional desde el celular.</p><a className="button secondary" href="https://www.gob.pe/institucion/pnp/pages/66396-reporta-incidentes-y-delitos-mediante-la-aplicacion-mi-policia-digital">Ver Mi Policía Digital</a></details>
        <details><summary>Quiero contactar a la Municipalidad de SJL</summary><p>Consulta el directorio oficial del distrito para encontrar sus canales de atención.</p><a className="button secondary" href="https://www.gob.pe/institucion/munisanjuandelurigancho/contacto-y-numeros-de-emergencias">Ver directorio municipal</a></details>
        <details><summary>Quiero probar un reporte en SJL Previene</summary><p>Practica con un incidente inventado y consulta su seguimiento. El reporte se queda en la aplicación académica.</p><Link className="button secondary" href="/reportar">Empezar un reporte de prueba</Link></details>
      </div>
      <p className="muted">Fuentes consultadas el 19 de noviembre de 2026. <a href="https://www.gob.pe/institucion/pnp/contacto-y-numeros-de-emergencias">Directorio de la PNP</a></p>
    </main>
  );
}
