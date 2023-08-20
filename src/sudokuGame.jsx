import React, { Component } from 'react';
import Sudoku from './controllers/sudoku/sudoku'
import './assets/sudoku.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

const difficulties = {
  "easy": 30,
  "medium": 40,
  "hard": 60 
}

class SudokuGame extends Component {
  constructor() {
    super();
      this.sudoku = new Sudoku();
      this.state = {
        board: new Array(9).fill(null).map(
          () => new Array(9).fill(0)
        ),
        mask: new Array(9).fill(null).map(
          () => new Array(9).fill(true)
        ),
        difficulty: difficulties.easy
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
    })
  }

  validate = () => {
    this.sudoku.validate();
    this.setState({
      mask: this.sudoku.validation_board,
    })
  }

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
          {this.state.board.map((row, rowIndex) => (
            <div key={rowIndex} className='row'>
              {row.map((cellValue, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`}
                 className={`cell
                 ${this.state.mask[rowIndex][colIndex] === false ? 'red' : ''}
                 ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'bottom-border-bold' : ''}
                 ${colIndex % 3 === 2 && colIndex !== 8 ? 'right-border-bold' : ''}`}>
                  {cellValue > 0 ? cellValue : null}
                </div>
              ))}
            </div>
          ))}
          <div className="options">
            <button onClick={this.generateNew}>Generate new</button>
            <button onClick={this.validate}>Check solution</button>
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