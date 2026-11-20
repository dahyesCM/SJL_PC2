import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseConfig, supabaseCookieOptions } from "./supabase-config";

export async function supabase(readOnly = false) {
  const config = supabaseConfig();
  if (!config) throw new Error("Falta la configuración de Supabase.");
  const jar = await cookies();
  return createServerClient(config.url, config.key, {
    cookieOptions: supabaseCookieOptions,
    cookies: {
      getAll: () => jar.getAll(),
      setAll(items) {
        if (readOnly) return;
        for (const { name, value, options } of items) jar.set(name, value, options);
      },
    },
  });
}
