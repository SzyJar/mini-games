import React, { Component } from 'react';
import Rps from './components/rps/rps.js';


class RpsGame extends Component {
  constructor() {
    super();
      this.rps = new Rps();
      this.prev_move = ''
  }

  makeMove = (move) => {
    console.log(this.rps.play(move, this.rps.predict(this.prev_move)));
    this.prev_move = move;
    console.log(this.rps.player_history, this.rps.bot_history)
  };

  render() {
    return (
      <div>
        <button onClick={() => this.makeMove('P')}>P</button>
        <button onClick={() => this.makeMove('R')}>R</button>
        <button onClick={() => this.makeMove('S')}>S</button>
      </div>
    );
  }
}

export default RpsGame;