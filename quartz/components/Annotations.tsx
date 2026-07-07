import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import annotationsScript from "./scripts/annotations.inline"
import styles from "./styles/annotations.scss"

type Options = {
  provider?: "local" | "firebase"
  firebaseConfig?: {
    apiKey?: string
    authDomain?: string
    projectId?: string
    storageBucket?: string
    messagingSenderId?: string
    appId?: string
  }
}

export default ((opts?: Options) => {
  const Annotations: QuartzComponent = (_props: QuartzComponentProps) => {
    // Default to LocalStorage mode if no config is supplied
    const config = opts ?? { provider: "local" }
    
    return (
      <div
        id="bh-annotations-config"
        style="display: none;"
        data-config={JSON.stringify(config)}
      />
    )
  }

  Annotations.afterDOMLoaded = annotationsScript
  Annotations.css = styles

  return Annotations
}) satisfies QuartzComponentConstructor<Options>
