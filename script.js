const operation = {
  screen: document.querySelector(".screen"),
  bufferPointer: 'firstOperand',
  firstOperand: '0',
  secondOperand: '',
  operator: '',
  result: 0,
  clearOperation() {
    this.bufferPointer = 'firstOperand';
    this.firstOperand = '0';
    this.secondOperand = '';
    this.operator = '';
    this.result = 0;
  },
  render() {
    if (this.bufferPointer === 'result') {
      this.screen.innerHTML = this.result
    } else {
      this.screen.innerHTML = `${this.firstOperand} ${this.operator} ${this.secondOperand}`
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
        // case 'operator':
        //   if (operation.operator !== '') {
        //     operation.operator = '';
        //     operation.bufferPointer = 'firstOperand';
        //   }
        //   break;
        case 'secondOperand':
          if (operation.secondOperand.length > 1) {
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
    case '÷':
    case '−':
    case '+':
      if (operation.bufferPointer === 'firstOperand') {
        operation.operator = value;
        operation.secondOperand = '0';
        operation.bufferPointer = 'secondOperand';
      }
      break;
    case '=':
      if (operation.bufferPointer !== 'firstOperand') {
        switch (operation.operator) {
          case '×':
            if (operation.bufferPointer === 'result') {
              operation.result *= Number.parseInt(operation.secondOperand);
            } else {
              operation.result = Number.parseInt(operation.firstOperand) * Number.parseInt(operation.secondOperand);
            }
            break;
          case '÷':
            if (operation.bufferPointer === 'result') {
              operation.result = (operation.result / Number.parseInt(operation.secondOperand)).toFixed(9);
            } else {
              operation.result = (Number.parseInt(operation.firstOperand) / Number.parseInt(operation.secondOperand)).toFixed(9);
            }
            break;
          case '−':
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
      } else {
        //Do nothing
      }

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
