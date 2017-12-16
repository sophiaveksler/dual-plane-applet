// -----------------------------------------
// -----------------------------------------
// Global Variables and data structures. Very important stuff.
// -----------------------------------------
// -----------------------------------------


// Canvas Variables
var primalCanvas = new fabric.Canvas('ham-plane');
primalCanvas.drawingMode = true;
var dualCanvas = new fabric.Canvas('ham-plane-result');
primalCanvas.centeredScaling = true;
dualCanvas.centeredScaling = true;
dualCanvas.selection = false;
var drawingMode = true;
var width = primalCanvas.width;
var height = primalCanvas.height;

// Global Canvas Constants
var x_scale = 50.0;
var y_scale = 50.0;
var x_max = width / 2.0 / x_scale;
var x_min = -x_max;
var y_max = height / 2.0 / y_scale;
var y_min = -y_max;

var a_scale = 50.0;
var b_scale = 50.0;
var a_max = width / 2.0 / a_scale;
var a_min = -a_max;
var b_max = height / 2.0 / b_scale;
var b_min = -b_max;

// Point Data Structure
function customPointDataStructure() {
	this.x = 0;
	this.y = 0;
	this.dual_slope = 0;
	this.dual_intercept = 0;
	this.colorName = 'blue';
	this.modifiedColorName = 'green';
	this.ID = 0;
	this.fabricPoint = 'fabricPoint';
	this.fabricLine = 'fabricLine';
}
customPointDataStructure.prototype = {
	doX : function() {}
}

var point = new customPointDataStructure();

// Set
var totalSet = new Array();

// Other Variables
var color = 0;