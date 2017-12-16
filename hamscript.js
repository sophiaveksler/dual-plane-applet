// -----------------------------------------
// -----------------------------------------
// Variable and Data Section Sections
// -----------------------------------------
// -----------------------------------------

// Global Canvas Constants
var x_min = -2;
var x_max = 2;
var y_min = -10;
var y_max = 10;

// Canvas Variables
var primalCanvas = new fabric.Canvas('ham-plane');
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

// Sets
var redSet = new Set();
var blueSet = new Set();
var totalSet = new Set();

// Other Variables
var color = 0;

// -----------------------------------------
// -----------------------------------------
// Code Sections
// -----------------------------------------
// -----------------------------------------

// -----------------------------------------
// Adding Points
// -----------------------------------------

primalCanvas.on('mouse:down', function (event) {
	if (drawingMode) {
		primalCanvas.selection = false;

		// Create point
		point = new customPointDataStructure();
		fillPointData(event);
        
        // Add to color sets
       	if (point.colorName == 'red') {
        	redSet.add(point.fabricPoint)
   		} else if (point.colorName == 'blue') {
        	blueSet.add(point.fabricPoint)
   		}

        point.fabricPoint.selectable = false;

        // Add to totalSet
        totalSet.add(point);
    }
});

function fillPointData(event) {
	// Get X and Y coordinates
	var offset = $('#ham-plane').offset();
	point.x = event.e.clientX - offset.left;
	point.y = event.e.clientY - offset.top;

	// Get Color
	point.colorName = 'blue';
	if (color == 0) {
		color = 1;
	} else if (color == 1) {
		point.colorName = 'red';
		color = 0;
	}

	// Get Fabric Point
   	point.fabricPoint = new fabric.Circle(	{
   												radius: 3,
   												fill: point.colorName,
   												left: point.x,
   												top: point.y,
   												id: primalCanvas.getObjects().length
   											});

	// Get Fabric Line
    [a, b] = scalePrimalPointData(point.x, point.y);
	point.fabricLine = createFabricLine(a,b,point.colorName,point.fabricPoint.id);

	// get overall point id
	point.ID = point.fabricPoint.id;
}

function scalePrimalPointData(x, y) {
	var x1, y1;

	x1 = (point.x-(width/2.0))/50.0; // convert to more reasonable coordinates
	y1 = ((height - point.y) - (height/2.0))/50.0;

	return [x1, y1];
}

function createFabricLine(a,b,colorName,pointID) {
	// Get endpoints for the line
	let x1 = 0;
	let y1 = (((-width/2.0)/50.0)*a + b )*50 + width/2.0
	let x2 = width;
	let y2 = (((width/2.0)/50.0)*a + b )*50 + width/2.0;

	// Create Line
	line = new fabric.Line([x1, y1, x2, y2],
							{
								stroke: colorName,
								fill: colorName, 
								strokeWidth: 3,
								id: pointID
							})
	line.selectable = false;

	return line;
}

primalCanvas.on('mouse:up', function (event) {
	if (drawingMode) {
		primalCanvas.selection = true;
	  	primalCanvas.add(point.fabricPoint);
		dualCanvas.add(point.fabricLine);
	}
});

primalCanvas.on('object:selected', function() {
    drawingMode = false;
});

primalCanvas.on('selection:cleared', function() {
    drawingMode = true;
});

// -----------------------------------------
// Changing Display of Data Functions
// -----------------------------------------

function replaceAllPointsOnPrimalCanvas() {
	primalCanvas.clear();
	totalSet.forEach(function callback(value1, value2, totalSet) {
		primalCanvas.add(value1.fabricPoint);
	});
}

function replaceAllLinesOnDualCanvas() {
	dualCanvas.clear();
	totalSet.forEach(function callback(value1, value2, totalSet) {
		dualCanvas.add(value1.fabricLine);
	});
}

// -----------------------------------------
// Modify Points and Lines Data Functions
// -----------------------------------------

function changePointColor(point, newColorName) {
	modifiedColorName = newColorName;
	//canvas.id(point.ID).color = newColorName
	point.fabricPoint.stroke = newColorName;
	point.fabricLine.fill = newColorName;
}

function returnPointColorToSet(point) {
	//canvas.id(point.ID).color = point.colorName
	point.fabricPoint.stroke = point.colorName;
	point.fabricLine.fill = point.colorName;
}

// -----------------------------------------
// Button Click Events
// -----------------------------------------

$('#reset').click(function () {
	primalCanvas.drawingMode = true;
	primalCanvas.clear();
	dualCanvas.clear();
	redSet = new Set();
	blueSet = new Set();
	totalSet = new Set();
    $('#ham-calculator').text("Calculate Ham Sandwich Cut");
	$('#ham-calculator').attr("disabled", false);
})


$('#ham-calculator').click(function() {
	if (blueSet.size == 0 || redSet.size == 0) {
		alert("At least 2 points need to be present in the primal plane in order to calculate the Ham Sandwich Cut.")
		return;
	}

	if (blueSet.size != redSet.size) { alert ("Add one more point please! You must have an even number of points to calculate the Ham Sandwich Cut.")}
	
	primalCanvas.drawingMode = false;
	
	$('#ham-calculator').text("Calculation in progress...");
	$('#ham-calculator').attr("disabled", true);
}


)


