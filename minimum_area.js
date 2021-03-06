function createThreePointsArray() {
	// initial variables
	var height = null;
	var area = null;
	var point1 = new customPointDataStructure();
	var point2 = new customPointDataStructure();
	var point3 = new customPointDataStructure();

	// for every set of two points
	for (let i = 0; i < totalSet.length; i++) {
		for (let j = i+1; j < totalSet.length; j++) {
			// get intersection and the closest points
			// (designated by closest intersection on the lines with the closest intersection)
			var dcelIndex1 = new dcelIndexStructure();
			dcelIndex1.ID1 = totalSet[i].ID;
			dcelIndex1.ID2 = totalSet[j].ID;
			var dcelValue1 = new dcelValueStructure();
			dcelValue1 = dcel.get(dcelIndex1.simpleHash());
			if(dcelValue1 == undefined) {
				console.log('Cant find dcelValue1: ' + dcelIndex1.ID1 + ',' + dcelIndex1.ID2 + ',' + dcelIndex1.simpleHash());
				return [null, null, null];
			}
			
			var index1NextPoint = dcelValue1.nextPoint;
			var index1LastPoint = dcelValue1.lastPoint;
			
			var dcelIndex2 = new dcelIndexStructure();
			dcelIndex2.ID1 = totalSet[j].ID;
			dcelIndex2.ID2 = totalSet[i].ID;
			var dcelValue2 = new dcelValueStructure();
			dcelValue2 = dcel.get(dcelIndex2.simpleHash());
			if(dcelValue2 == undefined) {
				console.log('Cant find dcelValue2: ' + dcelIndex2.ID1 + ',' + dcelIndex2.ID2 + ',' + dcelIndex2.simpleHash());
				return [null, null, null];
			}

			var index2NextPoint = dcelValue2.nextPoint;
			var index2LastPoint = dcelValue2.lastPoint;

			// get intersection point
			var a = null;
			var b = null;
			[a, b] = dcelValue1.intersection;

			var closestPoints = [index1LastPoint, index1NextPoint, index2LastPoint, index2NextPoint];
			var closetsPointsFiltered = Array.from(new Set(closestPoints));

			for(let k = 0; k < closetsPointsFiltered.length; k++) {
				if(closetsPointsFiltered[k] != null) {
					var theseThreePoints = new threePoints();
					theseThreePoints.a = a;
					theseThreePoints.b = b;
					theseThreePoints.point1 = totalSet[i];
					theseThreePoints.point2 = totalSet[j];
					theseThreePoints.point3 = closetsPointsFiltered[k];
					threePointsArray.push(theseThreePoints);
				}
			}
		}
	}

}

var point1ColorSave = 'blue';
var point2ColorSave = 'blue';
var point3ColorSave = 'blue';

function findTriangle(i, height, area, point1, point2, point3) {	// functions for changing colors
	function savePointColors() {
		point1ColorSave = point1.colorName;
		point2ColorSave = point2.colorName;
		point3ColorSave = point3.colorName;
		point1.colorName = 'Aquamarine';
		point2.colorName = 'Aquamarine';
		point3.colorName = 'Aquamarine';
	}

	function returnPointColors() {
		if(point1 == null || point2 == null || point3 == null) {
			return;
		}
		point1.colorName = point1ColorSave;
		point2.colorName = point2ColorSave;
		point3.colorName = point3ColorSave;
	}

	if(i < threePointsArray.length) {
		threePointsArray[i].point1.fabricPoint.animate('stroke',threePointsArray[i].point1.colorName, {
		   //onChange: primalCanvas.renderAll.bind(primalCanvas),
		   onChange: function() {
				changePointColor(threePointsArray[i].point1, 'Aquamarine');
				changePointColor(threePointsArray[i].point2, 'Aquamarine');
				changePointColor(threePointsArray[i].point3, 'orchid');
		   },
		   duration: 500,
		   onComplete: function() {
				returnPointColorToSet(threePointsArray[i].point1);
				returnPointColorToSet(threePointsArray[i].point2);
				returnPointColorToSet(threePointsArray[i].point3);
				
				//visualizePointChecking(totalSet[i], totalSet[j], closestPoints[k]);
				if(threePointsArray[i].a != null && threePointsArray[i].b != null && (height == null || height > threeSlabHeight(threePointsArray[i].point3, threePointsArray[i].a, threePointsArray[i].b))) {
					//console.log('height changed: ' + height + ' -> ' + threeSlabHeight(threePointsArray[i].point3, threePointsArray[i].a, threePointsArray[i].b));
					//console.log('area   changed: ' + area   + ' -> ' + triangleArea(threePointsArray[i].point1, threePointsArray[i].point2, threePointsArray[i].point3));

					// Update Data
					height = threeSlabHeight(threePointsArray[i].point3, threePointsArray[i].a, threePointsArray[i].b);
					area = triangleArea(threePointsArray[i].point1, threePointsArray[i].point2, threePointsArray[i].point3);

					// Handle Colors and Saving of New Points
					returnPointColors();
					point1 = threePointsArray[i].point1;
					point2 = threePointsArray[i].point2;
					point3 = threePointsArray[i].point3;
					savePointColors();
				}
				//else {
				//	console.log('no a   change : ' + area   + ' -- ' + triangleArea(threePointsArray[i].point1, threePointsArray[i].point2, threePointsArray[i].point1));
				//}

				// recursion on next one
				returnPointColors();
				return findTriangle(i + 1, height, area, point1, point2, point3);
		   }
		});
	} else {
		returnPointColors();
		console.log('RETURN:: (' + point1.x + ',' + point1.y + ') ; ( ' + point2.x + ',' + point2.y + ') ; (' + point3.x + ',' + point3.y + ')');

		if(point1 != null) {
			totalSet.forEach(function(element) {
				returnPointColorToSet(element);
			});

			changePointColor(point1, 'green');
			changePointColor(point2, 'green');
			changePointColor(point3, 'green');
			$('#slab-calculator').text("Calculation Complete");
			var slope1 = (point1.y - point2.y) / (point1.x - point2.x);
			var intercept1 = point1.y - slope1 * point1.x;
			var slope2 = slope1;
			var intercept2 = point3.y - slope2 * point3.x;
			console.log('Line 1: y = ' + slope1 + ' * x + ' + intercept1);
			console.log('Line 2: y = ' + slope2 + ' * x + ' + intercept2);
			primalCanvas.add(createPrimalFabricLine(slope1, intercept1, 'black', 999998));
			primalCanvas.add(createPrimalFabricLine(slope2, intercept2, 'black', 999999));
		} else {
			console.log('found null set of points');
		}

		return [point1, point2, point3];
	}
}


function threeSlabHeight(point, a, b) {
	var pointAboveOrBelow = point.dualSlope * a + point.dualIntercept;
	return Math.abs(b - pointAboveOrBelow);
}

function minAreaHeight(point, x0, y0) {
	// for distance(ax + by + c = 0 , (x0,y0))
	// = abs(a*x0 + b*y0 + c) / sqrt(a^2 + b^2)
	var a = -point.dualSlope;
	var b = 1;
	var c = -point.dualIntercept;
	var numerator = Math.abs(a*x0 + b*y0 + c);
	var denominator = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
	return numerator / denominator;
}

function triangleArea(a, b, c) {
	return Math.abs((a.x*(b.y - c.y) + b.x*(c.y - a.y) + c.x*(a.y - b.y))/2.0);
}

function getAllIntersections() {
	for (let i = 0; i < totalSet.length; i++) {
		var lastIndex = null;
		// Get intersections
		var intersections = new Array();
		for (let j = 0; j < totalSet.length; j++) {
			if(i != j) {
				var a = 0;
				var b = 0;
				[a,b] = findIntersection(totalSet[i], totalSet[j]);
				intersections.push([a, b, j]);
			}
		}
		// Sort intersections
		intersections.sort(function(int1, int2) {
			return int1.a - int2.a;
		});
		// Go through all adding them
		//for (let j = 0; j < totalSet.length; j++) {
		for (let j = 0; j < intersections.length; j++) {
			//if(i != j) {
				// variables
				var a = null;
				var b = null;
				var index = null;
				[a, b, index] = intersections[j];

				var dcelIndex = new dcelIndexStructure();
				dcelIndex.ID1 = totalSet[i].ID;
				dcelIndex.ID2 = totalSet[index].ID;

				var dcelValue = new dcelValueStructure();
				dcelValue.intersection = [a,b];
				dcelValue.lastPoint = totalSet[lastIndex];
				dcelValue.nextPoint = null;

				if(lastIndex != null) {
					var dcelIndex2 = new dcelIndexStructure();
					dcelIndex2.ID1 = totalSet[i].ID;
					dcelIndex2.ID2 = totalSet[lastIndex].ID;

					dcelValue2 = new dcelValueStructure();
					dcelValue2 = dcel.get(dcelIndex2.simpleHash());
					if(dcelValue2 == null || dcelValue2 == undefined) {
						console.log('Cant find: ' + dcelIndex2.ID1 + ',' + dcelIndex2.ID2 + ',' + dcelIndex2.simpleHash());
					} else {
						dcelValue2.nextPoint = totalSet[index];
						dcel.set(dcelIndex2.simpleHash(), dcelValue2);
					}
				}

				lastIndex = index;

				dcel.set(dcelIndex.simpleHash(), dcelValue);
			//}
		}
	}
	//console.log(dcel.entries());
	//console.log(intersectionSet);
}


function findIntersection(point1, point2)
{
	function pointIDHash(ID1, ID2) {
		var lesserID = null;
		var greaterID = null;
		if(ID1 < ID2) {
			lesserID = ID1;
			greaterID = ID2;
		} else {
			lesserID = ID2;
			greaterID = ID1;
		}
		return lesserID * Math.PI + greaterID;
	}

	let a1 = point1.dualSlope;
	let b1 = point1.dualIntercept;
	let a2 = point2.dualSlope;
	let b2 = point2.dualIntercept;

	var intersectionA, intersectionB;

	if (point1.dualSlope - point2.dualSlope == 0) {
//	alert("Two of your lines are parallel and will never intersect. Please reset and try again.");
		return [null, null];
	}

	intersectionA = (b2-b1)/(a1-a2)
	intersectionB = a1 * intersectionA + b1;

	let interS = new intersection();
	fillIntersectionData(interS, point1, point2, intersectionA, intersectionB);
	[xA, yB] = scaleDualPointDataReverse(intersectionA, intersectionB)


	p = new fabric.Circle(	{
												radius: 5,
												fill: 'darkmagenta',
												left: xA - 5,
												top: yB - 5,
											});
	p.selectable=false;

	interS.fabricPoint = p;
	if ( !(pointIDHash(point1.ID, point2.ID) in intersectionSet)) {
		dualCanvas.add(p);
		//dcel.set(dcelIndex.simpleHash(), dcelValue);
		var hashID = pointIDHash(point1.ID, point2.ID);
		intersectionSet.set(hashID, p);
	}
	//intersectionSet.set(interS);
	return [intersectionA, intersectionB];
}