import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const heroImage = "https://d2xsxph8kpxj0f.cloudfront.net/310519663645332152/SXYAeD4diyxNjQqMy7tQ6H/buffett-munger-hero-knowledge-map-PZCtTZu6ZMUp5PeqNYYaN5.webp";

const HomeHero: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  if (fileData.slug !== "index") {
    return null
  }

  return (
    <div class={classNames(displayClass, "home-hero")}>
      <div class="hero-main-title">
        <div class="hero-main-eyebrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
          参考文献库 · 2026
        </div>
        <h1><span class="highlight-text">投资知识库</span></h1>
        <p class="hero-main-subtitle">
          在长期主义、商业洞察与多元思维模型之间，建立一座可反复阅读的投资智慧索引。
        </p>
      </div>

      <div class="hero-plate">
        <img src={heroImage} alt="Hero" class="hero-bg" />
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <p class="hero-eyebrow">开篇语</p>
          <h2 class="hero-quote">“每天比醒来时更聪慧一点。”</h2>
          <div class="hero-portraits">
            <a href="/insights/Warren_Buffett/" class="portrait-link" title="沃伦·巴菲特">
              <img src="/static/portrait_buffett_1778486868612.png" alt="Warren Buffett" />
            </a>
            <a href="/insights/Charles_Munger/" class="portrait-link" title="查理·芒格">
              <img src="/static/portrait_munger_1778486885220.png" alt="Charlie Munger" />
            </a>
            <a href="/insights/Duan_Yongping/" class="portrait-link" title="段永平">
              <img src="/static/portrait_duan_user.png" alt="Duan Yongping" />
            </a>
          </div>
          <p class="hero-desc">真正的优势，不在于预测明天，而在于理解原则、避免愚蠢，并让时间替理性复利。</p>
          <div class="hero-tags">
            <a href="/wiki/concepts/duan_能力圈" class="hero-tag">能力圈</a>
            <a href="/wiki/concepts/duan_安全边际" class="hero-tag">安全边际</a>
            <a href="/wiki/concepts/duan_错误与纠错" class="hero-tag">反向思考</a>
            <a href="/wiki/concepts/duan_Stop-Doing-List" class="hero-tag">少犯大错</a>
            <a href="/wiki/concepts/duan_长期主义" class="hero-tag">长期合伙人</a>
            <a href="/wiki/concepts/duan_好公司的标准" class="hero-tag">高品质企业</a>
          </div>
        </div>
      </div>
      
      <div class="knowledge-cards">
        <article class="knowledge-card">
          <div class="card-header">
            <span class="card-eyebrow">01 / 企业品质</span>
          </div>
          <h3>企业品质与护城河</h3>
          <p>从长期现金流、竞争优势与管理层诚信切入，建立判断一家企业是否值得长期持有的阅读路径。</p>
        </article>
        <article class="knowledge-card">
          <div class="card-header">
            <span class="card-eyebrow">02 / 思维模型</span>
          </div>
          <h3>多元思维模型</h3>
          <p>把心理学、经济学、概率、工程与历史放进同一个工具箱，训练更少犯错的决策能力。</p>
        </article>
        <article class="knowledge-card">
          <div class="card-header">
            <span class="card-eyebrow">03 / 复利</span>
          </div>
          <h3>复利与长期主义</h3>
          <p>让时间成为理性的盟友，关注可持续的学习、资本与品格复利，而非短期市场噪音。</p>
        </article>
      </div>
      <div class="trending-wiki">
        <div class="section-header">
          <span class="section-eyebrow">精选阅读</span>
          <h2 class="section-title">深度 Wiki 条目</h2>
        </div>
        <div class="wiki-grid">
          <a href="/wiki/concepts/duan_生意模式" class="wiki-item">
            <span class="wiki-cat">商业</span>
            <span class="wiki-name">生意模式 (Business Model)</span>
            <span class="wiki-desc">判断一家公司优劣的最核心标准。</span>
          </a>
          <a href="/wiki/concepts/duan_护城河" class="wiki-item">
            <span class="wiki-cat">竞争</span>
            <span class="wiki-name">经济护城河</span>
            <span class="wiki-desc">可持续竞争优势的来源。</span>
          </a>
          <a href="/wiki/concepts/duan_复利" class="wiki-item">
            <span class="wiki-cat">原则</span>
            <span class="wiki-name">复利的力量</span>
            <span class="wiki-desc">让时间成为投资的朋友。</span>
          </a>
          <a href="/wiki/concepts/duan_内在价值" class="wiki-item">
            <span class="wiki-cat">估值</span>
            <span class="wiki-name">内在价值</span>
            <span class="wiki-desc">理解一家公司真正值多少钱。</span>
          </a>
        </div>
      </div>
    </div>
  )
}

HomeHero.css = `
.home-hero {
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.hero-main-title {
  max-width: 900px;
}

.hero-main-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  background: rgba(44, 87, 72, 0.06);
  border: 1px solid rgba(44, 87, 72, 0.15);
  font-family: var(--codeFont);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--secondary);
  border-radius: 2px;
  margin-bottom: 1.5rem;
}

.hero-main-title h1 {
  font-family: var(--headerFont);
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.05em;
  color: var(--dark);
  margin: 0 0 1.5rem 0;
  border: none;
}

.highlight-text {
  background: transparent;
  padding: 0;
}

.hero-main-subtitle {
  font-size: 1.2rem;
  color: var(--darkgray);
  line-height: 1.8;
  max-width: 700px;
}

.hero-plate {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--lightgray);
  border-radius: 4px;
  min-height: 300px;
  box-shadow: 0 10px 30px rgba(35, 31, 20, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  margin-bottom: 2rem;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(250,247,238,0.96), rgba(250,247,238,0.8), rgba(250,247,238,0.2));
  z-index: 1;
}

html[saved-theme="dark"] .hero-overlay {
  background: linear-gradient(to right, rgba(22,22,24,0.96), rgba(22,22,24,0.8), rgba(22,22,24,0.2));
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
}

.hero-eyebrow {
  font-family: var(--codeFont);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: var(--secondary);
  margin-bottom: 1rem;
}

.hero-quote {
  font-family: var(--headerFont);
  font-size: 2.2rem;
  color: var(--dark);
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.hero-portraits {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.portrait-link {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  border: 1.5px solid var(--lightgray);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.portrait-link img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: all 0.3s ease;
}

.portrait-link:hover {
  transform: translateY(-4px);
  border-color: var(--secondary);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.portrait-link:hover img {
  filter: grayscale(0%);
  transform: scale(1.1);
}

.hero-desc {
  font-size: 1rem;
  color: var(--darkgray);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.hero-tag {
  border: 1px solid rgba(44, 87, 72, 0.2);
  background: rgba(255, 255, 255, 0.5);
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
  color: var(--secondary);
  backdrop-filter: blur(4px);
  border-radius: 2px;
}

html[saved-theme="dark"] .hero-tag {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(123, 151, 170, 0.3);
  color: var(--secondary);
}

.knowledge-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.knowledge-card {
  border: 1px solid var(--lightgray);
  padding: 1.5rem;
  background: var(--light);
  box-shadow: 0 5px 15px rgba(35, 31, 20, 0.03);
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 4px;
}

.knowledge-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(35, 31, 20, 0.06);
  border-color: rgba(44, 87, 72, 0.3);
}

html[saved-theme="dark"] .knowledge-card:hover {
  border-color: rgba(123, 151, 170, 0.3);
}

.card-eyebrow {
  font-family: var(--codeFont);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--gray);
  text-transform: uppercase;
}

.knowledge-card h3 {
  font-family: var(--headerFont);
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem 0;
  color: var(--dark);
}

.knowledge-card p {
  font-size: 0.9rem;
  color: var(--darkgray);
  line-height: 1.6;
  margin: 0;
}

.trending-wiki {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--lightgray);
}

.section-header {
  margin-bottom: 2rem;
}

.section-eyebrow {
  font-family: var(--codeFont);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--secondary);
  text-transform: uppercase;
}

.section-title {
  font-family: var(--headerFont);
  font-size: 1.8rem;
  margin: 0.5rem 0 0 0;
  color: var(--dark);
  border: none;
}

.wiki-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.wiki-item {
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  border: 1px solid var(--lightgray);
  background: var(--light);
  text-decoration: none;
  transition: all 0.2s ease;
}

.wiki-item:hover {
  border-color: var(--secondary);
  box-shadow: 0 8px 20px rgba(44, 87, 72, 0.08);
  transform: translateY(-2px);
}

.wiki-cat {
  font-family: var(--codeFont);
  font-size: 0.65rem;
  color: var(--gray);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.wiki-name {
  font-family: var(--headerFont);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--dark);
  margin-bottom: 0.5rem;
}

.wiki-desc {
  font-size: 0.85rem;
  color: var(--darkgray);
  line-height: 1.5;
}

html[saved-theme="dark"] .wiki-item {
  background: rgba(0, 0, 0, 0.1);
  border-color: rgba(123, 151, 170, 0.2);
}
`

export default (() => HomeHero) satisfies QuartzComponentConstructor
