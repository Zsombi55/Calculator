
/*	"const" - are variables that we don't want to change. */

const calculator = document.querySelector(".calculator");	// Div wrapper for input tags & the keyBox class div.
const ioDisplay = document.querySelector(".input");
const keys = calculator.querySelector(".keyBox");	// Div wrapper for the button tags.

ioDisplay.value = 0;
var firstValue, secondValue, result = 0;
var operator, lastAction = null;

// Key press event handler.
keys.addEventListener("click", e => {
	if (e.target.matches("button")) {
		const key = e.target;	// Generalization of individual button tags & press event declaration.
		const action = key.dataset.action;	// Generalization of the button tags' "data-action" property.
		const keyContent = key.textContent; // Pressed key(s).
		const lastValue = ioDisplay.value;	// Input output field content BEFORE the last key-press.
		const previousKeyType = calculator.dataset.previousKeyType; // backup the last key's custom attribute.
		console.log("IO value pre-change: " + ioDisplay.value);
		// Last value, pre-key press: lastValue = 0 .
		console.log("Last key press: " + keyContent);

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
			calculator.dataset.firstValue = lastValue;
			calculator.dataset.operator = action;
			lastAction = keyContent;
			// firstValue = lastValue;
			// operator = keyContent;
			
			console.log("Pre-operator value: " + lastValue); // at the time of pressing an operator this is shown.
			console.log("The operator " + keyContent); // the pressed operator.
			console.log("First value: " + firstValue + "\n" +
						"Action: (" + keyContent + ") " + action + "\n" +
						"Second value: ", secondValue);

			key.classList.add("isPressed"); // Show the user which opertor key was pressed last time.
			console.log("Last action: " + lastAction),
			calculator.dataset.previousKeyType = "operator";  // Add custom attribute. Refers to the html tag's class.
		}
		
		else if (action === "calculate") {
			firstValue = calculator.dataset.firstValue;
			operator = calculator.dataset.operator;
			secondValue = lastValue;
			console.log("First value: " + firstValue + "\n" +
						"Action: (" + lastAction + ") " + operator + "\n" +
						"Second value: ", secondValue + "\n" +
						"Equation: " + firstValue + " " + operator + " " + secondValue);
		
			ioDisplay.value = calculate(firstValue, operator, secondValue);
		}

		console.log("IO value post-change: " + ioDisplay.value);

		

		// 	// Do the equation here too in case the next key after getting the result is another operator.
		// 	if (firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "operatorEqual") {
		// 		const calcValue = calculate(firstValue, operator, secondValue);
		// 		ioDisplay.textContent = calcValue;
		//		//  ioDisplay.textContent = result;
		// 		calculator.dataset.firstValue = calcValue;
		// 	} else {
		// 		calculator.dataset.firstValue = lastValue;
		// 	}
		// 	...
		// 	calculator.dataset.firstValue = lastValue;
		// 	calculator.dataset.operator = action;
		// 		console.log("-- Previous key type: " + calculator.dataset.previousKeyType + "\n" +
		// 					"First value: " + calculator.dataset.firstValue + "\n" +
		// 					"Action: " + calculator.dataset.operator);
		//  ...
		// }	// ->> the Operator else-if ENDING !!

		// else if (action === "calculate") {
		// 	...
		// 	if (firstValue) {
		// 		if (previousKeyType === "calculate") {
		// 			firstValue = lastValue;
		// 			secondValue = calculator.dataset.modifierVal;
		// 		}
		// 		ioDisplay.textContent = calculate(firstValue, operator, secondValue);
		// 	}
		// 	calculator.dataset.modifierVal = secondValue;
		// 	calculator.dataset.previousKeyType = "calculate";
		// }
		// else if (action === "clearAll" || action === "clear" || action === "backspace") {
		// 	if (action === "clearAll") {
		// 		ioDisplay.textContent = "";
		// 		calculator.dataset.firstValue = "";
		// 		calculator.dataset.modifierVal = "";
		// 		calculator.dataset.operator = "";
		// 		calculator.dataset.previousKeyType = "";
		// 	} else if (action === "clear") {
		// 		ioDisplay.textContent = "";
		// 	} else if (action === "backspace") {
		// 		var val = ioDisplay.textContent;
		// 		ioDisplay.textContent = val.substr(0, val.length - 1);
		// 	}
		// 	calculator.dataset.previousKeyType = "cleaner";
		// }
		
		// Removes the ".isPressed" class from all operator keys to reset their style.
		Array.from(key.parentNode.children).forEach (k => k.classList.remove("isPressed"));
	}
});

const calculate = (fn, op, sn) => {	// fn - 1st number, op - operator (+ - * /), sn - 2nd number.
	//  Calculate, return result.
	let re = "";
	
 	// TODO: convert result back to string, changing the decimal dot to a comma, before sending to display.

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

	console.info(">> First value: " + fn + "\n" +
				"Action: (" + lastAction + ") " + op + "\n" +
				"Second value: " + sn + "\n" +
				"Equation: " + fn + " " + op + " " + sn + "\n" +
				"Result (float): ", re + "\n" +
				"Result (string): ", result);
	return re, result;
}





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
