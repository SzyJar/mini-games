class Sudoku {
  constructor() {
    this.board = new Array(9).fill(null).map(
      () => new Array(9).fill(0)
    );
    this.validation_board = new Array(9).fill(null).map(
      () => new Array(9).fill(true)
    );
    this.solution = new Array(9).fill(null).map(
      () => new Array(9).fill(0)
    );
  }

  // Convert board to string for easy description
  toString(board = this.board) {
    let output = 'Sudoku board state:\n'
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        output += board[row][col];
        output +=  ' ';
      }
        output += '\n';
      }
    return output;
  }

  // Modyfi board based on input
  modyfiBoard(new_board) {
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

  // Validate board in relation to solution
  validate() {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if(this.board[row][col] === 0 || this.board[row][col] === this.solution[row][col]) {
          this.validation_board[row][col] = true;
        } else {
          this.validation_board[row][col] = false;
        }
      }
    }
  }

  // Is a number not colliding with existing board?
  isValidMove(board, value, index_row, index_col) {
    // Column Check
    for (let col = 0; col < board.length; col++) {
      if (value === board[index_row][col]) {
        return false;
      }
    }
    
    // Row Check
    for (let row = 0; row < board[0].length; row++) {
      if(value === board[row][index_col]) {
        return false;
      }
    }

    // Subgrid Check
    if (index_row === 0) { index_row = 1 };
    if (index_col === 0) { index_col = 1 };
    const startRow = Math.floor(index_row / 3) * 3;
    const startCol = Math.floor(index_col / 3) * 3;
    for (let row = startRow; row < startRow + 3; row++) {
      for (let col = startCol; col < startCol + 3; col++) {
        if(value === board[row][col]) {
          return false;
        }
      }
    }

    return true;
  }

  // Has sudoku one solution?
  hasUniqueSolution(input_board) {
    const board = JSON.parse(JSON.stringify(input_board));
    const emptyCell = findEmptyCell(board);

    if (!emptyCell) {
      return true;
    }
  
    const [row, col] = emptyCell;
  
    for (let num = 1; num <= 9; num++) {
      if (this.isValidMove(board, num, row, col)) {
        board[row][col] = num;
  
        if (this.hasUniqueSolution(board)) {
          return true;
        }

        // Backtrack
        board[row][col] = 0;
      }
    }
  
    // No solution found, backtrack
    return false;
  }

  // Generate new problem for player
  newProblem(difficulty) {
    let row, col;
    for (let i = 0; i < difficulty; i++) {
      row = Math.floor(Math.random() * 9);
      col = Math.floor(Math.random() * 9);
      this.board[row][col] = 0;
      if (!this.hasUniqueSolution(this.board)){
        this.board[row][col] = this.solution[row][col];
      } 
    }
  }

  // Generate new sudoku solution
  generateNewSolution() {
    const generated_board = new Array(9).fill(null).map(
      () => new Array(9).fill(0)
    );

    const numbers = Array.from({ length: 9 }, (_, index) => index + 1);
    const randomOrder = new Array(9).fill(null).map(
      () => new Array(9).fill(null).map(() => {
        return {
          values: shuffleArray([...numbers]),
          index: 0
        }
      })
    );

    let stop = 0;
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        stop += 1;
        if (stop === 3000) {
          console.log("Problem generation failed, loop iteration limit exceeded: ", stop);
          return false;
        }

        // Try inserting next number, random order
        for (let i = randomOrder[row][col].index; i < randomOrder[row][col].values.length; i++) {
          if (this.isValidMove(generated_board, randomOrder[row][col].values[i], row, col)) {
            generated_board[row][col] = randomOrder[row][col].values[i];
            randomOrder[row][col].index = i;
            break;
          }
          
          generated_board[row][col] = 0;
        }

        // If unsolvable, backtrack
        if (generated_board[row][col] === 0) {
          randomOrder[row][col].index = 0;
          if (col > 0) {
            col -= 2;
          } else {
            col = 7;
            row -= 1;
          }
          if (randomOrder[row][col + 1].index < 8) {
            randomOrder[row][col + 1].index += 1;
          }
        }
      }
    }

    this.solution = generated_board.slice();
  }

}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function findEmptyCell(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }

  return null; // All cells filled
};

export default Sudoku;