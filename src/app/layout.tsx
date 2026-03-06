import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Cómo Invertir en Bolsa desde Cero 2025 | Curso de Inversión en ETFs · de Shop en Wall Street",
  description: "Aprende cómo invertir en bolsa desde cero con nuestro programa de mentoría financiera. Portafolios de ETFs con +55% de rentabilidad verificada. Más de 120 inversores formados y $2.4M en patrimonio gestionado. Sesión estratégica 100% gratuita.",
  keywords: [
    "cómo invertir en bolsa",
    "invertir en bolsa desde cero",
    "curso inversión ETFs",
    "aprender a invertir",
    "inversión a largo plazo",
    "portafolio de inversión",
    "invertir en ETFs 2025",
    "educación financiera online",
    "mentoría financiera personalizada",
    "invertir en fondos indexados",
    "Vanguard S&P 500 VOO",
    "interés compuesto calculadora",
    "asesor financiero independiente",
    "gestión de patrimonio",
    "inversión pasiva",
    "cómo empezar a invertir",
    "mejores ETFs para invertir",
    "Wall Street inversión",
    "análisis de mercado financiero",
    "finanzas personales",
    "libertad financiera",
    "rentabilidad inversión",
    "diversificación de portafolio",
    "mercados regulados inversión",
    "planificación financiera",
  ],
  authors: [{ name: "de Shop en Wall Street" }],
  creator: "de Shop en Wall Street",
  publisher: "de Shop en Wall Street",
  formatDetection: {
    email: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Cómo Invertir en Bolsa desde Cero · Mentoría + Portafolios Reales con +55% Retorno",
    description: "Programa de inversión con resultados verificados. 120+ inversores formados, $2.4M gestionados, portafolios de ETFs diversificados en mercados regulados. Tu primera sesión es 100% gratuita.",
    type: "website",
    siteName: "de Shop en Wall Street",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aprende a Invertir en ETFs · Resultados Verificados +55%",
    description: "De cero a inversor estratégico. Mentoría 1:1, portafolios reales, 120+ alumnos. Sesión gratuita sin compromiso.",
    creator: "@deshopenwallst",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://deshopenwallstreet.netlify.app",
  },
  category: "finance",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "de Shop en Wall Street",
      "url": "https://deshopenwallstreet.netlify.app",
      "description": "Programa de mentoría financiera e inversión en ETFs con resultados verificados. Aprende a invertir en bolsa desde cero.",
      "inLanguage": "es",
    },
    {
      "@type": "FinancialService",
      "name": "de Shop en Wall Street",
      "description": "Mentoría financiera personalizada, gestión de portafolios de ETFs y educación financiera para inversores hispanohablantes.",
      "url": "https://deshopenwallstreet.netlify.app",
      "areaServed": {
        "@type": "Place",
        "name": "Latinoamérica y España"
      },
      "serviceType": ["Mentoría Financiera", "Gestión de Portafolios", "Educación Financiera"],
      "priceRange": "Sesión gratuita",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "120",
        "bestRating": "5"
      }
    },
    {
      "@type": "Course",
      "name": "Cómo Invertir en Bolsa desde Cero - Mentoría de Inversión en ETFs",
      "description": "Programa completo de educación financiera que te enseña a construir un portafolio de inversión diversificado en mercados regulados con ETFs como Vanguard S&P 500.",
      "provider": {
        "@type": "Organization",
        "name": "de Shop en Wall Street"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Primera sesión estratégica gratuita"
      },
      "inLanguage": "es",
      "coursePrerequisites": "Ninguno - desde nivel cero",
      "educationalLevel": "Principiante a Avanzado"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cómo empezar a invertir en bolsa desde cero?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "El primer paso es agendar una sesión estratégica gratuita donde evaluamos tu perfil inversor, tu situación financiera actual y tus objetivos a largo plazo. Diseñamos una estrategia personalizada con ETFs diversificados en mercados regulados."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cuánto dinero necesito para empezar a invertir en ETFs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Recomendamos un mínimo de €10.000 para construir un portafolio diversificado. Sin embargo, con aportes mensuales desde €100, el interés compuesto puede generar un patrimonio significativo a largo plazo."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué rentabilidad puedo esperar invirtiendo en ETFs a largo plazo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Históricamente, el S&P 500 ha ofrecido una rentabilidad media anual del 8-10%. Nuestro portafolio verificado ha logrado +55% de retorno en 18 meses, aunque los rendimientos pasados no garantizan resultados futuros."
          }
        },
        {
          "@type": "Question",
          "name": "¿Es seguro invertir en mercados regulados?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Los mercados regulados ofrecen protección al inversor mediante supervisión de organismos como la SEC, ESMA y MiFID II. Trabajamos exclusivamente con ETFs de gestoras reguladas como Vanguard, iShares y SPDR."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />
        <meta name="google-site-verification" content="REPLACE_WITH_YOUR_VERIFICATION_CODE" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
