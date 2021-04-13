import { game } from './modules/game.js';
import { newBoard } from './modules/gameboard.js';

const board = newBoard();
window.board = board;
board.BuildBoard();
board.DisplayBoard();

for (let cell of board.GetCells()) {
  cell.addEventListener('click', (e) => console.log(e.target.dataset.id));
}

