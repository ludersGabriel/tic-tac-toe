import { NewGame } from './modules/game.js';
import { newBoard } from './modules/gameboard.js';
import { NewPlayer } from './modules/player.js';

const board = newBoard();
const player = NewPlayer();
const game = NewGame(board, player);

window.board = board;
window.game = game;
window.player = player;

game.PlayGame();



