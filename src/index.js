import {
    solve
} from './solver/solver-main';
import {
    initTable,
    getSudokuInput,
    clearSudokuInput,
    setSudokuInput
} from './gui/gui-main';

import 'normalize.css';
import './stylesheets/style.css';

const sudokuElemsInput = document.querySelector('.sudoku-input-table');
initTable(sudokuElemsInput);


const clearButton = document.querySelector('.clear-button');
clearButton.onclick = clearSudokuInput;
const solveButton = document.querySelector('.solve-button');

solveButton.addEventListener('click', (event) => {
    const solvedPuzzle = solve(getSudokuInput().map(value => parseInt(value)));

    setSudokuInput(solvedPuzzle.matrix);
});