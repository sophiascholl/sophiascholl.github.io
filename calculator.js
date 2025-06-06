// Global Variables
let memory = 0;
let currentInput = "0";
let currentOperator = null;
let leftOperand = null;
let waitingForRightOperand = false;
let lastOperation = "";
let calculationDone = false;

// DOM Elements
const display = document.getElementById('display');
const history = document.getElementById('history');

// Initialize display
display.value = "0";

// Functions for calculator operations
function appendToDisplay(value) {
    // If we just completed a calculation and start typing a new number
    if (calculationDone && !isNaN(value)) {
        clearDisplay();
        calculationDone = false;
    } else if (calculationDone) {
        calculationDone = false;
    }

    // If waiting for right operand, start a new input
    if (waitingForRightOperand) {
        display.value = value;
        waitingForRightOperand = false;
    } else {
        // Handle leading zero
        if (display.value === "0" && value !== ".") {
            display.value = value;
        } else {
            display.value += value;
        }
    }

    currentInput = display.value;
}

function clearDisplay() {
    display.value = "0";
    currentInput = "0";
}

function clearAll() {
    clearDisplay();
    history.textContent = "";
    leftOperand = null;
    currentOperator = null;
    waitingForRightOperand = false;
    lastOperation = "";
}

function clearMemory() {
    memory = 0;
}

function recallMemory() {
    display.value = memory;
    currentInput = display.value;
}

function addToMemory() {
    try {
        // TODO: Replace this with safer code
        memory += parseFloat(eval(display.value));
    } catch (e) {
        display.value = "Error";
    }
}

function subtractFromMemory() {
    try {
        // TODO: Replace this with safer code
        memory -= parseFloat(eval(display.value));
    } catch (e) {
        display.value = "Error";
    }
}

function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = "0";
    }
    currentInput = display.value;
}

/* Implement a function that parses and calculates mathematical expressions
   1. Create a function named evaluateExpression that takes an expression string as input
   2. First, handle simple number case: if the expression is a number, return it as a float
   3. Create an array to store tokens (numbers and operators)
   4. Loop through each character in the expression
   5. If the character is an operator (+, -, *, /), add the current number to tokens and then add the operator
   6. If the character is a digit or decimal point, add it to the current number string
   7. After the loop, add any remaining number to tokens
   8. Process multiplication and division first (following order of operations)
   9. Then process addition and subtraction
   10. Return the final calculated result
*/
function evaluateExpression(expression) {
    // If it's a simple number, return it
    if (!isNaN(parseFloat(expression)) && isFinite(expression)) {
        return parseFloat(expression);
    }

    // Create a tokenizer to parse the expression
    const tokens = [];
    let currentNumber = '';

    // Tokenize the expression
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (char === '+' || char === '-' || char === '*' || char === '/') {
            if (currentNumber) {
                tokens.push(parseFloat(currentNumber));
                currentNumber = '';
            }
            tokens.push(char);
        } else if (!isNaN(parseInt(char)) || char === '.') {
            currentNumber += char;
        }
    }

    // Push the last number if exists
    if (currentNumber) {
        tokens.push(parseFloat(currentNumber));
    }

    // Process multiplication and division first
    for (let i = 1; i < tokens.length; i += 2) {
        if (tokens[i] === '*') {
            tokens[i - 1] = tokens[i - 1] * tokens[i + 1];
            tokens.splice(i, 2);
            i -= 2;
        } else if (tokens[i] === '/') {
            tokens[i - 1] = tokens[i - 1] / tokens[i + 1];
            tokens.splice(i, 2);
            i -= 2;
        }
    }

    // Process addition and subtraction
    let result = tokens[0];
    for (let i = 1; i < tokens.length; i += 2) {
        if (tokens[i] === '+') {
            result += tokens[i + 1];
        } else if (tokens[i] === '-') {
            result -= tokens[i + 1];
        }
    }
    return result;
}

// TODO: Write the body of this function
/* This function should handle various mathematical operations like sqrt, power, etc.
   1. Handle the 'Math.sqrt' function:
      a. Update history.textContent to show the operation
      b. Calculate the square root of the current display value
      c. Update display.value with the result
      d. Set calculationDone to true
   
   2. Handle the 'Math.pow' function:
      a. Store the current display value as leftOperand
      b. Update history.textContent to show the base
      c. Set currentOperator to "pow"
      d. Set waitingForRightOperand to true to wait for the exponent
   
   3. Handle 'Math.abs' function:
      a. Update history.textContent to show the operation
      b. Calculate the absolute value of the current display value
      c. Update display.value with the result
      d. Set calculationDone to true
   
   4. Handle trigonometric functions (Math.sin, Math.cos, Math.tan):
      a. Extract the function name (sin, cos, tan)
      b. Update history.textContent to show the operation
      c. Calculate the result using the appropriate Math function
      d. Update display.value with the result
      e. Set calculationDone to true
   
   5. Handle inverse trigonometric functions (Math.asin, Math.acos, Math.atan)
      a. Extract the function name (asin, acos, atan)
      b. Update history.textContent to show the operation
      c. Calculate the result using the appropriate Math function
      d. Update display.value with the result
      e. Set calculationDone to true
   
   6. Handle 'Math.log' function (base 10 logarithm):
      a. Update history.textContent to show the operation
      b. Calculate the logarithm of the current display value
      c. Update display.value with the result
      d. Set calculationDone to true
   
   7. Handle 'Math.exp' function (e^x):
      a. Update history.textContent to show the operation
      b. Calculate e raised to the power of the current display value
      c. Update display.value with the result
      d. Set calculationDone to true
   
   8. Handle rounding functions (Math.round, Math.ceil, Math.floor):
      a. Extract the function name
      b. Update history.textContent to show the operation
      c. Calculate the result using the appropriate Math function
      d. Update display.value with the result
      e. Set calculationDone to true
*/
function insertMathFunction(func) {
    if (func === 'Math.sqrt') {
        history.textContent = `sqrt(${display.value})`;
        try {
            const value = evaluateExpression(display.value);
            display.value = Math.sqrt(value);
            calculationDone = true;
        } catch (e) {
            display.value = "Error";
        }
    } else if (func === 'Math.pow') {
        try {
            leftOperand = evaluateExpression(display.value);
            history.textContent = `${display.value}^`;
            currentOperator = "pow";
            waitingForRightOperand = true;
            calculationDone = false;
        } catch (e) {
            display.value = "Error"
        }
    } else if (func === 'Math.abs') {
        history.textContent = `abs(${display.value})`;
        try {
            let absoluteValue = Math.abs(display.value);
            console.log(absoluteValue);
            calculationDone = true;
        } catch (e) {
            display.value = "Error";
        }
    } else if (func === 'Math.sin' || func === 'Math.cos' || func === 'Math.tan') {
        const funcName = func.split('.')[1];
        history.textContent = `${funcName}(${display.value})`;
        try {
            const value = evaluateExpression(display.value)
            if (func == 'Math.sin') {
                display.value = Math.sin(value);
            } else if (func == 'Math.cos') {
                display.value = Math.cos(value);
            } else if (func == 'Math.tan') {
                display.value = Math.tan(value);
            }
            calculationDone = true;
        } catch (e) {
            display.value = "Error";
        }
    } else if (func === 'Math.asin' || func === 'Math.acos' || func === 'Math.atan') {
        const funcName = func.split('.')[1];
        history.textContent = `${funcName}(${display.value})`;
        try {
            const value = evaluateExpression(display.value)
            if (func == 'Math.asin') {
                display.value = Math.asin(value);
            } else if (func == 'Math.acos') {
                display.value = Math.acos(value);
            } else if (func == 'Math.atan') {
                display.value = Math.atan(value);
            }
            calculationDone = true;
        } catch (e) {
            display.value = "Error";
        }
    } else if (func === 'Math.log') {
        history.textContent = `log(${display.value})`;
        try {
            const value = evaluateExpression(display.value);
            display.value = Math.log(value);
            calculationDone = true;
        } catch (e) {
            display.value = "Error";
        }
    } else if (func === 'Math.exp') {
        history.textContent = `exp(${display.value})`;
        try {
            const value = evaluateExpression(display.value);
            display.value = Math.exp(value);
            calculationDone = true;
        } catch (e) {
            display.value = "Error";
        }
    } else if (func === 'Math.round' || func === 'Math.ceil' || func === 'Math.floor') {
        const funcName = func.split('.')[1];
        history.textContent = `${funcName}(${display.value})`;
        try {
            const value = evaluateExpression(display.value)
            if (func == 'Math.round') {
                display.value = Math.round(value);
            } else if (func == 'Math.ceil') {
                display.value = Math.ceil(value);
            } else if (func == 'Math.floor') {
                display.value = Math.floor(value);
            }
            calculationDone = true;
        } catch (e) {
            display.value = "Error";
        }
    }
}

// TODO: Write the body of this function
/* This function should insert mathematical constants into the calculator display
   1. Check if constant is 'Math.PI' and if so, set display.value to Math.PI
   2. Check if constant is 'Math.E' and if so, set display.value to Math.E
   3. Check if constant is 'Math.LN2' and if so, set display.value to Math.LN2
   4. Check if constant is 'Math.LN10' and if so, set display.value to Math.LN10
   5. Update currentInput to match the display value
   6. Set calculationDone to true
*/
function insertMathConstant(constant) {
    if (constant === 'Math.PI') {
        display.value = Math.PI;
    } else if (constant === 'Math.E') {
        display.value = Math.E;
    } else if (constant === 'Math.LN2') {
        display.value = Math.LN2;
    } else if (constant === 'Math.LN10') {
        display.value = Math.LN10;
    }
    currentInput = display.value;
    calculationDone = true;
}

/* This function should calculate the result of the current expression
   1. Check if we're in the middle of a power operation:
      a. If currentOperator is "pow" and leftOperand is not null:
         i. Calculate base^exponent using Math.pow
         ii. Update history.textContent to show the full operation
         iii. Update display.value with the result
         iv. Reset leftOperand and currentOperator
   2. Otherwise:
      a. Update history.textContent with the current expression
      b. Calculate the result using evaluateExpression
      c. Update display.value with the result
   3. Set calculationDone to true
*/
function calculate() {
    try {
        if (currentOperator === "pow" && leftOperand !== null) {
            // Handle power operation
            const rightOperand = parseFloat(display.value);
            history.textContent = `${leftOperand}^${rightOperand}`;
            display.value = Math.pow(leftOperand, rightOperand);
            leftOperand = null;
            currentOperator = null;
        } else {
            // Handle normal operations
            history.textContent = display.value;
            display.value = evaluateExpression(display.value);
        }
        calculationDone = true;
    } catch (e) {
        display.value = "Error";
    }
}
