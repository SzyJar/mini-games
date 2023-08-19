import React, { Component } from 'react';
import Rps from './components/rps/rps.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faHandBackFist, faHandScissors } from '@fortawesome/free-regular-svg-icons'


class RpsGame extends Component {
  constructor() {
    super();
      this.rps = new Rps();
      this.prev_move = ''
      this.state = {
        winrate: 0.0,
        bot_play: '',
        your_play: '',
        winner: null
      }
  }

  makeMove = (move) => {
    const winner = this.rps.play(move, this.rps.predict(this.prev_move));
    this.prev_move = move;
    this.setState({
      winrate: parseFloat(
        this.rps.results.player/this.rps.player_history.length * 100).toFixed(2),
      bot_play: this.rps.bot_history[this.rps.bot_history.length - 1],
      your_play: move
    });

    if (winner === 'player') {
      this.setState({ winner: 'You won this round!' });
    } else if (winner === 'bot') {
      this.setState({ winner: 'Bot has won this round!' });
    } else {
      this.setState({ winner: 'Its a tie!' });
    }
  };

  render() {
    return (
      <div>
        <div>
          <h1>Bot played: { this.state.bot_play }</h1>
          <h1>You played: { this.state.your_play }</h1>
          <h1>{this.state.winner}</h1>
          <p>Winrate: { this.state.winrate } %</p>
          
        </div>
        <button onClick={() => this.makeMove('P')}>
          <FontAwesomeIcon icon={faHand} />
        </button>
        <button onClick={() => this.makeMove('R')}>
          <FontAwesomeIcon icon={faHandBackFist} />
        </button>
        <button onClick={() => this.makeMove('S')}>
        <FontAwesomeIcon icon={faHandScissors} />
        </button>
      </div>
    );
  }
}

export default RpsGame;