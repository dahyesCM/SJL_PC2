export const sectors = ["Norte", "Centro", "Sur"] as const;
export const categories = ["Robo al paso", "Asalto en transporte", "Extorsión", "Microcomercialización", "Otro"] as const;
export const periods = ["2026-T3", "2026-T4"] as const;
export const reportDetailLimit = 280;
export const statuses = { pending: "Pendiente de revisión", validated: "Validado en la demo", attended: "Atendido en la demo", rejected: "Rechazado" } as const;
export type Status = keyof typeof statuses;

export const sampleGroups = [
  { sector: "Norte", category: categories[0], period: periods[1], count: 8 },
  { sector: "Norte", category: categories[1], period: periods[1], count: 5 },
  { sector: "Centro", category: categories[1], period: periods[1], count: 6 },
  { sector: "Centro", category: categories[2], period: periods[0], count: 5 },
  { sector: "Sur", category: categories[0], period: periods[0], count: 7 },
  { sector: "Sur", category: categories[3], period: periods[1], count: 5 },
  { sector: "Sur", category: categories[2], period: periods[1], count: 4 },
].filter(({ count }) => count >= 5);
