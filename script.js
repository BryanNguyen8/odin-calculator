
const screen = document.querySelector('#screen');
let priorInput = "";
let currentInput = "";
let currentOperator = "";
let resetOnNextNum = false;
const operators = {
    "Escape": "AC",
    "/": "/",
    "*": "*",
    "-": "-",
    "+": "+",
    "=": "=",
    "Enter": "=",
    "Backspace": "C",
}
const numbers = {
    "7": 7,
    "8": 8,
    "9": 9,
    "4": 4,
    "5": 5,
    "6": 6,
    "1": 1,
    "2": 2,
    "3": 3,
    "0": 0,
    ".": ".",
    "%": "%",
    "`": "+-",
}

function setupCalculator() {
    clearCalculator();
    const buttons = document.querySelectorAll('.calculator .button');
    buttons.forEach( b => setupEventListeners(b) );
    window.addEventListener('keydown', (e) => useButton(e.key));
}

function setupEventListeners(element) {
    element.addEventListener('click', () => useButton(element.getAttribute('data-key')));
}

function clearCalculator() {
    priorInput = "";
    currentInput = "";
    currentOperator = "";
    resetOnNextNum = false;
    displayResult("0.", screen);
}

// isMathOperator(string) // returns true if the string passed is +-*/ otherwise it returns false
function isMathOperator(string) {
    switch (string) {
        case "+":
        case "-":
        case "*":
        case "/":
            return true;
            break;
    }
    return false;
}

// returns true if the string passed is = otherwise it returns false
function isEqualsOperator(string) {
    if (string === "=") {
        return true;
    }
    return false;
}
// calls isMathOperator and checks if the string passed is +-*/ or blank and if so
// sets the global value of operator to the passed string. if it's blank, sets it to blank.
function setMathOperator(string) {
    if (isMathOperator(string)) {
        currentOperator = string;
    }
}

// performs a mathmatical operation between a and b based on the passed operator (string)
// and returns the result of the mathmatical operation.
function doMath(a, b, operator) {
    let result;
    if (isMathOperator(operator)) {
        switch (operator) {
            case "+":
                result = (valueContains(a, "%") ? (1/100) : 1 ) * parseFloat(a) + (valueContains(b, "%") ? (1/100) : 1 ) * parseFloat(b) + "";
                break;
            case "-":
                result = (valueContains(a, "%") ? (1/100) : 1 ) * parseFloat(a) - (valueContains(b, "%") ? (1/100) : 1 ) * parseFloat(b) + "";
                break;
            case "*":
                result = ((valueContains(a, "%") ? (1/100) : 1 ) * parseFloat(a)) * ((valueContains(b, "%") ? (1/100) : 1 ) * parseFloat(b)) + "";
                break;
            case "/":
                if (((valueContains(b, "%") ? (1/100) : 1 ) * parseFloat(b)) === 0) {
                    result = "0";
                }
                else {
                    result = ((valueContains(a, "%") ? (1/100) : 1 ) * parseFloat(a)) / ((valueContains(b, "%") ? (1/100) : 1 ) * parseFloat(b)) + "";
                }
                break;
        }
    }
    return result;
}

// returns true if the key has a value, otherwise returns false
function foundKey(string, object) {
    if (object[string] === undefined) {
        return false;
    }
    return true;
}

// sets the text of the element to the string passed
function displayResult(string, element) {
    element.textContent = string;
}

function containsOperator() {
    switch (currentOperator) {
        case "+":
        case "-":
        case "*":
        case "/":
            return true;
            break;
    }
    return false;
}

function valueContains(string, operator) {
    if (string.includes(operator)) {
        return true;
    }
    return false;
}

function useButton(key) {
    if (foundKey(key, operators)) {
        if (operators[key] === "AC") {
            clearCalculator();
        }
        else if (isMathOperator(operators[key]) || isEqualsOperator(operators[key])) {
            if (containsOperator()) {
                priorInput = doMath(priorInput, currentInput, currentOperator);
                currentInput = priorInput;
                displayResult(priorInput, screen);
                if (isEqualsOperator(operators[key])) {
                    currentOperator = "";
                    resetOnNextNum = true;
                } else {
                    currentOperator = operators[key];
                    displayResult(priorInput + " " + currentOperator, screen);
                }
            } else {
                if (isMathOperator(operators[key])) {
                    currentOperator = operators[key];
                    priorInput = currentInput;
                    currentInput = "";
                    resetOnNextNum = false;
                    displayResult(priorInput + " " + currentOperator, screen);
                }
            }
        }
    } else if (foundKey(key, numbers)) {
        if (resetOnNextNum) {
            clearCalculator();            
        }
        if (containsOperator()) {
            displayResult(currentInput, screen);
        }
        if (numbers[key] === "%") {
            if (currentInput.includes("%")) {
                currentInput = currentInput.replace("%","");
            } else {
                currentInput += "%";
            }
        } else if (numbers[key] === ".") {
            if (currentInput.includes(".")) {
                currentInput = currentInput.replace(".","");
            }
            else {
                if (currentInput.includes("%")) {
                    currentInput = currentInput.slice(0, currentInput.length - 1) + ".%";
                }
                else {
                    currentInput += ".";
                }
            }
        } else if (numbers[key] === "+-") {
            if (currentInput.includes("-")) {
                currentInput = currentInput.replace("-","");
            }
            else {
                currentInput = "-" + currentInput;
            }
        } else {
            if (currentInput.includes("%")) {
                currentInput = currentInput.slice(0, currentInput.length - 1) + numbers[key] + "%";
            }
            else {
                currentInput += numbers[key];
            }
        }
        displayResult(currentInput, screen);
    } 
}
setupCalculator();