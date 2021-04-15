class Player {
  mark = '✗';
  constructor(mark) {
    this.mark = mark;
  }

  GetMark() {
    return this.mark;
  }

  ChangeMark() {
    this.mark == '✗' ? this.mark = '☢' : this.mark = '✗';
  }

  ResetMark() {
    this.mark = '✗';
  }
}

export function NewPlayer(mark = '✗') {
  return new Player(mark);
}