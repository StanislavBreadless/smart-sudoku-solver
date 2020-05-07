import {
  SudokuMatrix
} from './sudoku-matrix';
import {
  backtrackingAlgorithm
} from './backtrack';
import {
  nakedSingleAlgorithm
} from './naked-single';
import {
  hiddenSingleAlgorithm
} from './hidden-single';

export function solve(sudokuInputMatrix) {
  const sudokuMatrix = new SudokuMatrix(sudokuInputMatrix);

  while (nakedSingleAlgorithm(sudokuMatrix) ||
    hiddenSingleAlgorithm(sudokuMatrix));

  backtrackingAlgorithm(sudokuMatrix);

  return {
    matrix: sudokuMatrix.toArray(),
    solved: sudokuMatrix.solved()
  };
}