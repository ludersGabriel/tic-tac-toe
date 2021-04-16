class Cpu {
  board = null;
  imaginaryBoard = [];
  minPlayer = '✗';
  maxPlayer = '☢';
  constructor(minPlayer, maxPlayer, board) {
    this.minPlayer = minPlayer;
    this.maxPlayer = maxPlayer;
    this.board = board;
  }

  UpdateImaginaryBoard() {
    const cells = this.board.GetCells();
    for (let i = 0; i < 9; i++) {
      this.imaginaryBoard[i] = cells[i].children[0].textContent;
    }
  }


  HasWon(imaginaryBoard) {
    if (!imaginaryBoard.length) return;

    for (let i = 0; i < 9; i += 3) {
      if (imaginaryBoard[i] && imaginaryBoard[i] == imaginaryBoard[i + 1] && imaginaryBoard[i] == imaginaryBoard[i + 2]) {
        return imaginaryBoard[i];
      }
    }

    for (let i = 0; i < 3; i++) {
      if (imaginaryBoard[i] && imaginaryBoard[i] == imaginaryBoard[i + 3] && imaginaryBoard[i] == imaginaryBoard[i + 6]) {
        return imaginaryBoard[i];
      }
    }

    if (imaginaryBoard[0] && imaginaryBoard[0] == imaginaryBoard[4] && imaginaryBoard[0] == imaginaryBoard[8]) {
      return imaginaryBoard[0];
    }

    if (imaginaryBoard[2] && imaginaryBoard[2] == imaginaryBoard[4] && imaginaryBoard[2] == imaginaryBoard[6]) {
      return imaginaryBoard[2];
    }
  }

  EvaluateBoard(imaginaryBoard, depth) {
    if (!imaginaryBoard.length) return 0;

    let ret = this.HasWon(imaginaryBoard);

    if (ret == this.maxPlayer) return 10;
    if (ret == this.minPlayer) return -10;

    return 0;
  }

  HasMoves(imaginaryBoard) {
    for (let cell of imaginaryBoard) {
      if (!cell) return true;
    }

    return false;
  }

  Minimax(board, depth, isMaximazingPlayer) {
    const self = this;

    let score = this.EvaluateBoard(board);
    if (score == 10 || score == -10) return score;

    if (!this.HasMoves(board)) return 0;

    if (isMaximazingPlayer) {
      let bestVal = -Infinity;

      for (let i = 0; i < 9; i++) {
        if (!board[i]) {
          board[i] = this.maxPlayer;
          bestVal = Math.max(bestVal, self.Minimax(board, depth + 1, !isMaximazingPlayer));
          board[i] = '';
        }
      }

      return bestVal;
    }
    else {
      let bestVal = +Infinity;
      for (let i = 0; i < 9; i++) {
        if (!board[i]) {
          board[i] = this.minPlayer;
          bestVal = Math.min(bestVal, self.Minimax(board, depth + 1, !isMaximazingPlayer));
          board[i] = '';
        }
      }
      return bestVal;
    }
  }


  FindBestMove() {
    this.UpdateImaginaryBoard();

    let bestVal = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
      if (!this.imaginaryBoard[i]) {
        this.imaginaryBoard[i] = this.maxPlayer;
        const moveVal = this.Minimax(this.imaginaryBoard, 0, false);
        this.imaginaryBoard[i] = '';

        if (moveVal > bestVal) {
          bestMove = i;
          bestVal = moveVal;
        }
      }
    }

    return bestMove;
  }

}

export function NewCpu(minPlayer = '✗', maxPlayer = '☢', board = null) {
  return new Cpu(minPlayer, maxPlayer, board);
}