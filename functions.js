
var ipOp = document.getElementById("inputOutput");
var formDisp = document.getElementById("formulaDisplay");

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
	ipOp.value += document.getElementById("one").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("two").onclick = function() {
	ipOp.value += document.getElementById("two").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("three").onclick = function() {
	ipOp.value += document.getElementById("three").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("four").onclick = function() {
	ipOp.value += document.getElementById("four").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("five").onclick = function() {
	ipOp.value += document.getElementById("five").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("six").onclick = function() {
	ipOp.value += document.getElementById("six").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("seven").onclick = function() {
	ipOp.value += document.getElementById("seven").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("eight").onclick = function() {
	ipOp.value += document.getElementById("eight").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("nine").onclick = function() {
	ipOp.value += document.getElementById("nine").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("zero").onclick = function() {
	ipOp.value += document.getElementById("zero").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

document.getElementById("doubleZero").onclick = function() {
	ipOp.value += document.getElementById("doubleZero").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

// Symbols.
document.getElementById("decimal").onclick = function() {
	ipOp.value += document.getElementById("decimal").value;
	console.info("Second box, inputOutput: " + ipOp.value);
}

// ----- Remove characters, groups or completely clear the text fields. Cleaners. -----
document.getElementById("clearAll").onclick = function() {
	formDisp.value = "";
	ipOp.value = "";
	console.info("All clear.");
}

document.getElementById("clear").onclick = function() {
	ipOp.value = "";
	console.info("Input field clear.");
}

document.getElementById("backspace").onclick = function() {
	var s = ipOp.value;
	ipOp.value = s.substring(0, s.length - 1);
	console.info("Second box, inputOutput: " + ipOp.value);
}

// ----- Put the button values into the text fields. Operators. -----
/* document.getElementById("one").onclick = function() {
	formDisp.value += document.getElementById("one").value;
	ipOp.value += document.getElementById("one").value;
	console.info("Second box, inputOutput: " + ipOp.value);
} */
// ----- . -----