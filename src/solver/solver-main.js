import {
    SudokuMatrix
} from './sudoku-matrix';
import {
    backtrackingAlgorithm
} from './backtrack';

export function solve(sudokuInputMatrix) {
    const sudokuMatrix = new SudokuMatrix(sudokuInputMatrix);

    // backtrackingAlgorithm(sudokuMatrix);

    return {
        matrix: sudokuMatrix.toArray(),
        solved: sudokuMatrix.solved()
    };
}