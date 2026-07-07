// WeChat Reading mobile layout script
document.addEventListener("nav", () => {
  // Ensure this runs only on mobile/tablet screens
  if (window.innerWidth > 800) {
    // Clean up if resized to desktop
    const existingBar = document.querySelector(".wechat-bottom-bar")
    if (existingBar) existingBar.remove()
    document.body.classList.remove("wechat-menu-active")
    return
  }

  // Define key selectors
  const body = document.body
  const html = document.documentElement

  // 1. Setup Font Size State
  let currentFontSize = parseInt(localStorage.getItem("wechat-font-size") || "17")
  const minFontSize = 14
  const maxFontSize = 24

  function updateFontSize() {
    html.style.setProperty("--wechat-font-size", `${currentFontSize}px`)
    localStorage.setItem("wechat-font-size", String(currentFontSize))
  }
  updateFontSize()

  // 2. Inject WeChat Bottom Bar if not already present
  let bottomBar = document.querySelector(".wechat-bottom-bar")
  if (!bottomBar) {
    bottomBar = document.createElement("div")
    bottomBar.className = "wechat-bottom-bar"
    bottomBar.innerHTML = `
      <button class="wechat-btn" id="wechat-btn-toc" aria-label="Table of Contents">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-list"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
      </button>
      <button class="wechat-btn" id="wechat-btn-search" aria-label="Search">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-search"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
      </button>
      <button class="wechat-btn" id="wechat-btn-font-dec" aria-label="Decrease Font Size" style="font-size: 14px; font-weight: 500;">A-</button>
      <button class="wechat-btn" id="wechat-btn-font-inc" aria-label="Increase Font Size" style="font-size: 17px; font-weight: 600;">A+</button>
      <button class="wechat-btn" id="wechat-btn-theme" aria-label="Toggle Theme">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
      </button>
    `
    body.appendChild(bottomBar)
  }

  // 3. Add Event Listeners for Bottom Bar Buttons
  const btnToc = document.getElementById("wechat-btn-toc")
  const btnSearch = document.getElementById("wechat-btn-search")
  const btnFontDec = document.getElementById("wechat-btn-font-dec")
  const btnFontInc = document.getElementById("wechat-btn-font-inc")
  const btnTheme = document.getElementById("wechat-btn-theme")

  btnToc?.addEventListener("click", (e) => {
    e.stopPropagation()
    // Trigger mobile explorer sidebar
    const toggleButton = document.querySelector(".explorer-toggle.mobile-explorer") as HTMLButtonElement | null
    if (toggleButton) {
      toggleButton.click()
    }
  })

  btnSearch?.addEventListener("click", (e) => {
    e.stopPropagation()
    // Open search modal
    const searchButton = document.querySelector(".search-button") as HTMLButtonElement | null
    if (searchButton) {
      searchButton.click()
    }
  })

  btnFontDec?.addEventListener("click", (e) => {
    e.stopPropagation()
    if (currentFontSize > minFontSize) {
      currentFontSize -= 1
      updateFontSize()
    }
  })

  btnFontInc?.addEventListener("click", (e) => {
    e.stopPropagation()
    if (currentFontSize < maxFontSize) {
      currentFontSize += 1
      updateFontSize()
    }
  })

  btnTheme?.addEventListener("click", (e) => {
    e.stopPropagation()
    // Toggle darkmode
    const darkmodeButton = document.querySelector(".darkmode") as HTMLButtonElement | null
    if (darkmodeButton) {
      darkmodeButton.click()
    }
  })

  // 4. Tap to Toggle Menus logic
  function handleTap(e: MouseEvent) {
    const target = e.target as HTMLElement | null
    if (!target) return

    // Avoid toggling menus when clicking interactive elements:
    // - Links (a)
    // - Buttons (button)
    // - Highlight markers (.bookhub-highlight)
    // - Comments section (.giscus, giscus-widget)
    // - Search modal
    // - Nickname modals, etc.
    const isInteractive = target.closest("a, button, input, textarea, select, .bookhub-highlight, #giscus, giscus-widget, .search-container, .mobile-explorer, #bh-selection-menu, #bh-comments-panel, #bh-nickname-modal")
    
    if (!isInteractive) {
      body.classList.toggle("wechat-menu-active")
    }
  }

  // Listen to clicks on the center content area or article
  const centerArea = document.querySelector(".page > #quartz-body .center") as HTMLElement | null
  if (centerArea) {
    centerArea.addEventListener("click", handleTap)
    window.addCleanup(() => {
      centerArea.removeEventListener("click", handleTap)
      const existingBar = document.querySelector(".wechat-bottom-bar")
      if (existingBar) existingBar.remove()
      document.body.classList.remove("wechat-menu-active")
    })
  }
})
