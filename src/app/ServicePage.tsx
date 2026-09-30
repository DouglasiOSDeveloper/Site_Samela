import { ArrowRight, Check, ChevronRight, MessageSquare } from "lucide-react"
import { Header, Footer } from "./App"
import { ServiceSeo } from "./seo/Seo"
import { servicePagesBySlug, type ServicePageData } from "./seo/servicePages"
import { contentPages } from "./seo/contentPages"
import leafIcon from "../imports/image-3.webp"

function RelatedServices({ page }: { page: ServicePageData }) {
  const related = page.related.map((slug) => servicePagesBySlug[slug]).filter(Boolean)
  return (
    <section className="bg-[#F7F3EC] py-20 lg:py-24 border-t border-[#C9941A]/10">
      <div className="max-w-[1180px] mx-auto px-8 lg:px-12">
        <p className="text-[#C9941A] text-[10px] tracking-[0.24em] uppercase font-bold mb-4">Serviços relacionados</p>
        <h2 className="font-display text-[1.8rem] md:text-[2.3rem] font-semibold text-[#0D0B08] mb-9">Continue explorando soluções para sua rotina.</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {related.map((item) => (
            <a key={item.slug} href={`/${item.slug}/`}
              className="group bg-white border border-[#E5DED4] rounded-2xl p-6 hover:border-[#C9941A]/50 hover:-translate-y-1 transition-all duration-200">
              <p className="font-display text-[18px] font-semibold text-[#0D0B08] mb-2 group-hover:text-[#A87618] transition-colors">{item.name}</p>
              <p className="text-[#6B5E54] text-[13.5px] leading-relaxed mb-5">{item.metaDescription}</p>
              <span className="inline-flex items-center gap-2 text-[#A87618] text-[12px] font-semibold tracking-wide">Saiba mais <ChevronRight size={14} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function RelatedContent({ page }: { page: ServicePageData }) {
  const articles = contentPages.filter((article) => article.relatedServices.includes(page.slug)).slice(0, 3)
  if (!articles.length) return null

  return (
    <section className="bg-white py-20 lg:py-24 border-t border-[#E8E2D9]">
      <div className="max-w-[1180px] mx-auto px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
          <div>
            <p className="text-[#C9941A] text-[10px] tracking-[0.24em] uppercase font-bold mb-4">Conteúdos relacionados</p>
            <h2 className="font-display text-[1.8rem] md:text-[2.2rem] font-semibold text-[#0D0B08]">Aprofunde dúvidas antes do atendimento.</h2>
          </div>
          <a href="/conteudos/" className="text-[#A87618] text-[12.5px] font-semibold">Ver todos os conteúdos</a>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {articles.map((article) => (
            <a key={article.slug} href={`/conteudos/${article.slug}/`} className="group bg-[#F7F3EC] border border-[#E8E2D9] rounded-2xl p-6 hover:border-[#C9941A]/45 transition-colors">
              <p className="text-[#A87618] text-[10px] tracking-[0.2em] uppercase font-bold mb-3">{article.eyebrow}</p>
              <h3 className="font-display text-[18px] font-semibold text-[#0D0B08] leading-snug mb-3 group-hover:text-[#A87618] transition-colors">{article.title}</h3>
              <p className="text-[#6B5E54] text-[13px] leading-relaxed">{article.metaDescription}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ServicePage({ page }: { page: ServicePageData }) {
  return (
    <div className="font-sans overflow-x-hidden bg-[#F7F3EC]">
      <ServiceSeo page={page} />
      <Header />
      <main className="pt-[5.25rem]">
        <section className="relative overflow-hidden bg-[#F7F3EC] border-b border-[#C9941A]/10">
          <img src={leafIcon} alt="" aria-hidden width={1024} height={1024} decoding="async" className="absolute -right-20 -bottom-28 w-[420px] opacity-[0.035] pointer-events-none" />
          <div className="max-w-[1180px] mx-auto px-8 lg:px-12 py-16 md:py-20 lg:py-24 relative">
            <nav aria-label="Navegação estrutural" className="flex items-center flex-wrap gap-2 text-[12px] text-[#7A6E65] mb-9">
              <a href="/" className="hover:text-[#C9941A] transition-colors">Início</a>
              <ChevronRight size={12} aria-hidden />
              <a href="/#servicos" className="hover:text-[#C9941A] transition-colors">Serviços</a>
              <ChevronRight size={12} aria-hidden />
              <span aria-current="page" className="text-[#3D3028]">{page.name}</span>
            </nav>

            <div className="grid lg:grid-cols-[1.3fr_.7fr] gap-12 lg:gap-20 items-start">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-6 h-px bg-[#C9941A]" />
                  <span className="text-[#C9941A] text-[10px] tracking-[0.25em] uppercase font-bold">{page.eyebrow}</span>
                </div>
                <h1 className="font-display text-[2.35rem] md:text-[3rem] lg:text-[3.55rem] leading-[1.06] font-semibold text-[#0D0B08] mb-6">{page.h1}</h1>
                <p className="text-[#5C5048] text-[17px] md:text-[18px] leading-relaxed max-w-[760px] mb-8">{page.lead}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="/#contato" className="inline-flex items-center justify-center gap-2.5 bg-[#C9941A] text-[#0D0B08] font-semibold text-[13px] tracking-[0.05em] px-7 py-[14px] hover:bg-[#B8841A] transition-colors">
                    Solicitar diagnóstico <ArrowRight size={14} />
                  </a>
                  <a href="/#servicos" className="inline-flex items-center justify-center gap-2.5 border border-[#3D3028]/25 text-[#3D3028] font-medium text-[13px] tracking-[0.05em] px-7 py-[14px] hover:border-[#C9941A] hover:text-[#A87618] transition-colors">Ver todos os serviços</a>
                </div>
              </div>

              <aside className="bg-[#0D0B08] rounded-2xl p-7 md:p-8 border border-[#C9941A]/15">
                <p className="text-[#C9941A] text-[10px] tracking-[0.22em] uppercase font-bold mb-4">Visão geral</p>
                <p className="text-white/70 text-[14.5px] leading-relaxed mb-7">{page.summary}</p>
                <div className="space-y-4">
                  {page.highlights.map((item) => (
                    <div key={item} className="flex gap-3 items-start">
                      <span className="mt-0.5 w-5 h-5 rounded-full border border-[#C9941A]/40 flex items-center justify-center shrink-0"><Check size={11} className="text-[#C9941A]" /></span>
                      <span className="text-white/75 text-[13px] leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-7 pt-6 border-t border-white/[0.09]">
                  <p className="text-[#C9941A] text-[9px] tracking-[0.2em] uppercase font-bold mb-3">Indicado para</p>
                  <ul className="space-y-2" aria-label={`Públicos atendidos em ${page.name}`}>
                    {page.audience.map((item) => (
                      <li key={item} className="text-white/58 text-[12.5px] leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-[1000px] mx-auto px-8 lg:px-12">
            {page.sections.map((section, index) => (
              <article key={section.title} className={`${index ? "pt-14 mt-14 border-t border-[#E8E2D9]" : ""}`}>
                <p className="text-[#C9941A] text-[10px] tracking-[0.23em] uppercase font-bold mb-4">0{index + 1}</p>
                <h2 className="font-display text-[1.8rem] md:text-[2.25rem] font-semibold text-[#0D0B08] leading-tight mb-5">{section.title}</h2>
                <div className="space-y-4 mb-7">
                  {section.paragraphs.map((paragraph) => <p key={paragraph} className="text-[#5C5048] text-[15.5px] leading-[1.8]">{paragraph}</p>)}
                </div>
                <ul className="grid sm:grid-cols-2 gap-3" aria-label={`Pontos principais de ${section.title}`}>
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 bg-[#F7F3EC] border border-[#ECE5DC] rounded-xl px-4 py-3 text-[#4E433C] text-[13.5px] leading-relaxed">
                      <Check size={14} className="text-[#C9941A] mt-0.5 shrink-0" /> {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            <aside className="pt-14 mt-14 border-t border-[#E8E2D9]" aria-labelledby="temas-relacionados">
              <p className="text-[#C9941A] text-[10px] tracking-[0.23em] uppercase font-bold mb-4">Demandas relacionadas</p>
              <h2 id="temas-relacionados" className="font-display text-[1.65rem] md:text-[2rem] font-semibold text-[#0D0B08] leading-tight mb-4">
                Temas que costumam aparecer neste atendimento.
              </h2>
              <p className="text-[#6B5E54] text-[14.5px] leading-relaxed mb-6 max-w-3xl">
                O escopo é definido conforme a realidade de cada cliente, mas estas são algumas necessidades frequentemente relacionadas ao serviço.
              </p>
              <ul className="flex flex-wrap gap-2.5" aria-label={`Temas relacionados a ${page.name}`}>
                {page.relatedTopics.map((topic) => (
                  <li key={topic} className="bg-[#F7F3EC] border border-[#E8E2D9] rounded-full px-4 py-2 text-[#4E433C] text-[12.5px] leading-none">
                    {topic}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="bg-[#0D0B08] py-20 lg:py-24 relative overflow-hidden">
          <img src={leafIcon} alt="" aria-hidden width={1024} height={1024} loading="lazy" decoding="async" className="absolute right-0 top-0 w-72 opacity-[0.025] pointer-events-none" />
          <div className="max-w-[1000px] mx-auto px-8 lg:px-12 relative">
            <div className="flex items-center gap-3 mb-5"><div className="w-6 h-px bg-[#C9941A]" /><span className="text-[#C9941A] text-[10px] tracking-[0.24em] uppercase font-bold">Dúvidas frequentes</span></div>
            <h2 className="font-display text-[1.9rem] md:text-[2.4rem] font-semibold text-white mb-9">Perguntas sobre {page.name}.</h2>
            <div className="divide-y divide-white/[0.09] border-y border-white/[0.09]">
              {page.faqs.map((faq) => (
                <details key={faq.q} className="group py-5">
                  <summary className="list-none cursor-pointer flex justify-between gap-6 text-white/90 font-display text-[16px] font-semibold">
                    {faq.q}<span className="text-[#C9941A] font-sans text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-white/60 text-[14px] leading-relaxed pt-4 pr-10">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <RelatedServices page={page} />
        <RelatedContent page={page} />

        <section className="bg-[#C9941A] py-14 lg:py-16">
          <div className="max-w-[1000px] mx-auto px-8 lg:px-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">
            <div>
              <p className="text-[#0D0B08]/60 text-[10px] tracking-[0.22em] uppercase font-bold mb-2">Próximo passo</p>
              <h2 className="font-display text-[1.8rem] md:text-[2.2rem] font-semibold text-[#0D0B08]">Converse sobre sua necessidade com a Oliveira Contabilidade.</h2>
            </div>
            <a href="/#contato" className="shrink-0 inline-flex items-center justify-center gap-2.5 bg-[#0D0B08] text-white font-semibold text-[13px] tracking-[0.05em] px-7 py-[14px] hover:bg-[#211B17] transition-colors">
              Solicitar atendimento <MessageSquare size={14} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
