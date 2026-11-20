import { cache } from "react";
import { currentAccount as localAccount, demoEnabled, type Account as LocalAccount } from "./demo";
import { supabase } from "./supabase";
import { supabaseConfig } from "./supabase-config";

export type Account = Omit<LocalAccount, "id"> & { id: number | string };

export function accountsEnabled() {
  return Boolean(supabaseConfig()) || demoEnabled;
}

export const currentAccount = cache(async (): Promise<Account | undefined> => {
  if (!supabaseConfig()) return localAccount();
  const client = await supabase(true);
  const { data: { user } } = await client.auth.getUser();
  if (!user || !user.email) return undefined;
  const { data } = await client.from("profiles").select("alias,role").eq("id", user.id).maybeSingle();
  if (!data) return undefined;
  return { id: user.id, email: user.email, alias: data.alias, role: data.role };
});
