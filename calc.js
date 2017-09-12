//Calculator constructor
										
window.onload = function() {
	function Calculator(displayId) {  
		this.displayId = displayId;
		this.operationArray = [];
	}

	// Giving constructor method to update the display element
	Calculator.prototype.updateDisplay = function() {
		document.getElementById(this.displayId).innerText = this.operationArray.join(' ');
	};

	// Writing methods for checking the last item and concatenating something
	Calculator.prototype.addToLast = function(input) {
		this.operationArray[this.operationArray.length - 1] += input;
	};

	Calculator.prototype.getLastItem = function() {
		return this.operationArray[this.operationArray.length - 1];
	};

	// Writing methods for types of input -- Checking to see if the last item is a number or not

	Calculator.prototype.handleNumber = function(number) {
		if (isNaN(this.getLastItem())) {
			this.operationArray.push(number.toString());
		} else {
			this.addToLast(number.toString());
		}
		this.updateDisplay();
	};

	// Method for handling operators - Checks to see if it's a number or not and whether it's just a period or not
	Calculator.prototype.handleOperator = function(operator) {
		if(!isNaN(this.getLastItem())) {
			if (operator === '.') {
				this.addToLast(operator);
			} else {
				this.operationArray.push(operator);
			}
			this.updateDisplay();
		}
	};

	// AC method
	Calculator.prototype.allClear = function(funcName) {
		this.operationArray = [];
		this.updateDisplay();
	};

	// CE method
	Calculator.prototype.clearEntry = function() {
		this.operationArray[this.operationArray.length - 1] = this.getLastItem().toString().slice(0, -1);
		if (this.getLastItem().length < 1) {
			this.operationArray.pop();
		}
		this.updateDisplay();
	};

	// Remove last element in the array if it isn't a number. then evaluate what is in operationArray and set it to this value
	Calculator.prototype.getTotal = function() {
		if(isNaN(this.getLastItem())) {
			this.operationArray.pop();
		}
		var total = eval(this.operationArray.join(''));
		this.operationArray = [total];
		this.updateDisplay();
	};

	// Initialize instance of calculator
	var myCalculator = new Calculator('calc-display');

	// Bind the buttons to actions
	document.getElementById("ac").addEventListener('click', function() {
		myCalculator.allClear();
	});

	document.getElementById("ce").addEventListener('click', function() {
		myCalculator.clearEntry();
	});

	document.getElementById("=").addEventListener('click', function() {
		myCalculator.getTotal();
	});

	// Buttons for numbers and operators
	var operatorControls = document.getElementsByClassName('operator'),
		numberControls = document.getElementsByClassName('number');

	for (i = 0; i < operatorControls.length; i++) {
		operatorControls[i].addEventListener('click', function() {
			myCalculator.handleOperator(this.getAttribute('id'));
		});
	}

	for (i = 0; i < numberControls.length; i++) {
		numberControls[i].addEventListener('click', function() {
			myCalculator.handleNumber(this.getAttribute('id'));
		});
	}
};