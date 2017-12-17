function findTriangle(point1, point2) {
	// initial variables
	var height = null;
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
			dcelValue1 = dcel.get(dcelIndex1);
			var index1NextPoint = dcelValue1.nextPoint;
			var index1LastPoint = dcelValue1.lastPoint;

			var dcelIndex2 = new dcelIndexStructure();
			dcelIndex2.ID1 = totalSet[j].ID;
			dcelIndex2.ID2 = totalSet[i].ID;
			var dcelValue2 = new dcelValueStructure();
			dcelValue2 = dcel.get(dcelIndex2);
			var index2NextPoint = dcelValue2.nextPoint;
			var index2LastPoint = dcelValue2.lastPoint;

			// get intersection point
			var a = null;
			var b = null;
			[a, b] = dcelValue1.intersection;

			if(a != null && a != null) {
				if(index1LastPoint != null) {
					var pointAboveOrBelow = index1LastPoint.dualSlope * a + index1LastPoint.dualIntercept;
					if(height == null || Math.abs(b - pointAboveOrBelow)) {
						height = Math.abs(b - pointAboveOrBelow);
						point1 = totalSet[i];
						point2 = totalSet[j];
						point3 = index1LastPoint;
					}
				}
				
				if(index1NextPoint != null) {
					var pointAboveOrBelow = index1NextPoint.dualSlope * a + index1NextPoint.dualIntercept;
					if(height == null || Math.abs(b - pointAboveOrBelow)) {
						height = Math.abs(b - pointAboveOrBelow);
						point1 = totalSet[i];
						point2 = totalSet[j];
						point3 = index1NextPoint;
					}
				}

				if(index2LastPoint != null) {
					var pointAboveOrBelow = index2LastPoint.dualSlope * a + index2LastPoint.dualIntercept;
					if(height == null || Math.abs(b - pointAboveOrBelow)) {
						height = Math.abs(b - pointAboveOrBelow);
						point1 = totalSet[i];
						point2 = totalSet[j];
						point3 = index2LastPoint;
					}
				}

				if(index2NextPoint != null) {
					var pointAboveOrBelow = index2NextPoint.dualSlope * a + index2NextPoint.dualIntercept;
					if(height == null || Math.abs(b - pointAboveOrBelow)) {
						height = Math.abs(b - pointAboveOrBelow);
						point1 = totalSet[i];
						point2 = totalSet[j];
						point3 = index2NextPoint;
					}
				}
			}
		}
	}

	return [point1, point2, point3];
}


function getAllIntersections() {
	for (let i = 0; i < totalSet.length; i++) {
		var lastIndex = null;
		for (let j = 0; j < totalSet.length; j++) {
			if(i != j) {
				var dcelIndex = new dcelIndexStructure();
				dcelIndex.ID1 = totalSet[i].ID;
				dcelIndex.ID2 = totalSet[j].ID;

				var dcelValue = new dcelValueStructure();
				dcelValue.intersection = findIntersection(totalSet[i], totalSet[j]);
				dcelValue.lastPoint = totalSet[lastIndex];
				dcelValue.nextPoint = null;

				if(lastIndex != null) {
					var dcelIndex2 = new dcelIndexStructure();
					dcelIndex2.ID1 = totalSet[i].ID;
					dcelIndex2.ID2 = totalSet[lastIndex].ID;

					dcelValue2 = new dcelValueStructure();
					dcelValue2 = dcel.get(dcelIndex2);
					if(dcelValue2 == null || dcelValue2 == undefined) {
						console.log('Cant find: ' + dcelIndex2.ID1 + ',' + dcelIndex2.ID2);
					} else {
						dcelValue2.nextPoint = totalSet[j];
						dcel.set(dcelIndex2, dcelValue2);
					}
				}

				lastIndex = j;

				console.log(dcelIndex);
				dcel.set(dcelIndex, dcelValue);
			}
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

