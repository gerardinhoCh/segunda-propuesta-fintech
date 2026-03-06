'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Shield, 
  Euro,
  Check,
  X,
  Calendar,
  BarChart3,
  Target,
  Brain,
  Wallet,
  ChevronRight,
  AlertTriangle,
  LineChart,
  DollarSign,
  Clock,
  PieChart
} from "lucide-react"

// Ticker data — SEO: social proof with keyword-dense labels
const tickerItems = [
  { label: "ALUMNOS QUE APRENDIERON A INVERTIR", value: "120+", icon: Users },
  { label: "CAPITAL BAJO GESTIÓN", value: "$2.4M", icon: DollarSign },
  { label: "EN MERCADOS REGULADOS (SEC/ESMA)", value: "100%", icon: Shield },
  { label: "RENTABILIDAD VERIFICADA 18 MESES", value: "+55%", icon: TrendingUp },
]

// Mistake cards — SEO: targets "errores al invertir", "cómo no perder dinero invirtiendo"
const mistakes = [
  {
    icon: Users,
    title: "Invertir Siguiendo Consejos de Redes Sociales",
    description: "El 80% de quienes empiezan a invertir en bolsa pierden dinero por seguir 'gurús' de TikTok o WhatsApp sin análisis fundamentado. Un asesor financiero certificado marca la diferencia.",
  },
  {
    icon: AlertTriangle,
    title: "No Saber la Diferencia entre Trading y Inversión",
    description: "El day trading no es inversión a largo plazo. Los datos demuestran que invertir en ETFs indexados supera al 90% de los traders activos durante períodos de 10+ años.",
  },
  {
    icon: Target,
    title: "Comprar Acciones sin un Plan Financiero",
    description: "Invertir dinero sin una estrategia de entrada, salida y gestión de riesgo definida es apostar. La planificación financiera con datos es la base de toda inversión rentable.",
  },
]

// Service cards — SEO: targets "curso inversión ETFs", "asesor financiero", "mejor forma de invertir"
const services = [
  {
    title: "Curso de Inversión Pasiva en ETFs",
    description: "Aprende la mejor forma de invertir dinero a largo plazo: fondos indexados como Vanguard S&P 500 (VOO), iShares MSCI World y bonos. La estrategia que usan los inversores más exitosos del mundo.",
    features: ["Diversificación global en bolsas de EE.UU., Europa y Asia", "Comisiones desde 0.03% — las más bajas del mercado", "Automatiza tu inversión mensual y olvídate del timing"],
    highlight: false,
  },
  {
    title: "Gestión Profesional de Portafolio de Inversión",
    description: "Deja tu portafolio en manos de un asesor financiero certificado. Rebalanceo trimestral, optimización fiscal de plusvalías y análisis macroeconómico para maximizar tu rentabilidad.",
    features: ["Análisis macro de mercados financieros cada trimestre", "Ahorra impuestos con optimización fiscal de capital gains", "Informe mensual detallado de rendimiento de tu inversión"],
    highlight: true,
  },
  {
    title: "Mentoría 1:1 — Aprende a Invertir desde Cero",
    description: "Programa de mentoría financiera personalizada para quienes quieren aprender a invertir en bolsa paso a paso. Desde abrir tu primera cuenta de broker hasta construir un portafolio diversificado.",
    features: ["Plan de inversión 100% personalizado a tus objetivos financieros", "Soporte directo vía WhatsApp con tu asesor financiero", "Revisión trimestral de tu cartera de inversión con ajustes"],
    highlight: false,
  },
]

// Process steps — SEO: targets "cómo empezar a invertir", "pasos para invertir en bolsa"
const processSteps = [
  { num: "01", title: "Agenda Gratis", desc: "Reserva tu consulta gratuita de 30 min — sin compromiso ni tarjeta" },
  { num: "02", title: "Diagnóstico", desc: "Analizamos tu situación financiera y perfil de riesgo inversor" },
  { num: "03", title: "Plan a Medida", desc: "Diseñamos tu estrategia de inversión personalizada con ETFs" },
  { num: "04", title: "Empieza a Invertir", desc: "Activa tu portafolio y comienza a construir patrimonio real" },
]

// Qualification — SEO: targets "para quién es invertir en bolsa", "cuánto necesito para invertir"
const forYou = [
  "Quieres aprender cómo invertir en bolsa y generar ingresos pasivos",
  "Buscas la mejor forma de invertir tu dinero a largo plazo (+10 años)",
  "Tienes €10.000+ de ahorro y quieres ponerlo a trabajar en el mercado",
  "Valoras la educación financiera y las decisiones basadas en datos reales",
]

const notForYou = [
  "Buscas hacerte rico rápido con criptomonedas o meme stocks",
  "No tienes la paciencia para una estrategia de inversión a largo plazo",
  "Esperas rentabilidad garantizada — ninguna inversión lo es",
  "No quieres dedicar tiempo a entender cómo funciona el mercado financiero",
]

export default function Home() {
  const [monthlyContribution, setMonthlyContribution] = useState(500)
  const [years, setYears] = useState(20)
  const [animatedValue, setAnimatedValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const calculatorRef = useRef<HTMLDivElement>(null)

  // Compound interest calculation
  const rate = 0.08
  const calculateCompound = (monthly: number, years: number, rate: number) => {
    const months = years * 12
    const monthlyRate = rate / 12
    return monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  }

  const projectedValue = calculateCompound(monthlyContribution, years, rate)

  // Animate value on change
  useEffect(() => {
    const duration = 500
    const start = animatedValue
    const end = projectedValue
    const startTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedValue(start + (end - start) * eased)
      if (progress < 1) requestAnimationFrame(animate)
    }
    animate()
  }, [projectedValue])

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (calculatorRef.current) observer.observe(calculatorRef.current)
    return () => observer.disconnect()
  }, [])

  // Generate chart points
  const generateChartPath = () => {
    const points: string[] = []
    const width = 400
    const height = 150
    const months = years * 12
    
    for (let i = 0; i <= months; i += 3) {
      const value = monthlyContribution * ((Math.pow(1 + rate / 12, i) - 1) / (rate / 12))
      const x = (i / months) * width
      const y = height - (value / projectedValue) * height * 0.9
      points.push(`${x},${y}`)
    }
    
    return `M ${points.join(' L ')}`
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-bold text-xl">de Shop en <span className="text-primary">Wall Street</span></span>
          </div>
          <Button 
            variant="outline" 
            className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-300"
          >
            Agendar
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              +120 Inversores Formados · Mercados Regulados SEC/ESMA · +55% Rentabilidad
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Aprende cómo invertir en bolsa desde cero y construye un{" "}
              <span className="text-gradient">portafolio rentable con ETFs</span>{" "}
              en 2025.
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Mentoría financiera personalizada para inversores que quieren dejar de adivinar y empezar a ganar. Portafolios diversificados con rentabilidad verificada de +55%. Tu primera sesión estratégica es 100% gratuita.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 glow-primary text-lg px-8 py-6"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Quiero mi sesión gratuita
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground hover:bg-white/5 text-lg px-8 py-6"
              >
                Ver cómo funciona paso a paso
              </Button>
            </div>
          </div>
          
          {/* Right - Visual */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[400px]">
              {/* Animated Chart Visual */}
              <div className="absolute inset-0 glass rounded-2xl p-6 overflow-hidden">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map(i => (
                    <line 
                      key={i} 
                      x1="0" y1={i * 50} 
                      x2="400" y2={i * 50} 
                      stroke="rgba(255,255,255,0.05)" 
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Growth line */}
                  <path
                    d="M 0,180 Q 100,170 200,120 T 400,40"
                    fill="none"
                    stroke="url(#greenGradient)"
                    strokeWidth="3"
                    className="animate-pulse-slow"
                  />
                  
                  {/* Volatile line */}
                  <path
                    d="M 0,100 Q 50,60 100,140 T 200,80 T 300,150 T 400,90"
                    fill="none"
                    stroke="rgba(239,68,68,0.5)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00F2AA" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>
                  
                  {/* End point glow */}
                  <circle cx="400" cy="40" r="6" fill="#00F2AA" className="animate-pulse">
                    <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
                
                {/* Labels */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between text-xs text-muted-foreground">
                  <span>Invertir sin estrategia = perder dinero</span>
                  <span className="text-primary">Inversión inteligente = patrimonio real</span>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 glass rounded-xl p-3 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Retorno</div>
                    <div className="font-mono font-bold text-primary">+8.2%</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 glass rounded-xl p-3 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Riesgo</div>
                    <div className="font-mono font-bold text-accent">Bajo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Proof Ticker */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-b border-border/50 overflow-hidden bg-surface/30 backdrop-blur-sm">
          <div className="flex animate-ticker">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 px-8 py-4 whitespace-nowrap"
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm text-muted-foreground">{item.label}:</span>
                <span className="font-mono font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Results Section - Real Proof */}
      <section className="relative py-24 border-t border-b border-border/30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary mb-4">
              <Check className="w-4 h-4" />
              Rentabilidad Real — No Promesas
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              ¿Cuánto se gana invirtiendo en ETFs? Nuestro <span className="text-gradient">portafolio real con +55% de retorno</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              No mostramos capturas de pantalla editadas. Este es un portafolio real de ETFs diversificados que abrimos hace 18 meses para demostrar que invertir en bolsa con estrategia sí genera rentabilidad. Datos verificables, sin filtros.
            </p>
          </div>

          {/* Main Portfolio Card */}
          <div className="glass rounded-2xl p-8 md:p-12 border-primary/20 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
            
            <div className="grid lg:grid-cols-3 gap-8 relative">
              {/* Initial Investment */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">Inversión Inicial</span>
                </div>
                <div className="font-mono text-4xl md:text-5xl font-bold text-foreground">
                  $2,000
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Hace 18 meses · Enero 2023
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="w-24 h-0.5 bg-gradient-to-r from-muted-foreground/30 via-primary to-muted-foreground/30 relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border border-primary/30 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

              {/* Current Value */}
              <div className="text-center lg:text-right">
                <div className="flex items-center justify-center lg:justify-end gap-2 mb-3">
                  <PieChart className="w-5 h-5 text-primary" />
                  <span className="text-sm text-primary uppercase tracking-wider">Valor Actual</span>
                </div>
                <div className="font-mono text-4xl md:text-5xl font-bold text-gradient">
                  $3,100
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Junio 2024 · +55% retorno
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="mt-10">
              <svg viewBox="0 0 800 200" className="w-full h-32 md:h-48">
                {/* Grid lines */}
                {[0, 1, 2, 3].map(i => (
                  <line 
                    key={i} 
                    x1="0" y1={i * 50 + 25} 
                    x2="800" y2={i * 50 + 25} 
                    stroke="rgba(255,255,255,0.03)" 
                    strokeWidth="1"
                  />
                ))}
                
                {/* Area gradient */}
                <defs>
                  <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00F2AA" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#00F2AA" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="50%" stopColor="#00F2AA" />
                    <stop offset="100%" stopColor="#00F2AA" />
                  </linearGradient>
                </defs>

                {/* Area fill */}
                <path
                  d="M 0,175 Q 100,170 200,155 T 400,120 T 600,70 T 800,25 L 800,200 L 0,200 Z"
                  fill="url(#portfolioGradient)"
                />
                
                {/* Performance line - realistic growth curve */}
                <path
                  d="M 0,175 Q 100,170 200,155 T 400,120 T 600,70 T 800,25"
                  fill="none"
                  stroke="url(#lineGradient2)"
                  strokeWidth="3"
                  className="animate-pulse-slow"
                />
                
                {/* Key points */}
                <circle cx="0" cy="175" r="6" fill="#7C3AED">
                  <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="400" cy="120" r="5" fill="#00F2AA" opacity="0.7" />
                <circle cx="800" cy="25" r="8" fill="#00F2AA">
                  <animate attributeName="r" values="8;10;8" dur="1.5s" repeatCount="indefinite" />
                </circle>

                {/* Labels */}
                <text x="10" y="195" fill="#888899" fontSize="12" fontFamily="JetBrains Mono">$2,000</text>
                <text x="730" y="15" fill="#00F2AA" fontSize="12" fontFamily="JetBrains Mono">$3,100</text>
              </svg>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-2xl font-mono font-bold text-primary">+55%</div>
                <div className="text-xs text-muted-foreground mt-1">Retorno Total</div>
              </div>
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-2xl font-mono font-bold">18</div>
                <div className="text-xs text-muted-foreground mt-1">Meses</div>
              </div>
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-2xl font-mono font-bold text-primary">~36%</div>
                <div className="text-xs text-muted-foreground mt-1">CAGR Anualizado</div>
              </div>
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-2xl font-mono font-bold">Bajo</div>
                <div className="text-xs text-muted-foreground mt-1">Riesgo</div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground">
                * Portafolio real de ETFs (VOO, URTH, BND) gestionado con nuestra metodología de inversión pasiva en mercados regulados por SEC y ESMA. 
                Los rendimientos pasados no garantizan resultados futuros. Toda inversión en bolsa conlleva riesgos, incluyendo la posible pérdida de capital.
              </p>
            </div>
          </div>

          {/* Holdings Preview */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <Card className="glass glass-hover p-5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="font-mono text-sm font-bold text-primary">ETF</span>
                </div>
                <div>
                  <div className="font-bold text-sm">Vanguard S&P 500</div>
                  <div className="text-xs text-muted-foreground">VOO</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Asignación</span>
                <span className="font-mono text-primary font-bold">45%</span>
              </div>
            </Card>

            <Card className="glass glass-hover p-5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="font-mono text-sm font-bold text-accent">ETF</span>
                </div>
                <div>
                  <div className="font-bold text-sm">iShares MSCI World</div>
                  <div className="text-xs text-muted-foreground">URTH</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Asignación</span>
                <span className="font-mono text-primary font-bold">35%</span>
              </div>
            </Card>

            <Card className="glass glass-hover p-5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="font-mono text-sm font-bold text-primary">BND</span>
                </div>
                <div>
                  <div className="font-bold text-sm">Vanguard Total Bond</div>
                  <div className="text-xs text-muted-foreground">BND</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Asignación</span>
                <span className="font-mono text-primary font-bold">20%</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* The Conflict Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Los 3 errores que hacen que la gente <span className="text-gradient">pierda dinero en bolsa</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              El 90% de los inversores principiantes cometen estos errores que les cuestan miles de euros. Aprender cómo invertir correctamente desde el inicio te ahorra años de pérdidas y frustración.
            </p>
          </div>
          
          {/* Mistake Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {mistakes.map((mistake, i) => (
              <Card 
                key={i}
                className="glass glass-hover p-6 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <mistake.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{mistake.title}</h3>
                <p className="text-muted-foreground">{mistake.description}</p>
              </Card>
            ))}
          </div>
          
          {/* Before/After Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Before */}
            <Card className="glass p-8 border-red-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <X className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="font-mono text-red-400">ANTES</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">Así Pierde Dinero el 90% de la Gente</h3>
                <svg viewBox="0 0 300 100" className="w-full h-24 mb-4">
                  <path
                    d="M 0,50 Q 30,20 60,60 T 120,30 T 180,70 T 240,40 T 300,60"
                    fill="none"
                    stroke="rgba(239,68,68,0.6)"
                    strokeWidth="2"
                  />
                </svg>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> Compra acciones por FOMO después de ver un TikTok viral</li>
                  <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> Vende todo en pánico al primer -5% del mercado</li>
                  <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> Cero análisis, cero plan, cero diversificación</li>
                </ul>
              </div>
            </Card>
            
            {/* After */}
            <Card className="glass p-8 border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-mono text-primary">DESPUÉS</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">Así Invierte Quien Sabe Lo Que Hace</h3>
                <svg viewBox="0 0 300 100" className="w-full h-24 mb-4">
                  <path
                    d="M 0,90 Q 75,70 150,50 T 300,20"
                    fill="none"
                    stroke="#00F2AA"
                    strokeWidth="2"
                  />
                </svg>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Portafolio diversificado con ETFs de bajo coste</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Estrategia de entrada y salida definida con datos</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Rebalanceo trimestral y optimización fiscal automática</li>
                </ul>
              </div>
            </Card>
          </div>
          
          {/* Compound Interest Calculator */}
          <div ref={calculatorRef} className="glass rounded-2xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Calculator Inputs */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-2xl font-bold mb-2">¿Cuánto dinero puedo ganar invirtiendo? Calculadora de Interés Compuesto</h3>
                  <p className="text-muted-foreground">Simula cuánto crecerá tu dinero con aportes mensuales en ETFs indexados. El interés compuesto es la fuerza más poderosa del universo financiero — Einstein ya lo sabía.</p>
                </div>
                
                <div className="space-y-6">
                  {/* Monthly Contribution */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <label className="text-sm text-muted-foreground">Aporte Mensual</label>
                      <span className="font-mono text-primary font-bold">€{monthlyContribution.toLocaleString()}</span>
                    </div>
                    <Slider
                      value={[monthlyContribution]}
                      onValueChange={([v]) => setMonthlyContribution(v)}
                      min={100}
                      max={2000}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>€100</span>
                      <span>€2,000</span>
                    </div>
                  </div>
                  
                  {/* Years */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <label className="text-sm text-muted-foreground">Plazo</label>
                      <span className="font-mono text-primary font-bold">{years} años</span>
                    </div>
                    <Slider
                      value={[years]}
                      onValueChange={([v]) => setYears(v)}
                      min={5}
                      max={40}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>5 años</span>
                      <span>40 años</span>
                    </div>
                  </div>
                  
                  {/* Fixed Rate */}
                  <div className="glass rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Rentabilidad Anual Estimada</span>
                    </div>
                    <span className="font-mono font-bold text-primary">8%</span>
                  </div>
                </div>
              </div>
              
              {/* Chart & Result */}
              <div className="space-y-6">
                <div className="glass rounded-xl p-6 h-64 relative overflow-hidden">
                  <svg viewBox="0 0 400 150" className="w-full h-full">
                    {/* Grid */}
                    {[0, 1, 2, 3].map(i => (
                      <line 
                        key={i} 
                        x1="0" y1={i * 50} 
                        x2="400" y2={i * 50} 
                        stroke="rgba(255,255,255,0.03)" 
                        strokeWidth="1"
                      />
                    ))}
                    
                    {/* Area fill */}
                    <path
                      d={`${generateChartPath()} L 400,150 L 0,150 Z`}
                      fill="url(#areaGradient)"
                      opacity="0.3"
                    />
                    
                    {/* Line */}
                    <path
                      d={generateChartPath()}
                      fill="none"
                      stroke="url(#greenGradient)"
                      strokeWidth="3"
                      className={isVisible ? "animate-draw" : ""}
                      style={{
                        strokeDasharray: 1000,
                        strokeDashoffset: isVisible ? 0 : 1000,
                        transition: 'stroke-dashoffset 1.5s ease-out'
                      }}
                    />
                    
                    {/* Gradient definitions */}
                    <defs>
                      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00F2AA" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                    
                    {/* End point */}
                    <circle 
                      cx="400" 
                      cy={150 - (projectedValue / projectedValue) * 150 * 0.9} 
                      r="8" 
                      fill="#00F2AA"
                    />
                  </svg>
                </div>
                
                {/* Projected Value */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Valor Proyectado</p>
                  <div className="font-mono text-5xl font-bold text-gradient">
                    € {Math.round(animatedValue).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Total invertido: €{(monthlyContribution * years * 12).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Offer Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Bio Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl" />
              <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-2 border-primary/30 glass">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <Brain className="w-24 h-24 text-muted-foreground/50" />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <blockquote className="font-display text-2xl italic text-foreground/80">
                "Cualquiera puede aprender a invertir en bolsa. Lo que enseñamos es a hacerlo bien, con datos y sin emociones."
              </blockquote>
              <p className="text-muted-foreground">
                Más de 15 años invirtiendo en Wall Street y mercados financieros internacionales. Certificaciones CFA Level III, FRM y cumplimiento MiFID II / ESMA. Hemos ayudado a más de 120 personas a aprender cómo invertir su dinero de forma inteligente. Nuestro método se basa en análisis cuantitativo, evidencia empírica y las mismas estrategias que usan los fondos institucionales.
              </p>
              
              {/* Credentials */}
              <div className="flex flex-wrap gap-3">
                {['CFA Level III', 'FRM Certified', 'MiFID II', 'ESMA Regulated'].map((cred, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 rounded-full glass font-mono text-xs text-primary"
                  >
                    {cred}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Process Steps */}
          <div className="mb-20">
            <h3 className="font-display text-2xl font-bold text-center mb-12">¿Cómo empezar a invertir en bolsa? 4 pasos simples</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {processSteps.map((step, i) => (
                <div key={i} className="relative group">
                  {/* Connecting line */}
                  {i < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                  )}
                  
                  <Card className="glass glass-hover p-6 text-center transition-all duration-300">
                    <div className="font-mono text-3xl font-bold text-gradient mb-2">{step.num}</div>
                    <h4 className="font-display font-bold mb-1">{step.title}</h4>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Service Cards */}
          <div>
            <h3 className="font-display text-2xl font-bold text-center mb-12">Elige cómo quieres aprender a invertir</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <Card 
                  key={i}
                  className={`glass p-6 transition-all duration-300 relative group ${
                    service.highlight 
                      ? 'border-primary/30 hover:border-primary/60 hover:shadow-[0_0_40px_rgba(0,242,170,0.2)]' 
                      : 'glass-hover'
                  }`}
                >
                  {service.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      POPULAR
                    </div>
                  )}
                  
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    {i === 0 ? <LineChart className="w-6 h-6 text-primary" /> : 
                     i === 1 ? <BarChart3 className="w-6 h-6 text-primary" /> :
                     <Wallet className="w-6 h-6 text-primary" />}
                  </div>
                  
                  <h4 className="font-display text-xl font-bold mb-2">{service.title}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={service.highlight ? "default" : "outline"}
                    className={`w-full mt-6 ${
                      service.highlight 
                        ? 'bg-primary text-primary-foreground hover:scale-105 transition-transform' 
                        : 'border-primary/30 text-primary hover:bg-primary/10'
                    }`}
                  >
                    Empezar ahora <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Flow Section */}
      <section id="booking" className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Qualification Filter */}
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              ¿Quieres aprender a invertir en bolsa? Comprueba si <span className="text-gradient">esto es para ti</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Nuestra mentoría financiera está diseñada para personas serias sobre construir patrimonio a largo plazo. No es un curso más — es un programa con resultados reales.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* For You */}
            <Card className="glass p-8 border-primary/20">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold">Para ti si...</h3>
              </div>
              <ul className="space-y-4">
                {forYou.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            
            {/* Not For You */}
            <Card className="glass p-8 border-red-500/20">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-display text-xl font-bold">No para ti si...</h3>
              </div>
              <ul className="space-y-4">
                {notForYou.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          
          {/* Final CTA */}
          <div className="glass rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Empieza a invertir hoy con una <span className="text-gradient">sesión estratégica 100% gratuita</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              En 30 minutos analizamos tu situación financiera, definimos tus objetivos de inversión y diseñamos una estrategia personalizada con los mejores ETFs del mercado. Sin compromiso, sin costo, sin letra pequeña.
            </p>
            
            {/* Calendar Embed Placeholder */}
            <div className="glass rounded-xl p-8 max-w-2xl mx-auto mb-8">
              <div className="flex flex-col items-center gap-4">
                <Calendar className="w-16 h-16 text-primary/50" />
                <p className="text-muted-foreground text-sm">
                  Plazas limitadas — reserva tu lugar ahora
                </p>
                <Button 
                  size="lg"
                  className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 glow-primary px-12"
                  onClick={() => window.open('https://cal.com', '_blank')}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Quiero mi sesión gratuita ahora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  ✅ Sin compromiso · ✅ 100% gratuito · ✅ Sin tarjeta de crédito
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-bold">de Shop en <span className="text-primary">Wall Street</span></span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Términos</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacidad</a>
              <a href="#" className="hover:text-foreground transition-colors">Aviso Legal</a>
            </div>
            
            <p className="text-xs text-muted-foreground">
              © 2025 de Shop en Wall Street — Aprende cómo invertir en bolsa desde cero con ETFs en mercados regulados. Todos los derechos reservados.
            </p>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground max-w-3xl mx-auto">
              <strong>Aviso legal:</strong> Este sitio web ofrece educación financiera e información sobre cómo invertir en ETFs, fondos indexados, y mercados financieros regulados. No constituye asesoramiento de inversión personalizado ni recomendación de compra o venta de activos financieros. 
              Los rendimientos pasados de nuestro portafolio (+55% en 18 meses) no garantizan resultados futuros. Toda inversión en bolsa conlleva riesgos, incluyendo la posible pérdida parcial o total del capital invertido. Consulta con un asesor financiero regulado antes de tomar decisiones de inversión.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
