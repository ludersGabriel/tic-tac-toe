class Game {
  board = null;
  player = null;
  modal = null;
  body = null;
  constructor(board, player) {
    this.board = board;
    this.player = player;
    this.modal = document.querySelector('#modal');
    this.body = document.querySelector('#body');
  }

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  BuildEventListeners = () => {
    for (let cell of this.board.GetCells()) {
      cell.addEventListener('click', (e) => {
        if (cell.textContent) return;
        const id = e.target.dataset.id;
        this.board.MarkBoard(id, this.player.GetMark());
        this.IsOver();
        this.player.ChangeMark();
      });
    }
  }

  PlayGame() {
    this.board.BuildBoard();
    this.board.DisplayBoard();
    this.BuildEventListeners();
  }

  CleanBoard() {
    this.board.CleanBoard();
    this.player.ResetMark();
  }

  EndRound = async (message) => {
    const modalText = this.modal.querySelector('#modalText');
    modalText.textContent = message;
    await this.sleep(100);
    this.body.style.filter = 'blur(5px)';
    this.modal.style.display = 'flex';
    await this.sleep(1900);
    this.modal.style.display = 'none';
    this.body.style.filter = 'blur(0)';

    this.CleanBoard();
  }

  async IsOver() {
    const player = this.board.IsWin();
    if (player) return this.EndRound(`${player} won!`);
    if (this.board.IsTie()) return this.EndRound('Tie!');
  }
}

export function NewGame(board, player = null) {
  return new Game(board, player);
}