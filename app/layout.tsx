import "./globals.css";
import type { Metadata } from "next";
import { TITULO } from "@/config/cata";

export const metadata: Metadata = {
  title: TITULO,
  description: "Cata de alfajores",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
