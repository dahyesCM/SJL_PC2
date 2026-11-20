import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SJL Previene",
  authors: [{ name: "Damarys" }],
  description: "Proyecto académico de prevención comunitaria en San Juan de Lurigancho.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-PE">
      <body>
        <a className="skip" href="#contenido">Saltar al contenido</a>
        <header className="site-header">
          <Link className="brand" href="/">SJL Previene</Link>
          <nav aria-label="Navegación principal">
            <Link href="/mapa">Mapa</Link>
            <Link href="/orientacion">Orientación</Link>
            <Link href="/mis-reportes">Mis reportes</Link>
            <Link className="button secondary" href="/login">Ingresar</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">SJL Previene · Autora: Damarys</footer>
      </body>
    </html>
  );
}
