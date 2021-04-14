class Game {
  #board = null;
  #player = null;
  #modal = null;
  constructor(board, player) {
    this.#board = board;
    this.#player = player;
    this.#modal = document.querySelector('#modal');
  }

  #sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  #BuilEventListeners = () => {
    for (let cell of this.#board.GetCells()) {
      cell.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        this.#board.MarkBoard(id, this.#player.GetMark());
        this.IsOver();
      });
    }
  }

  PlayGame() {
    this.#board.BuildBoard();
    this.#board.DisplayBoard();
    this.#BuilEventListeners();
  }

  CleanBoard() {
    this.#board.CleanBoard();
  }

  #EndRound = async (message) => {
    const modalText = this.#modal.querySelector('#modalText');
    modalText.textContent = message;
    await this.#sleep(200);
    this.#modal.style.display = 'flex';
    await this.#sleep(1900);
    this.#modal.style.display = 'none';
    this.CleanBoard();
  }

  async IsOver() {
    if (this.#board.IsTie()) return this.#EndRound('Tie!');
  }
}

export function NewGame(board, player = null) {
  return new Game(board, player);
}