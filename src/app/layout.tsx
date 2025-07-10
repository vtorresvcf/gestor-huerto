import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Gestor de Huerto Urbano",
  description: "Organiza y cuida tus plantas con inteligencia 🌱",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //TODO AÑADIR MODO OSCURO CON UN BOTON
    <html lang="es" className={roboto.className}>
      <body>{children}</body>
    </html>
  );
}
