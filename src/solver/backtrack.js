function findCell(cellRow, cellColumn, sudokuMatrix) {
    if (cellRow >= 9) {
        return true;
    }
    const nextCellColumn = cellColumn === 9 ? cellColumn + 1 : 1;
    const nextCellRow = nextCellColumn === 1 ? cellRow + 1 : cellRow;

    const cell = sudokuMatrix.getVal(cellRow, cellColumn);
    if (cell.value) {
        return findCell(nextCellRow, nextCellColumn, sudokuMatrix);
    }

    for (const value of cell.possibleValues) {
        // Trying to use the 'value' as the value of the cell
        cell.value = value;

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