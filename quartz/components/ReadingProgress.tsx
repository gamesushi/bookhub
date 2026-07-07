import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import readingProgressScript from "./scripts/reading-progress.inline"

export default (() => {
  const ReadingProgress: QuartzComponent = (_props: QuartzComponentProps) => {
    return null // No visible HTML needed — the bar is created by JS
  }

  ReadingProgress.afterDOMLoaded = readingProgressScript

  return ReadingProgress
}) satisfies QuartzComponentConstructor
