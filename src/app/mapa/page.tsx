import Link from "next/link";

export const metadata = { title: "Mapa de demostración | SJL Previene" };

const categories = ["Robo", "Asalto", "Extorsión"] as const;
const periods = ["2026-T3", "2026-T4"] as const;
const minimumPublicCount = 5;
const sectors = [
  { id: "north", name: "Norte", category: "Robo", period: "2026-T4", count: 8 },
  { id: "center", name: "Centro", category: "Asalto", period: "2026-T4", count: 6 },
  { id: "south", name: "Sur", category: "Robo", period: "2026-T3", count: 7 },
  { id: "south", name: "Sur", category: "Extorsión", period: "2026-T4", count: 4 },
].filter(({ count }) => count >= minimumPublicCount);

type Query = Record<string, string | string[] | undefined>;

export default async function Mapa({ searchParams }: { searchParams: Promise<Query> }) {
  const { categoria, periodo } = await searchParams;
  const category = categories.find((value) => value === categoria);
  const period = periods.find((value) => value === periodo);
  const invalid = (categoria && !category) || (periodo && !period);
  const visible = invalid ? [] : sectors.filter((sector) =>
    (!category || sector.category === category) && (!period || sector.period === period),
  );

  return (
    <main id="contenido" tabIndex={-1}>
      <p className="district">Consulta comunitaria</p>
      <h1>Mapa de zonas</h1>
      <p className="notice">Datos sintéticos creados para la demo. Cobertura ilustrativa de tres sectores y dos trimestres de 2026. Actualizado el 19 de noviembre de 2026.</p>
      <form action="/mapa" className="filters">
        <label>Categoría
          <select name="categoria" defaultValue={category ?? ""}>
            <option value="">Todas</option>
            {categories.map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
        <label>Periodo
          <select name="periodo" defaultValue={period ?? ""}>
            <option value="">Todos</option>
            <option value="2026-T3">Julio a septiembre de 2026</option>
            <option value="2026-T4">Octubre a diciembre de 2026</option>
          </select>
        </label>
        <button className="button" type="submit">Aplicar filtros</button>
      </form>
      {invalid && <p role="alert">Hay un filtro inválido. <Link href="/mapa">Restablecer filtros</Link>.</p>}
      {!invalid && visible.length === 0 && <p>Sin datos publicables para esta selección.</p>}
      {visible.length > 0 && (
        <>
          <div className="zone-map" aria-hidden="true">
            {visible.map(({ id, name, count }) => <div className={id} key={id}>{name} <strong>{count}</strong></div>)}
          </div>
          <h2>Lista de zonas</h2>
          <ul className="zones">
            {visible.map(({ name, count, category, period }) => (
              <li key={name}><strong>{name}</strong> · {category} · {period} · {count} registros sintéticos</li>
            ))}
          </ul>
        </>
      )}
      <p>El esquema usa sectores ilustrativos. La falta de datos no indica que una zona sea segura.</p>
    </main>
  );
}
