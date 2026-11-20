"use client";

import { useState } from "react";
import Link from "next/link";
import { categories, periods, sampleGroups, sectors } from "../lib/catalog";
import { suggestSector } from "../lib/location";
import { HeatMap } from "./heat-map";

export function Explorer({ initialCategory = "", initialPeriod = "" }: { initialCategory?: string; initialPeriod?: string }) {
  const [category, selectCategory] = useState(initialCategory);
  const [period, selectPeriod] = useState(initialPeriod);
  const [focused, focus] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationNote, setLocationNote] = useState("");
  const groups = sampleGroups.filter(group => (!category || group.category === category) && (!period || group.period === period));
  const totals = sectors.map(sector => ({ sector, total: groups.filter(group => group.sector === sector).reduce((sum, group) => sum + group.count, 0) }));
  const shown = focused ? groups.filter(group => group.sector === focused) : groups;
  const sum = shown.reduce((total, group) => total + group.count, 0);

  function locate() {
    if (!navigator.geolocation) {
      setLocationNote("Tu navegador no ofrece ubicación. Puedes elegir un sector en el mapa.");
      return;
    }
    setLocating(true);
    setLocationNote("Buscando tu sector aproximado…");
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setLocating(false);
      const { latitude, longitude, accuracy } = coords;
      const suggestion = accuracy <= 2500 ? suggestSector(latitude, longitude) : undefined;
      if (!suggestion) {
        setLocationNote("No podemos sugerir un sector con esta ubicación. Elige uno manualmente.");
        return;
      }
      focus(suggestion);
      setLocationNote("Sector aproximado: " + suggestion + ". Puedes cambiarlo en el mapa.");
    }, () => {
      setLocating(false);
      setLocationNote("La ubicación no estuvo disponible. Puedes elegir un sector manualmente.");
    }, { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 });
  }

  return <section className="explorer" aria-labelledby="map-title">
    <div className="section-heading">
      <div><p className="district">EXPLORACIÓN COMUNITARIA</p><h2 id="map-title">Explora por sectores</h2></div>
      <Link className="button" href="/reportar">+ Nuevo reporte</Link>
    </div>
    <p>Versión piloto · Mapa base de San Juan de Lurigancho · Cifras de prueba por sector.</p>
    <div className="stat-grid" aria-live="polite">
      <div><strong>{sum}</strong><span>Registros de la selección</span></div>
      <div><strong>{new Set(shown.map(group => group.sector)).size}</strong><span>Sectores con datos</span></div>
      <div><strong>{new Set(shown.map(group => group.category)).size}</strong><span>Categorías visibles</span></div>
    </div>
    <div className="filters">
      <label>Categoría<select value={category} onChange={e => {selectCategory(e.target.value); focus(null);}}><option value="">Todas</option>{categories.map(value => <option key={value}>{value}</option>)}</select></label>
      <label>Trimestre<select value={period} onChange={e => {selectPeriod(e.target.value); focus(null);}}><option value="">Todos</option>{periods.map(value => <option key={value}>{value}</option>)}</select></label>
      <button type="button" className="button secondary" onClick={() => {selectCategory(""); selectPeriod(""); focus(null); setLocationNote("");}}>Restablecer</button>
    </div>
    <div className="location-control">
      <button type="button" className="button secondary" onClick={locate} disabled={locating}>Usar mi ubicación</button>
      <small>Opcional. Tu ubicación solo se usa en este navegador.</small>
    </div>
    {locationNote && <p role="status" className="muted">{locationNote}</p>}
    <div className="explorer-grid">
      <HeatMap totals={totals} selected={focused} select={sector => {focus(focused === sector ? null : sector); setLocationNote("");}} />
      <div className="zone-details" aria-live="polite">
        <h3>{focused ? "Sector " + focused : "Lista de zonas"}</h3>
        {focused && <button type="button" className="text-button" onClick={() => focus(null)}>Ver todos los sectores</button>}
        {shown.length ? <ul className="zone-list">{shown.map(group => <li key={group.sector + group.period + group.category}><div><strong>{group.category}</strong><small>{group.sector} · {group.period}</small></div><span>{group.count}</span></li>)}</ul> : <p>Sin datos publicables para esta selección.</p>}
      </div>
    </div>
    <p className="muted">El color más intenso representa más registros de prueba del sector. Los círculos se anclan a áreas aproximadas. Se omiten grupos menores de cinco.</p>
  </section>;
}
