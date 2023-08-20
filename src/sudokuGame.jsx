import React, { Component } from 'react';
import Sudoku from './controllers/sudoku/sudoku'
import './assets/sudoku.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'


class SudokuGame extends Component {
  constructor() {
    super();
      this.sudoku = new Sudoku();
      this.state = {
 
      }
  }

  changeScreen = () => {
    this.props.back('welcome');
  }

  render() {
    return (
      <div className='sudoku-game'>
         <button className='back' onClick={this.changeScreen}>
          < FontAwesomeIcon icon={faArrowLeftLong} />
        </button>
        <div className="grid">
          {this.sudoku.board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cellValue, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`} className="cell">
                  {cellValue}
                </div>
              ))}
            </div>
          ))}
          <div className="options">
            <button onClick={this.generateNew}>Generate new</button>
            <button onClick={this.generateNew}>Check solution</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SudokuGame;