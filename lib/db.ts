import { neon, NeonQueryFunction } from "@neondatabase/serverless";

// Creamos la conexión de forma perezosa (recién al primer uso, en runtime),
// así el build de Vercel no falla cuando todavía no hay DATABASE_URL.
// Busca el connection string sin depender del nombre exacto de la variable
// (Vercel + Neon a veces la crean como DATABASE_URL, POSTGRES_URL, STORAGE_URL, etc.)
function encontrarUrl(): string {
  const env = process.env;
  // 1) Nombres más comunes, en orden de preferencia
  const candidatos = [
    "DATABASE_URL",
    "POSTGRES_URL",
    "POSTGRES_PRISMA_URL",
    "DATABASE_URL_UNPOOLED",
    "POSTGRES_URL_NON_POOLING",
    "STORAGE_URL",
    "STORAGE_DATABASE_URL",
  ];
  for (const c of candidatos) {
    if (env[c]) return env[c]!;
  }
  // 2) Como red de seguridad: cualquier variable cuyo valor sea una URL de postgres
  for (const v of Object.values(env)) {
    if (typeof v === "string" && /^postgres(ql)?:\/\//.test(v)) return v;
  }
  throw new Error("No se encontró el connection string de la base de datos");
}

let _sql: NeonQueryFunction<false, false> | null = null;
export function sql(...args: Parameters<NeonQueryFunction<false, false>>) {
  if (!_sql) {
    _sql = neon(encontrarUrl());
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
