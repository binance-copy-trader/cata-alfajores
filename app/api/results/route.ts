import { NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureSchema();
    const rows = (await sql`
      SELECT votante, alfajor_id, puntajes, general FROM votos
    `) as Array<{
      votante: string;
      alfajor_id: string;
      puntajes: Record<string, number>;
      general: number | null;
    }>;

    // Agregamos por alfajor en JS (la escala de una fiesta es chica)
    const porAlfajor: Record<
      string,
      {
        alfajor_id: string;
        votos: number;
        criterios: Record<string, { suma: number; n: number }>;
        generalSuma: number;
        generalN: number;
        votantes: string[];
      }
    > = {};

    for (const r of rows) {
      const a = (porAlfajor[r.alfajor_id] ??= {
        alfajor_id: r.alfajor_id,
        votos: 0,
        criterios: {},
        generalSuma: 0,
        generalN: 0,
        votantes: [],
      });
      a.votos++;
      a.votantes.push(r.votante);
      for (const [k, v] of Object.entries(r.puntajes || {})) {
        const n = Number(v);
        if (!Number.isFinite(n) || n <= 0) continue;
        const c = (a.criterios[k] ??= { suma: 0, n: 0 });
        c.suma += n;
        c.n++;
      }
      if (r.general != null && Number.isFinite(Number(r.general))) {
        a.generalSuma += Number(r.general);
        a.generalN++;
      }
    }

    const resultado = Object.values(porAlfajor).map((a) => {
      const criterios: Record<string, number> = {};
      for (const [k, c] of Object.entries(a.criterios)) {
        criterios[k] = c.n ? c.suma / c.n : 0;
      }
      return {
        alfajor_id: a.alfajor_id,
        votos: a.votos,
        criterios,
        general: a.generalN ? a.generalSuma / a.generalN : 0,
        votantes: a.votantes,
      };
    });

    const totalVotantes = new Set(rows.map((r) => r.votante)).size;

    return NextResponse.json({ resultado, totalVotantes, totalVotos: rows.length });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Error" }, { status: 500 });
  }
}
