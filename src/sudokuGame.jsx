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
      edit_mask: this.sudoku.board.map((row) =>
      row.map((value) => value === 0)),
      solution_mask: new Array(9).fill(null).map(
        () => new Array(9).fill(true)),
      win_message: false
    })
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
    const new_value = parseInt(content[0])

    newBoard[rowIndex][colIndex] = 0;

    if (new_value >= 0 && new_value <= 9) {
      newBoard[rowIndex][colIndex] = new_value;
    }
    
    this.setState({
      board: newBoard
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
          {this.state.win_message && (
            <div className="modal">
              <div className="modal-content">
                <p>Congratulations!</p>
                <img src={require('./assets/img/chibi_victory.png')} alt="RPS Player" />
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
                    ${colIndex % 3 === 2 && colIndex !== 8 ? 'right-border-bold' : ''}`}
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