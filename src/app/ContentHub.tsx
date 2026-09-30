import { ArrowRight, ChevronRight, Clock } from "lucide-react"
import { Header, Footer } from "./App"
import { contentPages } from "./seo/contentPages"
import leafIcon from "../imports/image-3.webp"
import { useEffect } from "react"

const SITE_URL = "https://oliveiracontabilconsultiva.com.br"

function HubSeo() {
  useEffect(() => {
    const title = "Conteúdos sobre Contabilidade, BPO e Impostos | Oliveira Contabilidade"
    const description = "Guias sobre contabilidade, BPO financeiro, Carnê-Leão, IRPF, abertura de empresa e organização financeira para empresas, autônomos e profissionais liberais."
    document.title = title
    document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", description)
    document.head.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute("content", title)
    document.head.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute("content", description)
    document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute("content", `${SITE_URL}/conteudos/`)
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", `${SITE_URL}/conteudos/`)
    document.head.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="pt-BR"]')?.setAttribute("href", `${SITE_URL}/conteudos/`)
    const script = document.head.querySelector<HTMLScriptElement>("#structured-data")
    if (script) script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Oliveira Contabilidade", url: `${SITE_URL}/`, logo: `${SITE_URL}/logo-oliveira-cropped.png` },
        { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: "Oliveira Contabilidade", inLanguage: "pt-BR", publisher: { "@id": `${SITE_URL}/#organization` } },
        { "@type": "CollectionPage", "@id": `${SITE_URL}/conteudos/#webpage`, url: `${SITE_URL}/conteudos/`, name: title, description, inLanguage: "pt-BR", isPartOf: { "@id": `${SITE_URL}/#website` }, mainEntity: { "@type": "ItemList", itemListElement: contentPages.map((page, index) => ({ "@type": "ListItem", position: index + 1, url: `${SITE_URL}/conteudos/${page.slug}/`, name: page.title })) } },
      ],
    })
  }, [])
  return null
}

export default function ContentHub() {
  return (
    <div className="font-sans overflow-x-hidden bg-[#F7F3EC]">
      <HubSeo />
      <Header />
      <main className="pt-[5.25rem]">
        <section className="relative overflow-hidden border-b border-[#C9941A]/10">
          <img src={leafIcon} alt="" aria-hidden width={1024} height={1024} className="absolute -right-24 -bottom-32 w-[440px] opacity-[0.035] pointer-events-none" />
          <div className="max-w-[1180px] mx-auto px-8 lg:px-12 py-16 md:py-20 lg:py-24 relative">
            <nav aria-label="Navegação estrutural" className="flex items-center gap-2 text-[12px] text-[#7A6E65] mb-9"><a href="/" className="hover:text-[#C9941A]">Início</a><ChevronRight size={12} /><span aria-current="page" className="text-[#3D3028]">Conteúdos</span></nav>
            <div className="flex items-center gap-3 mb-5"><div className="w-6 h-px bg-[#C9941A]" /><span className="text-[#C9941A] text-[10px] tracking-[0.25em] uppercase font-bold">Conteúdo informativo</span></div>
            <h1 className="font-display text-[2.5rem] md:text-[3.2rem] lg:text-[3.7rem] leading-[1.05] font-semibold text-[#0D0B08] mb-6 max-w-[850px]">Guias para entender melhor sua rotina contábil, fiscal e financeira.</h1>
            <p className="text-[#5C5048] text-[17px] leading-relaxed max-w-[760px]">Conteúdos produzidos para responder dúvidas comuns de empresas, autônomos e profissionais liberais e ajudar você a chegar mais preparado para uma análise individual.</p>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-24">
          <div className="max-w-[1180px] mx-auto px-8 lg:px-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {contentPages.map((page) => (
                <article key={page.slug} className="group bg-[#F7F3EC] border border-[#E8E2D9] rounded-2xl p-6 flex flex-col">
                  <p className="text-[#A87618] text-[10px] tracking-[0.2em] uppercase font-bold mb-3">{page.eyebrow}</p>
                  <h2 className="font-display text-[20px] font-semibold text-[#0D0B08] leading-snug mb-3 group-hover:text-[#A87618] transition-colors"><a href={`/conteudos/${page.slug}/`}>{page.title}</a></h2>
                  <p className="text-[#6B5E54] text-[13.5px] leading-relaxed mb-5 flex-1">{page.metaDescription}</p>
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#E4DCD2]"><span className="inline-flex items-center gap-1.5 text-[#8A7B70] text-[11.5px]"><Clock size={12} />{page.readingTime}</span><a href={`/conteudos/${page.slug}/`} className="inline-flex items-center gap-1.5 text-[#A87618] text-[12px] font-semibold">Ler <ArrowRight size={12} /></a></div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
