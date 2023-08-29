import React, { Component } from 'react';
import Shooter from './controllers/shooter/shooter'
import './assets/shooter.scss'


class ShooterGame extends Component {
  constructor() {
    super();
    this.state = {
      game_running: false,
      achievements: []
    }
  }

  startGame = () => {
    this.setState({
      game_running: true,
    })
  }

  achiev = (id) => {
    if(!this.state.achievements.includes(id)) {
      this.props.achiev(id);
      this.setState({
        achievements: [id, ...this.state.achievements]
      })
    }
  }

  render() {
    return (
      <div className="shooter-game">
        <div className="ui">
          <p>A group of sugar addicts have broken into your candy store!<br/>
          Protect your candy stash from the shameless thieves!</p>
          
          {this.state.game_running
          ? <Shooter achiev={this.achiev}/>
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