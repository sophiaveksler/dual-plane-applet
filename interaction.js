
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
	[point.a, point.b] = scalePrimalPointData(point.x, point.y);
	point.fabricLine = createFabricLine(point.a, point.b, point.colorName, point.ID);

	// make point not selectable
	point.fabricPoint.selectable = false;
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
	//totalSet.forEach(function callback(value1, value2, totalSet) {
	//	primalCanvas.add(value1.fabricPoint);
	//});
	totalSet.forEach(function(element) {
		primalCanvas.add(element.fabricPoint);
	});
}

function replaceAllLinesOnDualCanvas() {
	dualCanvas.clear();
	//totalSet.forEach(function callback(value1, value2, totalSet) {
	//	dualCanvas.add(value1.fabricLine);
	//});
	totalSet.forEach(function(element) {
		dualCanvas.add(element.fabricLine);
	});
}

// -----------------------------------------
// Modify Points and Lines Data Functions
// -----------------------------------------

function changePointColor(point, newColorName) {
	modifiedColorName = newColorName;
	//primalCanvas.id(point.ID).color = newColorName
	//dualCanvas.id(point.ID).color = newColorName
	point.fabricPoint.stroke = newColorName;
	point.fabricLine.fill = newColorName;
}

function returnPointColorToSet(point) {
	//primalCanvas.id(point.ID).color = point.colorName
	//dualCanvas.id(point.ID).color = point.colorName
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
	totalSet = new Array();
	$('#ham-calculator').text("Calculate Ham Sandwich Cut");
	$('#ham-calculator').attr("disabled", false);
})


$('#ham-calculator').click(function() {

	if (totalSet.length < 2) {
		alert("At least 2 points need to be present in the primal plane in order to calculate the Ham Sandwich Cut.")
		return;
	}

	if (totalSet.length % 2 == 1) {
		alert ("Add one more point please! You must have an even number of points to calculate the Ham Sandwich Cut.")
		return;
	}
	primalCanvas.drawingMode = false;
	calculateHamSandwich();
	
	
	
	$('#ham-calculator').text("Calculation in progress...");
	$('#ham-calculator').attr("disabled", true);
}


)


