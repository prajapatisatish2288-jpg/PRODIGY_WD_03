# Tic-Tac-Toe Web App

Modern, responsive Tic-Tac-Toe built with vanilla HTML, CSS, and JavaScript. Play locally with a friend or take on an unbeatable AI powered by the minimax algorithm.

## Features

- Player vs Player and Player vs AI modes
- Live status panel with restart controls
- Animated 3×3 board with winning highlight
- Score tracking for X, O, and draws
- Theme toggle (light / dark) saved in `localStorage`

## Project Structure

```
tic-tac-toe/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── ai.js
│   ├── game.js
│   └── ui.js
├── assets/
│   └── icons/   # place SVG/PNG assets here
└── README.md
```

## Getting Started

1. Clone or download this repository.
2. Open `index.html` in your preferred browser—no build step required.

## Customization Ideas

- Swap `TicTacToeAI.getBestMove` with alternate difficulty logic.
- Add sound effects via the `assets` folder.
- Persist the scoreboard by storing `game.score` in `localStorage`.
- Introduce themed boards (neon, minimal, retro) using CSS variables.

## License

This project is available under the MIT License. Feel free to use it for personal or educational purposes.


