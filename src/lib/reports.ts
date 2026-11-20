import { database, type Report } from "./demo";
import type { Account } from "./accounts";
import { supabase } from "./supabase";

export async function listReports(account: Account, queue = false): Promise<Report[]> {
  if (queue && account.role !== "moderator") return [];
  if (typeof account.id === "string") {
    const client = await supabase(true);
    const query = client.from("reports").select("id,category,sector,period,status,detail,has_location");
    const { data, error } = await (queue
      ? query.in("status", ["pending", "validated"]).order("id")
      : query.eq("account_id", account.id).order("id", { ascending: false }));
    if (error) throw new Error("No se pudieron cargar los reportes.");
    return (data ?? []) as Report[];
  }
  const query = `
    SELECT id, category, sector, period, status,
      (SELECT d.detail FROM report_details d WHERE d.report_id = reports.id) AS detail,
      EXISTS(SELECT 1 FROM report_locations l WHERE l.report_id = reports.id) AS has_location FROM reports
  `;
  return (queue
    ? database().prepare(query + " WHERE status IN ('pending','validated') ORDER BY id").all()
    : database().prepare(query + " WHERE account_id = ? ORDER BY id DESC").all(account.id)) as Report[];
}
