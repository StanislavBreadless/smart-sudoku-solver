import {
  initTable,
  getSudokuInput,
  clearSudokuInput,
  setSudokuInput
} from './gui/gui-main';
import Worker from './solver/solver.worker';

import 'normalize.css';
import './stylesheets/style.css';

const sudokuElemsInput = document.querySelector('.sudoku-input-table');
initTable(sudokuElemsInput);
const clearButton = document.querySelector('.clear-button');
clearButton.onclick = clearSudokuInput;
const solveButton = document.querySelector('.solve-button');

const waitingMessage = document.querySelector('.sudoku-waiting-msg');
const waitingCancelButton = document.querySelector('.sudoku-waiting-cancel-button');
solveButton.addEventListener('click', (event) => {
  const sudokuSolverWorker = new Worker();
  sudokuSolverWorker.postMessage(getSudokuInput().map(value => parseInt(value)));
  waitingMessage.style.display = 'block';

  const turnOffWorker = () => {
    sudokuSolverWorker.terminate();
    waitingMessage.style.display = 'none';
    waitingCancelButton.removeEventListener('click', turnOffWorker);
  };
  waitingCancelButton.addEventListener('click', turnOffWorker);

  sudokuSolverWorker.onmessage = (solverResponse) => {
    setSudokuInput(solverResponse.data.matrix)
    turnOffWorker();
  };
});