// Select all elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true: O's turn, false: X's turn
let count = 0; // Track moves for draw

// All possible winning patterns
let winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset game state
let resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Handle box clicks

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      box.style.color = "blue"; // Set color for O
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      box.style.color = "red"; // Set color for X
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Draw message
let gameDraw = () => {
  msg.innerText = "Game was a Draw.";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Disable all boxes
let disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable and clear all boxes
let enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Show winner message
let showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check for winner
let checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let valA = boxes[a].innerText;
    let valB = boxes[b].innerText;
    let valC = boxes[c].innerText;

    if (valA && valA === valB && valA === valC) {
      showWinner(valA);
      return true;
    }
  }
  return false;
};

// Add event listeners for buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
