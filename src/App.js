import './assets/App.scss';

import Sudoku from './components/sudoku/sudoku'


const sudoku = new Sudoku();


sudoku.generateNewSolution();
sudoku.modyfiBoard(sudoku.solution)
// easy = 30
// medium = 44
// hard = 50
sudoku.newProblem(50);
console.log(sudoku.toString())
sudoku.validate();
sudoku.modyfiBoard([[0,9]])
sudoku.validate();
console.log(sudoku.validation_board)

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <div className="App-body">
          {sudoku.board.map((item, index) => (
            <p key={index}>{item.map((cell, columnIndex) => (
              <span key={columnIndex}>{cell + ' '}</span>
            ))}</p>
          ))}
      </div>
    </div>
  );
}

export default App;
