/**
Connect4

Connect4 is a game where two players take turns placing a token on columns that drop to the bottom.
When a player forms 4 of his tokens in a line
- horizontally, vertically,or diagonally - the player wins.

[Visualization](https://i.ebayimg.com/images/g/DzMAAOSwSjxj6m0e/s-l1600.jpg)

Implement Connect 4 with the class below.
*/

const cv = require('@techstark/opencv-js');

const PLAYER_ONE = 1;
const PLAYER_TWO = -1;

const BOARD_SIZE_X = 6;
const BOARD_SIZE_Y = 7;

const PATTERN_HORIZONTAL = [
  [1, 1, 1, 1],
];

const PATTERN_VERTICAL = [
  [1],
  [1],
  [1],
  [1],
];

const PATTERN_ADIAGONAL = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const PATTERN_BDIAGONAL = [
  [0, 0, 0, 1],
  [0, 0, 1, 0],
  [0, 1, 0, 0],
  [1, 0, 0, 0],
];

const PATTERNS = [
  PATTERN_VERTICAL,
  PATTERN_HORIZONTAL,
  PATTERN_ADIAGONAL,
  PATTERN_BDIAGONAL,
];

class Connect4 {
  board;

  player;

  winner;

  constructor() {
    this.player = PLAYER_ONE;
    this.board = Array.from({ length: BOARD_SIZE_Y }, () => Array(BOARD_SIZE_X).fill(0));
  }

  play(col) {
    for (let row = BOARD_SIZE_Y - 1; row >= 0; row--) {
      if (!this.board[row][col]) {
        this.board[row][col] = this.player;
        break;
      }
    }
    this.player = this.player === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
  }

  async checkWinner() {
    await new Promise((resolve) => cv.onRuntimeInitialized = resolve);
    const mat = cv.matFromArray(BOARD_SIZE_Y, BOARD_SIZE_X, cv.CV_32F, this.board.flat());

    PATTERNS.forEach((pattern) => {
      const pat = cv.matFromArray(pattern.length, pattern[0].length, cv.CV_32F, pattern.flat());
      const result = new cv.Mat();
      cv.filter2D(mat, result, -1, pat, new cv.Point(0, 0), 0, cv.BORDER_CONSTANT);
      const minMax = cv.minMaxLoc(result);
      const { minVal, maxVal } = minMax;
      if (minVal === -4) {
        this.winner = PLAYER_TWO;
      } else if (maxVal === 4) {
        this.winner = PLAYER_ONE;
      }

      pat.delete();
      result.delete();
    });

    mat.delete();
  }

  async print() {
    console.table(this.board);
    await this.checkWinner();
    console.log(`WINNER: ${this.winner}`);
  }
}

const game = new Connect4();

// VERTICAL
// game.play(1);
// game.play(5);
// game.play(1);
// game.play(5);
// game.play(1);
// game.play(5);
// game.play(2);
// game.play(5);

// HORIZONTAL
game.play(1);
game.play(1);
game.play(2);
game.play(2);
game.play(3);
game.play(3);
game.play(4);

// DIAGONAL
// game.play(1);
// game.play(2);
// game.play(2);
// game.play(3);
// game.play(3);
// game.play(4);
// game.play(3);
// game.play(4);
// game.play(4);
// game.play(5);
// game.play(4);

game.print();
