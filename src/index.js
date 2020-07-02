import {
  initTable,
  getSudokuInput,
  clearSudokuInput,
  setSudokuInput
} from './gui/gui-main';
import {
  enableField,
  disableField
} from './gui/field-disabling';
import Worker from './solver/solver.worker';
import * as Constants from './constants/constants';

import 'normalize.css';
import './stylesheets/style.css';



const sudokuElemsInput = document.querySelector('.sudoku-input-table');
initTable(sudokuElemsInput);

const clearTip = document.querySelector('.sudoku-clear-tip');

const clearButton = document.querySelector('.clear-button');
clearButton.onclick = () => {
  clearSudokuInput();
  enableField();
  clearTip.style.display = 'none';
}

const solveButton = document.querySelector('.solve-button');
const waitingMessage = document.querySelector('.sudoku-waiting-msg');
const waitingCancelButton = document.querySelector('.sudoku-waiting-cancel-button');


solveButton.addEventListener('click', (event) => {
  disableField();

  const sudokuSolverWorker = new Worker();
  sudokuSolverWorker.postMessage(getSudokuInput().map(value => parseInt(value)));
  
  const waitingMessageText = document.querySelector('.sudoku-waiting-text');
  waitingMessageText.innerHTML = Constants.waitingMessage;
  waitingMessage.style.display = 'block';
  
  const tooLongTimer = setTimeout(() => {
    const waitingMessageText = document.querySelector('.sudoku-waiting-text');
    waitingMessageText.innerHTML = Constants.waitingTooLongMessage;
  }, Constants.waitingLongTime);

  const turnOffWorker = () => {
    sudokuSolverWorker.terminate();
    waitingMessage.style.display = 'none';
    clearTip.style.display = 'block';

    clearTimeout(tooLongTimer);

    waitingCancelButton.removeEventListener('click', turnOffWorker);
  };
  waitingCancelButton.addEventListener('click', turnOffWorker);

  sudokuSolverWorker.onmessage = (solverResponse) => {
    setSudokuInput(solverResponse.data.matrix)
    turnOffWorker();
  };
});