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
          <p class="hero-desc">真正的优势，不在于预测明天，而在于理解原则、避免愚蠢，并让时间替理性复利。</p>
          <div class="hero-tags">
            <span class="hero-tag">能力圈</span>
            <span class="hero-tag">安全边际</span>
            <span class="hero-tag">反向思考</span>
            <span class="hero-tag">少犯大错</span>
            <span class="hero-tag">长期合伙人</span>
            <span class="hero-tag">高品质企业</span>
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
`

export default (() => HomeHero) satisfies QuartzComponentConstructor
