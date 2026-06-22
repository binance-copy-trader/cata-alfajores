import { neon, NeonQueryFunction } from "@neondatabase/serverless";

// Creamos la conexión de forma perezosa (recién al primer uso, en runtime),
// así el build de Vercel no falla cuando todavía no hay DATABASE_URL.
let _sql: NeonQueryFunction<false, false> | null = null;
export function sql(...args: Parameters<NeonQueryFunction<false, false>>) {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("Falta DATABASE_URL");
    _sql = neon(url);
  }
  // @ts-expect-error - reenviamos el tagged template / args tal cual
  return _sql(...args);
}

// Crea la tabla si no existe. Idempotente y barato.
let ready: Promise<void> | null = null;
export function ensureSchema() {
  if (!ready) {
    ready = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS votos (
          id SERIAL PRIMARY KEY,
          votante TEXT NOT NULL,
          alfajor_id TEXT NOT NULL,
          puntajes JSONB NOT NULL DEFAULT '{}'::jsonb,
          general INT,
          creado TIMESTAMPTZ DEFAULT now(),
          UNIQUE (votante, alfajor_id)
        );
      `;
    })();
  }
  return ready;
}
