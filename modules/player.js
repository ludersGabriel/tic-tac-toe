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

  SetMark(c) {
    if (c != '✗' && c != '☢') return;

    this.mark = c;
  }

  ResetMark() {
    this.mark = '✗';
  }
}

export function NewPlayer(mark = '✗') {
  return new Player(mark);
}