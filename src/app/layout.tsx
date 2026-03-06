import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "de Shop en Wall Street | Inversión Inteligente en ETFs y Mercados Regulados",
  description: "Aprende a invertir en mercados regulados con estrategia data-driven. Construye un portafolio diversificado de ETFs, gestiona tu patrimonio a largo plazo y recibe mentoría financiera personalizada. Sesión estratégica gratuita.",
  keywords: [
    "invertir en ETFs",
    "inversión a largo plazo",
    "portafolio diversificado",
    "mercados regulados",
    "educación financiera",
    "gestión de patrimonio",
    "mentoría financiera",
    "interés compuesto",
    "inversión pasiva",
    "Vanguard S&P 500",
    "Wall Street",
    "asesoría de inversión",
    "finanzas personales",
    "rentabilidad",
    "estrategia de inversión",
    "ETF pasivo",
    "gestión activa portafolio",
  ],
  authors: [{ name: "de Shop en Wall Street" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "de Shop en Wall Street | Inversión Inteligente en ETFs y Mercados Regulados",
    description: "Deja de adivinar y empieza a invertir con estrategia. Portafolios diversificados en mercados regulados, mentoría financiera personalizada y resultados verificados con +55% de retorno.",
    type: "website",
    siteName: "de Shop en Wall Street",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "de Shop en Wall Street | Inversión Inteligente en ETFs",
    description: "Construye patrimonio real con estrategia data-driven. +120 alumnos, $2.4M gestionados, +55% retorno verificado. Sesión estratégica gratuita.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://gerardinhoch.github.io/segunda-propuesta-fintech",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
