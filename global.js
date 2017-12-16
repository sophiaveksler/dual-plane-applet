// -----------------------------------------
// -----------------------------------------
// Global Variables and data structures. Very important stuff.
// -----------------------------------------
// -----------------------------------------


// Global Canvas Constants
var x_min = -2;
var x_max = 2;
var y_min = -10;
var y_max = 10;
var x_scale = 50.0;
var y_scale = 50.0;

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

// Point Data Structure
function customPointDataStructure() {
	this.x = 0;
	this.y = 0;
	this.a = 0;
	this.b = 0;
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