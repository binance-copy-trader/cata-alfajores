"use client";

import { useEffect, useState } from "react";
import { TITULO, ALFAJORES, CRITERIOS, USAR_GENERAL } from "@/config/cata";

type Item = {
  alfajor_id: string;
  votos: number;
  criterios: Record<string, number>;
  general: number;
};

const MEDALLAS = ["🥇", "🥈", "🥉"];

function datosAlfajor(id: string) {
  return ALFAJORES.find((x) => x.id === id);
}

// Puntaje para ordenar: usamos el general si está, si no el promedio de estrellas (escalado a 10)
function score(it: Item) {
  if (USAR_GENERAL && it.general > 0) return it.general;
  const vals = Object.values(it.criterios);
  if (!vals.length) return 0;
  return (vals.reduce((a, b) => a + b, 0) / vals.length) * 2;
}

export default function Resultados() {
  const [items, setItems] = useState<Item[]>([]);
  const [tot, setTot] = useState({ votantes: 0, votos: 0 });
  const [cargado, setCargado] = useState(false);
  const [sinFoto, setSinFoto] = useState<Set<string>>(new Set());

  async function cargar() {
    try {
      const res = await fetch("/api/results", { cache: "no-store" });
      const data = await res.json();
      if (data.resultado) {
        setItems(data.resultado);
        setTot({ votantes: data.totalVotantes, votos: data.totalVotos });
      }
    } catch {}
    setCargado(true);
  }

  useEffect(() => {
    cargar();
    const t = setInterval(cargar, 4000); // refresco en vivo
    return () => clearInterval(t);
  }, []);

  // Orden: por todos los alfajores de la config (aunque tengan 0 votos)
  const ranking = ALFAJORES.map((a) => {
    const it = items.find((i) => i.alfajor_id === a.id);
    return (
      it || { alfajor_id: a.id, votos: 0, criterios: {}, general: 0 }
    );
  }).sort((x, y) => score(y) - score(x));

  return (
    <div className="wrap">
      <div className="header">
        <h1>📊 Resultados</h1>
        <div className="sub">{TITULO} — en vivo</div>
      </div>

      <div className="stats-row">
        <div className="stat">
          <div className="n">{tot.votantes}</div>
          <div className="t">catadores</div>
        </div>
        <div className="stat">
          <div className="n">{tot.votos}</div>
          <div className="t">puntajes</div>
        </div>
        <div className="stat">
          <div className="n">{ALFAJORES.length}</div>
          <div className="t">alfajores</div>
        </div>
      </div>

      {!cargado ? (
        <div className="vacio">Cargando…</div>
      ) : tot.votos === 0 ? (
        <div className="vacio">
          Todavía no hay votos 🍪
          <br />
          ¡Que empiece la cata!
        </div>
      ) : (
        ranking.map((it, i) => {
          const s = score(it);
          const a = datosAlfajor(it.alfajor_id);
          return (
            <div className={"rank-item" + (i === 0 && s > 0 ? " top" : "")} key={it.alfajor_id}>
              <div className="medalla">{MEDALLAS[i] || `${i + 1}º`}</div>
              {a?.foto && !sinFoto.has(it.alfajor_id) ? (
                <img
                  className="rank-foto"
                  src={a.foto}
                  alt={a.nombre}
                  onError={() => setSinFoto((sf) => new Set(sf).add(it.alfajor_id))}
                />
              ) : (
                <div className="rank-foto rank-foto-emoji">{a?.emoji || "🍪"}</div>
              )}
              <div className="rank-info">
                <div className="rank-nombre">{a?.nombre || it.alfajor_id}</div>
                <div className="rank-criterios">
                  {CRITERIOS.map((c) => (
                    <span key={c.id}>
                      {c.emoji} {(it.criterios[c.id] || 0).toFixed(1)}⭐
                    </span>
                  ))}
                  <span>· {it.votos} votos</span>
                </div>
              </div>
              <div className="rank-puntaje">
                <div className="num">{s > 0 ? s.toFixed(1) : "—"}</div>
                <div className="lbl">{USAR_GENERAL ? "general /10" : "promedio /10"}</div>
              </div>
            </div>
          );
        })
      )}

      <a className="btn btn-sec" href="/" style={{ textAlign: "center", textDecoration: "none", marginTop: 18 }}>
        ← Volver a votar
      </a>
    </div>
  );
}
