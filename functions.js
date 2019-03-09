
var ipOp = document.getElementById("inputOutput");
var formDisp = document.getElementById("formulaDisplay");
/*
console.info(ipOp);
console.info(formDisp);

console.info(document.getElementById("seven").value);	// result: 7 , undefined
// likely eror & undefined cause is that the getElementsByClassName returns an array of objects not a single object.

function inputValue() {		
		// ipOp.value += eval(ipOp.value);
		ipOp.value = btnValue;
		formDisp.value += btnValue;	// ^^ result: error can't read property value of [this line nr.] null.
}

console.info(inputValue());


document.getElementsByClassName("nrBtn").onclick = function () {
	inputValue();
}*/

/* function inputValue() {
	var nrButtons = document.getElementsByClassName("nrBtn");
	for(var i = 0; i < nrButtons.length; i++) {
		nrButtons[i].onclick = function() {
			// ipOp.value += nrButtons[i].value;
			document.getElementById("inputOutput").value += nrButtons[i].value;
		}
	}
}

document.getElementById("seven").onclick = function() {
	inputValue();
} */

function clickSeven() {
	ipOp.value += document.getElementById("seven").value;
}

document.getElementById("seven").onclick = function() {
	clickSeven();
	console.info(ipOp.value);
}




