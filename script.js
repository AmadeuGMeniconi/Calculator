const operation = {
  bufferPointer: 'firstOperand',
  result: '',
  firstOperand: '0',
  secondOperand: '',
  operator: '',

  clearOperation() {
    this.bufferPointer = 'firstOperand';
    this.result = '';
    this.firstOperand = '0';
    this.secondOperand = '';
    this.operator = '';
  },
  render() {
    let screen = document.querySelector(".screen")
    if (this.bufferPointer === 'result') {
      screen.innerHTML = `${this.result}`
    } else {
      screen.innerHTML = `${this.firstOperand} ${this.operator} ${this.secondOperand}`
    }
  }
};

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
    console.log(operation.render())
  } else {
    handleNumber(value);
    console.log(operation.render())
  };
};

function handleSymbol(value) {
  switch (value) {
    case 'C':
      operation.clearOperation();
      break;
    case '←':
      switch (operation.bufferPointer) {
        case 'firstOperand':
          if (operation.firstOperand.length > 1) {
            operation.firstOperand = operation.firstOperand.slice(0, -1)
          } else {
            operation.firstOperand = '0'
          }
          break;
        case 'operator':
          if (operation.operator !== '') {
            operation.operator = '';
            operation.bufferPointer = 'firstOperand';
          }
          break;
        case 'secondOperand':
          if (operation.secondOperand.length > 0) {
            operation.secondOperand = operation.secondOperand.slice(0, -1)
          } else {
            operation.secondOperand = '';
            operation.operator = '';
            operation.bufferPointer = 'firstOperand';
          }
          break;
        case 'result':
          operation.result = '';
          operation.bufferPointer = 'secondOperand';
          operation.render();
          break;
      }
      break;
    case '×':
    case '/':
    case '-':
    case '+':
      if (operation.bufferPointer === 'firstOperand') {
        operation.operator = value;
        operation.bufferPointer = 'secondOperand';
      }
      break;
    case '=':
      switch (operation.operator) {
        case '×':
          if (operation.bufferPointer === 'result') {
            operation.result *= Number.parseInt(operation.secondOperand);
          } else {
            operation.result = Number.parseInt(operation.firstOperand) * Number.parseInt(operation.secondOperand);
          }
          break;
        case '/':
          if (operation.bufferPointer === 'result') {
            operation.result /= Number.parseInt(operation.secondOperand);
          } else {
            operation.result = Number.parseInt(operation.firstOperand) / Number.parseInt(operation.secondOperand);
          }
          break;
        case '-':
          if (operation.bufferPointer === 'result') {
            operation.result -= Number.parseInt(operation.secondOperand);
          } else {
            operation.result = Number.parseInt(operation.firstOperand) - Number.parseInt(operation.secondOperand);
          }
          break;
        case '+':
          if (operation.bufferPointer === 'result') {
            operation.result += Number.parseInt(operation.secondOperand);
          } else {
            operation.result = Number.parseInt(operation.firstOperand) + Number.parseInt(operation.secondOperand);
          }
          break;
      }
      operation.bufferPointer = 'result';
      operation.render();
      break;
  }
}

function handleNumber(value) {
  switch (operation.bufferPointer) {
    case 'firstOperand':
      if (operation.firstOperand === '0') {
        operation.firstOperand = value;
      } else {
        operation.firstOperand += value;
      }
      break;
    case 'secondOperand':
      if (operation.secondOperand === '' || operation.secondOperand === '0') {
        operation.secondOperand = value;
      } else {
        operation.secondOperand += value;
      }
      break;
  }
}

init();

function init() {
  document.querySelector(".buttons").addEventListener("click", (event) => {
    buttonClick(event.target.innerText);
  });
};
