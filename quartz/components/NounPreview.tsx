import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/nounPreview.scss"
import { resolveRelative, simplifySlug } from "../util/path"
import { classNames } from "../util/lang"
import OverflowListFactory from "./OverflowList"

interface Options {
  title: string
  folderFilters: string[]
}

const defaultOptions: Options = {
  title: "相关名词",
  folderFilters: ["concepts", "people", "companies"],
}

export default ((opts?: Partial<Options>) => {
  const options: Options = { ...defaultOptions, ...opts }
  const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()

  const NounPreview: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
  }: QuartzComponentProps) => {
    const links = fileData.links ?? []
    if (links.length === 0) {
      return null
    }

    // Filter allFiles to find those that are linked from the current page
    // and match our folder filters
    const linkedFiles = allFiles.filter((file) => {
      const slug = simplifySlug(file.slug!)
      // Check if this file is linked to
      const isLinked = links.some(link => simplifySlug(link) === slug)
      if (!isLinked) return false

      // Check if it's in one of our target folders
      return options.folderFilters.some((folder) => file.slug?.startsWith(folder + "/"))
    })

    if (linkedFiles.length === 0) {
      return null
    }

    return (
      <div class={classNames(displayClass, "noun-preview")}>
        <h3>{options.title}</h3>
        <OverflowList>
          {linkedFiles.map((f) => (
            <li>
              <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
                {f.frontmatter?.title ?? f.name}
              </a>
              {f.description && <p>{f.description}</p>}
            </li>
          ))}
        </OverflowList>
      </div>
    )
  }

  NounPreview.css = style
  NounPreview.afterDOMLoaded = overflowListAfterDOMLoaded

  return NounPreview
}) satisfies QuartzComponentConstructor
