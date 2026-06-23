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
// "foto" es OPCIONAL: poné una imagen en la carpeta "public/fotos/" y referenciala
//   acá como "/fotos/archivo.jpg". Si no hay foto (o falla), se muestra el emoji.
// Tip: para la cata a ciegas, podés usar nombres tipo "Alfajor A", "Alfajor B"...
export type Alfajor = { id: string; nombre: string; emoji?: string; foto?: string };

export const ALFAJORES: Alfajor[] = [
  { id: "terrabusi-3torta", nombre: "Terrabusi 3 Torta", emoji: "🍫", foto: "/fotos/terrabusi-3torta.jpg" },
  { id: "aguila-minitorta-dark", nombre: "Águila Minitorta Dark", emoji: "🦅", foto: "/fotos/aguila-minitorta-dark.jpg" },
  { id: "rasta-negro", nombre: "Rasta - Negro", emoji: "⚫", foto: "/fotos/rasta-negro.jpg" },
  { id: "vauquita-sublime", nombre: "Vauquita Sublime", emoji: "🐮", foto: "/fotos/vauquita-sublime.jpg" },
  { id: "cachafaz-almendra72", nombre: "Cachafaz Almendra 72%", emoji: "🌰", foto: "/fotos/cachafaz-almendra72.jpg" },
  { id: "milka-super-ddl", nombre: "Milka Súper Dulce de Leche", emoji: "🟣", foto: "/fotos/milka-super-ddl.jpg" },
  { id: "rasta-maicena-trico", nombre: "Rasta Maicena Trico", emoji: "🟡", foto: "/fotos/rasta-maicena-trico.jpg" },
  { id: "pituco-membrillo", nombre: "Pituco de Membrillo", emoji: "🟧", foto: "/fotos/pituco-membrillo.jpg" },
  { id: "fantoche-triple-day", nombre: "Fantoche Triple Day", emoji: "🍫", foto: "/fotos/fantoche-triple-day.jpg" },
  { id: "cofler-block", nombre: "Cofler Block", emoji: "🟥", foto: "/fotos/cofler-block.jpg" },
  { id: "red-velvet-triple", nombre: "Red Velvet Triple", emoji: "❤️", foto: "/fotos/red-velvet-triple.jpg" },
  { id: "bagley-byn", nombre: "Bagley B&N", emoji: "🐼", foto: "/fotos/bagley-byn.jpg" },
  { id: "jorgito-blanco", nombre: "Jorgito Blanco", emoji: "⚪", foto: "/fotos/jorgito-blanco.jpg" },
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
