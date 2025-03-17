const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');
const resultDisplay = document.getElementById('game-result');
const aiToggle = document.getElementById('ai-toggle');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Create game board dynamically
function createBoard() {
    board.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-index', index);
        square.addEventListener('click', handleSquareClick);
        board.appendChild(square);
    });
}

// Handle a square click
function handleSquareClick(e) {
    const index = e.target.getAttribute('data-index');
    if (gameBoard[index] !== '' || !isGameActive || currentPlayer === 'O' && aiToggle.checked) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        isGameActive = false;
        resultDisplay.textContent = `${currentPlayer} wins!`;
        highlightWinningCells();
    } else if (!gameBoard.includes('')) {
        resultDisplay.textContent = 'It\'s a draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O' && aiToggle.checked) {
            setTimeout(computerMove, 500); // Let computer play after a short delay
        }
    }
}

// Check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c] && gameBoard[a] !== '') {
            return pattern;
        }
        return false;
    });
}

// Highlight the winning cells
function highlightWinningCells() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const winningPattern = winPatterns.find(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c] && gameBoard[a] !== '';
    });

    if (winningPattern) {
        const [a, b, c] = winningPattern;
        document.querySelectorAll('.square')[a].classList.add('winner');
        document.querySelectorAll('.square')[b].classList.add('winner');
        document.querySelectorAll('.square')[c].classList.add('winner');
    }
}

// Computer move logic
function computerMove() {
    const availableSpots = gameBoard.map((cell, index) => (cell === '' ? index : null)).filter(val => val !== null);
    const randomIndex = availableSpots[Math.floor(Math.random() * availableSpots.length)];
    gameBoard[randomIndex] = 'O';
    document.querySelectorAll('.square')[randomIndex].textContent = 'O';

    if (checkWinner()) {
        isGameActive = false;
        resultDisplay.textContent = 'O wins!';
        highlightWinningCells();
    } else if (!gameBoard.includes('')) {
        resultDisplay.textContent = 'It\'s a draw!';
    } else {
        currentPlayer = 'X';
    }
}

// Restart the game
restartBtn.addEventListener('click', () => {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    resultDisplay.textContent = '';
    createBoard();
});

createBoard();
