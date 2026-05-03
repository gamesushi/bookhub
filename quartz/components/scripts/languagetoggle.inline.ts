const userLangPref = localStorage.getItem("language") ?? "en"
document.documentElement.setAttribute("saved-language", userLangPref)

// Hide/show content based on language
const updateLanguageDisplay = (lang: string) => {
  // We now use CSS based on [saved-language] attribute on html element
  // styles are defined in custom.scss
  
  // Update button text
  const langTexts = document.querySelectorAll('.lang-text')
  langTexts.forEach(text => {
    text.textContent = lang === 'en' ? 'EN' : '中'
  })
}

// Initial display update
updateLanguageDisplay(userLangPref)

const emitLanguageChangeEvent = (lang: string) => {
  const event = new CustomEvent("languagechange", {
    detail: { language: lang },
  })
  document.dispatchEvent(event)
}

document.addEventListener("nav", () => {
  const currentLang = localStorage.getItem("language") ?? "en"
  updateLanguageDisplay(currentLang)
  
  const switchLanguage = () => {
    const newLang =
      document.documentElement.getAttribute("saved-language") === "en" ? "zh" : "en"
    document.documentElement.setAttribute("saved-language", newLang)
    localStorage.setItem("language", newLang)
    updateLanguageDisplay(newLang)
    emitLanguageChangeEvent(newLang)
  }

  for (const langButton of document.getElementsByClassName("language-toggle")) {
    langButton.addEventListener("click", switchLanguage)
    window.addCleanup(() => langButton.removeEventListener("click", switchLanguage))
  }
})
