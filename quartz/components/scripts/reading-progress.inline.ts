// Reading progress bar — shows reading progress as user scrolls
document.addEventListener("nav", () => {
  // Create the progress bar element if it doesn't exist
  let bar = document.querySelector(".reading-progress-bar") as HTMLElement | null
  if (!bar) {
    bar = document.createElement("div")
    bar.className = "reading-progress-bar"
    document.body.appendChild(bar)
  }

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    if (docHeight <= 0) {
      bar!.style.width = "0%"
      return
    }
    const progress = Math.min((scrollTop / docHeight) * 100, 100)
    bar!.style.width = `${progress.toFixed(1)}%`
  }

  // Update on scroll with requestAnimationFrame for smoothness
  let ticking = false
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true })
  window.addCleanup(() => window.removeEventListener("scroll", onScroll))

  // Initial update
  updateProgress()
})
