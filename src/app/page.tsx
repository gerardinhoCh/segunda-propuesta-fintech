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

// Ticker data
const tickerItems = [
  { label: "INVERSORES FORMADOS", value: "120+", icon: Users },
  { label: "PATRIMONIO GESTIONADO", value: "$2.4M", icon: DollarSign },
  { label: "MERCADOS REGULADOS", value: "100%", icon: Shield },
  { label: "RETORNO VERIFICADO", value: "+55%", icon: TrendingUp },
]

// Mistake cards data
const mistakes = [
  {
    icon: Users,
    title: "Invertir por Rumores",
    description: "El 80% de los inversores novatos pierden dinero siguiendo consejos sin fundamento técnico ni análisis de mercado profesional.",
  },
  {
    icon: AlertTriangle,
    title: "Confundir Trading con Inversión a Largo Plazo",
    description: "La especulación a corto plazo no es gestión de patrimonio. Un portafolio diversificado supera al trading impulsivo en el 90% de los casos.",
  },
  {
    icon: Target,
    title: "Invertir sin Estrategia de Salida",
    description: "Entrar al mercado sin plan de salida definido convierte la inversión en apuesta. La disciplina basada en datos es la clave del éxito financiero.",
  },
]

// Service cards data
const services = [
  {
    title: "Inversión Pasiva en ETFs",
    description: "Construye patrimonio a largo plazo con fondos indexados de bajo coste como Vanguard S&P 500. La estrategia más rentable para inversores inteligentes.",
    features: ["Diversificación global en mercados regulados", "Comisiones mínimas desde 0.03%", "Inversión automatizada mensual"],
    highlight: false,
  },
  {
    title: "Gestión Activa de Portafolio",
    description: "Rebalanceo trimestral profesional con ajustes estratégicos según condiciones macroeconómicas. Optimización fiscal incluida.",
    features: ["Análisis macroeconómico trimestral", "Optimización fiscal de plusvalías", "Reporting mensual detallado"],
    highlight: true,
  },
  {
    title: "Mentoría Financiera Personalizada",
    description: "Aprende a invertir con acompañamiento 1:1. Sesiones personalizadas con un asesor certificado y acceso directo para resolver tus dudas.",
    features: ["Plan de inversión personalizado", "Soporte continuo vía WhatsApp", "Revisión trimestral de cartera"],
    highlight: false,
  },
]

// Process steps
const processSteps = [
  { num: "01", title: "Agendar", desc: "Reserva tu sesión estratégica gratuita de 30 minutos" },
  { num: "02", title: "Analizar", desc: "Evaluamos tu perfil inversor y situación financiera" },
  { num: "03", title: "Estrategia", desc: "Diseñamos opciones de inversión adaptadas a tus objetivos" },
  { num: "04", title: "Invertir", desc: "Tú decides cuándo empezar a construir patrimonio" },
]

// Qualification lists
const forYou = [
  "Quieres construir patrimonio a largo plazo (+10 años)",
  "Valoras decisiones basadas en datos y análisis profesional",
  "Tienes €10.000+ disponibles para empezar a invertir",
  "Deseas entender cómo funcionan los mercados financieros",
]

const notForYou = [
  "Buscas criptomonedas especulativas o dinero rápido",
  "No tienes paciencia para una estrategia de inversión a largo plazo",
  "Esperas retornos garantizados sin asumir ningún riesgo",
  "No estás dispuesto a aprender sobre educación financiera",
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
              Inversión en Mercados Regulados · Estrategia Basada en Datos
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Aprende a invertir en ETFs y construye un{" "}
              <span className="text-gradient">portafolio rentable</span>{" "}
              en mercados regulados.
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Deja de adivinar y empieza a invertir con estrategia. Mentoría financiera personalizada, portafolios diversificados y resultados verificados. Tu sesión estratégica gratuita te espera.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 glow-primary text-lg px-8 py-6"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Agendar sesión gratuita de inversión
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground hover:bg-white/5 text-lg px-8 py-6"
              >
                Ver nuestra metodología de inversión
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
                  <span>Inversión impulsiva y volátil</span>
                  <span className="text-primary">Crecimiento patrimonial estructurado</span>
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
              Resultados Verificados
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Portafolio de inversión real con <span className="text-gradient">rentabilidad verificada</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Abrimos este portafolio diversificado de ETFs hace 18 meses para demostrar que la inversión pasiva inteligente genera resultados. Sin trucos, sin filtros — datos reales.
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
                * Resultados de un portafolio real de ETFs diversificados siguiendo nuestra metodología de inversión pasiva en mercados regulados. 
                Los rendimientos pasados no garantizan resultados futuros. Toda inversión conlleva riesgos.
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
              Los 3 errores más costosos al <span className="text-gradient">invertir sin estrategia</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Sin un plan de inversión claro y basado en datos, poner tu dinero en el mercado se convierte en una apuesta. Evita estos errores comunes que cuestan miles de euros a los inversores.
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
                <h3 className="font-display text-2xl font-bold mb-4">Inversor Impulsivo</h3>
                <svg viewBox="0 0 300 100" className="w-full h-24 mb-4">
                  <path
                    d="M 0,50 Q 30,20 60,60 T 120,30 T 180,70 T 240,40 T 300,60"
                    fill="none"
                    stroke="rgba(239,68,68,0.6)"
                    strokeWidth="2"
                  />
                </svg>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> Compra activos por miedo a perderse la subida (FOMO)</li>
                  <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> Vende en pánico cuando el mercado cae</li>
                  <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> Sin criterio objetivo ni análisis de mercado</li>
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
                <h3 className="font-display text-2xl font-bold mb-4">Inversor Estratégico Basado en Datos</h3>
                <svg viewBox="0 0 300 100" className="w-full h-24 mb-4">
                  <path
                    d="M 0,90 Q 75,70 150,50 T 300,20"
                    fill="none"
                    stroke="#00F2AA"
                    strokeWidth="2"
                  />
                </svg>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Entradas al mercado planificadas con análisis técnico</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Estrategia de salida definida antes de invertir</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Decisiones basadas en métricas objetivas y datos</li>
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
                  <h3 className="font-display text-2xl font-bold mb-2">Calculadora de Interés Compuesto para Inversores</h3>
                  <p className="text-muted-foreground">Descubre cuánto puede crecer tu patrimonio con inversión sistemática en ETFs diversificados. El poder del interés compuesto a largo plazo.</p>
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
                "No enseñamos a apostar en la bolsa. Enseñamos a invertir con inteligencia y estrategia."
              </blockquote>
              <p className="text-muted-foreground">
                Más de 15 años de experiencia en mercados financieros internacionales. Certificaciones CFA, FRM y regulación MiFID II. Nuestro enfoque de inversión se basa exclusivamente en análisis de datos, evidencia empírica y métricas objetivas del mercado.
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
            <h3 className="font-display text-2xl font-bold text-center mb-12">Cómo Empezar a Invertir: Nuestro Proceso en 4 Pasos</h3>
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
            <h3 className="font-display text-2xl font-bold text-center mb-12">Servicios de Inversión y Mentoría Financiera</h3>
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
                    Saber más <ChevronRight className="w-4 h-4 ml-1" />
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
              ¿Es la inversión inteligente <span className="text-gradient">para ti</span>?
            </h2>
            <p className="text-muted-foreground text-lg">
              Nuestra mentoría financiera está diseñada para inversores comprometidos con su futuro. Esto no es para todos.
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
              Tu patrimonio merece una <span className="text-gradient">estrategia de inversión profesional</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Agenda tu sesión estratégica gratuita de 30 minutos. Evaluaremos tu perfil inversor, analizaremos tu situación financiera y exploraremos las mejores opciones de inversión en ETFs y mercados regulados.
            </p>
            
            {/* Calendar Embed Placeholder */}
            <div className="glass rounded-xl p-8 max-w-2xl mx-auto mb-8">
              <div className="flex flex-col items-center gap-4">
                <Calendar className="w-16 h-16 text-primary/50" />
                <p className="text-muted-foreground text-sm">
                  Reserva ahora tu sesión de asesoría gratuita
                </p>
                <Button 
                  size="lg"
                  className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 glow-primary px-12"
                  onClick={() => window.open('https://cal.com', '_blank')}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar mi sesión de inversión gratuita
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Sin compromiso · 100% gratuito · Sin tarjeta de crédito
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
              © 2025 de Shop en Wall Street — Inversión Inteligente en ETFs y Mercados Regulados. Todos los derechos reservados.
            </p>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground max-w-3xl mx-auto">
              <strong>Aviso legal importante:</strong> La información proporcionada en este sitio web sobre inversión en ETFs, mercados financieros y gestión de patrimonio es únicamente con fines de educación financiera y no constituye asesoramiento de inversión personalizado. 
              Los rendimientos pasados no garantizan resultados futuros. Toda inversión en mercados financieros conlleva riesgos, incluyendo la posible pérdida parcial o total del capital invertido.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
