
var ipOp = document.getElementById("inputOutput");
var formDisp = document.getElementById("formulaDisplay");
var btnValue = document.getElementsByClassName("nrBtn").value;

console.info(ipOp);
console.info(formDisp);

console.info(btnValue);	// result: undefined
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
}




