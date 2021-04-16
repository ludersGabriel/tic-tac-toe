import { NewGame } from './modules/game.js';
import { newBoard } from './modules/gameboard.js';
import { NewPlayer } from './modules/player.js';
import { NewCpu } from './modules/cpu.js';

const board = newBoard();
const player = NewPlayer();
const game = NewGame(board, player);
const cpu = NewCpu('✗', '☢', board);

window.board = board;
window.game = game;
window.player = player;
window.cpu = cpu;

game.PlayGame();



