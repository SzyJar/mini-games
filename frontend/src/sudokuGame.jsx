import React, { Component } from 'react';
import Sudoku from './controllers/sudoku/sudoku'
import './assets/sudoku.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'


const difficulties = {
  "easy": 15,
  "medium": 27,
  "hard": 35 
}

class SudokuGame extends Component {
  componentDidMount() {
    this.generateNew();
    this.animateCells();
  }

  constructor() {
    super();
      this.sudoku = new Sudoku();
      this.state = {
        board: new Array(9).fill(null).map(
          () => new Array(9).fill(0)
        ),
        solution_mask: new Array(9).fill(null).map(
          () => new Array(9).fill(true)
        ),
        edit_mask: new Array(9).fill(null).map(
          () => new Array(9).fill(true)
        ),
        difficulty: difficulties.easy,
        animateIndex: 0,
      }
  }

  changeScreen = () => {
    this.props.back('welcome');
  }

  generateNew = () => {
    this.sudoku.generateNewSolution();
    this.sudoku.modyfiBoard(this.sudoku.solution);
    this.sudoku.newProblem(this.state.difficulty);
    this.setState({
      board: this.sudoku.board,
      edit_mask: this.sudoku.board.map((row) =>
      row.map((value) => value === 0)),
      solution_mask: new Array(9).fill(null).map(
        () => new Array(9).fill(true)),
      win_message: false,
      animateIndex: 0
    }, () => this.animateCells())
  }

  validate = () => {
    this.sudoku.modyfiBoard(this.sudoku.board);
    this.sudoku.validate();
    this.setState({
      solution_mask: this.sudoku.validation_board,
    }, () => {
      if(this.sudoku.validation_board.every(row => row.every(value => value === true))
      && this.sudoku.board.every(row => row.every(value => value > 0))) {
        this.setState({ win_message: true });
      }
    })
  }

  closeModal = () => {
    this.setState({ win_message: false });
  };

  handleCellChange = (rowIndex, colIndex, content) => {
    const newBoard = [...this.state.board];
    const newSolutionMask = [...this.state.solution_mask]
    const new_value = parseInt(content[0])

    newBoard[rowIndex][colIndex] = 0;

    if (new_value >= 0 && new_value <= 9) {
      newBoard[rowIndex][colIndex] = new_value;
      newSolutionMask[rowIndex][colIndex] = true;
    }
    
    this.setState({
      board: newBoard,
      solution_mask: newSolutionMask
    })
  }

  animateCells = () => {
    const animateIndex = this.state.animateIndex;

    if (animateIndex < (this.state.board.length * this.state.board[0].length)) {
      this.setState({ animateIndex: animateIndex + 1 });

      setTimeout(this.animateCells, 30);
    }
  };

  changeToEasy = () => {
    this.setState({ difficulty: difficulties.easy });
  }

  changeToMedium = () => {
    this.setState({ difficulty: difficulties.medium });
  }

  changeToHard= () => {
    this.setState({ difficulty: difficulties.hard });
  }

  render() {
    return (
      <div className='sudoku-game'>
         <button className='back' onClick={this.changeScreen}>
          < FontAwesomeIcon icon={faArrowLeftLong} />
        </button>
        <div className="grid">
          {this.state.win_message && (
            <div className="modal">
              <div className="modal-content">
                <p>Congratulations!</p>
                <div className='victory' />
                <p>You have completed the puzzle!</p>
                <button onClick={this.closeModal}>Close</button>
              </div>
            </div>
          )}
          {this.state.board.map((row, rowIndex) => (
            <div key={rowIndex} className='row'>
              {row.map((cellValue, colIndex) => (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  className={`cell
                    ${this.state.solution_mask[rowIndex][colIndex] ? '' : 'red'}
                    ${this.state.edit_mask[rowIndex][colIndex] ? 'edit' : '' }
                    ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'bottom-border-bold' : ''}
                    ${colIndex % 3 === 2 && colIndex !== 8 ? 'right-border-bold' : ''}
                    ${this.state.animateIndex >= rowIndex * colIndex ? 'cell-appear active' : ''}`}
                  type="text"
                  value={cellValue > 0 && cellValue <= 9  ? cellValue : ''}
                  onChange={event => this.handleCellChange(rowIndex, colIndex, event.target.value)}
                  readOnly={!this.state.edit_mask[rowIndex][colIndex]}
                />
              ))}
            </div>
          ))}
          <div className="options">
            <button onClick={this.generateNew}>Generate new</button>
            <button onClick={this.validate}>Check my solution</button>
            <div className="difficulty">
              <button className={`${this.state.difficulty === difficulties.easy ? 'active': ''}`}
              onClick={this.changeToEasy}>Easy</button>
              <button className={`${this.state.difficulty === difficulties.medium ? 'active': ''}`}
              onClick={this.changeToMedium}>Medium</button>
              <button className={`${this.state.difficulty === difficulties.hard ? 'active': ''}`}
              onClick={this.changeToHard}>Hard</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SudokuGame;