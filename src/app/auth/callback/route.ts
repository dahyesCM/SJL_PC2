import { NextResponse, type NextRequest } from "next/server";
import { supabase } from "../../../lib/supabase";
import { supabaseConfig } from "../../../lib/supabase-config";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (supabaseConfig() && code) {
    const client = await supabase();
    const { error } = await client.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL("/mis-reportes", request.url));
  }
  return NextResponse.redirect(new URL("/login?confirmacion=error", request.url));
}
