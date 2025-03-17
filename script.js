const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const restartButton = document.querySelector('.restart');
const message = document.getElementById('message');
const aiToggle = document.getElementById('ai-toggle');
let currentPlayer = 'X';
let gameOver = false;
let aiEnabled = false;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let winningCombination = [];

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      message.textContent = `${currentPlayer} wins!`;
      gameOver = true;
      winningCombination = [a, b, c];
      highlightWinner();
      return;
    }
  }

  if (gameBoard.every(cell => cell)) {
    message.textContent = 'It\'s a tie!';
    gameOver = true;
  }
}

function highlightWinner() {
  winningCombination.forEach(index => {
    cells[index].classList.add('winner-line');
  });
}

function handleCellClick(event) {
  if (gameOver) return;
  const cell = event.target;
  const index = Array.from(cells).indexOf(cell);

  if (!gameBoard[index]) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    
    if (!gameOver && aiEnabled && currentPlayer === 'O') {
      aiMove();
    }
  }
}

function aiMove() {
  const emptyCells = gameBoard
    .map((cell, index) => (cell === '' ? index : null))
    .filter(index => index !== null);

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  gameBoard[randomIndex] = 'O';
  cells[randomIndex].textContent = 'O';
  checkWinner();
  currentPlayer = 'X';
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  message.textContent = '';
  winningCombination = [];
  cells.forEach(cell => cell.classList.remove('winner-line'));
}

function toggleAi() {
  aiEnabled = aiToggle.checked;
  restartGame();
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
aiToggle.addEventListener('change', toggleAi);
