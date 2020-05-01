import {
    SudokuMatrix
} from './sudoku-matrix';
import {
    backtrackingAlgorithm
} from './backtrack';
import {
    nakedSingleAlgorithm
} from './naked-single';

export function solve(sudokuInputMatrix) {
    const sudokuMatrix = new SudokuMatrix(sudokuInputMatrix);

    while (nakedSingleAlgorithm(sudokuMatrix));

    backtrackingAlgorithm(sudokuMatrix);

    return {
        matrix: sudokuMatrix.toArray(),
        solved: sudokuMatrix.solved()
    };
}