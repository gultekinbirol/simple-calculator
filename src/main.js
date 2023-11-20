const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
    updateFontSize();
}

buttons.addEventListener('click', function (e) {
    const element = e.target;

    if (!element.matches('button')) return;

    if (element.classList.contains('operator')) {
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if (element.id === 'decimal') {
        inputDecimal();
        updateDisplay();
        return;
    }

    if (element.id === 'all-clear') {
        clear();
        updateDisplay();
        return;
    }

    if (element.id === 'delete') {
        displayValue = displayValue.slice(0, -1);
        updateDisplay();
        return;
    }

    inputNumber(element.value);
    updateDisplay();
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

function calculate(first, second, operator) {
    if (operator === '+') {
        return (first * 10 + second * 10) / 10;
    } else if (operator === '-') {
        return (first * 10 - second * 10) / 10;
    } else if (operator === '*') {
        return (first * 10 * second) / 10;
    } else if (operator === '/') {
        return (first * 10) / (second * 10);
    } else if (operator === '%') {
        return first % second;
    }
    return second;
}

function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal() {
    if (waitingForSecondValue) {
        displayValue = '0.';
        waitingForSecondValue = false;
    } else if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function clear() {
    displayValue = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}

function updateFontSize() {
    const screenWidth = window.innerWidth;
    const inputLength = display.value.length;

    if (screenWidth <= 360 && inputLength > 8) {
        display.style.fontSize = '4.5rem';
    } else if (screenWidth <= 360) {
        display.style.fontSize = '5.8rem';
    } else if (screenWidth <= 450 && inputLength > 8) {
        display.style.fontSize = '4.8rem';
    } else if (screenWidth <= 450) {
        display.style.fontSize = '7rem';
    } else if (inputLength > 8) {
        display.style.fontSize = '6rem';
    } else {
        display.style.fontSize = '8rem';
    }
}

window.addEventListener('load', updateFontSize);
window.addEventListener('resize', updateFontSize);