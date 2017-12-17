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
	this.modifiedColorName = 'blue';
	this.ID = 0;
	this.fabricPoint = 'fabricPoint';
	this.fabricLine = 'fabricLine';
}
customPointDataStructure.prototype = {
	doX : function() {}
}

// intersection data structure
function intersection() {
	this.point1 = 'point1';
	this.point2 = 'point2';
	this.dual_x = 0;
	this.dual_y = 0;
	this.fabricPoint = 'fabricPoint';
}

var point = new customPointDataStructure();

// Set of points/lines
var totalSet = new Array();

// Set of intersections
var intersectionSet = new Map();

// DCEL stuff
var dcel = new Map();

function dcelIndexStructure() {
	this.ID1 = 0;
	this.ID2 = 0;
	this.simpleHash = function() {
		return this.ID1 * Math.PI + this.ID2;
	}
}
customPointDataStructure.prototype = {
	doX : function() {}
}

function dcelValueStructure() {
	this.intersection = [0,0];
	this.lastPoint = null;
	this.nextPoint = null;
}
customPointDataStructure.prototype = {
	doX : function() {}
}

// Other Variables
var color = 0;

// janky sleep function
function sleep(miliseconds) {
	var currentTime = new Date().getTime();
		while (currentTime + miliseconds >= new Date().getTime()) {
		}
}