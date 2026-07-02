import { useState, useEffect, useRef, type FormEvent } from "react"
import { motion, useInView } from "motion/react"
import {
  Menu, X, ChevronDown, Mail, Instagram, ArrowRight,
  Briefcase, Users, Calculator, DollarSign, Shield,
  FileSpreadsheet, Receipt, Smartphone, Building2,
  UserCheck, BarChart3, MessageSquare, Settings, Eye, Layers,
} from "lucide-react"
import * as Accordion from "@radix-ui/react-accordion"

import heroImg   from "../imports/image.png"
import laptopImg from "../imports/image-1.png"
import armsImg   from "../imports/image-2.png"
import leafIcon  from "../imports/image-3.png"
import logoImg   from "../imports/logo-oliveira-cropped.png"

const CONTACT_EMAIL = "oliveirasantosconsultoria1101@gmail.com"
const WHATSAPP_NUMBER = "5561995647701"
const WHATSAPP_DISPLAY = "+55 (61) 99564-7701"

const defaultWhatsAppMessage =
  "Olá, Sâmela! Vim pelo site da Oliveira Contabilidade e gostaria de solicitar um atendimento."

const defaultEmailSubject = "Solicitação de atendimento - Oliveira Contabilidade"
const defaultEmailBody =
  "Olá, Sâmela! Vim pelo site da Oliveira Contabilidade e gostaria de solicitar um atendimento.\n\nAguardo seu retorno.\n\nObrigado(a)."

const createWhatsAppHref = (message: string = defaultWhatsAppMessage) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

const createMailtoHref = (subject = defaultEmailSubject, body = defaultEmailBody) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  if (!digits) return ""
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

const atendimentoLabels: Record<string, string> = {
  empresa: "Empresa",
  pf: "Pessoa física",
  bpo: "BPO financeiro",
  irpf: "Imposto de Renda",
  carne: "Carnê-Leão",
  outro: "Outro",
}

// ─── Primitives ──────────────────────────────────────────────────────────────

function FadeIn({
  children, delay = 0, className = "", dir = "up",
}: {
  children: React.ReactNode; delay?: number; className?: string
  dir?: "up" | "left" | "right" | "none"
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const init: Record<string, number> = { opacity: 0 }
  if (dir === "up")    init.y = 24
  if (dir === "left")  init.x = -24
  if (dir === "right") init.x = 24
  return (
    <motion.div ref={ref}
      initial={init}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  )
}

const GoldLine = ({ className = "" }: { className?: string }) => (
  <div className={`h-px bg-gradient-to-r from-transparent via-[#C9941A] to-transparent ${className}`} />
)

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-5 ${light ? "opacity-75" : ""}`}>
      <div className="w-5 h-px bg-[#C9941A]" />
      <span className="text-[#C9941A] text-[10px] tracking-[0.26em] uppercase font-bold font-sans">
        {children}
      </span>
    </div>
  )
}

const GoldBtn = ({
  onClick, href, target, children, className = "",
}: {
  onClick?: () => void; href?: string; target?: string
  children: React.ReactNode; className?: string
}) => {
  const cls = `inline-flex items-center justify-center gap-2.5 bg-[#C9941A] text-[#0D0B08] font-semibold text-[13px] tracking-[0.05em] px-7 py-[14px] hover:bg-[#B8841A] active:bg-[#A87618] transition-colors duration-150 ${className}`
  if (href) return <a href={href} target={target} rel="noopener noreferrer" className={cls}>{children}</a>
  return <button onClick={onClick} className={cls}>{children}</button>
}

const GhostBtn = ({
  onClick, href, target, children, dark = false, className = "",
}: {
  onClick?: () => void; href?: string; target?: string
  children: React.ReactNode; dark?: boolean; className?: string
}) => {
  const cls = `inline-flex items-center justify-center gap-2.5 border font-medium text-[13px] tracking-[0.05em] px-7 py-[14px] transition-colors duration-150 ${
    dark
      ? "border-white/20 text-white/70 hover:border-[#C9941A] hover:text-[#C9941A]"
      : "border-[#3D3028]/30 text-[#3D3028] hover:border-[#C9941A] hover:text-[#C9941A]"
  } ${className}`
  if (href) return <a href={href} target={target} rel="noopener noreferrer" className={cls}>{children}</a>
  return <button onClick={onClick} className={cls}>{children}</button>
}

// ─── Header ──────────────────────────────────────────────────────────────────

function Header({ go }: { go: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    fn()
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const nav = [
    ["Início", "inicio"], ["Serviços", "servicos"], ["Sobre", "sobre"],
    ["Como funciona", "como-funciona"], ["Dúvidas", "duvidas"], ["Contato", "contato"],
  ]

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-[#F7F3EC]/97 backdrop-blur-md ${
      scrolled ? "shadow-[0_1px_0_rgba(201,148,26,0.14)]" : "shadow-[0_1px_0_rgba(201,148,26,0.06)]"
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-0 min-h-[5.25rem] flex items-center justify-between">
        <button onClick={() => go("inicio")} aria-label="Início" className="shrink-0">
          <img src={logoImg} alt="Logo Oliveira Contabilidade" className="h-12 sm:h-[3.25rem] md:h-14 w-auto" />
        </button>

        <nav className="hidden lg:flex items-center gap-7">
          {nav.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}
              className="text-[12.5px] font-medium text-[#3D3028] hover:text-[#C9941A] transition-colors tracking-wide">
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <GoldBtn onClick={() => go("contato")} className="text-[12px] px-5 py-[11px]">
            Solicitar diagnóstico
            <ArrowRight size={13} />
          </GoldBtn>
        </div>

        <button className="lg:hidden p-1.5 text-[#3D3028]" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#F7F3EC]/99 border-t border-[#C9941A]/12 px-6 py-5 flex flex-col gap-0.5">
          {nav.map(([label, id]) => (
            <button key={id} onClick={() => { go(id); setOpen(false) }}
              className="text-left py-3 text-[15px] font-medium text-[#3D3028] hover:text-[#C9941A] transition-colors border-b border-[#C9941A]/8 last:border-0">
              {label}
            </button>
          ))}
          <GoldBtn onClick={() => { go("contato"); setOpen(false) }} className="mt-4 w-full">
            Solicitar diagnóstico inicial
            <ArrowRight size={13} />
          </GoldBtn>
        </div>
      )}
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ go }: { go: (id: string) => void }) {
  return (
    <section id="inicio" className="min-h-screen grid lg:grid-cols-[1fr_1fr] overflow-hidden">
      {/* Left — text (order-1: text first on mobile) */}
      <div className="bg-[#F7F3EC] relative flex items-center order-1 lg:order-1 pt-28 pb-16 lg:py-0">
        <div className="absolute bottom-0 left-0 pointer-events-none select-none">
          <img src={leafIcon} alt="" aria-hidden className="w-64 h-64 opacity-[0.04]" />
        </div>

        <div className="relative w-full px-8 md:px-12 lg:pl-[max(3rem,calc((100vw-1400px)/2+3rem))] lg:pr-14 xl:pr-20">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            <Label>Contabilidade Consultiva</Label>
            <div className="w-14 h-[1.5px] bg-[#C9941A] mb-7" />
            <h1 className="font-display text-[2.3rem] md:text-[2.8rem] lg:text-[3rem] xl:text-[3.4rem] leading-[1.1] font-semibold text-[#0D0B08] mb-6">
              Contabilidade estratégica para empresas e pessoas físicas que querem crescer com segurança.
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-[#5C5048] text-[16px] leading-relaxed mb-2">
              A Oliveira Contabilidade cuida da sua rotina contábil, fiscal, tributária e financeira com clareza, organização e acompanhamento próximo.
            </p>
            <p className="text-[#7A6E65] text-[14.5px] leading-relaxed mb-8">
              Tenha mais tranquilidade para tomar decisões, cumprir obrigações e manter sua vida financeira em ordem.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 mb-6">
            <GoldBtn onClick={() => go("contato")} className="w-full sm:w-auto">
              Solicitar diagnóstico inicial
              <ArrowRight size={14} />
            </GoldBtn>
            <GhostBtn onClick={() => go("servicos")} className="w-full sm:w-auto">
              Conhecer serviços
            </GhostBtn>
          </motion.div>

        </div>
      </div>

      {/* Right — photo (order-2: photo second on mobile) */}
      <div className="relative order-2 lg:order-2 min-h-[60vw] lg:min-h-0 bg-[#C9941A]/10 overflow-hidden">
        <motion.img
          src={heroImg}
          alt="Sâmela Oliveira, responsável pela Oliveira Contabilidade"
          className="absolute inset-x-0 top-0 lg:top-[5.25rem] w-full h-full object-cover"
          style={{ objectPosition: "50% 28%" }}
          initial={{ scale: 1.03 }} animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F3EC]/40 via-transparent to-transparent lg:from-[#F7F3EC]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B08]/25 via-transparent to-transparent" />
      </div>
    </section>
  )
}

// ─── Trust strip ─────────────────────────────────────────────────────────────

function TrustStrip() {
  const items = [
    "Atendimento consultivo",
    "Organização fiscal",
    "Segurança tributária",
    "Gestão financeira mais clara",
    "Atendimento digital",
    "Empresas e pessoas físicas",
    "IRPF, BPO e rotina contábil",
  ]

  const track = [...items, ...items]

  return (
    <div className="bg-[#0D0B08] border-y border-[#C9941A]/10 py-7 overflow-hidden">
      <style>{`
        @keyframes trust-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .trust-track {
          animation: trust-marquee 28s linear infinite;
        }
        .trust-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="flex">
        <div className="trust-track flex shrink-0 items-center">
          {track.map((item, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="text-white/68 text-[13px] font-medium tracking-wide whitespace-nowrap px-8 lg:px-10">
                {item}
              </span>
              <div className="w-px h-4 bg-[#C9941A]/22 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── For Whom ─────────────────────────────────────────────────────────────────

function ForWhom({ go }: { go: (id: string) => void }) {
  const cards = [
    { n: "01", icon: <Building2 size={18} />, title: "Empresas em crescimento",
      text: "Para negócios que precisam de uma rotina contábil organizada, obrigações em dia e acompanhamento estratégico." },
    { n: "02", icon: <Users size={18} />, title: "Empreendedores e MEIs",
      text: "Para quem está começando, regularizando ou estruturando melhor sua empresa." },
    { n: "03", icon: <UserCheck size={18} />, title: "Profissionais autônomos e liberais",
      text: "Para quem precisa cuidar de Imposto de Renda, Carnê-Leão e regularidade fiscal." },
    { n: "04", icon: <BarChart3 size={18} />, title: "Negócios que querem clareza financeira",
      text: "Para quem precisa organizar contas, fluxo de caixa, pagamentos, recebimentos e relatórios." },
  ]

  return (
    <section className="bg-[#F7F3EC] py-24 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <FadeIn>
          <div className="max-w-[640px] mb-14">
            <Label>Público</Label>
            <h2 className="font-display text-[1.9rem] md:text-[2.4rem] lg:text-[2.8rem] font-semibold text-[#0D0B08] leading-tight mb-4">
              Para quem é a Oliveira Contabilidade?
            </h2>
            <p className="text-[#6B5E54] text-[16px] leading-relaxed">
              Soluções para quem busca organização, clareza e segurança na gestão contábil, fiscal e financeira.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <FadeIn key={i} delay={i * 0.09}>
              <div className="group h-full bg-white border border-[#E8E2D9] hover:border-[#C9941A]/40 rounded-2xl p-7 transition-all duration-300 hover:shadow-[0_10px_36px_rgba(201,148,26,0.09)] hover:-translate-y-1 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-display text-[1.8rem] font-bold text-[#C9941A]/35 leading-none group-hover:text-[#C9941A]/55 transition-colors">
                    {c.n}
                  </span>
                  <span className="text-[#C9941A] group-hover:scale-110 transition-transform duration-200">{c.icon}</span>
                </div>
                <h3 className="font-display text-[15px] font-semibold text-[#0D0B08] mb-2.5 leading-snug">{c.title}</h3>
                <p className="text-[#6B5E54] text-[13.5px] leading-relaxed flex-1">{c.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services({ go }: { go: (id: string) => void }) {
  const services = [
    { icon: <Briefcase size={18} />, title: "Societário", featured: false, badge: null,
      text: "Abertura, alteração, regularização e encerramento de empresas, com orientação para escolher o melhor caminho jurídico e operacional." },
    { icon: <Users size={18} />, title: "Departamento pessoal", featured: false, badge: null,
      text: "Gestão de admissões, folha de pagamento, férias, rescisões, encargos e obrigações trabalhistas." },
    { icon: <Calculator size={18} />, title: "Contabilidade", featured: true, badge: null,
      text: "Rotina contábil completa, demonstrações, obrigações acessórias e acompanhamento para manter sua empresa em conformidade." },
    { icon: <DollarSign size={18} />, title: "BPO financeiro", featured: true, badge: "Gestão estratégica",
      text: "Organização de contas a pagar, contas a receber, fluxo de caixa, conciliações e relatórios para tomada de decisão." },
    { icon: <Shield size={18} />, title: "Tributário", featured: false, badge: "Mais segurança fiscal",
      text: "Apuração de tributos, análise fiscal, orientação tributária e suporte para reduzir riscos e melhorar a previsibilidade." },
    { icon: <FileSpreadsheet size={18} />, title: "Imposto de Renda Pessoa Física", featured: true, badge: null,
      text: "Declaração de IRPF com análise cuidadosa de rendimentos, bens, deduções, investimentos e possíveis pontos de atenção." },
    { icon: <Receipt size={18} />, title: "Carnê-Leão", featured: false, badge: null,
      text: "Apuração mensal para profissionais autônomos, liberais e pessoas físicas que recebem rendimentos sujeitos ao recolhimento obrigatório." },
  ]

  return (
    <section id="servicos" className="bg-[#0D0B08] py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none">
        <img src={leafIcon} alt="" aria-hidden className="w-[520px] h-[520px] opacity-[0.03]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-4 pb-8 border-b border-white/[0.08]">
            <div className="max-w-xl">
              <Label light>Serviços</Label>
              <h2 className="font-display text-[1.9rem] md:text-[2.4rem] lg:text-[2.8rem] font-semibold text-white leading-tight">
                Soluções contábeis completas para cada fase do seu negócio.
              </h2>
            </div>
            <p className="text-white/55 text-[14.5px] leading-relaxed max-w-sm lg:text-right">
              Da abertura da empresa à rotina fiscal, financeira e tributária: suporte completo e personalizado.
            </p>
          </div>
        </FadeIn>

        {services.map((s, i) => (
          <FadeIn key={i} delay={(i % 4) * 0.06}>
            <div className={`group grid grid-cols-[1.5rem_1fr] lg:grid-cols-[1.5rem_1fr_2fr] gap-x-5 lg:gap-x-10 items-start py-7 border-b border-white/[0.07] -mx-8 lg:-mx-12 px-8 lg:px-12 transition-colors duration-200 cursor-default ${
              s.featured
                ? "hover:bg-[#C9941A]/[0.06]"
                : "hover:bg-white/[0.018]"
            }`}>
              {/* Icon */}
              <span className={`mt-0.5 shrink-0 transition-colors duration-200 ${
                s.featured ? "text-[#C9941A]" : "text-[#C9941A]/55 group-hover:text-[#C9941A]"
              }`}>
                {s.icon}
              </span>
              {/* Title + mobile desc */}
              <div>
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h3 className={`font-display text-[17px] lg:text-[19px] font-semibold transition-colors duration-200 ${
                    s.featured ? "text-white group-hover:text-[#C9941A]/90" : "text-white/90 group-hover:text-white"
                  }`}>
                    {s.title}
                  </h3>
                  {s.badge && (
                    <span className="text-[9px] font-bold tracking-[0.13em] uppercase border border-[#C9941A]/40 text-[#C9941A] px-2.5 py-1 rounded-full">
                      {s.badge}
                    </span>
                  )}
                </div>
                <p className="text-white/55 text-[13.5px] leading-relaxed lg:hidden">{s.text}</p>
              </div>
              {/* Desktop desc */}
              <p className="hidden lg:block text-white/55 text-[13.5px] leading-relaxed">{s.text}</p>
            </div>
          </FadeIn>
        ))}

        <FadeIn delay={0.12} className="pt-10 flex justify-center">
          <GoldBtn onClick={() => go("contato")}>
            Quero entender qual serviço é ideal para mim
            <ArrowRight size={14} />
          </GoldBtn>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

function About({ go }: { go: (id: string) => void }) {
  return (
    <section id="sobre" className="bg-[#F7F3EC] py-24 lg:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 pointer-events-none select-none">
        <img src={leafIcon} alt="" aria-hidden className="w-72 h-72 opacity-[0.04]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative">
        <div className="grid lg:grid-cols-[460px_1fr] xl:grid-cols-[500px_1fr] gap-12 xl:gap-20 items-start">

          <FadeIn dir="left">
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-full h-full border border-[#C9941A]/16 rounded-2xl pointer-events-none" />
              <div className="rounded-2xl overflow-hidden bg-[#C9941A]/8">
                <img
                  src={armsImg}
                  alt="Sâmela Oliveira, responsável pela Oliveira Contabilidade, de braços cruzados"
                  className="w-full object-cover rounded-2xl"
                  style={{ aspectRatio: "3/4", objectPosition: "50% 10%" }}
                />
              </div>
              <div className="absolute -bottom-5 left-7 bg-white border border-[#C9941A]/18 px-6 py-4 rounded-xl shadow-[0_8px_28px_rgba(0,0,0,0.09)]">
                <p className="font-display text-[14.5px] font-semibold text-[#0D0B08]">Sâmela Oliveira dos Santos</p>
                <p className="text-[10px] text-[#C9941A] tracking-[0.16em] uppercase mt-1">Oliveira Contabilidade</p>
              </div>
            </div>
          </FadeIn>

          <div className="pt-0 lg:pt-8">
            <FadeIn delay={0.1}>
              <Label>Sobre</Label>
              <h2 className="font-display text-[1.9rem] md:text-[2.3rem] lg:text-[2.6rem] font-semibold text-[#0D0B08] mb-7 leading-tight">
                À frente da Oliveira Contabilidade, Sâmela Oliveira une técnica, clareza e atendimento próximo.
              </h2>
            </FadeIn>
            <FadeIn delay={0.18}>
              <p className="text-[#5C5048] text-[15.5px] leading-relaxed mb-5">
                A Oliveira Contabilidade nasceu com o propósito de tornar a rotina contábil mais simples, segura e estratégica. Com atendimento personalizado, a Sâmela acompanha cada cliente de forma próxima, ajudando empresas e pessoas físicas a manterem suas obrigações em dia e tomarem decisões com mais confiança.
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <blockquote className="border-l-2 border-[#C9941A] pl-5 py-1 my-7">
                <p className="font-display text-[1.2rem] md:text-[1.35rem] italic text-[#3D3028] leading-snug">
                  "Mais do que entregar obrigações: orientar, organizar e trazer clareza."
                </p>
              </blockquote>
            </FadeIn>
            <FadeIn delay={0.32}>
              <p className="text-[#7A6E65] text-[14.5px] leading-relaxed mb-9">
                Mais do que entregar obrigações, a proposta é orientar, organizar e trazer clareza para cada etapa da vida contábil, fiscal e financeira.
              </p>
              <GoldBtn onClick={() => go("contato")}>
                Falar com a Oliveira Contabilidade
                <ArrowRight size={14} />
              </GoldBtn>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    { n: "01", title: "Diagnóstico inicial",
      text: "Entendemos sua realidade, suas necessidades e o momento atual da sua empresa ou vida fiscal." },
    { n: "02", title: "Análise dos documentos",
      text: "Avaliamos informações, pendências, obrigações e oportunidades de melhoria." },
    { n: "03", title: "Plano de ação",
      text: "Você recebe uma orientação clara sobre os próximos passos e soluções mais adequadas." },
    { n: "04", title: "Acompanhamento contínuo",
      text: "A Oliveira Contabilidade acompanha sua rotina com organização, previsibilidade e segurança." },
  ]

  return (
    <section id="como-funciona" className="bg-[#0D0B08] py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <img src={leafIcon} alt="" aria-hidden className="w-[640px] h-[640px] opacity-[0.025]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative">
        <FadeIn className="mb-16">
          <Label light>Processo</Label>
          <h2 className="font-display text-[1.9rem] md:text-[2.4rem] lg:text-[2.8rem] font-semibold text-white leading-tight max-w-lg">
            Como funciona o atendimento
          </h2>
          <p className="text-white/60 text-[16px] mt-4 max-w-md">
            Um processo simples, organizado e pensado para trazer clareza desde o primeiro contato.
          </p>
        </FadeIn>

        <div className="hidden lg:grid grid-cols-4 gap-8 relative">
          <div className="absolute top-[2.4rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#C9941A]/5 via-[#C9941A]/30 to-[#C9941A]/5" />
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.13}>
              <div className="relative">
                <div className="font-display text-[5.5rem] font-bold text-[#C9941A]/[0.06] leading-none select-none pointer-events-none absolute -top-5 -left-2">
                  {s.n}
                </div>
                <div className="relative z-10 w-[4.2rem] h-[4.2rem] rounded-full border-2 border-[#C9941A] flex items-center justify-center bg-[#0D0B08] mb-6">
                  <span className="font-display text-[#C9941A] text-[14px] font-bold">{s.n}</span>
                </div>
                <h3 className="font-display text-[15.5px] font-semibold text-white mb-2.5 leading-snug">{s.title}</h3>
                <p className="text-white/58 text-[13.5px] leading-relaxed">{s.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="lg:hidden flex flex-col gap-9 relative">
          <div className="absolute left-[1.35rem] top-0 bottom-0 w-px bg-gradient-to-b from-[#C9941A]/10 via-[#C9941A]/30 to-[#C9941A]/10" />
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.09}>
              <div className="flex gap-6 items-start">
                <div className="w-[2.7rem] h-[2.7rem] rounded-full border-2 border-[#C9941A] flex items-center justify-center bg-[#0D0B08] shrink-0 relative z-10">
                  <span className="font-display text-[#C9941A] text-[11px] font-bold">{s.n}</span>
                </div>
                <div className="pt-1.5">
                  <h3 className="font-display text-[15.5px] font-semibold text-white mb-2 leading-snug">{s.title}</h3>
                  <p className="text-white/58 text-[13.5px] leading-relaxed">{s.text}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Section (após Como Funciona) ────────────────────────────────────────

function CtaSection({ go }: { go: (id: string) => void }) {
  return (
    <section className="bg-[#100E0A] py-20 lg:py-24 relative overflow-hidden">
      <GoldLine className="absolute top-0 inset-x-0" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <img src={leafIcon} alt="" aria-hidden className="w-[480px] h-[480px] opacity-[0.055]" />
      </div>

      <div className="relative max-w-[860px] mx-auto px-8 lg:px-12 text-center">
        <FadeIn>
          <h2 className="font-display text-[1.9rem] md:text-[2.6rem] lg:text-[3rem] font-semibold text-white mb-5 leading-tight">
            Sua contabilidade não precisa ser complicada.
          </h2>
          <p className="text-white/65 text-[16px] leading-relaxed max-w-xl mx-auto mb-9">
            Tenha uma especialista acompanhando sua rotina contábil, fiscal e financeira com clareza, organização e segurança.
          </p>
          <GoldBtn onClick={() => go("contato")}>
            Solicitar diagnóstico inicial
            <ArrowRight size={14} />
          </GoldBtn>
        </FadeIn>
      </div>
      <GoldLine className="absolute bottom-0 inset-x-0" />
    </section>
  )
}

// ─── Digital Service ──────────────────────────────────────────────────────────

function DigitalService({ go }: { go: (id: string) => void }) {
  return (
    <section className="bg-[#F7F3EC] py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Photo */}
          <FadeIn dir="left" className="relative">
            <div className="rounded-2xl overflow-hidden bg-[#C9941A]/8">
              <img
                src={laptopImg}
                alt="Sâmela Oliveira, responsável pela Oliveira Contabilidade, trabalhando no notebook"
                className="w-full object-cover rounded-2xl"
              />
            </div>
          </FadeIn>

          {/* Text */}
          <div className="pt-6 lg:pt-0">
            <FadeIn delay={0.1}>
              <Label>Atendimento digital</Label>
              <h2 className="font-display text-[1.9rem] md:text-[2.4rem] lg:text-[2.6rem] font-semibold text-[#0D0B08] mb-6 leading-tight">
                Atendimento prático, moderno e próximo de você.
              </h2>
              <p className="text-[#5C5048] text-[15.5px] leading-relaxed mb-9">
                A Oliveira Contabilidade oferece um atendimento organizado e digital, facilitando o envio de documentos, acompanhamento de prazos e comunicação com o cliente.
              </p>
            </FadeIn>

            <div className="flex flex-col gap-0 mb-9 border-t border-[#E8E2D9]">
              {["Documentos organizados", "Prazos acompanhados", "Decisões mais claras"].map((item, i) => (
                <FadeIn key={i} delay={0.1 + i * 0.08}>
                  <div className="flex items-center gap-4 py-4 border-b border-[#E8E2D9]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9941A] shrink-0" />
                    <span className="text-[14px] font-semibold text-[#0D0B08]">{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.36}>
              <p className="text-[#7A6E65] text-[14px] leading-relaxed mb-7">
                Tudo pensado para que você tenha menos preocupação com burocracias e mais foco no que realmente importa.
              </p>
              <GoldBtn onClick={() => go("contato")}>
                Começar atendimento
                <ArrowRight size={14} />
              </GoldBtn>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Differentials ────────────────────────────────────────────────────────────

function Differentials() {
  const items = [
    { icon: <UserCheck size={16} />, title: "Atendimento personalizado",
      text: "Cada cliente recebe uma análise de acordo com sua realidade." },
    { icon: <MessageSquare size={16} />, title: "Clareza na comunicação",
      text: "Explicações objetivas para que você entenda o que está sendo feito." },
    { icon: <Eye size={16} />, title: "Visão estratégica",
      text: "A contabilidade como ferramenta para gestão, segurança e crescimento." },
    { icon: <Settings size={16} />, title: "Organização de processos",
      text: "Rotina estruturada para evitar atrasos, erros e retrabalho." },
    { icon: <Layers size={16} />, title: "Suporte para empresas e pessoas físicas",
      text: "Soluções para diferentes momentos: empresa, carreira, impostos e finanças." },
  ]

  return (
    <section className="bg-[#0D0B08] py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 pointer-events-none select-none">
        <img src={leafIcon} alt="" aria-hidden className="w-72 h-72 opacity-[0.03]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <FadeIn>
          <div className="pb-8 border-b border-white/[0.08] mb-0">
            <Label light>Diferenciais</Label>
            <h2 className="font-display text-[1.9rem] md:text-[2.4rem] lg:text-[2.8rem] font-semibold text-white leading-tight max-w-lg">
              Por que escolher a Oliveira Contabilidade?
            </h2>
          </div>
        </FadeIn>

        {items.map((item, i) => (
          <FadeIn key={i} delay={(i % 4) * 0.07}>
            <div className="group grid grid-cols-[1.5rem_1fr] lg:grid-cols-[1.5rem_1fr_2fr] gap-x-5 lg:gap-x-10 items-start py-7 border-b border-white/[0.07] -mx-8 lg:-mx-12 px-8 lg:px-12 hover:bg-white/[0.02] transition-colors duration-200">
              <span className="text-[#C9941A]/55 group-hover:text-[#C9941A] transition-colors duration-200 mt-0.5 shrink-0">
                {item.icon}
              </span>
              <h3 className="font-display text-white text-[17px] lg:text-[19px] font-semibold group-hover:text-[#C9941A]/85 transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-white/58 text-[13.5px] leading-relaxed hidden lg:block">{item.text}</p>
              <p className="text-white/55 text-[13.5px] leading-relaxed mt-1.5 col-start-2 lg:hidden">{item.text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ({ go }: { go: (id: string) => void }) {
  const faqs = [
    { q: "A Oliveira Contabilidade atende empresas de quais portes?",
      a: "Atende empreendedores, empresas em operação, profissionais autônomos, profissionais liberais e pessoas físicas que precisam de suporte contábil, fiscal, tributário ou financeiro." },
    { q: "Posso trocar de contador?",
      a: "Sim. A transição pode ser feita com análise dos documentos, obrigações e possíveis pendências para garantir mais segurança no processo." },
    { q: "A Oliveira faz Imposto de Renda Pessoa Física?",
      a: "Sim. A declaração é preparada com análise cuidadosa das informações, rendimentos, bens, deduções e pontos de atenção." },
    { q: "O que é BPO financeiro?",
      a: "É a terceirização da rotina financeira, incluindo contas a pagar, contas a receber, fluxo de caixa, conciliações e relatórios." },
    { q: "Vocês fazem Carnê-Leão?",
      a: "Sim. O Carnê-Leão é indicado para pessoas físicas que recebem rendimentos sujeitos à apuração mensal, como autônomos, profissionais liberais e determinados rendimentos do exterior." },
    { q: "Como solicito atendimento?",
      a: "Você pode preencher o formulário do site, enviar um e-mail ou acessar o Instagram da Oliveira Contabilidade." },
  ]

  return (
    <section id="duvidas" className="bg-[#F7F3EC] py-20 lg:py-24">
      <div className="max-w-[820px] mx-auto px-8 lg:px-12">
        <FadeIn className="mb-12">
          <Label>FAQ</Label>
          <h2 className="font-display text-[1.9rem] md:text-[2.4rem] lg:text-[2.8rem] font-semibold text-[#0D0B08] leading-tight">
            Dúvidas frequentes
          </h2>
        </FadeIn>

        <Accordion.Root type="single" collapsible>
          {faqs.map((item, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <Accordion.Item value={`item-${i}`}
                className="border-b border-[#C9941A]/14 data-[state=open]:border-[#C9941A]/30 transition-colors">
                <Accordion.Trigger className="w-full flex items-center justify-between gap-6 py-6 text-left group">
                  <span className="font-display text-[14.5px] font-semibold text-[#0D0B08] group-data-[state=open]:text-[#C9941A] transition-colors leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown size={15} className="text-[#C9941A] shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="pb-6 text-[#5C5048] text-[14px] leading-relaxed">{item.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            </FadeIn>
          ))}
        </Accordion.Root>

        {/* FAQ CTA */}
        <FadeIn delay={0.25} className="mt-12 pt-10 border-t border-[#C9941A]/14 text-center">
          <p className="text-[#5C5048] text-[15px] mb-5">
            Ainda tem dúvidas? Fale com a Oliveira Contabilidade.
          </p>
          <GoldBtn onClick={() => go("contato")}>
            Entrar em contato
            <ArrowRight size={14} />
          </GoldBtn>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", message: "" })

  const field = `w-full bg-white/[0.04] border border-white/[0.12] focus:border-[#C9941A]/55 rounded-xl px-5 py-3.5 text-white placeholder-white/22 text-[14px] outline-none transition-colors duration-200`

  const handlePhoneChange = (value: string) => {
    setForm({ ...form, phone: formatPhone(value) })
  }

  const buildDiagnosisMessage = () => {
    const lines = [
      "Olá, Sâmela! Vim pelo site da Oliveira Contabilidade e gostaria de solicitar um diagnóstico inicial.",
      form.name.trim() && `Nome: ${form.name.trim()}`,
      form.phone.trim() && `Telefone/WhatsApp: ${form.phone.trim()}`,
      form.email.trim() && `E-mail: ${form.email.trim()}`,
      form.type && `Tipo de atendimento: ${atendimentoLabels[form.type] ?? form.type}`,
      form.message.trim() && `Mensagem: ${form.message.trim()}`,
    ]

    return lines.filter(Boolean).join("\n")
  }

  const handleDiagnosisSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.location.href = createWhatsAppHref(buildDiagnosisMessage())
  }

  return (
    <section id="contato" className="bg-[#0D0B08] py-20 lg:py-28 relative overflow-hidden">
      <GoldLine className="absolute top-0 inset-x-0" />
      <div className="absolute right-0 bottom-0 pointer-events-none select-none">
        <img src={leafIcon} alt="" aria-hidden className="w-56 h-56 opacity-[0.04]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <FadeIn className="mb-14">
          <Label light>Contato</Label>
          <h2 className="font-display text-[1.9rem] md:text-[2.4rem] lg:text-[2.8rem] font-semibold text-white leading-tight max-w-xl">
            Vamos organizar sua contabilidade?
          </h2>
          <p className="text-white/60 text-[16px] mt-4 max-w-lg">
            Preencha o formulário e solicite um diagnóstico inicial para entender como a Oliveira Contabilidade pode ajudar você ou sua empresa.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 xl:gap-16 items-start">
          <FadeIn>
            <form className="space-y-5" onSubmit={handleDiagnosisSubmit}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/45 text-[11px] tracking-[0.18em] uppercase mb-2">Nome completo</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={field} placeholder="Seu nome completo" />
                </div>
                <div>
                  <label className="block text-white/45 text-[11px] tracking-[0.18em] uppercase mb-2">E-mail</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={field} placeholder="seu@email.com" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/45 text-[11px] tracking-[0.18em] uppercase mb-2">Telefone / WhatsApp</label>
                  <input type="tel" inputMode="tel" value={form.phone} onChange={e => handlePhoneChange(e.target.value)} className={field} placeholder="(61) 99564-7701" maxLength={15} />
                </div>
                <div>
                  <label className="block text-white/45 text-[11px] tracking-[0.18em] uppercase mb-2">Tipo de atendimento</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={`${field} appearance-none`} style={{ colorScheme: "dark" }}>
                    <option value="" className="bg-[#1c1814]">Selecione uma opção</option>
                    <option value="empresa" className="bg-[#1c1814]">Empresa</option>
                    <option value="pf" className="bg-[#1c1814]">Pessoa física</option>
                    <option value="bpo" className="bg-[#1c1814]">BPO financeiro</option>
                    <option value="irpf" className="bg-[#1c1814]">Imposto de Renda</option>
                    <option value="carne" className="bg-[#1c1814]">Carnê-Leão</option>
                    <option value="outro" className="bg-[#1c1814]">Outro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-white/45 text-[11px] tracking-[0.18em] uppercase mb-2">Mensagem</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} className={`${field} resize-none`} placeholder="Conte um pouco sobre sua necessidade..." />
              </div>
              <GoldBtn className="w-full py-[15px] text-[13.5px]">
                Solicitar diagnóstico inicial
                <ArrowRight size={14} />
              </GoldBtn>
              {/* Trust note */}
              <p className="text-white/35 text-[11.5px] text-center pt-1">
                Suas informações serão usadas apenas para retorno do atendimento.
              </p>
            </form>
          </FadeIn>

          <FadeIn delay={0.14}>
            <div className="bg-white/[0.03] border border-[#C9941A]/16 rounded-2xl p-7">
              <div className="flex items-center gap-4 mb-6">
                <img src={leafIcon} alt="Ícone da Oliveira Contabilidade" className="w-11 h-11" />
                <div>
                  <p className="font-display text-white font-semibold text-[15.5px]">Oliveira Contabilidade</p>
                  <p className="text-white/40 text-[11px] tracking-wide mt-0.5">Consultoria Contábil e Financeira</p>
                </div>
              </div>
              <GoldLine className="mb-6" />
              <div className="space-y-5 mb-7">
                <div>
                  <p className="text-white/38 text-[10px] tracking-[0.2em] uppercase mb-1">Responsável</p>
                  <p className="text-white text-[13.5px] font-medium">Sâmela Oliveira dos Santos</p>
                </div>
                <div>
                  <p className="text-white/38 text-[10px] tracking-[0.2em] uppercase mb-1">E-mail</p>
                  <p className="text-white/68 text-[12.5px] break-all leading-relaxed">
                    oliveirasantosconsultoria1101@gmail.com
                  </p>
                </div>
                <div>
                  <p className="text-white/38 text-[10px] tracking-[0.2em] uppercase mb-1">Instagram</p>
                  <p className="text-[#C9941A] text-[13.5px]">@_oliveira.contabilidade_</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <GhostBtn href={createMailtoHref()} dark className="w-full">
                  <Mail size={13} />
                  Enviar e-mail
                </GhostBtn>
                <GhostBtn href={createWhatsAppHref()} target="_blank" dark className="w-full">
                  <Smartphone size={13} />
                  Contato pelo WhatsApp
                </GhostBtn>
                <GoldBtn href="https://www.instagram.com/_oliveira.contabilidade_/" target="_blank" className="w-full">
                  <Instagram size={13} />
                  Acessar Instagram
                </GoldBtn>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ go }: { go: (id: string) => void }) {
  const nav = [
    ["Início", "inicio"], ["Serviços", "servicos"], ["Sobre", "sobre"],
    ["Como funciona", "como-funciona"], ["Contato", "contato"],
  ]
  return (
    <footer className="bg-[#080706] border-t border-[#C9941A]/12 pt-14 pb-8">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_auto_auto] gap-10 lg:gap-20 mb-10">
          <div>
            <img src={logoImg} alt="Logo Oliveira Contabilidade" className="h-16 sm:h-20 w-auto mb-5" />
            <p className="text-white/32 text-[13px] leading-relaxed max-w-[260px]">
              Consultoria contábil e financeira para empresas e pessoas físicas que buscam clareza, organização e segurança.
            </p>
          </div>
          <div>
            <p className="text-[#C9941A] text-[10px] tracking-[0.24em] uppercase font-bold mb-5">Navegação</p>
            <div className="flex flex-col gap-3">
              {nav.map(([label, id]) => (
                <button key={id} onClick={() => go(id)}
                  className="text-left text-white/38 hover:text-[#C9941A] text-[13px] transition-colors duration-200">
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#C9941A] text-[10px] tracking-[0.24em] uppercase font-bold mb-5">Contato</p>
            <div className="flex flex-col gap-3">
              <p className="text-white/38 text-[13px]">Sâmela Oliveira dos Santos</p>
              <a href={createMailtoHref()}
                className="text-white/38 hover:text-[#C9941A] text-[13px] transition-colors break-all leading-relaxed">
                oliveirasantosconsultoria1101@gmail.com
              </a>
              <a href={createWhatsAppHref()} target="_blank" rel="noopener noreferrer"
                className="text-white/38 hover:text-[#C9941A] text-[13px] transition-colors flex items-center gap-2">
                <Smartphone size={12} />
                {WHATSAPP_DISPLAY}
              </a>
              <a href="https://www.instagram.com/_oliveira.contabilidade_/" target="_blank" rel="noopener noreferrer"
                className="text-white/38 hover:text-[#C9941A] text-[13px] transition-colors flex items-center gap-2">
                <Instagram size={12} />
                @_oliveira.contabilidade_
              </a>
            </div>
          </div>
        </div>

        <GoldLine className="mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-[11px]">© Oliveira Contabilidade. Todos os direitos reservados.</p>
          <img src={leafIcon} alt="" aria-hidden className="w-5 h-5 opacity-18" />
        </div>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <div className="font-sans overflow-x-hidden">
      <Header go={go} />
      <Hero go={go} />
      <TrustStrip />
      <ForWhom go={go} />
      <Services go={go} />
      <About go={go} />
      <HowItWorks />
      <CtaSection go={go} />
      <DigitalService go={go} />
      <Differentials />
      <FAQ go={go} />
      <Contact />
      <Footer go={go} />
    </div>
  )
}
