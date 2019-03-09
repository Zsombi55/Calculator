
var ipOp = document.getElementById("inputOutput");
var formDisp = document.getElementById("formulaDisplay");
// ---

var lastKey = lastKeyPress();

/* function inputValue() {
	var nrBttn = document.getElementsByClassName("nrBtn");
	for(var i = 0; i < nrBttn.length; i++) {
		nrBttn[i].onclick = function() {
			ipOp.value += nrBttn[i].value;
			formDisp.value += document.nrBttn[i].value;
			
			console.info("Second box, inputOutput: " + ipOp.value);
		}
	}
}

document.getElementById("seven").onclick = function() {
	inputValue();
} */

// ----- Put the button values into the text fields. Numbers & symbols. -----
// Numbers.
document.getElementById("one").onclick = function() {
	formDisp.value += document.getElementById("one").value;
	ipOp.value += document.getElementById("one").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("two").onclick = function() {
	formDisp.value += document.getElementById("two").value;
	ipOp.value += document.getElementById("two").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("three").onclick = function() {
	formDisp.value += document.getElementById("three").value;
	ipOp.value += document.getElementById("three").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("four").onclick = function() {
	formDisp.value += document.getElementById("four").value;
	ipOp.value += document.getElementById("four").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("five").onclick = function() {
	formDisp.value += document.getElementById("five").value;
	ipOp.value += document.getElementById("five").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("six").onclick = function() {
	formDisp.value += document.getElementById("six").value;
	ipOp.value += document.getElementById("six").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("seven").onclick = function() {
	formDisp.value += document.getElementById("seven").value;
	ipOp.value += document.getElementById("seven").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("eight").onclick = function() {
	formDisp.value += document.getElementById("eight").value;
	ipOp.value += document.getElementById("eight").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("nine").onclick = function() {	// -- modify the others too to match this.
	if(ipOp.value == 0) {
		firstNotZero(document.getElementById("nine").value);
	} else {
		formDisp.value += document.getElementById("nine").value;
		ipOp.value += document.getElementById("nine").value;
	}
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("zero").onclick = function() {
	formDisp.value += document.getElementById("zero").value;
	ipOp.value += document.getElementById("zero").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("doubleZero").onclick = function() {
	formDisp.value += document.getElementById("doubleZero").value;
	ipOp.value += document.getElementById("doubleZero").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

// Symbols: manual.
document.getElementById("decimal").onclick = function() { 
	if(!ipOp.value.includes(",")){	// -- make a generic support function for the operator buttons too.
		ipOp.value += document.getElementById("decimal").value;
	} else {
		console.log("There is a decimal delimiter already!");
	}
	console.info("Second box, inputOutput: " + ipOp.value);
}

// Symbols: automatic.			----- do it with regex !!
/* function addThousandDelimiter() {
	if(ipOp.value.length)
	document.getElementById("decimal").onclick = function() {
		ipOp.value += document.getElementById("decimal").value;
		console.info("Second box, inputOutput: " + ipOp.value);
	}
} */

// ----- Remove characters, groups or completely clear the text fields. Cleaners. -----
document.getElementById("clearAll").onclick = function() {
	formDisp.value = "";
	ipOp.value = "0";	// add option to "do nothing" if the value is already 0. -- make support function to do it.
	console.info("All clear.");
}

document.getElementById("clear").onclick = function() {
	ipOp.value = "0";
	console.info("Input field clear.");	// add option to "do nothing" if the value is already 0.
}

document.getElementById("backspace").onclick = function() {
	var s = ipOp.value;
	if(s.length > 1) {
		ipOp.value = s.substring(0, s.length - 1);
	} else {
		ipOp.value = "0";	// -- add a third option to "do nothing" if the value is already 0.
	}
	console.info("Second box, inputOutput: " + ipOp.value);
}

// ----- Put the button values into the text fields. Operators. -----
console.info("Have to make appending digits to changing them if last event was an equation.");

var nrValue;

document.getElementById("plus").onclick = function() {
	formDisp.value += document.getElementById("plus").value;
	nrValue = formDisp.value;
	addNr(nrValue);
	console.info("First box, formulaDisplay: " + formDisp.value + "\n" + "Second box, inputOutput: " + ipOp.value);
	
}

document.getElementById("equal").onclick = function() {
	nrValue = formDisp.value;
	finishEquation(nrValue);
	formDisp.value += document.getElementById("equal").value + ipOp.value;
	console.info("First box, formulaDisplay: " + formDisp.value + "\n" + "Second box, inputOutput: " + ipOp.value);
}
// ----- . -----

// ----- Operator Support Functions. -----
function addNr(eqStr) {		// make a generic equation calculator, if can't then make one like this for each separately.
	var eqStr = formDisp.value + 0;	// Equation string: numbers, decimal commas, thousand delimiter points & operators.
	ipOp.value = eval(eqStr);
}

function finishEquation (eqStr) {
	ipOp.value = eval(eqStr);
}
// ----- . -----

// ----- Support Functions -----
function lastKeyPress() {	// ----- TO DO --- !!!!!!
	lastKey = 0;
}

function firstNotZero(firstNr) {	// Switch first digit if it's not the default "0".
	ipOp.value = firstNr;
}

/* -- TO DO --
> Make support function to change the button colors while pressed if pressing them does nothing.
	- pressing the same operator key more than once after a number key should have no effect.

> Pressing different operator keys right one after another should remove the previous one and add instead the new one.
> Pressing the "equals" operator right after a different one should do nothing.
	- or pressing it repeatedly after having it done so just before "this pressing event".

> Make a "key tracker", use it to change the ipOp value instead of appending to it if pressing a number after the "equal".
*/
