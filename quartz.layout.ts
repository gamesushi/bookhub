import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

import { mapFn } from "./quartz/util/translations"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        // 您的 GitHub 用户名/仓库名
        repo: 'gamesushi/bookhub',
        // 从您提供的脚本中提取的真实 ID
        repoId: 'R_kgDOSSNd0w', 
        // 讨论分类
        category: 'Announcements',
        // 从您提供的脚本中提取的真实 ID
        categoryId: 'DIC_kwDOSSNd084C8s67',
        // 映射方式：推荐使用 pathname
        mapping: 'pathname',
        // 开启严格匹配
        strict: true,
        // 设置为中文
        lang: 'zh-CN'
      }
    }),
    Component.Annotations({
      provider: "local",
    }),
    Component.ReadingProgress(),
    Component.WeChatReader(),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.HomeHero(),
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.TagList(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
        { Component: Component.LanguageToggle() },
      ],
    }),
    Component.Explorer({
      mapFn,
    }),
  ],
  right: [
    Component.Graph(),
    Component.HomeRightSidebar(),
    Component.ConditionalRender({
      component: Component.DesktopOnly(Component.TableOfContents()),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.DesktopOnly(Component.NounPreview()),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.Backlinks(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.LanguageToggle() },
      ],
    }),
    Component.Explorer({
      mapFn,
    }),
  ],
  right: [],
}
