import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { currentAccount } from "../lib/accounts";
import { logout } from "./actions";
import "./globals.css";

export const metadata: Metadata = {
  title: "SJL Previene",
  authors: [{ name: "Damarys" }],
  description: "Proyecto académico de prevención comunitaria en San Juan de Lurigancho.",
};

export default async function Layout({ children }: { children: ReactNode }) {
  const account = await currentAccount();
  return (
    <html lang="es-PE">
      <body>
        <a className="skip" href="#contenido">Saltar al contenido</a>
        <header className="site-header">
          <Link className="brand" href="/">SJL Previene</Link>
          <nav aria-label="Navegación principal">
            <Link href="/mapa">Mapa</Link>
            <Link href="/orientacion">Orientación</Link>
            <Link className="button" href="/reportar">Reportar</Link>
            {account ? <>
              <Link className="profile-link" href="/mis-reportes" aria-label={`Mi perfil: ${account.alias}`}><span aria-hidden="true" className="profile-badge">{Array.from(account.alias)[0]?.toUpperCase()}</span>{account.alias}</Link>
              <form action={logout}><button className="button secondary" aria-label="Cerrar sesión">Salir <span aria-hidden="true">↗</span></button></form>
            </> : <Link className="button secondary" href="/login">Ingresar</Link>}
          </nav>
        </header>
        {children}
        <footer className="site-footer">SJL Previene · Autora: Damarys</footer>
      </body>
    </html>
  );
}
