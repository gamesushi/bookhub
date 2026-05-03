import { Root } from "hast"
import { GlobalConfiguration } from "../../cfg"
import { getDate } from "../../components/Date"
import { escapeHTML } from "../../util/escape"
import { FilePath, FullSlug, SimpleSlug, joinSegments, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { toHtml } from "hast-util-to-html"
import { write } from "./helpers"
import { i18n } from "../../i18n"

export type ContentIndexMap = Map<FullSlug, ContentDetails>
export type ContentDetails = {
  slug: FullSlug
  filePath: FilePath
  title: string
  titleChs?: string
  links: SimpleSlug[]
  tags: string[]
  content: string
  richContent?: string
  date?: Date
  description?: string
}

interface Options {
  enableSiteMap: boolean
  enableRSS: boolean
  rssLimit?: number
  rssFullHtml: boolean
  rssSlug: string
  includeEmptyFiles: boolean
}

const defaultOptions: Options = {
  enableSiteMap: true,
  enableRSS: true,
  rssLimit: 10,
  rssFullHtml: false,
  rssSlug: "index",
  includeEmptyFiles: true,
}

function generateSiteMap(cfg: GlobalConfiguration, idx: ContentIndexMap): string {
  const base = cfg.baseUrl ?? ""
  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => `<url>
    <loc>https://${joinSegments(base, encodeURI(slug))}</loc>
    ${content.date && `<lastmod>${content.date.toISOString()}</lastmod>`}
  </url>`
  const urls = Array.from(idx)
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .join("")
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`
}

function generateRSSFeed(cfg: GlobalConfiguration, idx: ContentIndexMap, limit?: number): string {
  const base = cfg.baseUrl ?? ""

  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => `<item>
    <title>${escapeHTML(content.title)}</title>
    <link>https://${joinSegments(base, encodeURI(slug))}</link>
    <guid>https://${joinSegments(base, encodeURI(slug))}</guid>
    <description><![CDATA[ ${content.richContent ?? content.description} ]]></description>
    <pubDate>${content.date?.toUTCString()}</pubDate>
  </item>`

  const items = Array.from(idx)
    .sort(([_, f1], [__, f2]) => {
      if (f1.date && f2.date) {
        return f2.date.getTime() - f1.date.getTime()
      } else if (f1.date && !f2.date) {
        return -1
      } else if (!f1.date && f2.date) {
        return 1
      }

      return f1.title.localeCompare(f2.title)
    })
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .slice(0, limit ?? idx.size)
    .join("")

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
      <title>${escapeHTML(cfg.pageTitle)}</title>
      <link>https://${base}</link>
      <description>${!!limit ? i18n(cfg.locale).pages.rss.lastFewNotes({ count: limit }) : i18n(cfg.locale).pages.rss.recentNotes} on ${escapeHTML(
        cfg.pageTitle,
      )}</description>
      <generator>Quartz -- quartz.jzhao.xyz</generator>
      ${items}
    </channel>
  </rss>`
}

export const ContentIndex: QuartzEmitterPlugin<Partial<Options>> = (opts) => {
  opts = { ...defaultOptions, ...opts }
  return {
    name: "ContentIndex",
    async *emit(ctx, content) {
      const cfg = ctx.cfg.configuration
      const linkIndex: ContentIndexMap = new Map()

      // Build translation map from index files
      const chsTitleMap = new Map<FullSlug, string>()

      
      // Import fs to read raw file content
      const fs = await import("fs")

      for (const [_, file] of content) {
        // Strict check for path being a string
        if (!file.data?.slug) continue;
        
        // Fallback to history if path is missing (sometimes happens in memory-only files)
        let filePath = file.path || file.history?.[0] || "";
        
        if (!filePath || typeof filePath !== 'string') continue;

        let rawContent = ""
        try {
            // @ts-ignore
            rawContent = fs.readFileSync(filePath, 'utf8')
        } catch (e) {
            continue;
        }
        
        // Check for language block
        if (rawContent && rawContent.includes(":::lang chs")) {
             
             // More robust split
             const parts = rawContent.split(/:::lang (chs)/)
             if (parts.length < 2) continue;
             
             const chsBlock = parts[1].split(":::")[0]
             
             if (chsBlock) {
                 // 1. Extract H1 title
                 const h1Match = chsBlock.match(/^#\s+(.+)$/m)
                 if (h1Match) {
                     chsTitleMap.set(file.data.slug!, h1Match[1].trim())
                 }
                 
                 // 2. Extract WikiLinks with aliases
                 // Regex allows whitespace around pipes if needed
                 const regex = /\[\[\s*([^\|\]]+?)\s*\|\s*([^\]]+?)\s*\]\]/g
                 
                 let match
                 while ((match = regex.exec(chsBlock)) !== null) {
                     const [_, link, titleChs] = match
                     
                     // Resolve link
                     const cleanLink = link.split("/").pop()!.trim()
                     const folder = file.data.slug!.split("/").slice(0, -1).join("/")
                     
                     const targetHtml = cleanLink.replace(/ /g, "-").toLowerCase()
                     
                     // Attempt to find matching file in content
                     for (const [_, targetFile] of content) {
                         // Check slug match
                         const slug = targetFile.data.slug
                         if (!slug) continue
                         
                         // Check fast path: exact title match
                         if (targetFile.data.frontmatter?.title === cleanLink) {
                              if (!link.startsWith("/") && slug.startsWith(folder)) {
                                  chsTitleMap.set(slug, titleChs.trim())
                                  break;
                              }
                         }
                         
                         // Check slug heuristic
                         if (slug.endsWith(targetHtml)) {
                              if (!link.startsWith("/") && slug.startsWith(folder)) {
                                  chsTitleMap.set(slug, titleChs.trim())
                                  break;
                              }
                         }
                     }
                 }
             }
        }
      }
      
      // console.log(`[ContentIndex] Mapped ${chsTitleMap.size} titles.`)

      for (const [tree, file] of content) {
        const slug = file.data.slug!
        const date = getDate(ctx.cfg.configuration, file.data) ?? new Date()
        if (opts?.includeEmptyFiles || (file.data.text && file.data.text !== "")) {
          linkIndex.set(slug, {
            slug,
            filePath: file.data.relativePath!,
            title: file.data.frontmatter?.title!,
            titleChs: (file.data.frontmatter?.title_chs as string) || chsTitleMap.get(slug),
            links: file.data.links ?? [],
            tags: file.data.frontmatter?.tags ?? [],
            content: file.data.text ?? "",
            richContent: opts?.rssFullHtml
              ? escapeHTML(toHtml(tree as Root, { allowDangerousHtml: true }))
              : undefined,
            date: date,
            description: file.data.description ?? "",
          })
        }
      }

      if (opts?.enableSiteMap) {
        yield write({
          ctx,
          content: generateSiteMap(cfg, linkIndex),
          slug: "sitemap" as FullSlug,
          ext: ".xml",
        })
      }

      if (opts?.enableRSS) {
        yield write({
          ctx,
          content: generateRSSFeed(cfg, linkIndex, opts.rssLimit),
          slug: (opts?.rssSlug ?? "index") as FullSlug,
          ext: ".xml",
        })
      }

      const fp = joinSegments("static", "contentIndex") as FullSlug
      const simplifiedIndex = Object.fromEntries(
        Array.from(linkIndex).map(([slug, content]) => {
          // remove description and from content index as nothing downstream
          // actually uses it. we only keep it in the index as we need it
          // for the RSS feed
          delete content.description
          delete content.date
          return [slug, content]
        }),
      )

      yield write({
        ctx,
        content: JSON.stringify(simplifiedIndex),
        slug: fp,
        ext: ".json",
      })
    },
    externalResources: (ctx) => {
      if (opts?.enableRSS) {
        return {
          additionalHead: [
            <link
              rel="alternate"
              type="application/rss+xml"
              title="RSS Feed"
              href={`https://${ctx.cfg.configuration.baseUrl}/index.xml`}
            />,
          ],
        }
      }
    },
  }
}
