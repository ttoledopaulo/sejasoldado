import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader" });

export const metadata: Metadata = {
  metadataBase: new URL("https://soldados-valorosos.vercel.app"),
  title: { default: "Soldados Valorosos | Acolher para transformar", template: "%s | Soldados Valorosos" },
  description: "Conheça o Projeto Soldados Valorosos, uma iniciativa de acolhimento e transformação social em Praia Grande.",
  openGraph: { type: "website", locale: "pt_BR", siteName: "Soldados Valorosos" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${manrope.variable} ${newsreader.variable}`}><body><Header />{children}<Footer /></body></html>;
}
