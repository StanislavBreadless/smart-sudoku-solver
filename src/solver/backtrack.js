export function findCell(cellRow, cellColumn, sudokuMatrix) {
    if (cellRow >= 9) {
        return true;
    }

    const nextCellColumn = cellColumn === 8 ? 0 : cellColumn + 1;
    const nextCellRow = nextCellColumn === 0 ? cellRow + 1 : cellRow;

    const cell = sudokuMatrix.getCell(cellRow, cellColumn);
    if (cell.value != 0) {
        console.log(cellRow, cellColumn);
        return findCell(nextCellRow, nextCellColumn, sudokuMatrix);
    }

    for (const value of cell.possibleValues) {
        // Trying to use the 'value' as the value of the cell
        sudokuMatrix.setValue(cellRow, cellColumn, value, false);

        // If the cell does not break sudoku and it is possible to 
        // find the solution for the matrix using current value, then
        // we should return true
        if (
            sudokuMatrix.checkForCell(cellRow, cellColumn) &&
            findCell(nextCellRow, nextCellColumn, sudokuMatrix)
        ) {
            return true;
        } else {
            cell.value = 0;
        }
    }

    return false;
}

export function backtrackingAlgorithm(sudokuMatrix) {
    return findCell(0, 0, sudokuMatrix);
}