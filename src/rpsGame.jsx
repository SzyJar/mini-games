import React, { Component } from 'react';
import Rps from './controllers/rps/rps.js';
import TypingAnimation from './controllers/rps/typingAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faHandBackFist, faHandScissors } from '@fortawesome/free-regular-svg-icons'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'


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
        winner: 'Monica is waiting.',
        total_games: 'Rock, Paper, Scissors!',
        response: 'You are not going to beat me in Rock, Paper, Scissors!'
        + ' I am undefeated!'
      }
  }
  
  goBack = () => {
    this.props.onClick();
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
      this.setState({ winner: 'Monica has won this round!' });
    } else {
      this.setState({ winner: 'Its a tie!' });
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

    if (this.state.winrate > 58 && this.rps.player_history.length > 10) {
      this.setState({
        response: 'I am impressed that you managed to get a positive win rate against me!'
      });
    };

    if (this.state.winrate > 68 && this.rps.player_history.length > 22) {
      this.setState({
        response: 'It\'s IMPOSSIBLE! How are you winning so many rounds?'
        + ' Did you change my code to beat me?'
      });
    };

    if (this.state.winrate < 40 && this.rps.player_history.length > 15) {
      this.setState({
        response: 'You are predictable.'
      });
    };

    if (this.state.winrate < 20 && this.rps.player_history.length > 35) {
      this.setState({
        response: 'It\'s too easy to beat you, you\'re not even trying, are you?'
      });
    };

    if (this.state.winrate < 14 && this.rps.player_history.length > 45) {
      this.setState({
        response: 'It is pointless, I refuse to participate any longer in this farce.'
      });
    };

    if (this.state.winrate > 25 && this.rps.player_history.length > 100) {
      this.setState({
        response: 'Mhhh....'
      });
    };

    if (this.state.winrate > 35 && this.rps.player_history.length > 100) {
      this.setState({
        response: 'You are persistent. But the more you play, the harder it gets.'
      });
    };

  };

  render() {
    return (
      <div className="rps-game">
        <div className="bot">
          <img src={require('./assets/img/rps_girl.png')} alt="RPS Player" />
          <div className='response'>
            <TypingAnimation text={this.state.response}/>
          </div>
        </div>
        <div className="ui">
          <button className='back' onClick={this.goBack}>
          < FontAwesomeIcon icon={faArrowLeftLong} />
          </button>
          <h1>Monica played:&nbsp;&nbsp;  { this.state.bot_play }</h1>
          <h1>You played:&nbsp;&nbsp; { this.state.your_play }</h1>
          <h1>{this.state.winner}</h1>
          <p>Your winrate: { this.state.winrate } %</p>
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