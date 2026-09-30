import { ArrowLeft } from "lucide-react"
import { Header, Footer } from "./App"

export default function NotFound() {
  return (
    <div className="font-sans bg-[#F7F3EC] min-h-screen">
      <Header />
      <main className="pt-[5.25rem] min-h-[70vh] flex items-center">
        <div className="max-w-[900px] mx-auto px-8 lg:px-12 py-24 text-center">
          <p className="text-[#C9941A] text-[11px] tracking-[0.25em] uppercase font-bold mb-5">Erro 404</p>
          <h1 className="font-display text-[2.5rem] md:text-[3.5rem] font-semibold text-[#0D0B08] mb-5">Esta página não foi encontrada.</h1>
          <p className="text-[#6B5E54] text-[16px] leading-relaxed mb-8">O endereço pode ter mudado ou não existir. Volte para a página inicial para continuar navegando.</p>
          <a href="/" className="inline-flex items-center gap-2 bg-[#C9941A] text-[#0D0B08] font-semibold text-[13px] px-7 py-3.5 hover:bg-[#B8841A] transition-colors"><ArrowLeft size={14} /> Voltar ao início</a>
        </div>
      </main>
      <Footer />
    </div>
  )
}
