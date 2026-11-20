"use client";

import { useState } from "react";
import type { sectors } from "../lib/catalog";

type Sector = typeof sectors[number];
const positions: Record<Sector, [number, number]> = {
  Norte: [-11.904, -76.972],
  Centro: [-11.955, -76.993],
  Sur: [-12.005, -77.019],
};
const width = 660;
const height = 470;
const tileSize = 256;

function world([latitude, longitude]: [number, number], zoom: number) {
  const scale = tileSize * 2 ** zoom;
  const radians = latitude * Math.PI / 180;
  return [
    (longitude + 180) / 360 * scale,
    (1 - Math.asinh(Math.tan(radians)) / Math.PI) / 2 * scale,
  ];
}

export function HeatMap({ totals, selected, select }: {
  totals: { sector: Sector; total: number }[];
  selected: string | null;
  select: (sector: Sector) => void;
}) {
  const [zoom, setZoom] = useState(12);
  const [failed, setFailed] = useState<number[]>([]);
  const center = zoom > 12 && selected && selected in positions ? positions[selected as Sector] : positions.Centro;
  const [cx, cy] = world(center, zoom);
  const left = cx - width / 2;
  const top = cy - height / 2;
  const tiles = [];
  for (let x = Math.floor(left / tileSize); x <= Math.floor((left + width) / tileSize); x++) {
    for (let y = Math.floor(top / tileSize); y <= Math.floor((top + height) / tileSize); y++) {
      tiles.push({ x, y });
    }
  }
  return <div className="map-shell">
    <div className="osm-map" aria-label="Mapa interactivo de San Juan de Lurigancho">
      <div className="map-tiles" aria-hidden="true">
        {tiles.map(({ x, y }) => (
          // Map tiles use the browser cache and referrer directly.
          // eslint-disable-next-line @next/next/no-img-element
          <img key={`${zoom}/${x}/${y}`} alt="" draggable={false}
            src={`https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`}
            onError={() => setFailed(values => values.includes(zoom) ? values : [...values, zoom])}
            style={{ left: `${(x * tileSize - left) / width * 100}%`, top: `${(y * tileSize - top) / height * 100}%`, width: `${tileSize / width * 100}%`, height: `${tileSize / height * 100}%` }}
          />
        ))}
      </div>
      {totals.map(({ sector, total }) => {
        const [x, y] = world(positions[sector], zoom);
        if (x < left || x > left + width || y < top || y > top + height) return null;
        return <button key={sector} type="button" className="heat-marker" aria-pressed={selected === sector} onClick={() => select(sector)}
          style={{ left: `${(x - left) / width * 100}%`, top: `${(y - top) / height * 100}%` }}>
          {total > 0 && <span className={total >= 12 ? "heat-spot hot" : "heat-spot warm"} aria-hidden="true" />}
          <span className="map-pin">{sector} · {total}</span>
        </button>;
      })}
      <div className="map-zoom" aria-label="Controles del mapa">
        <button type="button" aria-label="Acercar mapa" disabled={zoom === 14} onClick={() => setZoom(zoom + 1)}>+</button>
        <button type="button" aria-label="Alejar mapa" disabled={zoom === 12} onClick={() => setZoom(zoom - 1)}>−</button>
      </div>
      <a className="map-credit" href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>
    </div>
    {failed.includes(zoom) && <p className="muted" role="status">Parte del mapa base no cargó. Puedes consultar los sectores y sus cifras en la lista.</p>}
    <div className="sector-controls" aria-label="Seleccionar sector">
      {totals.map(({ sector, total }) => <button key={sector} type="button" className="button secondary" aria-pressed={selected === sector} onClick={() => select(sector)}>{sector} · {total}</button>)}
    </div>
  </div>;
}
