// ============================================================
//   CONFIGURACIÓN DE LA CATA  —  ¡editá esto a tu gusto!
// ============================================================

// Título que se ve arriba de todo
export const TITULO = "Cata de Alfajores";
export const SUBTITULO = "🎉 ¡16 años de León! 🎉";

// --- LISTA DE ALFAJORES ---
// Cambiá esta lista por los alfajores reales de tu cata.
// "id" tiene que ser único y sin espacios (se usa internamente).
// "nombre" es lo que ven los chicos. Podés agregar un "emoji" si querés.
// Tip: para la cata a ciegas, podés usar nombres tipo "Alfajor A", "Alfajor B"...
export const ALFAJORES = [
  { id: "terrabusi-3torta", nombre: "Terrabusi 3 Torta", emoji: "🍫" },
  { id: "aguila-minitorta-dark", nombre: "Águila Minitorta Dark", emoji: "🦅" },
  { id: "rasta-negro", nombre: "Rasta - Negro", emoji: "⚫" },
  { id: "vauquita-sublime", nombre: "Vauquita Sublime", emoji: "🐮" },
  { id: "cachafaz-almendra72", nombre: "Cachafaz Almendra 72%", emoji: "🌰" },
  { id: "milka-super-ddl", nombre: "Milka Súper Dulce de Leche", emoji: "🟣" },
  { id: "rasta-maicena-trico", nombre: "Rasta Maicena Trico", emoji: "🟡" },
  { id: "pituco-membrillo", nombre: "Pituco de Membrillo", emoji: "🟧" },
  { id: "fantoche-triple-day", nombre: "Fantoche Triple Day", emoji: "🍫" },
  { id: "cofler-block", nombre: "Cofler Block", emoji: "🟥" },
  { id: "red-velvet-triple", nombre: "Red Velvet Triple", emoji: "❤️" },
  { id: "bagley-byn", nombre: "Bagley B&N", emoji: "🐼" },
  { id: "jorgito-blanco", nombre: "Jorgito Blanco", emoji: "⚪" },
];

// --- CRITERIOS CON ESTRELLAS (1 a 5) ---
// Podés agregar, sacar o renombrar criterios libremente.
export const CRITERIOS = [
  { id: "masa", nombre: "Masa / galletita", emoji: "🍪" },
  { id: "relleno", nombre: "Relleno (dulce de leche)", emoji: "🥛" },
  { id: "banio", nombre: "Baño (chocolate / glasé)", emoji: "🍫" },
] as const;

// Puntaje general de 1 a 10 (dejalo en true para que aparezca)
export const USAR_GENERAL = true;
