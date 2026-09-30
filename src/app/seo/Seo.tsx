import { useEffect } from "react"
import type { ServicePageData } from "./servicePages"

const SITE_URL = "https://oliveiracontabilconsultiva.com.br"
const OG_IMAGE = `${SITE_URL}/og-image.png`

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement("meta")
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute("content", content)
}

export function ServiceSeo({ page }: { page: ServicePageData }) {
  useEffect(() => {
    const url = `${SITE_URL}/${page.slug}/`
    document.title = page.metaTitle

    setMeta('meta[name="description"]', "name", "description", page.metaDescription)
    setMeta('meta[name="robots"]', "name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1")
    setMeta('meta[property="og:type"]', "property", "og:type", "website")
    setMeta('meta[property="og:title"]', "property", "og:title", page.metaTitle)
    setMeta('meta[property="og:description"]', "property", "og:description", page.metaDescription)
    setMeta('meta[property="og:url"]', "property", "og:url", url)
    setMeta('meta[property="og:image"]', "property", "og:image", OG_IMAGE)
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image")
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", page.metaTitle)
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", page.metaDescription)
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", OG_IMAGE)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.rel = "canonical"
      document.head.appendChild(canonical)
    }
    canonical.href = url

    let hreflang = document.head.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="pt-BR"]')
    if (!hreflang) {
      hreflang = document.createElement("link")
      hreflang.rel = "alternate"
      hreflang.hreflang = "pt-BR"
      document.head.appendChild(hreflang)
    }
    hreflang.href = url

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "Oliveira Contabilidade",
          url: `${SITE_URL}/`,
          logo: `${SITE_URL}/logo-oliveira-cropped.png`,
          image: OG_IMAGE,
          email: "oliveirasantosconsultoria1101@gmail.com",
          telephone: "+55 61 99564-7701",
          founder: { "@id": `${SITE_URL}/#samela-oliveira` },
          contactPoint: [{
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: "+55 61 99564-7701",
            email: "oliveirasantosconsultoria1101@gmail.com",
            availableLanguage: ["pt-BR", "Portuguese"],
          }],
          knowsAbout: [
            "contabilidade empresarial", "serviços contábeis", "BPO financeiro",
            "departamento pessoal", "consultoria tributária", "abertura de empresa",
            "Imposto de Renda Pessoa Física", "Carnê-Leão", "profissionais liberais",
          ],
          sameAs: ["https://www.instagram.com/_oliveira.contabilidade_/"],
        },
        {
          "@type": "Person",
          "@id": `${SITE_URL}/#samela-oliveira`,
          name: "Sâmela Oliveira dos Santos",
          jobTitle: "Contadora",
          worksFor: { "@id": `${SITE_URL}/#organization` },
          knowsAbout: page.relatedTopics,
          sameAs: ["https://www.instagram.com/_oliveira.contabilidade_/"],
        },
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: "Oliveira Contabilidade",
          inLanguage: "pt-BR",
          publisher: { "@id": `${SITE_URL}/#organization` },
        },
        {
          "@type": "Service",
          "@id": `${url}#service`,
          name: page.name,
          description: page.metaDescription,
          url,
          provider: { "@id": `${SITE_URL}/#organization` },
          serviceType: page.name,
          category: page.relatedTopics,
          audience: page.audience.map((audienceType) => ({
            "@type": "Audience",
            audienceType,
          })),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Serviços", item: `${SITE_URL}/#servicos` },
            { "@type": "ListItem", position: 3, name: page.name, item: url },
          ],
        },
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: page.metaTitle,
          description: page.metaDescription,
          inLanguage: "pt-BR",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${url}#service` },
          mainEntity: { "@id": `${url}#service` },
          breadcrumb: { "@id": `${url}#breadcrumb` },
          primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
        },
      ],
    }

    let script = document.head.querySelector<HTMLScriptElement>("#structured-data")
    if (!script) {
      script = document.createElement("script")
      script.type = "application/ld+json"
      script.id = "structured-data"
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(jsonLd)
  }, [page])

  return null
}
