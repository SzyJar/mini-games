import './assets/App.scss';
import WelcomeScren from './welcome'
import React, { Component } from 'react';
import io from 'socket.io-client';
import RpsGame from './rpsGame'
import SudokuGame from './sudokuGame'
import ShooterGame from './shooterGame'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'


class App extends Component {
  constructor() {
    super();
    this.state = {
      game: 'welcome',
      new_achievement: {
        show: false,
        name: '',
        description: '',
      }
    }
    this.socket = null;
  }

  componentDidMount() {
    this.socket = io(process.env.REACT_APP_SERVER_URL);

    this.socket.on('new-achievement', (name, achiev) => {
      
      this.setState({
        new_achievement: {
          show: true,
          name: name,
          description: achiev,
        }
      },
      () => {
        setTimeout(() => {
          this.setState({
            new_achievement: {
              show: false,
              name: this.state.new_achievement.name,
              description: this.state.new_achievement.description,
            }
          });
        }, 4500);
      })
    })
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  handleAchiev = (achiev_id) => {
    this.socket.emit('new-achievement', achiev_id)
  }

  changeScreen = (name) => {
    this.setState({ game: name });
  }

  render() {
    return (
      <div className="App">

        <div className={`notification
        ${this.state.new_achievement.show ? 'show' : 'hide'}`}>
          <h2>{this.state.new_achievement.name}</h2>
          <p>Got new achievement:</p>
          <p>{this.state.new_achievement.description}</p>
        </div>

        { this.state.game !== 'welcome' ?
        <button className='back' onClick={() => this.changeScreen('welcome')}>
          < FontAwesomeIcon icon={faArrowLeftLong} />
        </button> : null }

        <div className="App-body">
        { this.state.game === 'rps' ? <RpsGame achiev={this.handleAchiev}/>
        : this.state.game === 'sudoku' ? <SudokuGame achiev={this.handleAchiev}/>
        : this.state.game === 'shooter' ? <ShooterGame achiev={this.handleAchiev}/>
        : <WelcomeScren change={this.changeScreen} /> }
        </div>
      </div>
  )};
}

export default App;
