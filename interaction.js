
// -----------------------------------------
// -----------------------------------------
// Code Sections
// -----------------------------------------
// -----------------------------------------

// -----------------------------------------
// Adding Points
// -----------------------------------------

primalCanvas.on('mouse:down', function (event) {
	if (primalCanvas.drawingMode) {
		primalCanvas.selection = false;

		// Create point
		point = new customPointDataStructure();
		fillPointData(event);

		// Add to totalSet
		totalSet.push(point);
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

	// get overall point id
	point.ID = point.fabricPoint.id;

	// Get Fabric Line
	[point.x, point.y] = scalePrimalPointData(point.x, point.y);
	[point.dualSlope, point.dualIntercept] = getDualLineFromXY(point.x, point.y);
	point.fabricLine = createDualFabricLine(point.dualSlope, point.dualIntercept, point.colorName, point.ID);

	// make point not selectable
	point.fabricPoint.selectable = false;
}

function fillIntersectionData(intersection, point1, point2, a, b) {
	intersection.point1 = point1;
	intersection.point2 = point2;
	intersection.dual_x = a;
	intersection.dual_y = b;
}

function scalePrimalPointData(x, y) {
	var x1, y1;

	x1 = (x - (width/2.0)) / x_scale; // convert to more reasonable coordinates
	y1 = ((height - y) - (height/2.0)) / y_scale;

	return [x1, y1];
}

function scalePrimalPointDataReverse(x, y) {
	var x1, y1;

	x1 = (x * x_scale) + (width/2.0); // convert to more reasonable coordinates
	y1 = (height - ((y * y_scale) + (height/2.0)));

	return [x1, y1];
}

function getDualLineFromXY(x, y)
{
	return [x, -y];
}

function getXYFromDualLine(slope, intercept)
{
	return [slope, -intercept];
}

// ?
function getPrimalLineFromAB(a, b)
{
	return [a, -b];
}

// ?
function getABFromPrimalLine(slope, intercept)
{
	return [slope, -intercept];
}

function scaleDualPointData(a, b) {
	var a1, b1;

	a1 = (a - (width/2.0)) / a_scale; // convert to more reasonable coordinates
	b1 = ((height - b) - (height/2.0)) / b_scale;

	return [a1, b1];
}

function scaleDualPointDataReverse(a, b) {
	var a1, b1;

	a1 = (a * a_scale) + (width/2.0); // convert to more reasonable coordinates
	b1 = (height - ((b * b_scale) + (height/2.0)));

	return [a1, b1];
}

function createDualFabricLine(dualSlope,dualIntercept,colorName,pointID) {
	// Get endpoints for the line
	let a1 = a_min;
	let b1 = dualSlope*a1 + dualIntercept;
	let a2 = a_max;
	let b2 = dualSlope*a2 + dualIntercept;

	let canvasA1 = 0;
	let canvasB1 = 0;
	let canvasA2 = 0;
	let canvasB2 = 0;
	[canvasA1, canvasB1] = scaleDualPointDataReverse(a1, b1);
	[canvasA2, canvasB2] = scaleDualPointDataReverse(a2, b2);

	// Create Line
	line = new fabric.Line([canvasA1, canvasB1, canvasA2, canvasB2],
							{
								stroke: colorName,
								fill: colorName, 
								strokeWidth: 3,
								id: pointID
							})
	line.selectable = false;

	return line;
}

function createPrimalFabricLine(slope,intercept,colorName,pointID) {
	// Get endpoints for the line
	let x1 = x_min;
	let y1 = slope*x1 + intercept;
	let x2 = x_max;
	let y2 = slope*x2 + intercept;

	let canvasX1 = 0;
	let canvasY1 = 0;
	let canvasX2 = 0;
	let canvasY2 = 0;
	[canvasX1, canvasY1] = scaleDualPointDataReverse(x1, y1);
	[canvasX2, canvasY2] = scaleDualPointDataReverse(x2, y2);

	// Create Line
	line = new fabric.Line([canvasX1, canvasY1, canvasX2, canvasY2],
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
	if (primalCanvas.drawingMode) {
		primalCanvas.selection = true;
		primalCanvas.add(point.fabricPoint);
		dualCanvas.add(point.fabricLine);
	}
});

// -----------------------------------------
// Changing Display of Data Functions
// -----------------------------------------

function replaceAllPointsOnPrimalCanvas() {
	primalCanvas.clear();
	totalSet.forEach(function(element) {
		primalCanvas.add(element.fabricPoint);
	});
}

function replaceAllLinesOnDualCanvas() {
	dualCanvas.clear();
	totalSet.forEach(function(element) {
		dualCanvas.add(element.fabricLine);
	});
}

// -----------------------------------------
// Modify Points and Lines Data Functions
// -----------------------------------------

function changePointColor(point, newColorName) {
	modifiedColorName = newColorName;

	point.fabricPoint.stroke = newColorName;
	point.fabricPoint.fill = newColorName;
	point.fabricLine.stroke = newColorName;
	point.fabricLine.fill = newColorName;

	// redraw everything
	replaceAllPointsOnPrimalCanvas();
	replaceAllLinesOnDualCanvas();

}

function returnPointColorToSet(point) {
	point.fabricPoint.stroke = point.colorName;
	point.fabricPoint.fill = point.colorName;
	point.fabricLine.stroke = point.colorName;
	point.fabricLine.fill = point.colorName;

	// redraw everything
	replaceAllPointsOnPrimalCanvas();
	replaceAllLinesOnDualCanvas();
}

// -----------------------------------------
// Button Click Events
// -----------------------------------------

$('#reset').click(function () {
	primalCanvas.drawingMode = true;
	primalCanvas.clear();
	dualCanvas.clear();
	totalSet = new Array();
	intersectionSet = new Array();
	dcel = new Map();
	$('#ham-calculator').text("Calculate all Intersections!");
	$('#ham-calculator').attr("disabled", false);
})


$('#ham-calculator').click(function() {

	if (totalSet.length < 2) {
		alert("At least 2 points need to be present in the primal plane in order to calculate the Ham Sandwich Cut.")
		return;
	}

	$('#ham-calculator').text("Calculation in progress...");
	$('#ham-calculator').attr("disabled", true);

	var point1 = new customPointDataStructure();
	var point2 = new customPointDataStructure();
	var point3 = new customPointDataStructure();

	getAllIntersections();
	[point1, point2, point3] = findTriangle();
	primalCanvas.drawingMode = false;

	if(point1 != null) {
		changePointColor(point1, 'green');
		changePointColor(point2, 'green');
		changePointColor(point3, 'green');
	} else {
		console.log('found null set of points');
	}


	// [a,b] = calculateHamSandwich();
	// if (a == -1000) {
	// 	return;
	// }
	// [slope, intercept] = getPrimalLineFromAB(a,b);
	// line = createPrimalFabricLine(slope, intercept, 'darkmagenta', 1000);
	// primalCanvas.add(line);
	

	
	

})
$('#test').click(function() {
	[point1, point2, point3] = findTriangle();
	primalCanvas.drawingMode = false;

	if(point1 != null) {
		changePointColor(point1, 'green');
		changePointColor(point2, 'green');
		changePointColor(point3, 'green');
	} else {
		console.log('found null set of points');
	}
})



