import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await ensureSchema();
    const body = await req.json();
    const votante = String(body.votante || "").trim().slice(0, 40);
    const alfajor_id = String(body.alfajor_id || "").trim();
    const puntajes = body.puntajes && typeof body.puntajes === "object" ? body.puntajes : {};
    const general =
      body.general === null || body.general === undefined ? null : Number(body.general);

    if (!votante || !alfajor_id) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    await sql`
      INSERT INTO votos (votante, alfajor_id, puntajes, general)
      VALUES (${votante}, ${alfajor_id}, ${JSON.stringify(puntajes)}::jsonb, ${general})
      ON CONFLICT (votante, alfajor_id)
      DO UPDATE SET puntajes = EXCLUDED.puntajes, general = EXCLUDED.general, creado = now();
    `;

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Error" }, { status: 500 });
  }
}
