import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const ROOT = process.cwd()
const SITE_URL = "https://oliveiracontabilconsultiva.com.br"
const LASTMOD = "2026-09-30"
const servicePages = JSON.parse(await readFile(path.join(ROOT, "src/app/seo/service-pages.json"), "utf8"))
const contentPages = JSON.parse(await readFile(path.join(ROOT, "src/app/seo/content-pages.json"), "utf8"))

const urls = [
  { loc: `${SITE_URL}/`, lastmod: LASTMOD },
  ...servicePages.map((page) => ({ loc: `${SITE_URL}/${page.slug}/`, lastmod: LASTMOD })),
  { loc: `${SITE_URL}/conteudos/`, lastmod: LASTMOD },
  ...contentPages.map((page) => ({ loc: `${SITE_URL}/conteudos/${page.slug}/`, lastmod: page.dateModified })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(({ loc, lastmod }) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join("\n")}\n</urlset>\n`

await writeFile(path.join(ROOT, "dist/sitemap.xml"), xml, "utf8")
console.log(`Sitemap gerado: ${urls.length} URLs indexáveis.`)
