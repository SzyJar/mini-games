class Sudoku {
  constructor() {
    this.board = new Array(9).fill(null).map(
      () => new Array(9).fill(0)
    );
  }

  toString() {
    let output = 'Sudoku board state:\n'
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        output += this.board[row][col];
        output +=  ' ';
      }
        output += '\n';
      }
    return output;
  }

  modyfiboard(new_board) {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (new_board[row]
            && new_board[row][col]
            && new_board[row][col] <= 9
            && new_board[row][col] >= 0) {
          this.board[row][col] = new_board[row][col];
        }
      }
    }
  }

  validate() {
    this.validation_board = new Array(9).fill(null).map(
      () => new Array(9).fill(0)
    );
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        this.board[row][col] = Math.floor(Math.random() * 9);
      }
    }
  }

  generateNew() {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        this.board[row][col] = Math.floor(Math.random() * 9);
      }
    }
  }

}

export default Sudoku;