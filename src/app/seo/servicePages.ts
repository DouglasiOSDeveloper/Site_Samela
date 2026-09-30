import data from "./service-pages.json"

export type ServiceSection = {
  title: string
  paragraphs: string[]
  bullets: string[]
}

export type ServiceFaq = { q: string; a: string }

export type ServicePageData = {
  slug: string
  name: string
  navLabel: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  lead: string
  summary: string
  highlights: string[]
  sections: ServiceSection[]
  faqs: ServiceFaq[]
  related: string[]
  audience: string[]
  relatedTopics: string[]
}

export const servicePages = data as ServicePageData[]

export const servicePagesBySlug = Object.fromEntries(
  servicePages.map((page) => [page.slug, page]),
) as Record<string, ServicePageData>
