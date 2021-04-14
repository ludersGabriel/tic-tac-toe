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
        const id = e.target.dataset.id;
        this.board.MarkBoard(id, this.player.GetMark());
        this.IsOver();
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
  }

  EndRound = async (message) => {
    const modalText = this.modal.querySelector('#modalText');
    modalText.textContent = message;
    await this.sleep(200);
    this.body.style.filter = 'blur(10px)';
    this.modal.style.display = 'flex';
    await this.sleep(1900);
    this.modal.style.display = 'none';
    this.body.style.filter = 'blur(0)';

    this.CleanBoard();
  }

  async IsOver() {
    if (this.board.IsTie()) return this.EndRound('Tie!');
  }
}

export function NewGame(board, player = null) {
  return new Game(board, player);
}