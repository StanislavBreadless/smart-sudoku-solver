export function nakedSingleAlgorithm(sudokuMatrix) {

  let anyChange = false;

  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      const cell = sudokuMatrix.getCell(row, column);

      if (cell.value == 0 && cell.possibleValues.size == 1) {
        const newValue = cell.possibleValues.values().next().value;

        sudokuMatrix.setValue(row, column, newValue);
        anyChange = true;
      }
    }
  }

  return anyChange;
}