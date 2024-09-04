"use strict"
import btnTheme from "./components/btn-theme.js"
import details from "./utils/details.js"
import { POT_KEY } from "./utils/local-storage-keys.js"

btnTheme()

let chips = localStorage.getItem(POT_KEY)
  ? parseInt(localStorage.getItem(POT_KEY))
  : 100
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
const messageEl = document.getElementById("message-el")
const cardsSum = document.getElementById("cards-sum")
const sumEl = document.getElementById("sum-el")
const cardsEl = document.getElementById("cards-el")
const playerChips = document.getElementById("player-chips")
const btnStartGame = document.getElementById("btn-start-game")
const btnNewCard = document.getElementById("btn-new-card")
const aceDialog = document.getElementById("ace-dialog")

playerChips.textContent = chips

function getRandomCard() {
  const randomNumber = Math.floor(Math.random() * 13) + 1
  if (randomNumber > 10 && randomNumber !== 11) {
    return 10
  } else if (randomNumber === 1 || randomNumber === 11) {
    aceDialog.setAttribute("open", "")

    document.getElementById("one").checked = true

    return new Promise((resolve) => {
      aceDialog.addEventListener(
        "close",
        () => {
          const aceValue = document.querySelector(
            'input[name="ace"]:checked'
          ).value
          const aceValueNumber = Number(aceValue)
          resolve(aceValueNumber)
        },
        { once: true }
      )
    })
  } else {
    return randomNumber
  }
}

// Handling async logic in button event listeners
btnStartGame.addEventListener("click", async () => {
  cards = []
  sum = 0
  isAlive = true
  hasBlackJack = false

  const firstCard = await getRandomCard()
  const secondCard = await getRandomCard()
  cards = [firstCard, secondCard]
  sum = firstCard + secondCard

  if (sum !== 21) {
    btnNewCard.removeAttribute("disabled")
    btnStartGame.setAttribute("disabled", "")
  }

  renderGame()
  cardsSum.classList.remove("cards-sum")
})

btnNewCard.addEventListener("click", async () => {
  if (isAlive === true && hasBlackJack === false) {
    const card = await getRandomCard()
    sum += card
    cards.push(card)
    renderGame()
  }

  if (sum >= 21) {
    btnStartGame.removeAttribute("disabled")
  }
})

function renderGame() {
  cardsEl.textContent = "Cards: "
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " "
  }
  sumEl.textContent = "Sum: " + sum
  outcomes()
  messageEl.textContent = message
}

function outcomes() {
  if (sum <= 20) {
    playerChips.textContent = chips
    btnNewCard.removeAttribute("disabled")
    message = "Do you want to draw a new card?"
  } else if (sum === 21) {
    chips = chips + 25
    playerChips.textContent = chips
    btnNewCard.setAttribute("disabled", "")
    message = "You've got Blackjack! You win £25"
    hasBlackJack = true
    cardsSum.classList.add("cards-sum")
  } else {
    chips = chips - 5
    playerChips.textContent = chips
    btnNewCard.setAttribute("disabled", "")
    message = "You're out of the game! You lose £5"
    isAlive = false
    hasBlackJack = false
    cardsSum.classList.add("cards-sum")
  }

  localStorage.setItem(POT_KEY, chips)
}

/** Rules of the game */
function gameRules() {
  details("rules", "summary", "summary-status", "close")
}
gameRules()
