// Multi-user Selection Highlighting and Annotations inline script

interface BookhubHighlight {
  id: string
  pagePath: string
  text: string
  prefix: string
  suffix: string
  style: "yellow" | "red" | "wavy"
  note?: string
  author: string
  authorId: string
  createdAt: string
  isObsidian?: boolean
}

// Generate self-contained UUIDs
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Helper to normalize pathnames
function getCurrentPagePath(): string {
  const path = window.location.pathname
  return path.replace(/\/$/, "") || "index"
}

// Setup User Nickname
function getOrCreateUser(): { id: string; nickname: string } {
  let userId = localStorage.getItem("bh-user-id")
  if (!userId) {
    userId = generateUUID()
    localStorage.setItem("bh-user-id", userId)
  }
  let nickname = localStorage.getItem("bh-user-nickname")
  if (!nickname) {
    nickname = "Reader_" + Math.random().toString(36).substring(2, 7)
    localStorage.setItem("bh-user-nickname", nickname)
  }
  return { id: userId, nickname }
}

// Database Providers
class HighlightDatabase {
  private config: { provider: string; firebaseConfig?: any }

  constructor() {
    const configEl = document.getElementById("bh-annotations-config")
    if (configEl && configEl.dataset.config) {
      try {
        this.config = JSON.parse(configEl.dataset.config)
      } catch (e) {
        console.error("Failed to parse annotations config:", e)
        this.config = { provider: "local" }
      }
    } else {
      this.config = { provider: "local" }
    }
  }

  isFirebase(): boolean {
    return this.config.provider === "firebase" && !!this.config.firebaseConfig?.projectId
  }

  // Get highlights from Firestore or LocalStorage
  async fetchHighlights(pagePath: string): Promise<BookhubHighlight[]> {
    if (this.isFirebase()) {
      const { projectId } = this.config.firebaseConfig
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`
      
      const queryPayload = {
        structuredQuery: {
          from: [{ collectionId: "highlights" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "pagePath" },
              op: "EQUAL",
              value: { stringValue: pagePath }
            }
          }
        }
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(queryPayload)
        })

        if (!response.ok) {
          throw new Error(`Firestore REST error: ${response.statusText}`)
        }

        const results = await response.json()
        const fetched: BookhubHighlight[] = []

        if (Array.isArray(results)) {
          for (const item of results) {
            if (item.document) {
              const doc = item.document
              const fields = doc.fields
              if (fields) {
                // Extract document ID from path: projects/{project}/databases/{db}/documents/highlights/{docId}
                const docNameParts = doc.name.split("/")
                const docId = docNameParts[docNameParts.length - 1]

                fetched.push({
                  id: docId,
                  pagePath: fields.pagePath?.stringValue || "",
                  text: fields.text?.stringValue || "",
                  prefix: fields.prefix?.stringValue || "",
                  suffix: fields.suffix?.stringValue || "",
                  style: (fields.style?.stringValue as any) || "yellow",
                  note: fields.note?.stringValue || undefined,
                  author: fields.author?.stringValue || "Anonymous",
                  authorId: fields.authorId?.stringValue || "",
                  createdAt: fields.createdAt?.stringValue || new Date().toISOString()
                })
              }
            }
          }
        }
        return fetched
      } catch (e) {
        console.error("Firestore fetch error, falling back to LocalStorage:", e)
      }
    }

    // Local Storage Fallback
    const localData = localStorage.getItem("bh-local-highlights")
    if (localData) {
      try {
        const parsed: BookhubHighlight[] = JSON.parse(localData)
        return parsed.filter(h => h.pagePath === pagePath)
      } catch (e) {
        console.error("Failed to parse local highlights", e)
      }
    }
    return []
  }

  // Save highlight
  async saveHighlight(highlight: BookhubHighlight): Promise<boolean> {
    if (this.isFirebase()) {
      const { projectId } = this.config.firebaseConfig
      // We target /highlights collection and let Firestore generate the ID, or use documentId query parameter
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/highlights?documentId=${highlight.id}`

      const payload = {
        fields: {
          pagePath: { stringValue: highlight.pagePath },
          text: { stringValue: highlight.text },
          prefix: { stringValue: highlight.prefix },
          suffix: { stringValue: highlight.suffix },
          style: { stringValue: highlight.style },
          note: highlight.note ? { stringValue: highlight.note } : { nullValue: null },
          author: { stringValue: highlight.author },
          authorId: { stringValue: highlight.authorId },
          createdAt: { stringValue: highlight.createdAt }
        }
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
        if (response.ok) return true
        console.error("Firestore save error:", await response.text())
      } catch (e) {
        console.error("Firestore network save error:", e)
      }
    }

    // Local Storage Fallback
    const localData = localStorage.getItem("bh-local-highlights")
    let highlightsList: BookhubHighlight[] = []
    if (localData) {
      try {
        highlightsList = JSON.parse(localData)
      } catch (e) {}
    }
    highlightsList.push(highlight)
    localStorage.setItem("bh-local-highlights", JSON.stringify(highlightsList))
    return true
  }

  // Delete highlight
  async deleteHighlight(id: string): Promise<boolean> {
    if (this.isFirebase()) {
      const { projectId } = this.config.firebaseConfig
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/highlights/${id}`
      try {
        const response = await fetch(url, { method: "DELETE" })
        if (response.ok) return true
        console.error("Firestore delete error:", await response.text())
      } catch (e) {
        console.error("Firestore network delete error:", e)
      }
    }

    // Local Storage Fallback
    const localData = localStorage.getItem("bh-local-highlights")
    if (localData) {
      try {
        let highlightsList: BookhubHighlight[] = JSON.parse(localData)
        highlightsList = highlightsList.filter(h => h.id !== id)
        localStorage.setItem("bh-local-highlights", JSON.stringify(highlightsList))
        return true
      } catch (e) {}
    }
    return false
  }
}


// Text Node Finding and Wrapping Range Highlighting
function getTextNodes(root: HTMLElement): Text[] {
  const nodes: Text[] = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let node: Node | null
  while ((node = walker.nextNode())) {
    const parent = node.parentElement
    if (
      !parent ||
      parent.closest("pre") ||
      parent.closest("code") ||
      parent.closest("style") ||
      parent.closest("script") ||
      parent.closest(".no-highlight") ||
      parent.closest("#bh-selection-menu") ||
      parent.closest("#bh-comments-panel")
    ) {
      continue
    }
    nodes.push(node as Text)
  }
  return nodes
}

// Draw Highlights on DOM
function drawHighlights(articleEl: HTMLElement, highlights: BookhubHighlight[]) {
  // Clear any existing wrapper highlights by replacing them with their raw text contents
  const existingSpans = articleEl.querySelectorAll(".bookhub-highlight")
  existingSpans.forEach(span => {
    const parent = span.parentNode
    if (parent) {
      while (span.firstChild) {
        parent.insertBefore(span.firstChild, span)
      }
      span.remove()
    }
  })

  // Normalize and clean up adjacent text nodes (text node merger)
  articleEl.normalize()

  // Build the text offsets map
  let textNodes = getTextNodes(articleEl)
  let fullText = ""
  let offsets: number[] = []
  for (const node of textNodes) {
    offsets.push(fullText.length)
    fullText += node.nodeValue || ""
  }

  // To prevent index shifting issues when text nodes split, we sort highlights from end to start (descending by offset inside fullText)
  const matchesToApply: { start: number; end: number; h: BookhubHighlight }[] = []

  for (const h of highlights) {
    let index = fullText.indexOf(h.text)
    const candidates: number[] = []
    while (index !== -1) {
      candidates.push(index)
      index = fullText.indexOf(h.text, index + 1)
    }

    if (candidates.length === 0) continue

    // Score candidates based on prefix/suffix matches
    let bestIndex = -1
    let bestScore = -1

    for (const startIdx of candidates) {
      const endIdx = startIdx + h.text.length
      const actPrefix = fullText.substring(Math.max(0, startIdx - h.prefix.length), startIdx)
      const actSuffix = fullText.substring(endIdx, Math.min(fullText.length, endIdx + h.suffix.length))

      let score = 0
      if (h.prefix && actPrefix.endsWith(h.prefix)) score += 10
      else if (h.prefix && actPrefix.includes(h.prefix)) score += 3

      if (h.suffix && actSuffix.startsWith(h.suffix)) score += 10
      else if (h.suffix && actSuffix.includes(h.suffix)) score += 3

      // Prefix length overlap
      let prefixOverlap = 0
      for (let i = 1; i <= Math.min(h.prefix.length, actPrefix.length); i++) {
        if (h.prefix.substring(h.prefix.length - i) === actPrefix.substring(actPrefix.length - i)) {
          prefixOverlap = i
        }
      }
      // Suffix length overlap
      let suffixOverlap = 0
      for (let i = 1; i <= Math.min(h.suffix.length, actSuffix.length); i++) {
        if (h.suffix.substring(0, i) === actSuffix.substring(0, i)) {
          suffixOverlap = i
        }
      }

      score += prefixOverlap + suffixOverlap

      if (score > bestScore) {
        bestScore = score
        bestIndex = startIdx
      }
    }

    if (bestIndex !== -1) {
      matchesToApply.push({
        start: bestIndex,
        end: bestIndex + h.text.length,
        h
      })
    }
  }

  // Sort descending by start position
  matchesToApply.sort((a, b) => b.start - a.start)

  // Map and wrap
  for (const match of matchesToApply) {
    // Find starting text node
    let sNodeIdx = -1
    for (let i = 0; i < offsets.length; i++) {
      const len = textNodes[i].nodeValue?.length || 0
      if (match.start >= offsets[i] && match.start < offsets[i] + len) {
        sNodeIdx = i
        break
      }
    }

    // Find ending text node
    let eNodeIdx = -1
    for (let i = 0; i < offsets.length; i++) {
      const len = textNodes[i].nodeValue?.length || 0
      if (match.end > offsets[i] && match.end <= offsets[i] + len) {
        eNodeIdx = i
        break
      }
    }

    if (sNodeIdx === -1 || eNodeIdx === -1) continue

    const nodesToWrap: Text[] = []

    try {
      if (sNodeIdx === eNodeIdx) {
        const node = textNodes[sNodeIdx]
        const startOffset = match.start - offsets[sNodeIdx]
        const endOffset = match.end - offsets[sNodeIdx]

        const part1 = node.splitText(startOffset)
        part1.splitText(endOffset - startOffset)

        nodesToWrap.push(part1)
      } else {
        // Spans multiple text nodes
        const startNode = textNodes[sNodeIdx]
        const startOffset = match.start - offsets[sNodeIdx]
        const remainingStart = startNode.splitText(startOffset)
        nodesToWrap.push(remainingStart)

        for (let i = sNodeIdx + 1; i < eNodeIdx; i++) {
          nodesToWrap.push(textNodes[i])
        }

        const endNode = textNodes[eNodeIdx]
        const endOffset = match.end - offsets[eNodeIdx]
        endNode.splitText(endOffset)
        nodesToWrap.push(endNode)
      }

      // Wrap list of text nodes in a span element
      nodesToWrap.forEach(node => {
        if (!node.parentNode) return
        const span = document.createElement("span")
        span.className = `bookhub-highlight bh-style-${match.h.style}`
        span.dataset.id = match.h.id
        
        // Add note class if comment exists
        if (match.h.note) {
          span.classList.add("bh-has-note")
        }

        node.parentNode.insertBefore(span, node)
        span.appendChild(node)
      })

      // Re-normalize and rebuild index maps after every draw to keep node integrity
      articleEl.normalize()
      textNodes = getTextNodes(articleEl)
      fullText = ""
      offsets = []
      for (const node of textNodes) {
        offsets.push(fullText.length)
        fullText += node.nodeValue || ""
      }
    } catch (err) {
      console.error("Error highlighting range:", err)
    }
  }
}

// Main logic
document.addEventListener("nav", async () => {
  const article = document.querySelector("article") as HTMLElement
  if (!article) return

  const db = new HighlightDatabase()
  const pagePath = getCurrentPagePath()
  const user = getOrCreateUser()

  let activeHighlights: BookhubHighlight[] = []

  // Create UI Popovers & Modals if they don't exist
  setupDOMElements()

  // 1. Parse Obsidian Tandem Comments
  const tandemBlocks = article.querySelectorAll("pre code.language-tandem-comments, pre.language-tandem-comments")
  const obsidianHighlights: BookhubHighlight[] = []
  
  tandemBlocks.forEach(block => {
    // Hide from viewer
    const container = (block.closest("pre") || block) as HTMLElement
    container.style.display = "none"

    try {
      const data = JSON.parse(block.textContent || "{}")
      for (const [id, value] of Object.entries<any>(data)) {
        if (value.anchor && value.anchor.exact) {
          // Format tandem-comments schema to Highlight schema
          const thread = value.thread || []
          const firstComment = thread[0]
          
          obsidianHighlights.push({
            id: id,
            pagePath: pagePath,
            text: value.anchor.exact,
            prefix: value.anchor.prefix || "",
            suffix: value.anchor.suffix || "",
            style: "yellow", // default style for Obsidian notes
            note: firstComment ? firstComment.text : undefined,
            author: firstComment ? firstComment.author : "Vault",
            authorId: "obsidian",
            createdAt: firstComment ? new Date(firstComment.ts).toISOString() : new Date().toISOString(),
            isObsidian: true
          })
        }
      }
    } catch (e) {
      console.error("Failed to parse Obsidian comments block:", e)
    }
  })

  // 2. Fetch Web Highlights from DB
  const webHighlights = await db.fetchHighlights(pagePath)

  // Merge lists
  activeHighlights = [...obsidianHighlights, ...webHighlights]

  // Render highlights
  drawHighlights(article, activeHighlights)

  // Event Listeners: Text Selection
  const menuEl = document.getElementById("bh-selection-menu") as HTMLElement
  const noteForm = menuEl.querySelector(".bh-note-form") as HTMLElement
  const menuRow = menuEl.querySelector(".bh-menu-row") as HTMLElement
  const textarea = noteForm.querySelector("textarea") as HTMLTextAreaElement

  let currentSelectionContext: { text: string; prefix: string; suffix: string } | null = null

  function hideSelectionMenu() {
    menuEl.style.display = "none"
    noteForm.style.display = "none"
    menuRow.style.display = "flex"
    textarea.value = ""
  }

  function handleSelection() {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) {
      hideSelectionMenu()
      return
    }

    const text = selection.toString().trim()
    if (text.length === 0) {
      hideSelectionMenu()
      return
    }

    const range = selection.getRangeAt(0)
    if (!article.contains(range.commonAncestorContainer)) {
      hideSelectionMenu()
      return
    }



    // Extract Context Prefix and Suffix (W3C approach)
    const preRange = document.createRange()
    preRange.selectNodeContents(article)
    preRange.setEnd(range.startContainer, range.startOffset)
    const preText = preRange.toString()
    const prefix = preText.substring(preText.length - 30)

    const postRange = document.createRange()
    postRange.selectNodeContents(article)
    postRange.setStart(range.endContainer, range.endOffset)
    const postText = postRange.toString()
    const suffix = postText.substring(0, 30)

    currentSelectionContext = { text, prefix, suffix }

    // Position Menu
    const rect = range.getBoundingClientRect()
    menuEl.style.display = "flex"
    
    const menuWidth = menuEl.offsetWidth
    const menuHeight = menuEl.offsetHeight
    const top = rect.top + window.scrollY - menuHeight - 10
    const left = rect.left + window.scrollX + rect.width / 2 - menuWidth / 2

    menuEl.style.top = `${Math.max(0, top)}px`
    menuEl.style.left = `${Math.max(10, Math.min(window.innerWidth - menuWidth - 10, left))}px`
  }

  // Register selection triggers
  article.addEventListener("pointerup", handleSelection)
  article.addEventListener("keyup", handleSelection)
  window.addCleanup(() => {
    article.removeEventListener("pointerup", handleSelection)
    article.removeEventListener("keyup", handleSelection)
  })

  // Close menus when clicking outside
  const handleDocumentClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    // If there is still an active selection, do not close the menu
    const selection = window.getSelection()
    if (selection && selection.toString().trim().length > 0) {
      return
    }

    if (
      !menuEl.contains(target) &&
      !target.closest(".bookhub-highlight") &&
      !target.closest("#bh-comments-panel") &&
      !target.closest(".bh-user-profile-trigger") &&
      !target.closest("#bh-nickname-modal")
    ) {
      hideSelectionMenu()
      const panel = document.getElementById("bh-comments-panel")
      if (panel) panel.style.display = "none"
      
      // Remove highlighting active state
      document.querySelectorAll(".bookhub-highlight.bh-active").forEach(el => {
        el.classList.remove("bh-active")
      })
    }
  }
  document.addEventListener("click", handleDocumentClick)
  window.addCleanup(() => document.removeEventListener("click", handleDocumentClick))

  // Prevent selection from clearing when clicking inside the toolbar
  const handleMenuMouseDown = (e: MouseEvent) => {
    e.preventDefault()
  }
  menuEl.addEventListener("mousedown", handleMenuMouseDown)
  window.addCleanup(() => menuEl.removeEventListener("mousedown", handleMenuMouseDown))

  // Floating selection menu click actions
  const saveHighlightStyle = async (style: "yellow" | "red" | "wavy", noteText?: string) => {
    if (!currentSelectionContext) return

    const newH: BookhubHighlight = {
      id: generateUUID(),
      pagePath: pagePath,
      text: currentSelectionContext.text,
      prefix: currentSelectionContext.prefix,
      suffix: currentSelectionContext.suffix,
      style,
      note: noteText,
      author: user.nickname,
      authorId: user.id,
      createdAt: new Date().toISOString()
    }

    const success = await db.saveHighlight(newH)
    if (success) {
      activeHighlights.push(newH)
      drawHighlights(article, activeHighlights)
    }

    window.getSelection()?.removeAllRanges()
    hideSelectionMenu()
  }

  // Bind toolbar buttons
  const btnYellow = menuEl.querySelector(".bh-btn-yellow")
  const btnRed = menuEl.querySelector(".bh-btn-red")
  const btnWavy = menuEl.querySelector(".bh-btn-wavy")
  const btnNote = menuEl.querySelector(".bh-btn-note")
  const btnCopy = menuEl.querySelector(".bh-btn-copy")

  btnYellow?.addEventListener("click", () => saveHighlightStyle("yellow"))
  btnRed?.addEventListener("click", () => saveHighlightStyle("red"))
  btnWavy?.addEventListener("click", () => saveHighlightStyle("wavy"))
  
  btnCopy?.addEventListener("click", () => {
    if (currentSelectionContext) {
      navigator.clipboard.writeText(currentSelectionContext.text)
      hideSelectionMenu()
    }
  })

  btnNote?.addEventListener("click", () => {
    menuRow.style.display = "none"
    noteForm.style.display = "flex"
    textarea.focus()
  })

  noteForm.querySelector(".bh-cancel-btn")?.addEventListener("click", () => {
    noteForm.style.display = "none"
    menuRow.style.display = "flex"
  })

  noteForm.querySelector(".bh-save-btn")?.addEventListener("click", () => {
    const textVal = textarea.value.trim()
    if (textVal) {
      saveHighlightStyle("yellow", textVal)
    }
  })

  // Highlights interactions (clicking highlight spans to view comments)
  const commentsPanel = document.getElementById("bh-comments-panel") as HTMLElement
  
  const handleHighlightClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const span = target.closest(".bookhub-highlight") as HTMLElement
    if (!span) return

    e.stopPropagation()

    // Add active styling class
    document.querySelectorAll(".bookhub-highlight.bh-active").forEach(el => {
      el.classList.remove("bh-active")
    })
    span.classList.add("bh-active")

    const id = span.dataset.id
    // Find all comments for this range (support matching multiple comments on the same exact text segment)
    const matches = activeHighlights.filter(h => h.id === id || (h.text === span.textContent && h.prefix === activeHighlights.find(item => item.id === id)?.prefix))
    if (matches.length === 0) return

    const baseH = matches[0]

    // Populate comments panel
    const quoteBox = commentsPanel.querySelector(".bh-quote-box") as HTMLElement
    quoteBox.textContent = `“${baseH.text}”`

    const listContainer = commentsPanel.querySelector(".bh-comments-list") as HTMLElement
    listContainer.innerHTML = ""

    matches.forEach(m => {
      const card = document.createElement("div")
      card.className = "bh-comment-card"

      const dateStr = new Date(m.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })

      let actionButtons = ""
      // Allow user to delete their own highlights
      if (m.authorId === user.id) {
        actionButtons = `
          <div class="bh-comment-actions">
            <button class="bh-delete-cmt-btn" data-id="${m.id}">Delete</button>
          </div>
        `
      }

      card.innerHTML = `
        <div class="bh-comment-meta">
          <span class="bh-author-name">${m.author}</span>
          <span class="bh-comment-date">${dateStr}</span>
        </div>
        <div class="bh-comment-content">${m.note || "Highlighted this text."}</div>
        ${actionButtons}
      `

      // Delete listener
      card.querySelector(".bh-delete-cmt-btn")?.addEventListener("click", async (ev) => {
        ev.stopPropagation()
        const cmtId = (ev.target as HTMLElement).dataset.id
        if (cmtId) {
          const ok = await db.deleteHighlight(cmtId)
          if (ok) {
            activeHighlights = activeHighlights.filter(h => h.id !== cmtId)
            card.remove()
            drawHighlights(article, activeHighlights)
            if (activeHighlights.filter(h => h.id === id).length === 0) {
              commentsPanel.style.display = "none"
            }
          }
        }
      })

      listContainer.appendChild(card)
    })

    // Position panel near the highlight element
    commentsPanel.style.display = "flex"
    const rect = span.getBoundingClientRect()
    const panelWidth = commentsPanel.offsetWidth
    
    const top = rect.bottom + window.scrollY + 8
    const left = rect.left + window.scrollX + rect.width / 2 - panelWidth / 2

    commentsPanel.style.top = `${top}px`
    commentsPanel.style.left = `${Math.max(10, Math.min(window.innerWidth - panelWidth - 10, left))}px`
  }

  article.addEventListener("click", handleHighlightClick)
  window.addCleanup(() => article.removeEventListener("click", handleHighlightClick))

  // Nickname Modal setup
  const modal = document.getElementById("bh-nickname-modal") as HTMLElement
  const trigger = document.querySelector(".bh-user-profile-trigger") as HTMLElement
  const nickInput = modal.querySelector("input") as HTMLInputElement

  trigger?.addEventListener("click", () => {
    nickInput.value = localStorage.getItem("bh-user-nickname") || user.nickname
    modal.style.display = "flex"
  })

  modal.querySelector(".bh-modal-cancel")?.addEventListener("click", () => {
    modal.style.display = "none"
  })

  modal.querySelector(".bh-modal-save")?.addEventListener("click", () => {
    const newName = nickInput.value.trim()
    if (newName) {
      localStorage.setItem("bh-user-nickname", newName)
      user.nickname = newName
      modal.style.display = "none"
    }
  })
})

function setupDOMElements() {
  // 1. Selection Menu
  if (!document.getElementById("bh-selection-menu")) {
    const menu = document.createElement("div")
    menu.id = "bh-selection-menu"
    menu.innerHTML = `
      <div class="bh-menu-row">
        <button class="bh-menu-btn bh-btn-yellow" title="Highlight Yellow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" fill="rgba(250, 204, 21, 0.5)"></circle></svg>
          Highlight
        </button>
        <button class="bh-menu-btn bh-btn-red" title="Underline Red">
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(239, 68, 68, 1)"><line x1="4" y1="18" x2="20" y2="18"></line></svg>
          Underline
        </button>
        <button class="bh-menu-btn bh-btn-wavy" title="Underline Blue Wavy">
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(59, 130, 246, 1)"><path d="M4 18 Q 8 15, 12 18 T 20 18"></path></svg>
          Wavy
        </button>
        <div class="bh-menu-divider"></div>
        <button class="bh-menu-btn bh-btn-note" title="Write Thought">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          Note
        </button>
        <button class="bh-menu-btn bh-btn-copy" title="Copy text">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        </button>
      </div>
      <div class="bh-note-form">
        <textarea placeholder="Write your thoughts..."></textarea>
        <div class="bh-form-actions">
          <button class="bh-cancel-btn">Cancel</button>
          <button class="bh-save-btn">Save</button>
        </div>
      </div>
    `
    document.body.appendChild(menu)
  }

  // 2. Comments panel
  if (!document.getElementById("bh-comments-panel")) {
    const panel = document.createElement("div")
    panel.id = "bh-comments-panel"
    panel.innerHTML = `
      <div class="bh-comments-header">
        <span>Comments & Thoughts</span>
        <button class="bh-close-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="bh-quote-box"></div>
      <div class="bh-comments-list"></div>
    `
    document.body.appendChild(panel)
    panel.querySelector(".bh-close-btn")?.addEventListener("click", () => {
      panel.style.display = "none"
      document.querySelectorAll(".bookhub-highlight.bh-active").forEach(el => {
        el.classList.remove("bh-active")
      })
    })
  }

  // 3. Profile button & Settings Modal
  if (!document.querySelector(".bh-user-profile-trigger")) {
    const trigger = document.createElement("button")
    trigger.className = "bh-user-profile-trigger"
    trigger.title = "Annotations Profile Settings"
    trigger.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    `
    document.body.appendChild(trigger)
  }

  if (!document.getElementById("bh-nickname-modal")) {
    const modal = document.createElement("div")
    modal.id = "bh-nickname-modal"
    modal.innerHTML = `
      <div class="bh-modal-content">
        <h3>Reader Profile</h3>
        <p>Set a nickname to represent your notes and highlights:</p>
        <input type="text" placeholder="Enter nickname..." />
        <div class="bh-modal-actions">
          <button class="bh-modal-cancel">Cancel</button>
          <button class="bh-modal-save">Save</button>
        </div>
      </div>
    `
    document.body.appendChild(modal)
  }
}
