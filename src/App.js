import './assets/App.scss';

import Sudoku from './components/sudoku/sudoku'


const sudoku = new Sudoku();

sudoku.modyfiboard([[9, 33,5],5,5]);
sudoku.generateNew();
console.log(sudoku.board);


function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <div className="App-body">

      </div>
    </div>
  );
}

export default App;
