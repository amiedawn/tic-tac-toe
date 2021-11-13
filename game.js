const cellElements = document.querySelectorAll("[data-cell]");
const boardElement = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.getElementById("winningMessageText");
let isPlayer_O_Turn = false;

const PLAYER_X_CLASS = "x";
const PLAYER_O_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// x plays first all other characters are removed from play temporarily; set up event triggers
function startGame() {
  isPlayer_O_Turn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(PLAYER_X_CLASS);
    cell.classList.remove(PLAYER_O_CLASS);
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
};

// handle mouse clicks for each cell; save current turn
function handleCellClick(e) {
  const cell = e.target;
  // if O's turn, use player o class; if not, use player x class
  const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS;
  placeMark(cell, currentClass);
  // compare the winning combos to the current class: if match, win; if draw, end; otherwise, switch turn
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
};

// end game function
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "It's a draw!"
  } else {
    winningMessageTextElement.innerText = `Player ${isPlayer_O_Turn ? "O" : "X"} wins!`
  }
  winningMessageElement.classList.add("show");
};

// returns the value of the array to see if there is a draw
function isDraw() {
  // check every element of array to confirm condition by returning true if it passes test
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(PLAYER_X_CLASS) ||
      cell.classList.contains(PLAYER_O_CLASS)
    );
  });
};

// place x or o in the cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
};

// switch turns after x or o is placed in cell
function swapTurns() {
  isPlayer_O_Turn = !isPlayer_O_Turn;
};

// set cursor hovering effect on board; makes game more responsive
function setBoardHoverClass() {
  boardElement.classList.remove(PLAYER_X_CLASS);
  boardElement.classList.remove(PLAYER_O_CLASS);
  if (isPlayer_O_Turn) {
    boardElement.classList.add(PLAYER_O_CLASS);
  } else {
    boardElement.classList.add(PLAYER_X_CLASS);
  }
};

// check if our current board matches any of the winning combinations
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
};

// listen for button click to start game
restartButton.addEventListener("click", startGame);

// call function to start the game
startGame();


