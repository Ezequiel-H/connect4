# Connect 4 (Node.js + OpenCV-JS)

This is a Node.js-based implementation of the classic **Connect 4** game, featuring a smart way to detect the winner using **OpenCV in JavaScript** (`@techstark/opencv-js`)!

## 🚀 Features

- Winner detection is powered by OpenCV's `filter2D`, providing a fast and elegant solution.
- Built using `@techstark/opencv-js`, a WebAssembly-based OpenCV library.
- Clean, modular codebase for flexibility and experimentation.

## ✅ Why Use filter2D Instead of Nested Loops?

- Speed: filter2D is optimized and runs much faster than manual scanning, especially as board size increases.
- Clean Code: Avoids repetitive, error-prone for loop logic for each direction.
- Flexibility: Adding new patterns (e.g., larger match sequences) becomes a matter of defining new kernels.

## 🧩 To-Do / Ideas
- Add playing experience
- Add CLI or browser-based UI
- Add AI opponent using minimax or Monte Carlo tree search
- Score tracking and game history
- Sound effects / animations in browser version

## 🛠 Installation

Clone the repository and install the dependencies:

```bash
git clone git@github.com:Ezequiel-H/connect4.git
cd connect4
npm install

