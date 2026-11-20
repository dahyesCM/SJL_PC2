import Link from "next/link";
import { Explorer } from "./explorer";

export default function Home() {
  return <main id="contenido" className="home" tabIndex={-1}>
    <section className="hero">
      <div className="hero-copy">
        <p className="district">SAN JUAN DE LURIGANCHO · LIMA</p>
        <h1>Prevención ciudadana en SJL</h1>
        <p className="intro">Consulta un mapa comunitario, practica cómo reportar un incidente y encuentra el canal oficial adecuado para pedir ayuda o denunciar.</p>
        <div className="actions">
          <Link className="button" href="#map-title">Explorar el mapa ↓</Link>
          <Link className="button secondary" href="/orientacion">¿Dónde denuncio?</Link>
        </div>
      </div>
      <div className="hero-picture" aria-hidden="true" />
    </section>
    <section className="home-paths" aria-label="Qué puedes hacer">
      <article><h2>Consulta el mapa</h2><p>Explora por sector y tipo de incidente sin crear una cuenta. Los datos son de demostración.</p><Link href="#map-title">Ver el mapa</Link></article>
      <article><h2>Reporta un incidente</h2><p>Ensaya el envío y consulta el estado desde tu cuenta. El reporte queda en esta aplicación académica.</p><Link href="/reportar">Crear un reporte de prueba</Link></article>
      <article><h2>Busca ayuda oficial</h2><p>Elige un canal según necesites ayuda inmediata, avisar a la Policía o presentar una denuncia.</p><Link href="/orientacion">Ver opciones</Link></article>
    </section>
    <Explorer />
  </main>;
}
