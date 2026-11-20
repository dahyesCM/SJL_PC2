import { Explorer } from "../explorer";
import { categories, periods } from "../../lib/catalog";

export const metadata = { title: "Mapa de demostración | SJL Previene" };

type Query = Record<string, string | string[] | undefined>;

export default async function Mapa({ searchParams }: { searchParams: Promise<Query> }) {
  const { categoria, periodo } = await searchParams;
  const category = categories.find(value => value === categoria);
  const period = periods.find(value => value === periodo);
  const invalid = (categoria && !category) || (periodo && !period);
  return <main id="contenido" tabIndex={-1}>
    <p className="district">Modo explorador</p>
    <h1>Mapa comunitario</h1>
    {invalid && <p role="alert">Hay un filtro inválido. Se muestran todos los grupos publicables.</p>}
    <Explorer initialCategory={category} initialPeriod={period} />
  </main>;
}
