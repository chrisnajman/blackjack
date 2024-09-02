# Blackjack Game

# Description

The goal is to achieve a hand value of exactly 21 to win. The game starts with an initial pot of £100, which is saved locally, allowing players to resume their progress at any time. If a player draws an ace, they can choose whether it should be valued at 1 or 11. Players can continue to draw cards as long as their hand value remains below 21. Exceeding 21 results in a £5 deduction from the pot, while hitting exactly 21 awards the player £25.

# Functionality

Players can start a new game, draw additional cards, and see their current hand value and pot balance. The game dynamically updates the player's pot based on their performance and offers a simple decision-making process for handling aces. The pot's value is stored using local storage, ensuring that progress is saved across sessions. Players are guided by clear prompts and messages as they progress through the game.

# Accessibility

The page is fully navigable via the keyboard, and the interface includes accessibility features such as skip links and appropriate ARIA attributes.

## Testing

Tested on Windows 10 with:

- Chrome
- Firefox
- Microsoft Edge

Page tested in both browser and device views.
