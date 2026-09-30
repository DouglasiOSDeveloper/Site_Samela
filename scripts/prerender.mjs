import { readFile, writeFile, mkdir } from "node:fs/promises"
import path from "node:path"

const ROOT = process.cwd()
const DIST = path.join(ROOT, "dist")
const SITE_URL = "https://oliveiracontabilconsultiva.com.br"
const servicePages = JSON.parse(await readFile(path.join(ROOT, "src/app/seo/service-pages.json"), "utf8"))
const contentPages = JSON.parse(await readFile(path.join(ROOT, "src/app/seo/content-pages.json"), "utf8"))
const servicesBySlug = Object.fromEntries(servicePages.map((page) => [page.slug, page]))
const contentBySlug = Object.fromEntries(contentPages.map((page) => [page.slug, page]))
const baseHtml = await readFile(path.join(DIST, "index.html"), "utf8")

const escapeHtml = (value = "") => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;")

function replaceMeta(html, selector, content) {
  const patterns = {
    description: /<meta\s+name="description"[^>]*>/i,
    robots: /<meta\s+name="robots"[^>]*>/i,
    ogType: /<meta\s+property="og:type"[^>]*>/i,
    ogTitle: /<meta\s+property="og:title"[^>]*>/i,
    ogDescription: /<meta\s+property="og:description"[^>]*>/i,
    ogUrl: /<meta\s+property="og:url"[^>]*>/i,
    twitterTitle: /<meta\s+name="twitter:title"[^>]*>/i,
    twitterDescription: /<meta\s+name="twitter:description"[^>]*>/i,
  }
  const tags = {
    description: `<meta name="description" content="${escapeHtml(content)}" />`,
    robots: `<meta name="robots" content="${escapeHtml(content)}" />`,
    ogType: `<meta property="og:type" content="${escapeHtml(content)}" />`,
    ogTitle: `<meta property="og:title" content="${escapeHtml(content)}" />`,
    ogDescription: `<meta property="og:description" content="${escapeHtml(content)}" />`,
    ogUrl: `<meta property="og:url" content="${escapeHtml(content)}" />`,
    twitterTitle: `<meta name="twitter:title" content="${escapeHtml(content)}" />`,
    twitterDescription: `<meta name="twitter:description" content="${escapeHtml(content)}" />`,
  }
  return html.replace(patterns[selector], tags[selector])
}

function setCanonical(html, url) {
  html = html.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${url}" />`)
  return html.replace(/<link\s+rel="alternate"\s+hreflang="pt-BR"[^>]*>/i, `<link rel="alternate" hreflang="pt-BR" href="${url}" />`)
}

function setStructuredData(html, data) {
  return html.replace(/<script\s+id="structured-data"\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script id="structured-data" type="application/ld+json">${JSON.stringify(data)}</script>`)
}

function serviceStructuredData(page, url) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Oliveira Contabilidade", url: `${SITE_URL}/`,
        logo: `${SITE_URL}/logo-oliveira-cropped.png`, image: `${SITE_URL}/og-image.png`,
        email: "oliveirasantosconsultoria1101@gmail.com", telephone: "+55 61 99564-7701",
        founder: { "@id": `${SITE_URL}/#samela-oliveira` },
        sameAs: ["https://www.instagram.com/_oliveira.contabilidade_/"],
      },
      {
        "@type": "Person", "@id": `${SITE_URL}/#samela-oliveira`, name: "Sâmela Oliveira dos Santos", jobTitle: "Contadora",
        worksFor: { "@id": `${SITE_URL}/#organization` }, knowsAbout: page.relatedTopics,
        sameAs: ["https://www.instagram.com/_oliveira.contabilidade_/"],
      },
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: "Oliveira Contabilidade", inLanguage: "pt-BR", publisher: { "@id": `${SITE_URL}/#organization` } },
      {
        "@type": "Service", "@id": `${url}#service`, name: page.name, serviceType: page.name, description: page.metaDescription, url,
        provider: { "@id": `${SITE_URL}/#organization` }, category: page.relatedTopics,
        audience: page.audience.map((audienceType) => ({ "@type": "Audience", audienceType })),
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Serviços", item: `${SITE_URL}/#servicos` },
          { "@type": "ListItem", position: 3, name: page.name, item: url },
        ],
      },
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url, name: page.metaTitle, description: page.metaDescription, inLanguage: "pt-BR",
        isPartOf: { "@id": `${SITE_URL}/#website` }, about: { "@id": `${url}#service` }, mainEntity: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` }, primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` },
      },
    ],
  }
}

function articleStructuredData(page, url) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Oliveira Contabilidade", url: `${SITE_URL}/`, logo: `${SITE_URL}/logo-oliveira-cropped.png`, image: `${SITE_URL}/og-image.png` },
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: "Oliveira Contabilidade", inLanguage: "pt-BR", publisher: { "@id": `${SITE_URL}/#organization` } },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Conteúdos", item: `${SITE_URL}/conteudos/` },
          { "@type": "ListItem", position: 3, name: page.title, item: url },
        ],
      },
      {
        "@type": "BlogPosting", "@id": `${url}#article`, headline: page.title, description: page.metaDescription,
        image: [`${SITE_URL}/og-image.png`], datePublished: page.datePublished, dateModified: page.dateModified, inLanguage: "pt-BR",
        articleSection: page.eyebrow, keywords: page.topics.join(", "), author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` }, mainEntityOfPage: { "@id": `${url}#webpage` },
      },
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url, name: page.metaTitle, description: page.metaDescription, inLanguage: "pt-BR",
        isPartOf: { "@id": `${SITE_URL}/#website` }, breadcrumb: { "@id": `${url}#breadcrumb` }, mainEntity: { "@id": `${url}#article` },
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` },
      },
    ],
  }
}

function serviceStaticContent(page) {
  const sections = page.sections.map((section) => `<section><h2>${escapeHtml(section.title)}</h2>${section.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}<ul>${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`).join("")
  const relatedServices = page.related.map((slug) => servicesBySlug[slug]).filter(Boolean).map((item) => `<li><a href="/${item.slug}/">${escapeHtml(item.name)}</a></li>`).join("")
  return `<article data-prerendered="true"><nav aria-label="Navegação estrutural"><a href="/">Início</a> &gt; <a href="/#servicos">Serviços</a> &gt; ${escapeHtml(page.name)}</nav><header><p>${escapeHtml(page.eyebrow)}</p><h1>${escapeHtml(page.h1)}</h1><p>${escapeHtml(page.lead)}</p><p>${escapeHtml(page.summary)}</p></header><section><h2>Indicado para</h2><ul>${page.audience.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>${sections}<section><h2>Dúvidas frequentes sobre ${escapeHtml(page.name)}</h2><dl>${page.faqs.map((faq) => `<dt>${escapeHtml(faq.q)}</dt><dd>${escapeHtml(faq.a)}</dd>`).join("")}</dl></section><section><h2>Serviços relacionados</h2><ul>${relatedServices}</ul></section><p><a href="/#contato">Solicitar diagnóstico com a Oliveira Contabilidade</a></p></article>`
}

function articleStaticContent(page) {
  const services = page.relatedServices.map((slug) => servicesBySlug[slug]).filter(Boolean).map((item) => `<li><a href="/${item.slug}/">${escapeHtml(item.name)}</a></li>`).join("")
  const relatedArticles = page.relatedArticles.map((slug) => contentBySlug[slug]).filter(Boolean).map((item) => `<li><a href="/conteudos/${item.slug}/">${escapeHtml(item.title)}</a></li>`).join("")
  return `<article data-prerendered="true"><nav aria-label="Navegação estrutural"><a href="/">Início</a> &gt; <a href="/conteudos/">Conteúdos</a> &gt; ${escapeHtml(page.title)}</nav><header><p>${escapeHtml(page.eyebrow)}</p><h1>${escapeHtml(page.title)}</h1><p>${escapeHtml(page.intro)}</p><p>Atualizado em ${escapeHtml(page.dateModified)} · ${escapeHtml(page.readingTime)} de leitura</p></header>${page.sections.map((section) => `<section><h2>${escapeHtml(section.title)}</h2>${section.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}<ul>${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`).join("")}<section><h2>Serviços relacionados</h2><ul>${services}</ul></section><section><h2>Continue lendo</h2><ul>${relatedArticles}</ul></section>${page.sources.length ? `<aside><h2>Fontes oficiais para consulta</h2><ul>${page.sources.map((source) => `<li><a href="${escapeHtml(source.url)}">${escapeHtml(source.label)}</a></li>`).join("")}</ul></aside>` : ""}<p>Conteúdo informativo. Regras podem mudar e a aplicação depende da situação de cada pessoa ou empresa.</p><p><a href="/#contato">Solicitar diagnóstico com a Oliveira Contabilidade</a></p></article>`
}

function makeServiceHtml(page) {
  const url = `${SITE_URL}/${page.slug}/`
  let html = baseHtml
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.metaTitle)}</title>`)
  html = replaceMeta(html, "description", page.metaDescription)
  html = replaceMeta(html, "ogType", "website")
  html = replaceMeta(html, "ogTitle", page.metaTitle)
  html = replaceMeta(html, "ogDescription", page.metaDescription)
  html = replaceMeta(html, "ogUrl", url)
  html = replaceMeta(html, "twitterTitle", page.metaTitle)
  html = replaceMeta(html, "twitterDescription", page.metaDescription)
  html = setCanonical(html, url)
  html = setStructuredData(html, serviceStructuredData(page, url))
  return html.replace('<div id="root"></div>', `<div id="root">${serviceStaticContent(page)}</div>`)
}

function makeArticleHtml(page) {
  const url = `${SITE_URL}/conteudos/${page.slug}/`
  let html = baseHtml
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.metaTitle)}</title>`)
  html = replaceMeta(html, "description", page.metaDescription)
  html = replaceMeta(html, "ogType", "article")
  html = replaceMeta(html, "ogTitle", page.metaTitle)
  html = replaceMeta(html, "ogDescription", page.metaDescription)
  html = replaceMeta(html, "ogUrl", url)
  html = replaceMeta(html, "twitterTitle", page.metaTitle)
  html = replaceMeta(html, "twitterDescription", page.metaDescription)
  html = html.replace('</head>', `    <meta property="article:published_time" content="${page.datePublished}" />\n    <meta property="article:modified_time" content="${page.dateModified}" />\n  </head>`)
  html = setCanonical(html, url)
  html = setStructuredData(html, articleStructuredData(page, url))
  return html.replace('<div id="root"></div>', `<div id="root">${articleStaticContent(page)}</div>`)
}

for (const page of servicePages) {
  const routeDir = path.join(DIST, page.slug)
  await mkdir(routeDir, { recursive: true })
  await writeFile(path.join(routeDir, "index.html"), makeServiceHtml(page), "utf8")
}

const hubUrl = `${SITE_URL}/conteudos/`
const hubTitle = "Conteúdos sobre Contabilidade, BPO e Impostos | Oliveira Contabilidade"
const hubDescription = "Guias sobre contabilidade, BPO financeiro, Carnê-Leão, IRPF, abertura de empresa e organização financeira para empresas, autônomos e profissionais liberais."
let hub = baseHtml
hub = hub.replace(/<title>[\s\S]*?<\/title>/i, `<title>${hubTitle}</title>`)
hub = replaceMeta(hub, "description", hubDescription)
hub = replaceMeta(hub, "ogTitle", hubTitle)
hub = replaceMeta(hub, "ogDescription", hubDescription)
hub = replaceMeta(hub, "ogUrl", hubUrl)
hub = replaceMeta(hub, "twitterTitle", hubTitle)
hub = replaceMeta(hub, "twitterDescription", hubDescription)
hub = setCanonical(hub, hubUrl)
hub = setStructuredData(hub, { "@context": "https://schema.org", "@graph": [
  { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Oliveira Contabilidade", url: `${SITE_URL}/`, logo: `${SITE_URL}/logo-oliveira-cropped.png` },
  { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: "Oliveira Contabilidade", inLanguage: "pt-BR", publisher: { "@id": `${SITE_URL}/#organization` } },
  { "@type": "CollectionPage", "@id": `${hubUrl}#webpage`, url: hubUrl, name: hubTitle, description: hubDescription, inLanguage: "pt-BR", isPartOf: { "@id": `${SITE_URL}/#website` }, mainEntity: { "@type": "ItemList", itemListElement: contentPages.map((page, index) => ({ "@type": "ListItem", position: index + 1, url: `${SITE_URL}/conteudos/${page.slug}/`, name: page.title })) } },
] })
hub = hub.replace('<div id="root"></div>', `<div id="root"><main><h1>Guias para entender melhor sua rotina contábil, fiscal e financeira.</h1><p>${hubDescription}</p><ul>${contentPages.map((page) => `<li><a href="/conteudos/${page.slug}/">${escapeHtml(page.title)}</a> — ${escapeHtml(page.metaDescription)}</li>`).join("")}</ul></main></div>`)
await mkdir(path.join(DIST, "conteudos"), { recursive: true })
await writeFile(path.join(DIST, "conteudos", "index.html"), hub, "utf8")

for (const page of contentPages) {
  const routeDir = path.join(DIST, "conteudos", page.slug)
  await mkdir(routeDir, { recursive: true })
  await writeFile(path.join(routeDir, "index.html"), makeArticleHtml(page), "utf8")
}

const homeStatic = `<main data-prerendered="true"><h1>Contabilidade estratégica para empresas e pessoas físicas que querem crescer com segurança.</h1><p>A Oliveira Contabilidade oferece contabilidade empresarial, BPO financeiro, serviços tributários e societários, departamento pessoal, IRPF e Carnê-Leão para empresas, autônomos e pessoas físicas.</p><section><h2>Serviços contábeis e financeiros</h2><ul>${servicePages.map((page) => `<li><a href="/${page.slug}/">${escapeHtml(page.name)}</a> — ${escapeHtml(page.metaDescription)}</li>`).join("")}</ul></section><section><h2>Conteúdos para tirar dúvidas</h2><ul>${contentPages.map((page) => `<li><a href="/conteudos/${page.slug}/">${escapeHtml(page.title)}</a></li>`).join("")}</ul><p><a href="/conteudos/">Ver todos os conteúdos</a></p></section><section><h2>Contato</h2><p>Sâmela Oliveira dos Santos · <a href="mailto:oliveirasantosconsultoria1101@gmail.com">oliveirasantosconsultoria1101@gmail.com</a> · <a href="https://wa.me/5561995647701">+55 (61) 99564-7701</a></p></section></main>`
const home = baseHtml.replace('<div id="root"></div>', `<div id="root">${homeStatic}</div>`)
await writeFile(path.join(DIST, "index.html"), home, "utf8")

let notFound = baseHtml
notFound = notFound.replace(/<title>[\s\S]*?<\/title>/i, "<title>Página não encontrada | Oliveira Contabilidade</title>")
notFound = replaceMeta(notFound, "description", "A página solicitada não foi encontrada. Acesse a Oliveira Contabilidade para conhecer serviços contábeis, BPO financeiro, IRPF e outras soluções.")
notFound = replaceMeta(notFound, "robots", "noindex, follow")
notFound = setCanonical(notFound, `${SITE_URL}/`)
notFound = notFound.replace('<div id="root"></div>', '<div id="root"><main><h1>Página não encontrada</h1><p>O endereço solicitado não existe.</p><p><a href="/">Voltar para Oliveira Contabilidade</a></p></main></div>')
await writeFile(path.join(DIST, "404.html"), notFound, "utf8")

console.log(`Prerender concluído: ${servicePages.length} serviços + ${contentPages.length} conteúdos + hub + 404.`)
