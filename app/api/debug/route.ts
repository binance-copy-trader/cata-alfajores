import { NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";

export const dynamic = "force-dynamic";

// Endpoint TEMPORAL de diagnóstico. Borrar después.
export async function GET() {
  try {
    await ensureSchema();

    // ¿Qué variable de entorno y host estamos usando?
    const env = process.env;
    const nombres = [
      "DATABASE_URL",
      "POSTGRES_URL",
      "POSTGRES_PRISMA_URL",
      "DATABASE_URL_UNPOOLED",
      "POSTGRES_URL_NON_POOLING",
      "STORAGE_URL",
      "STORAGE_DATABASE_URL",
    ];
    const presentes = nombres.filter((n) => !!env[n]);
    const usada = presentes[0] || "(scan)";
    let host = "?";
    try {
      host = new URL(env[usada] || "").host;
    } catch {}

    // Escribir un voto centinela y contarlo en el MISMO request
    const marca = "DEBUG_" + Date.now();
    await sql`
      INSERT INTO votos (votante, alfajor_id, puntajes, general)
      VALUES (${marca}, 'debug', '{"masa":1}'::jsonb, 1)
      ON CONFLICT (votante, alfajor_id) DO UPDATE SET general = EXCLUDED.general;
    `;
    const cont = (await sql`SELECT count(*)::int AS n FROM votos`) as Array<{ n: number }>;
    const mio = (await sql`SELECT count(*)::int AS n FROM votos WHERE votante = ${marca}`) as Array<{
      n: number;
    }>;

    return NextResponse.json({
      varUsada: usada,
      host,
      varsPostgresPresentes: presentes,
      totalFilas: cont[0]?.n,
      centinelaEncontrado: mio[0]?.n,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Error" }, { status: 500 });
  }
}
