const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let cells = Array(9).fill(null);
let isGameOver = false;

function createBoard() {
  board.innerHTML = '';
  cells.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleClick, { once: true });
    board.appendChild(cell);
  });
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (isGameOver || cells[index]) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    isGameOver = true;
    return;
  }

  if (cells.every(cell => cell)) {
    status.textContent = "It's a tie!";
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Columns
    [0,4,8], [2,4,6]           // Diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[b] === cells[c];
  });
}

resetBtn.addEventListener('click', () => {
  currentPlayer = 'X';
  cells = Array(9).fill(null);
  isGameOver = false;
  createBoard();
});

createBoard();
