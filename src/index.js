import {
    Solve
} from './solver/solver-main';

const solveButton = document.querySelector('.solve-button');
const sudokuElemsInput = document.querySelector('.sudoku-numbers');
const sudokuAnswerOutput = document.querySelector('.sudoku-answers');
solveButton.addEventListener('click', (event) => {
    const solvedPuzzle = solve(sudokuElemsInput.value
        .split(' ')
        .filter(elem => isFinite(parseInt(elem)))
        .map(elem => parseInt(elem)));

    sudokuAnswerOutput.value = solvedPuzzle.matrix.join(' ');
});