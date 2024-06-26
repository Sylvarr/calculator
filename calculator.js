/**
 * Represents a simple calculator.
 *
 * @class Calculator
 * @constructor
 * @param {string} containerSelector - The selector of the container element where the calculator will be rendered.
 *
 * @example
 * const calculator = new Calculator("#calculator-container");
 *
 * @summary
 * The `Calculator` class represents a simple calculator. It initializes the calculator by rendering the HTML elements, injecting the necessary styles, and attaching event listeners to handle user interactions. It also provides utility methods for performing calculations and updating the display.
 */
class Calculator {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      throw new Error("Container element not found");
    }
    this.a = "";
    this.b = "";
    this.operator = "";
    this.hasResult = false;
    this.render();
    this.injectStyles();
    this.initDOMElements();
    this.attachEventListeners();
  }
  render() {
    const html = `
      <div class="calculator">
    <button value="" class="display1 display">
      <p></p>
    </button>
    <button value="" class="display2 display">
      <p></p>
    </button>
    <button value="c" class="c button-30">C</button>
    <button value="ce" class="ce button-30">CE</button>
    <button value="1" class="number button-30">1</button>
    <button value="2" class="number button-30">2</button>
    <button value="3" class="number button-30">3</button>
    <button value="*" class="operator button-30">*</button>
    <button value="4" class="number button-30">4</button>
    <button value="5" class="number button-30">5</button>
    <button value="6" class="number button-30">6</button>
    <button value="/" class="operator button-30">/</button>
    <button value="7" class="number button-30">7</button>
    <button value="8" class="number button-30">8</button>
    <button value="9" class="number button-30">9</button>
    <button value="-" class="operator button-30">-</button>
    <button value="0" class="number button-30">0</button>
    <button value="." class="dot button-30">.</button>
    <button value="=" class="numequal button-30">=</button>
    <button value="+" class="operator button-30">+</button>
  </div>
    `;
    this.container.innerHTML = html;
  }

  injectStyles() {
    const styles = `
      .calculator {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(7, 1fr);
  margin-left: 0.5rem;
  width: 11rem;
  height: 17rem;
  border-radius: 5px;
  border: 4px outset white;
}

.button-30:focus {
  box-shadow: #d6d6e7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
}

.button-30:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-30:active {
  box-shadow: #d6d6e7 0 3px 7px inset;
  transform: translateY(2px);
}

.number {
  display: flex;
  justify-content: center;
  align-items: center;
}

.display1 {
  grid-row-start: 1;
  grid-column-start: 1;
  grid-column-end: 5;
}

.display2 {
  grid-row-start: 2;
  grid-column-start: 1;
  grid-column-end: 5;
}

.numequal {
  grid-row-start: 7;
  grid-column-start: 3;
  grid-column-end: 4;
}

.c {
  grid-row-start: 3;
  grid-column-start: 1;
  grid-column-end: 3;
}

.ce {
  grid-row-start: 3;
  grid-column-start: 3;
  grid-column-end: 5;
}

.button-30 {
  align-items: center;
  appearance: none;
  background-color: #fcfcfde5;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395a;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 1rem;
}

.button-30:focus {
  box-shadow: #d6d6e7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
}

.button-30:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-30:active {
  box-shadow: #d6d6e7 0 3px 7px inset;
  transform: translateY(2px);
}

.display {
  background: rgba(255, 255, 255, 0.166);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 1px;
  border: rgba(31, 38, 135, 0.37);
  height: 2.6rem;
  font-size: 1.1rem;
  text-align: right;
}
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }

  initDOMElements() {
    this.numbers = this.container.querySelectorAll(".number");
    this.operators = this.container.querySelectorAll(".operator");
    this.equal = this.container.querySelector(".numequal");
    this.display1 = this.container.querySelector(".display1");
    this.display2 = this.container.querySelector(".display2");
    this.dot = this.container.querySelector(".dot");
    this.ce = this.container.querySelector(".ce");
    this.c = this.container.querySelector(".c");
  }

  attachEventListeners() {
    // When we push a number
    this.numbers.forEach((number) => {
      number.addEventListener("click", (e) => {
        let clickedValue = e.target.value;

        if (this.hasResult && this.operator === "") {
          this.resetCalculator();
        }

        let target = this.isEmpty(this.operator) ? this.a : this.b;

        if (target.length >= 6) return;

        if (target === "0" && clickedValue === "0") return;
        if (target === "0" && clickedValue !== "0") target = clickedValue;
        else target += clickedValue;

        if (this.isEmpty(this.operator)) {
          this.a = target;
          this.display2.textContent = this.a;
        } else {
          this.b = target;
          this.display2.textContent = `${this.a} ${this.operator} ${this.b}`;
        }
      });
    });

    // When we push an operator
    this.operators.forEach((operator) => {
      operator.addEventListener("click", (e) => {
        let clickedOperator = e.target.value;
        if (this.isEmpty(this.a) && clickedOperator === "-") {
          this.a = "-";
          this.display2.textContent = this.a;
          return;
        }
        if (this.a === "-" && clickedOperator === "-") {
          return;
        }
        if (!this.isEmpty(this.a) && this.a !== "-") {
          if (!this.isEmpty(this.b)) {
            let result = this.operate();
            if (!this.isInt(result)) {
              result = result.toFixed(2);
            }
            this.a = String(result);
            this.b = "";
          }
          this.operator = clickedOperator;
          this.display2.textContent = `${this.a} ${this.operator}`;
        }
      });
    });

    // When we push equal sign
    this.equal.addEventListener("click", () => {
      let result = this.operate();
      if (result === "Error") return;

      this.hasResult = true;
      if (!this.isInt(result)) {
        result = result.toFixed(2);
      }
      this.updateCalculatorAndDisplay(result);
    });

    // When we push dot
    this.dot.addEventListener("click", () => {
      if (this.hasResult && this.isEmpty(this.operator)) {
        if (!this.a.includes(".")) {
          this.a = this.a + ".";
        }
        this.hasResult = false;
        this.display2.textContent = this.a;
        return;
      }

      if (this.isEmpty(this.operator)) {
        if (!this.a.includes(".")) {
          this.a += ".";
        }
        this.display2.textContent = this.a;
      } else {
        if (!this.b.includes(".")) {
          this.b += ".";
        }
        this.display2.textContent = `${this.a} ${this.operator} ${this.b}`;
      }
    });

    // When we push CE
    this.ce.addEventListener("click", () => {
      this.resetCalculator();
    });

    // When we push C
    this.c.addEventListener("click", () => {
      if (!this.isEmpty(this.b)) {
        this.b = this.b.slice(0, -1);
      } else if (!this.isEmpty(this.operator)) {
        this.operator = "";
      } else if (!this.isEmpty(this.a)) {
        this.a = "";
      }
      this.updateDisplay();
    });
  }

  // Utility methods
  isEmpty(str) {
    return str === "";
  }

  isInt(n) {
    return n % 1 === 0;
  }

  updateCalculatorAndDisplay(result) {
    this.a = result;
    this.b = "";
    this.operator = "";
    this.display1.textContent = result;
    this.display2.textContent = "";
  }

  resetCalculator() {
    this.a = "";
    this.b = "";
    this.operator = "";
    this.hasResult = false;
    this.display1.textContent = "";
    this.display2.textContent = "";
  }

  // Calculation methods
  add() {
    return Number(this.a) + Number(this.b);
  }

  subtract() {
    return Number(this.a) - Number(this.b);
  }

  multiply() {
    return Number(this.a) * Number(this.b);
  }

  divide() {
    if (this.b === "0") {
      this.resetCalculator();
      this.display2.textContent = "Error";
      return "Error";
    }
    return Number(this.a) / Number(this.b);
  }

  operate() {
    let result;
    switch (this.operator) {
      case "+":
        result = this.add();
        break;
      case "-":
        result = this.subtract();
        break;
      case "*":
        result = this.multiply();
        break;
      case "/":
        result = this.divide();
        if (result === "Error") return;
        break;
      default:
        return;
    }

    if (Math.abs(result) > 1e6 || (Math.abs(result) < 1e-6 && result !== 0)) {
      result = result.toExponential(4);
    }

    return result;
  }

  updateDisplay() {
    if (!this.isEmpty(this.operator)) {
      this.display2.textContent = `${this.a} ${this.operator} ${this.b}`;
    } else {
      this.display2.textContent = this.a;
    }
  }
}

const calculator = new Calculator("#calculator-container");
