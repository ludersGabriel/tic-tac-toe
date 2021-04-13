class GameBoard {
  #board = null;
  #cells = [];

  constructor() {
    this.#board = document.querySelector('#gameBoard');
  }

  BuildBoard() {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('button');
      cell.setAttribute('data-id', i);
      cell.textContent = ''

      this.#cells.push(cell);
    }

    this.#cells[2].setAttribute('style', 'border-right: none;');
    this.#cells[5].setAttribute('style', 'border-right: none;');
    this.#cells[8].setAttribute('style', 'border-right: none; border-bottom: none')
    this.#cells[7].setAttribute('style', 'border-bottom: none')
    this.#cells[6].setAttribute('style', 'border-bottom: none')
  }

  DisplayBoard() {
    for (let cell of this.#cells) {
      this.#board.appendChild(cell);
    }
  }

  MarkBoard(id, play) {
    if (this.#cells[id].textContent) return;
    this.#cells[id].textContent = play;
  }

  CleanBoard() {
    for (let cell of this.#cells) cell.textContent = '';
  }

  GetCells() {
    return this.#cells;
  }

}

export function newBoard() {
  return new GameBoard();
}