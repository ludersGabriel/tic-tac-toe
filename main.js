import { NewGame } from './modules/game.js';
import { newBoard } from './modules/gameboard.js';
import { NewPlayer } from './modules/player.js';
import { NewCpu } from './modules/cpu.js';

const board = newBoard();
const player = NewPlayer();
const cpu = NewCpu('✗', '☢', board);
const game = NewGame(board, player, cpu);

window.board = board;
window.game = game;
window.player = player;
window.cpu = cpu;

game.PlayGame();



