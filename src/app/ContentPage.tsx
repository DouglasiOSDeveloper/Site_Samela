import { ArrowRight, Check, ChevronRight, Clock, ExternalLink } from "lucide-react"
import { Header, Footer } from "./App"
import { ContentSeo } from "./seo/ContentSeo"
import { contentPagesBySlug, type ContentPageData } from "./seo/contentPages"
import { servicePagesBySlug } from "./seo/servicePages"
import leafIcon from "../imports/image-3.webp"

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(`${value}T12:00:00`))
}

export default function ContentPage({ page }: { page: ContentPageData }) {
  const relatedServices = page.relatedServices.map((slug) => servicePagesBySlug[slug]).filter(Boolean)
  const relatedArticles = page.relatedArticles.map((slug) => contentPagesBySlug[slug]).filter(Boolean)

  return (
    <div className="font-sans overflow-x-hidden bg-[#F7F3EC]">
      <ContentSeo page={page} />
      <Header />
      <main className="pt-[5.25rem]">
        <article>
          <header className="relative overflow-hidden bg-[#F7F3EC] border-b border-[#C9941A]/10">
            <img src={leafIcon} alt="" aria-hidden width={1024} height={1024} decoding="async" className="absolute -right-20 -bottom-28 w-[420px] opacity-[0.035] pointer-events-none" />
            <div className="max-w-[1000px] mx-auto px-8 lg:px-12 py-16 md:py-20 lg:py-24 relative">
              <nav aria-label="Navegação estrutural" className="flex items-center flex-wrap gap-2 text-[12px] text-[#7A6E65] mb-9">
                <a href="/" className="hover:text-[#C9941A] transition-colors">Início</a><ChevronRight size={12} aria-hidden />
                <a href="/conteudos/" className="hover:text-[#C9941A] transition-colors">Conteúdos</a><ChevronRight size={12} aria-hidden />
                <span aria-current="page" className="text-[#3D3028]">{page.title}</span>
              </nav>
              <div className="flex items-center gap-3 mb-5"><div className="w-6 h-px bg-[#C9941A]" /><span className="text-[#C9941A] text-[10px] tracking-[0.25em] uppercase font-bold">{page.eyebrow}</span></div>
              <h1 className="font-display text-[2.35rem] md:text-[3rem] lg:text-[3.55rem] leading-[1.06] font-semibold text-[#0D0B08] mb-6 max-w-[900px]">{page.title}</h1>
              <p className="text-[#5C5048] text-[17px] md:text-[18px] leading-relaxed max-w-[820px] mb-6">{page.intro}</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[#7A6E65] text-[12px]">
                <span>Oliveira Contabilidade</span><span aria-hidden>•</span><span>Atualizado em {formatDate(page.dateModified)}</span><span aria-hidden>•</span><span className="inline-flex items-center gap-1.5"><Clock size={13} /> {page.readingTime} de leitura</span>
              </div>
            </div>
          </header>

          <section className="bg-white py-20 lg:py-24">
            <div className="max-w-[900px] mx-auto px-8 lg:px-12">
              {page.sections.map((section, index) => (
                <section key={section.title} className={`${index ? "pt-14 mt-14 border-t border-[#E8E2D9]" : ""}`}>
                  <p className="text-[#C9941A] text-[10px] tracking-[0.23em] uppercase font-bold mb-4">0{index + 1}</p>
                  <h2 className="font-display text-[1.8rem] md:text-[2.25rem] font-semibold text-[#0D0B08] leading-tight mb-5">{section.title}</h2>
                  <div className="space-y-4 mb-7">
                    {section.paragraphs.map((paragraph) => <p key={paragraph} className="text-[#5C5048] text-[15.5px] leading-[1.85]">{paragraph}</p>)}
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {section.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-3 bg-[#F7F3EC] border border-[#ECE5DC] rounded-xl px-4 py-3 text-[#4E433C] text-[13.5px] leading-relaxed"><Check size={14} className="text-[#C9941A] mt-0.5 shrink-0" /> {bullet}</li>)}
                  </ul>
                </section>
              ))}

              {page.sources.length > 0 && (
                <aside className="pt-12 mt-14 border-t border-[#E8E2D9]" aria-labelledby="fontes-oficiais">
                  <p className="text-[#C9941A] text-[10px] tracking-[0.23em] uppercase font-bold mb-3">Referências</p>
                  <h2 id="fontes-oficiais" className="font-display text-[1.55rem] font-semibold text-[#0D0B08] mb-5">Fontes oficiais para consulta</h2>
                  <ul className="space-y-3">
                    {page.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#6B5E54] hover:text-[#A87618] text-[13.5px] transition-colors">{source.label}<ExternalLink size={13} /></a></li>)}
                  </ul>
                </aside>
              )}

              <div className="mt-14 rounded-2xl bg-[#F7F3EC] border border-[#E8E2D9] p-6 md:p-7">
                <p className="text-[#6B5E54] text-[12.5px] leading-relaxed">Conteúdo informativo. Regras tributárias, fiscais e societárias podem mudar e a aplicação depende da situação de cada pessoa ou empresa. Para decisões específicas, faça uma análise individualizada.</p>
              </div>
            </div>
          </section>

          <section className="bg-[#0D0B08] py-20 lg:py-20">
            <div className="max-w-[1100px] mx-auto px-8 lg:px-12">
              <p className="text-[#C9941A] text-[10px] tracking-[0.24em] uppercase font-bold mb-4">Serviços relacionados</p>
              <h2 className="font-display text-[1.8rem] md:text-[2.2rem] font-semibold text-white mb-8">Encontre suporte para colocar essas informações em prática.</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedServices.map((service) => <a key={service.slug} href={`/${service.slug}/`} className="group border border-white/[0.1] rounded-xl p-5 hover:border-[#C9941A]/45 transition-colors"><h3 className="font-display text-white text-[17px] font-semibold mb-2 group-hover:text-[#C9941A] transition-colors">{service.name}</h3><p className="text-white/55 text-[12.5px] leading-relaxed">{service.metaDescription}</p></a>)}
              </div>
            </div>
          </section>

          {relatedArticles.length > 0 && (
            <section className="bg-[#F7F3EC] py-20 lg:py-20">
              <div className="max-w-[1100px] mx-auto px-8 lg:px-12">
                <p className="text-[#C9941A] text-[10px] tracking-[0.24em] uppercase font-bold mb-4">Continue lendo</p>
                <div className="grid md:grid-cols-2 gap-5">
                  {relatedArticles.map((article) => <a key={article.slug} href={`/conteudos/${article.slug}/`} className="group bg-white border border-[#E5DED4] rounded-2xl p-6 hover:border-[#C9941A]/50 transition-colors"><p className="text-[#A87618] text-[10px] tracking-[0.2em] uppercase font-bold mb-3">{article.eyebrow}</p><h2 className="font-display text-[19px] font-semibold text-[#0D0B08] mb-3 group-hover:text-[#A87618] transition-colors">{article.title}</h2><p className="text-[#6B5E54] text-[13px] leading-relaxed mb-4">{article.metaDescription}</p><span className="inline-flex items-center gap-2 text-[#A87618] text-[12px] font-semibold">Ler conteúdo <ArrowRight size={13} /></span></a>)}
                </div>
              </div>
            </section>
          )}

          <section className="bg-[#C9941A] py-14 lg:py-16">
            <div className="max-w-[1000px] mx-auto px-8 lg:px-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7"><div><p className="text-[#0D0B08]/60 text-[10px] tracking-[0.22em] uppercase font-bold mb-2">Atendimento</p><h2 className="font-display text-[1.8rem] md:text-[2.2rem] font-semibold text-[#0D0B08]">Precisa analisar sua situação de forma individual?</h2></div><a href="/#contato" className="shrink-0 inline-flex items-center justify-center gap-2.5 bg-[#0D0B08] text-white font-semibold text-[13px] tracking-[0.05em] px-7 py-[14px] hover:bg-[#211B17] transition-colors">Solicitar diagnóstico <ArrowRight size={14} /></a></div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  )
}
