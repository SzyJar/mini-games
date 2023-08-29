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
      username: 'Anonymous',
      error: '',
      achievements: [],
      login: {
        username: 'Player',
        password: 'Player'
      },
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

    this.socket.on('logged-in', (name) => {
      this.setState({
        username: name,
      })
      this.socket.emit('get-achievements');
    })

    this.socket.on('achievements', (data) => {
      this.setState({
        achievements: data
      })
    })

    this.socket.on('log-in-fail', () => {
      this.setState({
        error: 'Incorrect credentials'
      })
    })

    this.socket.on('register-fail', () => {
      this.setState({
        error: 'User already exist'
      })
    })

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
          this.socket.emit('get-achievements');
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

  handleNameChange = (event) => {
    this.setState({
      login: {
        username: event.target.value,
        password: this.state.login.password
      }
    })
  }

  handlePasswordChange = (event) => {
    this.setState({
      login: {
        username: this.state.login.username,
        password: event.target.value
      }
    })
  }

  login = () => {
    this.socket.emit(
      'login',
      this.state.login.username,
      this.state.login.password
    )
  }

  logout = () => {
    this.socket.disconnect();
    this.setState({
      username: 'Anonymous',
    })
    this.socket.connect();
  }

  register = () => {
    this.socket.emit(
      'register',
      this.state.login.username,
      this.state.login.password
    )
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

        <div className='user-panel'>
          { this.state.username }
          { this.state.username === 'Anonymous' ?
          <div className='login-window'>
            <p>Player name:</p>
            <input
            type="text"
            value={this.state.login.username}
            onChange={this.handleNameChange}
            />
            <p>Password:</p>
            <input
            type="password"
            value={this.state.login.password}
            onChange={this.handlePasswordChange}
            />
            <div className='register'>
              <button onClick={this.login}>LOGIN</button>
              <button onClick={this.register}>REGISTER</button>
            </div>
            <div className="error">{ this.state.error }</div>
          </div>
          :
          <div>
            <button onClick={this.logout}>LOGOUT</button>
            <p>Scored achievements:</p>
            <ul>
              {this.state.achievements.map((item, index) => (
                <li className='achievment' key={index}>
                  <p>{item.name}</p>
                  <div className='text'>{item.description}</div>
                  <div className='date'>{new Date(item.scored_at).toLocaleDateString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                    })}</div>
                </li>
              ))}
            </ul>
          </div>
          }
        </div>
        
        { this.state.game !== 'welcome' ?
        <button className='back' onClick={() => this.changeScreen('welcome')}>
          <FontAwesomeIcon icon={faArrowLeftLong} />
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
