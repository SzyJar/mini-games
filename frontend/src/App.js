import './assets/App.scss';
import WelcomeScren from './welcome'
import React, { Component } from 'react';
import RpsGame from './rpsGame'
import SudokuGame from './sudokuGame'
import ShooterGame from './shooterGame'


class App extends Component {
  constructor() {
    super();
    this.state = {
      game: 'welcome',
    }
  }

  changeScreen = (name) => {
    this.setState({ game: name });
  }

  render() {
    return (
      <div className="App">
        <div className="App-body">
        { this.state.game === 'rps' ? <RpsGame back={this.changeScreen}/>
        : this.state.game === 'sudoku' ? <SudokuGame back={this.changeScreen}/>
        : this.state.game === 'shooter' ? <ShooterGame back={this.changeScreen}/>
        : <WelcomeScren change={this.changeScreen} /> }
        </div>
      </div>
  )};
}

export default App;
