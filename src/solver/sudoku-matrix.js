export class SudokuMatrix {

    constructor(sudokuInputNumbers) {
        this._fieldWidth = 9;
        this._fieldHeight = 9;
        this._field = [];

        const nineNumbersSet = () => {
            const newSet = new Set();
            for (let i = 1; i <= 9; i++)
                newSet.add(i);
            return newSet;
        }

        let currentSudokuImportNumberId = 0;
        for (let row = 0; row < this._fieldHeight; row++) {
            this._field.push([]);
            for (let col = 0; col < this._fieldWidth; col++) {
                this._field[row].push({
                    possibleValues: nineNumbersSet(),
                    value: 0
                });
                this._field[row][col].value = +sudokuInputNumbers[currentSudokuImportNumberId];
                currentSudokuImportNumberId += 1;

                if (!isFinite(this._field[row][col].value))
                    this._field[row][col].value = 0;
            }
        }
    }

    setVal(cellRow, cellColumn, value, updateSets = true) {
        this._field[cellRow][cellColumn].value = value;

        if (updateSets)
            this.updateSets(cellRow, cellColumn, value);
    }

    getCell(cellRow, cellColumn) {
        return this._field[cellRow][cellColumn];
    }

    updateSets(cellRow, cellColumn, value) {
        this.traverseForCell(cellRow, cellColumn, (cell) => {
            if (cell.possibleValues.has(value))
                cell.possibleValues.delete(value);
        });
    }

    traverseRow(row, func) {
        this._field[row].forEach((elem) => func(elem));
    }

    traverseColumn(column, func) {
        for (let row = 0; row < this._fieldHeight; row++) {
            func(this._field[row][column]);
        }
    }

    traverseBlock(block, func) {
        const blockRow = Math.floor(block / 3);
        const blockCol = block % 3;

        for (let row = blockRow * 3; row < (blockRow + 1) * 3; row++) {
            for (let column = blockCol * 3; column < (blockCol + 1) * 3; column++) {
                func(this._field[row][column]);
            }
        }

    }

    getBlock(cellRow, cellColumn) {
        return Math.floor(cellRow / 3) * 3 + Math.floor(cellColumn / 3);
    }

    traverseForCell(cellRow, cellColumn, func) {
        this.traverseRow(cellRow, func);
        this.traverseColumn(cellColumn, func);
        this.traverseBlock(this.getBlock(cellRow, cellColumn), func);
    }

    checkForCell(cellRow, cellColumn) {
        const currentCell = this.getCell(cellRow, cellColumn);

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
        const result = [];

        this._field.forEach((row) => {
            row.forEach((elem) => {
                result.push(elem.value);
            })
        });

        return result;
    }

}