export function suggestSector(latitude: number, longitude: number) {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) ||
      latitude < -12.04 || latitude > -11.87 || longitude < -77.055 || longitude > -76.93) return undefined;
  return latitude >= -11.94 ? "Norte" : latitude >= -11.99 ? "Centro" : "Sur";
}
