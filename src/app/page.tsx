import Link from "next/link";
import { Explorer } from "./explorer";

export default function Home() {
  return <main id="contenido" className="home" tabIndex={-1}>
    <section className="hero">
      <div className="hero-copy">
        <p className="district">SAN JUAN DE LURIGANCHO · LIMA</p>
        <h1>Conoce tu distrito.</h1>
        <p className="intro">Explora datos comunitarios de demostración por sector y encuentra los canales oficiales cuando necesites orientación.</p>
        <div className="actions">
          <Link className="button" href="#map-title">Explorar el mapa ↓</Link>
          <Link className="button secondary" href="/orientacion">Canales oficiales</Link>
        </div>
      </div>
      <div className="hero-picture" aria-hidden="true" />
    </section>
    <Explorer />
  </main>;
}
