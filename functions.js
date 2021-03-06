
/*	"const" - are variables that we don't want to change. */

const calculator = document.querySelector(".calculator");	// Div wrapper for input tags & the keyBox class div.
const ioDisplay = document.querySelector(".input");
const keys = calculator.querySelector(".keyBox");	// Div wrapper for the button tags.

ioDisplay.value = 0;
var firstValue, secondValue, result = 0;
var operator, lastAction = null;

// Key press event handler - runs (again) every time a button /key is pressed
// => each key-press (re-)sets all variables.
keys.addEventListener("click", e => {
	if (e.target.matches("button")) {
		const key = e.target;	// Generalization of individual button tags & press event declaration.
		const action = key.dataset.action;	// Generalization of the button tags' "data-action" property.
		const keyContent = key.textContent; // Pressed key(s).
		const lastValue = ioDisplay.value;	// Input-output field content BEFORE the last key-press.
		const previousKeyType = calculator.dataset.previousKeyType; // backup the last key's custom attribute.
		
		// Last value, pre-key press: lastValue = 0 .
		console.log("IO value pre-change: " + ioDisplay.value + "\n" +
					"Last key press: " + keyContent);

		// Distinguish number, decimal, operator, equal operator and cleaner keys.
		if (!action) {	// if it does not have a "data-action" property (it is a number).
			if (lastValue === "0" || previousKeyType === "operator" || previousKeyType === "operatorEqual") {
				if(keyContent === "00"){
					ioDisplay.value = "0";	// if display is same as default 0, replace.
				}
				else {
					ioDisplay.value = keyContent;	// if the key is 00, replace with 0.
				}
			} else {
				ioDisplay.value = lastValue + keyContent;		// if different than default 0, append.
			}
			calculator.dataset.previousKeyType = "number";
			console.log("Last value, pre-key press (nr.): " + lastValue);
		}

		else if (action === "decimal") { // Placing decimals.
			if (!lastValue.includes(",")) {	// Do nothing if there already is a decimal comma.
				ioDisplay.value = lastValue + ",";
			}
			else if (lastValue === "0" || previousKeyType === "operator" || previousKeyType === "operatorEqual") {
				ioDisplay.value = "0,";
			}
			calculator.dataset.previousKeyType = "decimal";
			console.log("Last value, pre-key press (dec.): " + lastValue);
		}

		else if (action === "add" || action === "subtract" || action === "multiply" || action === "divide") {
			console.info("Last operator before this Operator: " + previousKeyType);
			if(previousKeyType === "operator") {
				calculator.dataset.operator = action; // Overwrite the "action" in it.
				lastAction = keyContent;
				return;
			}
			
			console.info("Last key type before this Operator: " + previousKeyType + "\n" +
						"last value: " + lastValue + "\n" +
						"current action: " + action + "\n" +
						"current key content: " + keyContent);
			if (previousKeyType === "operatorEqual") {
				calculator.dataset.firstValue = lastValue; // When this is empty save the "lastValue" in it.
				calculator.dataset.operator = action; // -||- "action" in it.
				lastAction = keyContent;
			} else if (calculator.dataset.firstValue && calculator.dataset.operator) {
				firstValue = calculator.dataset.firstValue;
				operator = calculator.dataset.operator;
				secondValue = lastValue;
				console.log("First value: " + firstValue + "\n" +
						"Action: (" + lastAction + ") " + operator + "\n" +
						"Second value: ", secondValue + "\n" +
						"Equation: " + firstValue + " " + operator + " " + secondValue);
		
				ioDisplay.value = calculate(firstValue, operator, secondValue);

				calculator.dataset.operator = action; // -||- "action" in it.
				lastAction = keyContent;
			} else {
				calculator.dataset.firstValue = lastValue; // When this is empty save the "lastValue" in it.
				calculator.dataset.operator = action;
				lastAction = keyContent;
			}
			
			console.log("Pre-operator value: " + lastValue + "\n" + // at the time of pressing an operator this is shown.
						"The operator " + keyContent + "\n" + // the pressed operator.
						"First value: " + firstValue + "\n" +
						"Action: (" + keyContent + ") " + action + "\n" +
						"Second value: ", secondValue);

			key.classList.add("isPressed"); // Show the user which opertor key was pressed last time.
			console.log("Last action: " + lastAction),
			calculator.dataset.previousKeyType = "operator";  // Add custom attribute. Refers to the html tag's class.
		} // ->> the Operator else-if ENDING !!
		
		else if (action === "calculate") {
			console.info("Last operator before this Equal: " + previousKeyType);
			if(previousKeyType === "operatorEqual" || previousKeyType === "operator") {
				return;
			}

			firstValue = calculator.dataset.firstValue;
			operator = calculator.dataset.operator;
			secondValue = lastValue;
			console.log("First value: " + firstValue + "\n" +
						"Action: (" + lastAction + ") " + operator + "\n" +
						"Second value: ", secondValue + "\n" +
						"Equation: " + firstValue + " " + operator + " " + secondValue);
		
			ioDisplay.value = calculate(firstValue, operator, secondValue);
			calculator.dataset.previousKeyType = "operatorEqual";
		}

		else if (action === "clearAll" || action === "clear" || action === "backspace") {
			if (action === "clearAll") {
				ioDisplay.value = "";
				calculator.dataset.firstValue = "";
				calculator.dataset.modifierVal = "";
				calculator.dataset.operator = "";
				calculator.dataset.previousKeyType = "";
				firstValue = 0;
				secondValue = 0;
				result = 0;
				// lastValue  is constant, cannot be reset.
				lastAction = null;
				operator = null;
			} else if (action === "clear") {
				ioDisplay.value = "";
			} else if (action === "backspace") {
				var val = ioDisplay.value;
				ioDisplay.value = val.substr(0, val.length - 1);
			}
			calculator.dataset.previousKeyType = "cleaner";
		}

		console.log("IO value post-change: " + ioDisplay.value);

		// Removes the ".isPressed" class from all operator keys to reset their style.
		Array.from(key.parentNode.children).forEach (k => k.classList.remove("isPressed"));
	}
});

const calculate = (fn, op, sn) => {	// fn - 1st number, op - operator (+ - * /), sn - 2nd number.
	//  Calculate, return result.
	let re = "";

	// Regex formatting to make decimals dots and to remove all blank spaces & unused symbols.
	// .replace(/\./g,"").replace(",", ".")
	if (op === "add") {
		re = parseFloat(fn.replace(/\./g,"").replace(",", ".")) +
		parseFloat(sn.replace(/\./g,"").replace(",", "."));
	}
	else if (op === "subtract") {
		re = parseFloat(fn.replace(/\./g,"").replace(",", ".")) -
		parseFloat(sn.replace(/\./g,"").replace(",", "."));
	}
	else if (op === "multiply") {
		re = parseFloat(fn.replace(/\./g,"").replace(",", ".")) *
		parseFloat(sn.replace(/\./g,"").replace(",", "."));
	}
	else if (op === "divide") {
		re = parseFloat(fn.replace(/\./g,"").replace(",", ".")) /
		parseFloat(sn.replace(/\./g,"").replace(",", "."));
	}

	result = re.toString().replace(".", ",");	// Re-convert to string.
	calculator.dataset.firstValue = result;

	console.info(">> First value: " + fn + "\n" +
				"Action: (" + lastAction + ") " + op + "\n" +
				"Second value: " + sn + "\n" +
				"Equation: " + fn + " " + op + " " + sn + "\n" +
				"Result (float): ", re + "\n" +
				"Result (string): ", result);
	return re, result;
}





/* -- TO DO --

> Add a side panel where warning messages and finished equations are to be displayed, like a "session history".
*/
