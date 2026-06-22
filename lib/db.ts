import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// Crea la tabla si no existe. Se llama en cada request (es barato e idempotente).
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

export { sql };
