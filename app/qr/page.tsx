"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { TITULO, SUBTITULO } from "@/config/cata";

export default function QR() {
  const [img, setImg] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const u = window.location.origin;
    setUrl(u);
    QRCode.toDataURL(u, { width: 480, margin: 2, color: { dark: "#3a2218", light: "#ffffff" } })
      .then(setImg)
      .catch(() => {});
  }, []);

  return (
    <div className="wrap">
      <div className="header">
        <h1>{TITULO}</h1>
        <div className="sub">{SUBTITULO}</div>
      </div>
      <div className="card qr-card">
        <p style={{ marginTop: 0, fontWeight: 700, color: "var(--choco)" }}>
          📱 Escaneá para votar
        </p>
        {img ? <img src={img} alt="QR para votar" /> : <p>Generando QR…</p>}
        <div className="qr-url">{url}</div>
        {img && (
          <a className="btn" href={img} download="cata-alfajores-qr.png" style={{ textDecoration: "none", marginTop: 14 }}>
            ⬇️ Descargar QR (PNG)
          </a>
        )}
        <p style={{ fontSize: "0.85rem", color: "#999" }}>
          Mostralo en una tele o imprimilo para que cada invitado escanee con la cámara.
        </p>
      </div>
    </div>
  );
}
