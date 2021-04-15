class GameBoard {
  board = null;
  cells = [];

  constructor() {
    this.board = document.querySelector('#gameBoard');
  }

  BuildBoard() {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('button');
      cell.setAttribute('data-id', i);
      cell.textContent = ''

      const p = document.createElement('p');
      cell.appendChild(p);

      this.cells.push(cell);
    }

    this.cells[2].setAttribute('style', 'border-right: none;');
    this.cells[5].setAttribute('style', 'border-right: none;');
    this.cells[8].setAttribute('style', 'border-right: none; border-bottom: none')
    this.cells[7].setAttribute('style', 'border-bottom: none')
    this.cells[6].setAttribute('style', 'border-bottom: none')
  }

  DisplayBoard() {
    for (let cell of this.cells) {
      this.board.appendChild(cell);
    }
  }

  MarkBoard(id, play) {
    const p = this.cells[id].children[0];
    if (p.textContent) return;
    p.classList.toggle('showCell');
    p.textContent = play;
  }

  CleanBoard() {
    for (let cell of this.cells) {
      cell.children[0].textContent = '';
      cell.children[0].classList.remove('showCell');
    }
  }

  GetCells() {
    return this.cells;
  }

  IsTie() {
    for (let cell of this.cells) {
      if (!cell.textContent) return false;
    }

    return true;
  }

  IsWin() {
    for (let i = 0; i < this.cells.length; i += 3) {
      if (this.cells[i].children[0].textContent &&
        this.cells[i].children[0].textContent == this.cells[i + 1].children[0].textContent &&
        this.cells[i].children[0].textContent == this.cells[i + 2].children[0].textContent)
        return this.cells[i].children[0].textContent;
    }

    for (let i = 0; i < this.cells.length / 3; i++) {
      if (this.cells[i].children[0].textContent &&
        this.cells[i].children[0].textContent == this.cells[i + 3].children[0].textContent &&
        this.cells[i].children[0].textContent == this.cells[i + 6].children[0].textContent)
        return this.cells[i].children[0].textContent;
    }


    if (this.cells[0].children[0].textContent &&
      this.cells[0].children[0].textContent == this.cells[4].children[0].textContent &&
      this.cells[0].children[0].textContent == this.cells[8].children[0].textContent) {
      return this.cells[0].children[0].textContent;
    }

    if (this.cells[2].children[0].textContent &&
      this.cells[2].children[0].textContent == this.cells[4].children[0].textContent &&
      this.cells[2].children[0].textContent == this.cells[6].children[0].textContent) {
      return this.cells[2].children[0].textContent;
    }

    return '';
  }

}

export function newBoard() {
  return new GameBoard();
}