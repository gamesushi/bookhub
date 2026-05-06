import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { visit } from "unist-util-visit"

export const LanguageBlocks: QuartzTransformerPlugin = () => {
  return {
    name: "LanguageBlocks",
    markdownPlugins() {
      return [
        () => {
          return (tree: Root) => {
            visit(tree, "paragraph", (node, index, parent) => {
              if (node.children && node.children.length > 0) {
                const firstChild = node.children[0]
                
                // Check if this is a language block marker
                
                // Check if this is a language block marker
                if (firstChild.type === "text") {
                  const textValue = firstChild.value.trim()
                  const langMatch = textValue.match(/^:::lang\s+([a-z0-9-]+)/)
                  
                  if (langMatch) {
                    const lang = langMatch[1]
                  
                  // Remove this node and find all content until the closing :::
                  if (parent && typeof index === "number") {
                    const contentNodes = []
                    let i = index + 1
                    let foundClosing = false
                    let nodesToConsumeAtEnd = 0
                    
                    while (i < parent.children.length) {
                      const currentNode = parent.children[i]
                      
                      // Check if this is the closing marker
                      // It could be a paragraph that is JUST ":::", or ends with ":::"
                      if (currentNode.type === "paragraph" && currentNode.children.length > 0) {
                        const lastChild = currentNode.children[currentNode.children.length - 1]
                        
                        if (lastChild.type === "text") {
                          const text = lastChild.value
                          
                          // Simple and robust search for :::
                          const idx = text.indexOf(":::")
                          
                          if (idx !== -1) {
                            foundClosing = true
                            
                            // Check if this is an auto-close (starts with :::lang) or explicit close (:::)
                            const remainder = text.slice(idx)
                            const isAutoClose = remainder.startsWith(":::lang")
                            
                            const beforeText = text.slice(0, idx).trim()
                            // If auto-close, we keep the marker for the next block.
                            // If explicit close, we consume the ::: (length 3).
                            const afterText = isAutoClose ? text.slice(idx).trim() : text.slice(idx + 3).trim()
                            
                            // 1. Handle before text
                            if (beforeText) {
                                lastChild.value = beforeText
                            } else {
                                currentNode.children.pop()
                            }
                            
                            // 2. Handle after text (next block content)
                            if (afterText) {
                                const newParaNode: any = {
                                    type: "paragraph",
                                    children: [{ type: "text", value: afterText }]
                                }
                                parent.children.splice(i + 1, 0, newParaNode)
                            }
                            
                            contentNodes.push(currentNode)
                            nodesToConsumeAtEnd = 0
                            break
                          }
                        }
                      }
                      
                      contentNodes.push(currentNode)
                      i++
                    }
                    
                    if (foundClosing) {
                      // Create a container div with the appropriate class
                      const containerNode: any = {
                        type: "html",
                        value: `<div class="lang-${lang}">`,
                      }
                      
                      const closingNode: any = {
                        type: "html",
                        value: "</div>",
                      }
                      
                      // Replace the original marker node with the container
                      parent.children.splice(index, 1, containerNode)
                      
                      // Insert closing tag after content nodes
                      // If nodesToConsumeAtEnd is 1, it replaces the marker node.
                      // If 0, it inserts </div> after the last content node.
                      parent.children.splice(index + contentNodes.length + 1, nodesToConsumeAtEnd, closingNode)
                      
                      // Return the index of the node after the closing div to continue traversal there
                      // This ensures we visit the split node (if any) or the next block
                      return index + contentNodes.length + 2
                    }
                  }
                  }
                }
              }
            })
          }
        },
      ]
    },
  }
}
