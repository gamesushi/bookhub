import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import wechatReaderScript from "./scripts/wechat-reader.inline"

export default (() => {
  const WeChatReader: QuartzComponent = (_props: QuartzComponentProps) => {
    return null // No visual HTML node needed — elements are injected dynamically by client-side JS
  }

  WeChatReader.afterDOMLoaded = wechatReaderScript

  return WeChatReader
}) satisfies QuartzComponentConstructor
