"use client";

import { useEffect, useState } from "react";
import { TITULO, SUBTITULO, ALFAJORES, CRITERIOS, USAR_GENERAL } from "@/config/cata";

type Voto = { puntajes: Record<string, number>; general: number; guardado: boolean };

function votoVacio(): Voto {
  return { puntajes: {}, general: 7, guardado: false };
}

export default function Page() {
  const [nombre, setNombre] = useState("");
  const [confirmado, setConfirmado] = useState(false);
  const [votos, setVotos] = useState<Record<string, Voto>>({});
  const [toast, setToast] = useState("");
  const [sinFoto, setSinFoto] = useState<Set<string>>(new Set());

  // Cargar estado guardado en el celular
  useEffect(() => {
    const n = localStorage.getItem("cata_nombre");
    if (n) {
      setNombre(n);
      setConfirmado(true);
    }
    const v = localStorage.getItem("cata_votos");
    if (v) {
      try {
        setVotos(JSON.parse(v));
      } catch {}
    }
  }, []);

  function persistir(next: Record<string, Voto>) {
    setVotos(next);
    localStorage.setItem("cata_votos", JSON.stringify(next));
  }

  function getVoto(id: string): Voto {
    return votos[id] || votoVacio();
  }

  function setEstrella(id: string, criterio: string, valor: number) {
    const v = { ...getVoto(id) };
    v.puntajes = { ...v.puntajes, [criterio]: valor };
    v.guardado = false;
    persistir({ ...votos, [id]: v });
  }

  function setGeneral(id: string, valor: number) {
    const v = { ...getVoto(id), general: valor, guardado: false };
    persistir({ ...votos, [id]: v });
  }

  function mostrarToast(t: string) {
    setToast(t);
    setTimeout(() => setToast(""), 2200);
  }

  async function guardar(id: string) {
    const v = getVoto(id);
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          votante: nombre,
          alfajor_id: id,
          puntajes: v.puntajes,
          general: USAR_GENERAL ? v.general : null,
        }),
      });
      if (!res.ok) throw new Error();
      const next = { ...votos, [id]: { ...v, guardado: true } };
      persistir(next);
      mostrarToast("¡Voto guardado! 🎉");
    } catch {
      mostrarToast("No se pudo guardar 😕 reintentá");
    }
  }

  function confirmarNombre() {
    const n = nombre.trim();
    if (n.length < 2) {
      mostrarToast("Escribí tu nombre 🙂");
      return;
    }
    localStorage.setItem("cata_nombre", n);
    setConfirmado(true);
  }

  function cambiarNombre() {
    localStorage.removeItem("cata_nombre");
    setConfirmado(false);
  }

  const totalGuardados = ALFAJORES.filter((a) => getVoto(a.id).guardado).length;
  const pct = Math.round((totalGuardados / ALFAJORES.length) * 100);

  // --- Pantalla de nombre ---
  if (!confirmado) {
    return (
      <div className="wrap">
        <div className="header">
          <h1>{TITULO}</h1>
          <div className="sub">{SUBTITULO}</div>
        </div>
        <div className="card">
          <p style={{ textAlign: "center", marginTop: 0 }}>
            ¡Bienvenido/a a la cata! 🍪<br />
            Poné tu nombre para empezar a puntuar.
          </p>
          <input
            className="nombre-input"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && confirmarNombre()}
            maxLength={40}
          />
          <button className="btn" onClick={confirmarNombre} style={{ marginTop: 14 }}>
            ¡Empezar! 🚀
          </button>
        </div>
        {toast && <div className="toast">{toast}</div>}
      </div>
    );
  }

  // --- Pantalla de votación ---
  return (
    <div className="wrap">
      <div className="header">
        <h1>{TITULO}</h1>
        <div className="sub">{SUBTITULO}</div>
      </div>

      <div className="saludo">
        ¡Hola <b>{nombre}</b>! 👋
        <br />
        <button className="link-mini" onClick={cambiarNombre}>
          (no soy yo, cambiar nombre)
        </button>
      </div>

      <div className="progreso">
        {totalGuardados} de {ALFAJORES.length} alfajores puntuados
        <div className="barra">
          <span style={{ width: `${pct}%` }} />
        </div>
      </div>

      {ALFAJORES.map((a) => {
        const v = getVoto(a.id);
        return (
          <div className="card" key={a.id}>
            <div className="alfajor-nombre">
              {a.foto && !sinFoto.has(a.id) ? (
                <img
                  className="alfajor-foto"
                  src={a.foto}
                  alt={a.nombre}
                  onError={() => setSinFoto((s) => new Set(s).add(a.id))}
                />
              ) : (
                <span className="emoji">{a.emoji || "🍪"}</span>
              )}
              {a.nombre}
            </div>

            {CRITERIOS.map((c) => (
              <div className="criterio" key={c.id}>
                <div className="label">
                  <span>{c.emoji}</span>
                  {c.nombre}
                </div>
                <div className="estrellas">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={"estrella" + ((v.puntajes[c.id] || 0) >= n ? " activa" : "")}
                      onClick={() => setEstrella(a.id, c.id, n)}
                      role="button"
                      aria-label={`${n} estrellas`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {USAR_GENERAL && (
              <div className="general-box">
                <div className="label">
                  🏆 Puntaje general:{" "}
                  <span className="general-valor">{v.general}/10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={v.general}
                  onChange={(e) => setGeneral(a.id, Number(e.target.value))}
                />
              </div>
            )}

            <button
              className={"btn" + (v.guardado ? " guardado" : "")}
              onClick={() => guardar(a.id)}
            >
              {v.guardado ? "✓ Guardado (tocá para actualizar)" : "Guardar puntaje"}
            </button>
          </div>
        );
      })}

      <a className="btn btn-sec" href="/resultados" style={{ textAlign: "center", textDecoration: "none" }}>
        📊 Ver resultados en vivo
      </a>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
