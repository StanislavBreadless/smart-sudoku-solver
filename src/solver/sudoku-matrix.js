class SudokuMatrix {

    constructor(sudokuInputNumbers) {

    }

    setVal(cellRow, cellColumn, updateSets = true) {

    }

    getVal(cellRow, cellColumn) {

    }

    updateSets(cellRow, cellColumn) {

    }

    traverseRow(row, func) {

    }

    traverseColumn(column, func) {

    }

    traverseBlock(block, func) {

    }

    getBlock(cellRow, cellColumn) {

    }

    traverseForCell(cellRow, cellColumn, func) {
        this.traverseRow(cellRow, func);
        this.traverseColumn(cellColumn, func);
        this.traverseBlock(getBlock(cellRow, cellColumn), func);
    }

    checkForCell(cellRow, cellColumn) {
        const currentCell = this.getVal(cellRow, cellColumn);

        let valid = true;

        const valueChecker = (cell) => {
            if (cell.value === currentCell.value && cell !== currentCell) {
                valid = false;
            }
        };

        this.traverseForCell(cellRow, cellColumn, valueChecker);

        return valid;
    }

    solved() {
        return true;
    }

    toArray() {

    }

}