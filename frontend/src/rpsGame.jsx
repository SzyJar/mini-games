import React, { Component } from 'react';
import Rps from './controllers/rps/rps.js';
import { makeResponse } from './controllers/rps/response'
import TypingAnimation from './controllers/rps/typingAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faHandBackFist, faHandScissors } from '@fortawesome/free-regular-svg-icons'


const moves = {
  "P": <FontAwesomeIcon icon={faHand} />,
  "R": <FontAwesomeIcon icon={faHandBackFist} />,
  "S": <FontAwesomeIcon icon={faHandScissors} />,
}

class RpsGame extends Component {
  constructor() {
    super();
      this.rps = new Rps();
      this.prev_move = ''

      this.state = {
        winrate: 0.0,
        bot_play: '',
        your_play: '',
        winner: 'Monika is waiting.',
        total_games: 'Rock, Paper, Scissors!',
        response: 'You are not going to beat me in Rock, Paper, Scissors!'
        + ' I am undefeated!',
        achievements: []
      }
  }

  makeMove = (move) => {
    const winner = this.rps.play(move, this.rps.predict(this.prev_move));
    this.prev_move = move;
    this.setState({
      winrate: parseFloat(
        this.rps.results.player/this.rps.player_history.length * 100).toFixed(2),
      bot_play: moves[this.rps.bot_history[this.rps.bot_history.length - 1]],
      your_play: moves[move]
    });

    if (winner === 'player') {
      this.setState({ winner: 'You won this round!' });
    } else if (winner === 'bot') {
      this.setState({ winner: 'Monika has won this round!' });
    } else {
      this.setState({ winner: 'It\'s a tie!' });
    }

    const games = this.rps.player_history.length;
    if (games > 1) {
      this.setState({
        total_games: `${this.rps.player_history.length} rounds played`
      });
    } else if(games > 0) {
      this.setState({
        total_games: `One round played`
      });
    }

    const [winrate, history] = [this.state.winrate, this.rps.player_history.length];
    let response = makeResponse(winrate, history)
    if (response) {
      this.setState({
        response: response,
      })
    }
    if (winrate > 63 && history > 22 && !this.state.achievements.includes(5)) {
      this.props.achiev(5);
      this.setState({ achievements: [5, ...this.state.achievements] });
    } else if (winrate > 53 && history > 12 && !this.state.achievements.includes(4)) {
      this.props.achiev(4);
      this.setState({ achievements: [4, ...this.state.achievements] });
    } else if (winrate < 10 && history > 15 && !this.state.achievements.includes(6)) {
      this.props.achiev(6);
      this.setState({ achievements: [6, ...this.state.achievements] });
    }
  };

  render() {
    return (
      <div className="game">
        <div className="bot">
          <div className='monika'></div>
          <div className='response'>
            <TypingAnimation text={this.state.response}/>
          </div>
        </div>
        <div className="ui">
          <h1>Monika played:&nbsp;&nbsp;  { this.state.bot_play }</h1>
          <h1>You played:&nbsp;&nbsp; { this.state.your_play }</h1>
          <h1>{this.state.winner}</h1>
          <p>Your win rate is { this.state.winrate } %</p>
          <p>{this.state.total_games}</p>
          <div className="user-input">
            <button onClick={() => this.makeMove('P')}>
              { moves["P"] }
            </button>
            <button onClick={() => this.makeMove('R')}>
              { moves["R"] }
            </button>
            <button onClick={() => this.makeMove('S')}>
              { moves["S"] }
            </button>
          </div>
        </div>   
      </div>
    );
  }
}

export default RpsGame;