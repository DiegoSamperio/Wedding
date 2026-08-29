import type { Metadata } from "next";
import "@fontsource/cinzel/400.css";
import "@fontsource/cinzel/700.css";
import "@fontsource/poppins/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daniela & Rodrigo | 20 de marzo de 2027",
  description: "Información de la boda de Daniela Samperio Arce y Rodrigo Hevia Ibarrarán.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
