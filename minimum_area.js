function findTriangle(point1, point2) {
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

			if(a != null && a != null) {
				if(index1LastPoint != null) {
					if(height == null || height > minAreaHeight(index1LastPoint, a, b)) {
						console.log('height changed: ' + height + ' -> ' + minAreaHeight(index1LastPoint, a, b));
						console.log('area   changed: ' + area   + ' -> ' + triangleArea(totalSet[i], totalSet[j], index1LastPoint));
						height = minAreaHeight(index1LastPoint, a, b);
						area = triangleArea(totalSet[i], totalSet[j], index1LastPoint);
						point1 = totalSet[i];
						point2 = totalSet[j];
						point3 = index1LastPoint;
					} else {
						console.log('no a   change : ' + area   + ' -- ' + triangleArea(totalSet[i], totalSet[j], index1LastPoint));
					}
				}
				
				if(index1NextPoint != null) {
					if(height == null || height > minAreaHeight(index1NextPoint, a, b)) {
						console.log('height changed: ' + height + ' -> ' + minAreaHeight(index1NextPoint, a, b));
						console.log('area   changed: ' + area   + ' -> ' + triangleArea(totalSet[i], totalSet[j], index1NextPoint));
						height = minAreaHeight(index1NextPoint, a, b);
						area = triangleArea(totalSet[i], totalSet[j], index1NextPoint);
						point1 = totalSet[i];
						point2 = totalSet[j];
						point3 = index1NextPoint;
					} else {
						console.log('no a   change : ' + area   + ' -- ' + triangleArea(totalSet[i], totalSet[j], index1NextPoint));
					}
				}

				if(index2LastPoint != null) {
					if(height == null || height > minAreaHeight(index2LastPoint, a, b)) {
						console.log('height changed: ' + height + ' -> ' + minAreaHeight(index2LastPoint, a, b));
						console.log('area   changed: ' + area   + ' -> ' + triangleArea(totalSet[i], totalSet[j], index2LastPoint));
						height = minAreaHeight(index2LastPoint, a, b);
						area = triangleArea(totalSet[i], totalSet[j], index2LastPoint);
						point1 = totalSet[i];
						point2 = totalSet[j];
						point3 = index2LastPoint;
					} else {
						console.log('no a   change : ' + area   + ' -- ' + triangleArea(totalSet[i], totalSet[j], index2LastPoint));
					}
				}

				if(index2NextPoint != null) {
					if(height == null || height > minAreaHeight(index2NextPoint, a, b)) {
						console.log('height changed: ' + height + ' -> ' + minAreaHeight(index2NextPoint, a, b));
						console.log('area   changed: ' + area   + ' -> ' + triangleArea(totalSet[i], totalSet[j], index2NextPoint));
						height = minAreaHeight(index2NextPoint, a, b);
						area = triangleArea(totalSet[i], totalSet[j], index2NextPoint);
						point1 = totalSet[i];
						point2 = totalSet[j];
						point3 = index2NextPoint;
					} else {
						console.log('no a   change : ' + area   + ' -- ' + triangleArea(totalSet[i], totalSet[j], index2NextPoint));
					}
				}
			}
		}
	}

	return [point1, point2, point3];
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
	console.log(dcel.entries());
	//console.log(intersectionSet);
}


function findIntersection(point1, point2)
{
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

	dualCanvas.add(p);

	interS.fabricPoint = p;
	intersectionSet.push(interS);
	return [intersectionA, intersectionB];
}