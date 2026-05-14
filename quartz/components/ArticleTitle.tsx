import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  const titleChs = fileData.frontmatter?.title_chs
  
  if (title) {
    return (
      <h1 class={classNames(displayClass, "article-title")}>
        {titleChs ? (
          <span class="dual-lang">
            <span class="lang-eng">{title}</span>
            <span class="lang-chs">{titleChs}</span>
          </span>
        ) : (
          title
        )}
      </h1>
    )
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
  margin: 2rem 0 0 0;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
