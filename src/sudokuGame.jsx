import React, { Component } from 'react';
import Sudoku from './controllers/sudoku/sudoku'


class SudokuGame extends Component {
  constructor() {
    super();
      this.sudoku = new Sudoku();
      this.state = {
 
      }
  }



  render() {
    return (
      <div>

      </div>
    );
  }
}

export default SudokuGame;