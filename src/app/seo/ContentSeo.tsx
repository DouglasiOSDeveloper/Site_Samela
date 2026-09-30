import { useEffect } from "react"
import type { ContentPageData } from "./contentPages"

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

export function ContentSeo({ page }: { page: ContentPageData }) {
  useEffect(() => {
    const url = `${SITE_URL}/conteudos/${page.slug}/`
    document.title = page.metaTitle

    setMeta('meta[name="description"]', "name", "description", page.metaDescription)
    setMeta('meta[name="robots"]', "name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1")
    setMeta('meta[property="og:type"]', "property", "og:type", "article")
    setMeta('meta[property="og:title"]', "property", "og:title", page.metaTitle)
    setMeta('meta[property="og:description"]', "property", "og:description", page.metaDescription)
    setMeta('meta[property="og:url"]', "property", "og:url", url)
    setMeta('meta[property="og:image"]', "property", "og:image", OG_IMAGE)
    setMeta('meta[property="article:published_time"]', "property", "article:published_time", page.datePublished)
    setMeta('meta[property="article:modified_time"]', "property", "article:modified_time", page.dateModified)
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
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Conteúdos", item: `${SITE_URL}/conteudos/` },
            { "@type": "ListItem", position: 3, name: page.title, item: url },
          ],
        },
        {
          "@type": "BlogPosting",
          "@id": `${url}#article`,
          headline: page.title,
          description: page.metaDescription,
          image: [OG_IMAGE],
          datePublished: page.datePublished,
          dateModified: page.dateModified,
          inLanguage: "pt-BR",
          articleSection: page.eyebrow,
          keywords: page.topics.join(", "),
          author: { "@id": `${SITE_URL}/#organization` },
          publisher: { "@id": `${SITE_URL}/#organization` },
          mainEntityOfPage: { "@id": `${url}#webpage` },
        },
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: page.metaTitle,
          description: page.metaDescription,
          inLanguage: "pt-BR",
          isPartOf: { "@id": `${SITE_URL}/#website` },
          breadcrumb: { "@id": `${url}#breadcrumb` },
          mainEntity: { "@id": `${url}#article` },
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
