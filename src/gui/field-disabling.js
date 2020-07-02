export function disableField() {
  document.querySelectorAll('.sudoku-input-textbox')
    .forEach(textBox => {
      textBox.disabled = true;
    });
  
  document.querySelector('.solve-button').disabled = true;
}

export function enableField() {
  document.querySelectorAll('.sudoku-input-textbox')
    .forEach(textBox => {
      textBox.disabled = false;
    });
  
  document.querySelector('.solve-button').disabled = false;
}