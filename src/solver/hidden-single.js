function getCheckerFunction() {
    const resultStorage = {};
    return {
        checkerFunction(cell) {
            for (const value of cell.possibleValues) {
                if (resultStorage.hasOwnProperty(value)) {
                    resultStorage[value] = null;
                } else {
                    resultStorage[value] = cell;
                }
            }
        },
        applyResult(sudokuMatrix) {
            for (const [number, cell] of Object.entries(resultStorage)) {
                if (cell !== null) {
                    sudokuMatrix.setValue(cell.cellRow, cell.cellColumn, number);
                }
            }
        }
    }
}

function findHiddenSingleInSudokuPart(traverser, sudokuMatrix) {
    // There are 9 blocks, rows and columns, so it's
    // always fine to traverse 9 times
    for (let id = 0; id < 9; id++) {
        const {
            checkerFunction,
            applyResult
        } = getCheckerFunction();
        traverser.call(sudokuMatrix, id, checkerFunction);
        applyResult(sudokuMatrix);
    }
}

export function hiddenSingleAlgorithm(sudokuMatrix) {
    findHiddenSingleInSudokuPart(sudokuMatrix.traverseRow, sudokuMatrix);
    findHiddenSingleInSudokuPart(sudokuMatrix.traverseColumn, sudokuMatrix);
    findHiddenSingleInSudokuPart(sudokuMatrix.traverseBlock, sudokuMatrix)
}