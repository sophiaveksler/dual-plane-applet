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
	// clear
	linePairs = new Array();
	lowerSlopes = new Array();
	upperSlopes = new Array();

	// sort by slope, find median slope
	sortBySlope(totalSet);
	var median = Math.floor(totalSet.length / 2);
	changePointColor(totalSet[median], 'green');

	// get lower slopes, get upper slopes
	for(i = 0 ; i < median ; i++) {
		lowerSlopes.push(totalSet[i]);
	}
	for(i = median + 2 ; i < totalSet.length ; i++) {
		upperSlopes.push(totalSet[i]);
	}
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
	var intersectionA, intersectionB;

	return [intersectionA, intersectionB];
}

function sortBySlope(dataSet)
{
	dataSet.sort(function(pointData1, pointData2) {
			return pointData1.a - pointData2.a;
	});
}