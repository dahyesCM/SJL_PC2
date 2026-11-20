import Link from "next/link";

export default function Home() {
  return (
    <main id="contenido" tabIndex={-1}>
      <p className="district">San Juan de Lurigancho · Lima</p>
      <h1>SJL Previene</h1>
      <p className="intro">Información comunitaria para conocer tu distrito y orientarte ante incidentes.</p>
      <p className="notice">Proyecto académico. La aplicación usa datos de demostración.</p>
      <div className="actions">
        <Link className="button" href="/mapa">Explorar el mapa</Link>
        <Link className="button secondary" href="/orientacion">Ver canales oficiales</Link>
      </div>
    </main>
  );
}
