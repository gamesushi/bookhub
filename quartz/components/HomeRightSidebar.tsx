import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const HomeRightSidebar: QuartzComponent = ({ fileData, displayClass, allFiles }: QuartzComponentProps) => {
  if (fileData.slug !== "index") {
    return null
  }

  // 计算人物条目数量 (wiki/people)
  const peopleCount = allFiles.filter(f => f.slug?.startsWith("wiki/people")).length
  // 计算核心概念数量 (wiki/concepts)
  const conceptsCount = allFiles.filter(f => f.slug?.startsWith("wiki/concepts")).length

  return (
    <div class={classNames(displayClass, "home-right-sidebar")}>
      <section class="right-card">
        <div class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          今日阅读
        </div>
        <h3>从「知道能力圈边界」开始</h3>
        <p>建立一套知识库，不是为了收藏更多资讯，而是为了在关键时刻知道哪些资讯值得相信，哪些问题应该避开。</p>
      </section>

      <section class="right-card">
        <div class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
          索引状态
        </div>
        <div class="status-row">
          <a href="/wiki/people/">人物条目</a>
          <span class="status-val">{String(peopleCount).padStart(2, '0')}</span>
        </div>
        <div class="status-row last">
          <a href="/wiki/concepts/">核心概念</a>
          <span class="status-val">{String(conceptsCount).padStart(2, '0')}</span>
        </div>
      </section>
    </div>
  )
}

HomeRightSidebar.css = `
.home-right-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.right-card {
  border: 1px solid var(--lightgray);
  background: var(--light);
  padding: 1.25rem;
  box-shadow: 0 4px 12px rgba(35, 31, 20, 0.02);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--codeFont);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--secondary);
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.card-title svg {
  color: var(--secondary);
}

.right-card h3 {
  font-family: var(--headerFont);
  font-size: 1.1rem;
  color: var(--dark);
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.right-card p {
  font-size: 0.85rem;
  color: var(--darkgray);
  line-height: 1.6;
  margin: 0;
}

.status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--lightgray);
  font-size: 0.85rem;
  color: var(--darkgray);
}

.status-row a {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s ease;
}

.status-row a:hover {
  color: var(--secondary);
}

.status-row.last {
  border-bottom: none;
}

.status-val {
  color: var(--dark);
  font-weight: 500;
}

.status-val.highlight {
  color: var(--secondary);
}

html[saved-theme="dark"] .right-card {
  background: rgba(0, 0, 0, 0.2);
  border-color: rgba(123, 151, 170, 0.3);
}

html[saved-theme="dark"] .status-row {
  border-bottom-color: rgba(123, 151, 170, 0.2);
}
`

export default (() => HomeRightSidebar) satisfies QuartzComponentConstructor
