import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir} class="brand-link">
        <div class="brand-mark">B</div>
        <div class="brand-text">
          <span class="brand-name">{title}</span>
          <span class="brand-tagline">投资智慧库</span>
        </div>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--dark);
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid rgba(44, 87, 72, 0.2);
  background: rgba(44, 87, 72, 0.05);
  font-family: var(--headerFont);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--secondary);
}

.brand-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.brand-name {
  font-family: var(--headerFont);
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--dark);
}

.brand-tagline {
  font-family: var(--codeFont);
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--gray);
  margin-top: 2px;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
