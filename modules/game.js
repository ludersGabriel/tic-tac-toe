class Game {
  board = null;
  player = null;
  modal = null;
  body = null;
  configButtons = null;
  cpu = null;
  constructor(board, player, cpu) {
    this.board = board;
    this.player = player;
    this.cpu = cpu;
    this.modal = document.querySelector('#modal');
    this.body = document.querySelector('#body');
    this.configButtons = document.querySelector('#configButtons');
  }

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  BuildEventListeners = () => {
    for (let cell of this.board.GetCells()) {
      cell.addEventListener('click', async (e) => {
        if (cell.textContent) return;
        const id = e.target.dataset.id;
        this.board.MarkBoard(id, this.player.GetMark());

        if (this.IsOver()) return;

        await this.sleep(100);
        this.board.MarkBoard(this.cpu.FindBestMove(), this.cpu.maxPlayer);
        this.IsOver();

      });
    }

    for (let button of this.configButtons.children) {
      button.addEventListener('click', () => {
        for (let button of this.configButtons.children)
          button.classList.remove('selected');
        button.classList.toggle('selected');

        this.player.SetMark(button.textContent);
        if (button.textContent == this.cpu.maxPlayer)
          this.cpu.SwitchPlayers();

        this.CleanBoard();
      })
    }

  }

  PlayGame() {
    this.board.BuildBoard();
    this.board.DisplayBoard();
    this.BuildEventListeners();
  }

  async CleanBoard() {
    this.board.CleanBoard();
    this.cpu.UpdateImaginaryBoard();
    if (this.cpu.maxPlayer == '✗') {
      await this.sleep(200);
      const id = 9 * Math.random() << 0;
      this.board.MarkBoard(id, this.cpu.maxPlayer);
    }
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

  IsOver() {
    const player = this.board.IsWin();
    if (player) return this.EndRound(`${player} won!`);
    if (this.board.IsTie()) return this.EndRound('Tie!');
  }
}

export function NewGame(board, player = null, cpu) {
  return new Game(board, player, cpu);
}