import './assets/App.scss';
import WelcomeScren from './welcome'
import RpsGame from './rpsGame'
import SudokuGame from './sudokuGame'




function App() {
  let game = 'rps';
  function changeScreen(name) {
    game = name;
  }
  return (
    <div className="App">
      <div className="App-body">
      { game === 'rps' ? <RpsGame onClick={changeScreen('welcome')}/>
      : game === 'sudoku' ? <SudokuGame onClick={changeScreen('welcome')}/>
      : <WelcomeScren /> }
      </div>
    </div>
  );
}

export default App;
