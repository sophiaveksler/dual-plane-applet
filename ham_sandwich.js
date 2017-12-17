linePairs// Point Data Structure
function linePairsStructure() {
	this.point1 = 0;
	this.point2 = 0;
	this.a_intersection = 0;
	this.b_intersection = 0;
}
linePairsStructure.prototype = {
	doX : function() {}
}

var linePair = new linePairsStructure();
var linePairs = new Array();
var lowerSlopes = new Array();
var upperSlopes = new Array();

function calculateHamSandwich()
{
	if (totalSet.length == 2) {
		return findIntersection(totalSet[0], totalSet[1]);
	}
	// clear
	linePairs = new Array();
	lowerSlopes = new Array();
	upperSlopes = new Array();

	// sort by slope, find median slope
	sortBySlope(totalSet);
	var median = Math.floor(totalSet.length / 2) - 1;
	changePointColor(totalSet[median], 'green');

	// get lower slopes, get upper slopes
	for(i = 0 ; i < median ; i++) {
		lowerSlopes.push(totalSet[i]);
	}
	for(i = median + 2 ; i < totalSet.length ; i++) {
		upperSlopes.push(totalSet[i]);
	}

	console.log(lowerSlopes);
	console.log(upperSlopes);
	// pair lower and upper slopes arbitrarily
	for(i = 0 ; i < lowerSlopes.length ; i++)
	{
		// new line pair
		linePair = new linePairsStructure();

		// file line pair data
		linePair.point1 = lowerSlopes[i];
		linePair.point2 = upperSlopes[i];
		[linePair.a_intersection, linePair.b_intersection] = findIntersection(linePair.point1, linePair.point2);

		// add linepair to array
		linePairs.push(linePair);
	}
}

function findIntersection(point1, point2)
{
	let a1 = point1.dualSlope;
	let b1 = point1.dualIntercept;
	let a2 = point2.dualSlope;
	let b2 = point2.dualIntercept;

	var intersectionA, intersectionB;

	if (point1.dualSlope - point2.dualSlope == 0) {
		alert("Two of your lines are parallel and will never intersect. Please reset and try again.");
		return [-1000, -1000];
	}

	intersectionA = (b2-b1)/(a1-a2)
	intersectionB = a1 * intersectionA + b1;

	[xA, yB] = scaleDualPointDataReverse(intersectionA, intersectionB)


	p = new fabric.Circle(	{
												radius: 5,
												fill: 'darkmagenta',
												left: xA - 5,
												top: yB - 5,
											});
	p.selectable=false;
	dualCanvas.add(p);

	return [intersectionA, intersectionB];
}

function sortBySlope(dataSet)
{
	dataSet.sort(function(pointData1, pointData2) {
			return pointData1.dualSlope - pointData2.dualSlope;
	});
}