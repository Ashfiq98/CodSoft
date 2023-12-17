document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const operatorDisplay = document.getElementById("operator-display");
    const buttons = document.querySelectorAll("button");
    let currentInput = "";
    let operator = "";
    let firstInput = "";

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.innerText === "C") {
                clearDisplay();
            } else if (button.innerText === "←") {
                backspace();
            } else if (button.classList.contains("operator")) {
                operatorClick(button.innerText);
            } else if (button.classList.contains("equals")) {
                equalsClick();
            } else {
                numberClick(button.innerText);
            }
            updateDisplay();
        });
    });

    function clearDisplay() {
        currentInput = "";
        firstInput = "";
        operator = "";
        updateOperatorDisplay();
    }

    function backspace() {
        currentInput = currentInput.slice(0, -1);
    }

    function operatorClick(op) {
        if (currentInput !== "") {
            if (firstInput !== "") {
                equalsClick();
            } else {
                firstInput = currentInput;
                currentInput = "";
                operator = op;
                updateOperatorDisplay();
            }
        }
    }

    function equalsClick() {
        if (currentInput !== "" && firstInput !== "") {
            switch (operator) {
                case "+":
                    currentInput = String(parseFloat(firstInput) + parseFloat(currentInput));
                    break;
                case "-":
                    currentInput = String(parseFloat(firstInput) - parseFloat(currentInput));
                    break;
                case "*":
                    currentInput = String(parseFloat(firstInput) * parseFloat(currentInput));
                    break;
                case "/":
                    currentInput = String(parseFloat(firstInput) / parseFloat(currentInput));
                    break;
                default:
                    break;
            }
            firstInput = "";
            operator = "";
            updateOperatorDisplay();
        }
    }

    function numberClick(number) {
        if (firstInput === "" && operator === "" && currentInput !== "") {
            clearDisplay();
        }
        currentInput += number;
    }

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function updateOperatorDisplay() {
        operatorDisplay.textContent = operator !== "" ? ` ${operator} ` : "";
    }
});