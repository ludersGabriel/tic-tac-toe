class Player {
  #mark = 'x';
  constructor(mark) {
    this.#mark = mark;
  }

  GetMark() {
    return this.#mark;
  }

  ChangeMark(c) {
    this.#mark = c;
  }
}

export function NewPlayer(mark = 'x') {
  return new Player(mark);
}