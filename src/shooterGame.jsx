import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import Shooter from './controllers/shooter/shooter'
import './assets/shooter.scss'


class ShooterGame extends Component {
  constructor() {
    super();
    this.state = {
      game_running: false,
    }
  }

  changeScreen = () => {
    this.props.back('welcome');
  }

  startGame = () => {
    this.setState({
      game_running: true,
    })
  }

  render() {
    return (
      <div className="shooter-game">
         <button className='back' onClick={this.changeScreen}>
          < FontAwesomeIcon icon={faArrowLeftLong} />
        </button>
        <div className="ui">
          <p>A group of sugar addicts have broken into your candy store!<br/>
          Protect your candy stash from the shameless thieves!</p>
          
          {this.state.game_running
          ? <Shooter />
          : <button className='start' onClick={this.startGame}>
            START
            </button>}
          <p id="count-display">Candy retrieved: 0<br/>Candy stolen: 0</p> 
        </div>
      </div>
    )
  }
}

export default ShooterGame;