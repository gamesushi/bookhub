// @ts-ignore
import languageToggleScript from "./scripts/languagetoggle.inline"
import styles from "./styles/languagetoggle.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const LanguageToggle: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <button class={classNames(displayClass, "language-toggle")} aria-label="Toggle Language">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        class="lang-icon"
      >
        <title>Toggle Language</title>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
      <span class="lang-text"></span>
    </button>
  )
}

LanguageToggle.beforeDOMLoaded = languageToggleScript
LanguageToggle.css = styles

export default (() => LanguageToggle) satisfies QuartzComponentConstructor
