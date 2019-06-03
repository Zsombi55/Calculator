
/*	"const" - are variables that we don't want to change. */

const calculator = document.querySelector(".calculator");	// Div wrapper for input tags & the keyBox class div.
const keys = calculator.querySelector(".keyBox");	// Div wrapper for the button tags.

const eqDisplay = document.querySelector(".equation");
const ioDisplay = document.querySelector(".input");

const calculate = (fn, op, sn) => {
	// Calculate, return result.
	let result = "";
	
	// Regex formatting to make decimals dots and to remove all blank spaces & unused symbols.
	// .replace(/\./g,"").replace(",", ".")
	if (op === "add") {
		result = parseFloat(fn.replace(/\./g,"").replace(",", ".")) +
		parseFloat(sn.replace(/\./g,"").replace(",", "."));
	}
	else if (op === "subtract") {
		result = parseFloat(fn.replace(/\./g,"").replace(",", ".")) -
		parseFloat(sn.replace(/\./g,"").replace(",", "."));
	}
	else if (op === "multiply") {
		result = parseFloat(fn.replace(/\./g,"").replace(",", ".")) *
		parseFloat(sn.replace(/\./g,"").replace(",", "."));
	}
	else if (op === "divide") {
		result = parseFloat(fn.replace(/\./g,"").replace(",", ".")) /
		parseFloat(sn.replace(/\./g,"").replace(",", "."));
	}
	console.info(">> First value: " + fn + "\n" +
				"Action: " + op + "\n" +
				"Second value: " + sn + "\n" +
				"Equation: " + fn + op + sn + "\n" +
				"Result: ", result);
	return result;
}

// Key press event handler.
keys.addEventListener("click", e => {
	if (e.target.matches("button")) {
		const key = e.target;	// Generalization of individual button tags & press event declaration.
		const action = key.dataset.action;	// Generalization of the button tags' "data-action" property.
		const keyContent = key.textContent;
		//const displayedEq = eqDisplay.value;	// Equation display field.
		const displayedNr = ioDisplay.value;	// Input output field.
		
		const previousKeyType = calculator.dataset.previousKeyType;
		
		// Distinguish number, decimal, operator, equal operator and cleaner keys.
		if (!action) {
			if (displayedNr === "0" || previousKeyType === "operator" || previousKeyType === "calculate") {
				ioDisplay.value = keyContent;	// if display is same as default 0, replace.
			} else {
				ioDisplay.value = displayedNr + keyContent;		// if different than default 0, append.
			}
			calculator.dataset.previousKey = "number";
		}
		else if (action === "decimal") {
			if (!displayedNr.includes(",")) {	// Do nothing if theer already is a decimal comma.
				ioDisplay.value = displayedNr + ",";
			}
			else if (previousKeyType === "operator" || previousKeyType === "calculate") {
				ioDisplay.value = "0,";
			}
			calculator.dataset.previousKeyType = "decimal";
		}
		else if (action === "add" || action === "subtract" || action === "multiply" || action === "divide") {
			const firstValue = calculator.dataset.firstValue;
			const operator = calculator.dataset.operator;
			const secondValue = displayedNr;
				console.log("First value: " + firstValue + "\n" +
							"Action: " + operator + "\n" +
							"Second value:", secondValue);
			
			// Do the equation here too in case the next key after getting the result is another operator.
			if (firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "calculate") {
				const calcValue = calculate(firstValue, operator, secondValue);
				ioDisplay.value = calcValue;	// TODO: see to making it " = result ".
				calculator.dataset.firstValue = calcValue;
				//ioDisplay.value = calculate(firstValue, operator, secondValue);
			} else {
				calculator.dataset.firstValue = displayedNr;
			}
			
			key.classList.add("isPressed"); // Show the user which opertor key was pressed last time.
			calculator.dataset.previousKeyType = "operator";	// Add custom attribute.
			calculator.dataset.firstValue = displayedNr;
			calculator.dataset.operator = action;
				console.log("-- Previous key type: " + calculator.dataset.previousKeyType + "\n" +
							"First value: " + calculator.dataset.firstValue + "\n" +
							"Action: " + calculator.dataset.operator);
		}
		else if (action === "calculate") {
			let firstValue = calculator.dataset.firstValue;
			const operator = calculator.dataset.operator;
			const secondValue = displayedNr;
				console.log("First value: " + firstValue + "\n" +
							"Action: " + operator + "\n" +
							"Second value:", secondValue);
			
			/* const calculate = (fn, op, sn) => {
				// Calculate, return result.
				let result = "";
				
				if (op === "add") {
					result = parseFloat(fn) + parseFloat(sn);
				} else if (op === "substract") {
					result = parseFloat(fn) - parseFloat(sn);
				} else if (op === "multiply") {
					result = parseFloat(fn) * parseFloat(sn);
				} else if (op === "divide") {
					result = parseFloat(fn) / parseFloat(sn);
				}
				console.info(">> First value: " + fn + "\n" +
							"Action: " + op + "\n" +
							"Second value: " + sn + "\n" +
							"Equation: " + fn + op + sn + "\n" +
							"Result: ", result);
				return result;
			} */
			
			if (firstValue) {
				if (previousKeyType === "calculate") {
					firstValue = displayedNr;
					secondValue = calculator.dataset.modifierVal;	// "secondValue" is constant, this throws exception.
				}
				ioDisplay.value = calculate(firstValue, operator, secondValue);
			}
			calculator.dataset.modifierVal = secondValue;
			calculator.dataset.previousKeyType = "calculate";
		}
		else if (action === "clearAll" || action === "clear" || action === "backspace") {
			if (action === "clearAll") {
				//eqDisplay.value = "";
				ioDisplay.value = "";
				calculator.dataset.firstValue = "";
				calculator.dataset.modifierVal = "";
				calculator.dataset.operator = "";
				calculator.dataset.previousKeyType = "";
			} else if (action === "clear") {
				ioDisplay.value = "";
			} else if (action === "backspace") {
				var val = ioDisplay.value;
				ioDisplay.value = val.substr(0, val.length - 1);
			}
			calculator.dataset.previousKeyType = "cleaner";
		}
		
		// Remove the ".isPressed" class from all operator keys to reset their style.
		Array.from(key.parentNode.children).forEach (k => k.classList.remove("isPressed"));
	}
});
































/* -- TO DO --
> else if display is same as default 0, BUT input is same 0 or double same 00, do nothing.

> Make support function to change the button colors while pressed if pressing them does nothing.
	- pressing the same operator key more than once after a number key should have no effect.

> Pressing different operator keys right one after another should remove the previous one and add instead the new one.
> Pressing the "equals" operator right after a different one should do nothing.
	- or pressing it repeatedly after having it done so just before "this pressing event".

> Make a "key tracker", use it to change the ipOp value instead of appending to it if pressing a number after the "equal".

> Add a side panel where warning messages and finished equations are to be displayed, like a "session history".
*/
