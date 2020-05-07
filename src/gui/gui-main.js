const sudokuInputs = [];

function createCellInput(cell) {
  const cellValueInput = document.createElement('input');
  cellValueInput.setAttribute('type', 'tel');
  cellValueInput.setAttribute('max-length', '1');


  cellValueInput.onfocus = (event) => {
    cellValueInput.value = '';
  }
  cellValueInput.oninput = (event) => {
    if (cellValueInput.value.length > 1 ||
      !Number.isFinite(parseInt(cellValueInput.value))) {
      cellValueInput.value = '';
    } else {
      cellValueInput.blur();
    }

    if (cellValueInput.value.length === 1) {
      cell.classList.add('sudoku-set-cell');
    }

  }

  cellValueInput.classList.add('sudoku-input-textbox');


  return cellValueInput;
}

export function initTable(tableRef) {
  for (let row = 0; row < 9; row++) {
    const currentRow = tableRef.insertRow();
    currentRow.classList.add('sudoku-input-row');


    for (let column = 0; column < 9; column++) {
      const currentCell = currentRow.insertCell();
      currentCell.classList.add('sudoku-input-cell');

      if (column % 3 === 2) {
        currentCell.classList.add('bold-right-border');
      }
      if (row % 3 === 2) {
        currentCell.classList.add('bold-bottom-border');
      }

      const cellInput = createCellInput(currentCell);
      currentCell.onclick = () => {
        cellInput.focus();
      }

      currentCell.appendChild(cellInput);

      sudokuInputs.push(
        {
          input: cellInput,
          cell: currentCell
        });
    }
  }

}

export function clearSudokuInput() {
  sudokuInputs.forEach(({ input, cell }) => {
    input.value = '';
    cell.classList.remove('sudoku-set-cell');
  });
}

export function getSudokuInput() {
  return sudokuInputs.map(({ input }) => input.value);
}

export function setSudokuInput(newValues) {
  for (let i = 0; i < 81; i++) {
    sudokuInputs[i].input.value = newValues[i] || '';
  }
}