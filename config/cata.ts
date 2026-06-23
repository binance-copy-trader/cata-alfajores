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
  { id: "a", nombre: "Alfajor A", emoji: "🅰️" },
  { id: "b", nombre: "Alfajor B", emoji: "🅱️" },
  { id: "c", nombre: "Alfajor C", emoji: "🇨" },
  { id: "d", nombre: "Alfajor D", emoji: "🇩" },
  { id: "e", nombre: "Alfajor E", emoji: "🇪" },
  { id: "f", nombre: "Alfajor F", emoji: "🇫" },
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
