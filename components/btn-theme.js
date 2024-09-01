import { THEME_KEY } from "../utils/local-storage-keys.js"

export default function btnTheme() {
  function getStoredTheme() {
    try {
      const storedTheme = localStorage.getItem(THEME_KEY)
      return storedTheme ? JSON.parse(storedTheme) : false
    } catch (error) {
      console.error("Error parsing theme from localStorage:", error)
      return false
    }
  }

  let theme = getStoredTheme()

  function setTheme(newTheme) {
    theme = newTheme
    document.documentElement.classList.toggle("lightmode", theme)
    localStorage.setItem(THEME_KEY, theme)

    // Update the UI based on the theme
    updateUI()
  }

  function handleMode() {
    setTheme(!theme)
  }

  function updateUI() {
    lightSpan.textContent = theme ? " theme active" : " theme inactive"
    darkSpan.textContent = theme ? " theme inactive" : " theme active"
    toggleButton.setAttribute("aria-pressed", theme ? "false" : "true")
  }

  // Access the existing elements from the DOM
  const themeToggler = document.querySelector(".theme-toggler")
  const lightSpan = themeToggler.querySelector(".light .visually-hidden")
  const darkSpan = themeToggler.querySelector(".dark .visually-hidden")
  const toggleButton = themeToggler.querySelector("button")

  // Add event listener for the button
  toggleButton.addEventListener("click", handleMode)

  // Initialize UI state based on stored theme
  setTheme(theme)
}
