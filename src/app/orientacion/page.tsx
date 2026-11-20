export const metadata = { title: "Orientación | SJL Previene" };

export default function Orientacion() {
  return (
    <main id="contenido" tabIndex={-1}>
      <p className="district">San Juan de Lurigancho · Lima</p>
      <h1>Orientación</h1>
      <p className="intro">Si necesitas atención policial inmediata, llama al 105.</p>
      <div className="actions">
        <a className="button" href="tel:105">Llamar al 105</a>
      </div>
      <h2>Canales oficiales</h2>
      <ul className="contacts">
        <li><a href="https://www.gob.pe/institucion/pnp/contacto-y-numeros-de-emergencias">Central de emergencias de la Policía Nacional del Perú</a></li>
        <li><a href="https://www.gob.pe/66396-reporta-incidentes-y-delitos-mediante-la-aplicacion-mi-policia-digital">Avisar a la Policía mediante Mi Policía Digital</a></li>
        <li><a href="https://www.gob.pe/institucion/munisanjuandelurigancho/contacto-y-numeros-de-emergencias">Canales de la Municipalidad de San Juan de Lurigancho</a></li>
      </ul>
      <p>Fuentes consultadas el 19 de noviembre de 2026.</p>
      <p className="notice">Los reportes de esta demo son ejercicios académicos. Para presentar una denuncia o solicitar atención, usa los canales oficiales.</p>
    </main>
  );
}
