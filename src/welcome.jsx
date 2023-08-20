import React, { Component } from 'react';


class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      description: 'Hello there! Select the game you are interested in!',
    }
  }
  changeScreenRps = () => {
    this.props.change('rps');
  }

  changeScreenSudoku = () => {
    this.props.change('sudoku');
  }

  render() {
    return (
      <div className='welcome'>
        <div className="description-box">
          <p>{ this.state.description }</p>
        </div>
        <div className="navibar">
          <button className="navi" onClick={this.changeScreenSudoku}>
            <p><br/>Sudoku<br/><br/></p>
          </button>
          <button className="navi" onClick={this.changeScreenRps}>
            <p>Rock Paper Scissors</p>
          </button>
        </div>
      </div>
    );
  }
}

export default WelcomeScreen;