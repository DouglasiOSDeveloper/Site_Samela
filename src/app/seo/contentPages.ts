import data from "./content-pages.json"

export type ContentSection = {
  title: string
  paragraphs: string[]
  bullets: string[]
}

export type ContentSource = { label: string; url: string }

export type ContentPageData = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  intro: string
  datePublished: string
  dateModified: string
  readingTime: string
  topics: string[]
  relatedServices: string[]
  relatedArticles: string[]
  sections: ContentSection[]
  sources: ContentSource[]
}

export const contentPages = data as ContentPageData[]

export const contentPagesBySlug = Object.fromEntries(
  contentPages.map((page) => [page.slug, page]),
) as Record<string, ContentPageData>
