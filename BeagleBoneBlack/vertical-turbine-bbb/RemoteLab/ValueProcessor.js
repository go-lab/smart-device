/*	class: TXMsg
 *	used for convenient sending a JSON encoded string to client
 *
 *	currently only processes the values to find out the freqeuncy generated
 *	use for extending the capabilities of the server and providing more services
 */

function ValueProcessor (valuesArray) {

	this.numValues = valuesArray.length;
	
	var state;
	var initState;
	if(valuesArray[0] < 0.04) {		// any voltage value less than 0.04 taken to be 0.
		state = false;				// if 0, its the negative half cycle and the state is false
		initState = false;			
	}
	else {							
		state = true;				// if > 0.04, its the positive half cycle and the state is true
		initState = true;
	}
		

	var changeOfState = 0;

	var valuesGroup = [];		// used for grouping positive waveform sections
	var currentGroup = [];


	for (var i = 0; i < valuesArray.length; i++) {
		
		if(valuesArray[i] < 0.04)	// any voltage value less than 0.04 taken to be 0.
			valuesArray[i] = 0;

		if(valuesArray[i] == 0 && state == true) {		// detecting change from positive to negative
			changeOfState++;
			state = false;
//			valuesGroup.push(currentGroup);				
//			currentGroup = [];
		} else if(valuesArray[i] != 0 && state == false) {	// detecting change from negative to positive
			changeOfState++;
			state = true;
//			currentGroup.push(valuesArray[i]);
		} else if(valuesArray[i] != 0 && state == true) {
//			currentGroup.push(valuesArray[i]);
		}
	};

	this.frequency = changeOfState/4+" Hz";

	// attempting to implement Simpson's rule to find area under graph
	// refer to http://tutorial.math.lamar.edu/Classes/CalcII/ApproximatingDefIntegrals.aspx for algorithm

	// var headGroup;

	// if(initState)
	// 	headGroup = valuesGroup.shift();		// to discard the first positive cycle

	// // console.log(changeOfState/2+" Hz");
	// // console.log(valuesGroup[0]);
	// // console.log(valuesGroup[0].length);

	// var approxGroups = [];

	// for (var j = 0; j < valuesGroup.length; j++) {
	// 	if(!((valuesGroup[j].length) % 2 ))
	// 		valuesGroup[j].pop();
	// 	var sum = 0;
	// 	for (var i = 0; i < valuesGroup[j].length; i++) {
	// 		if(i==0 || i==(valuesGroup[j].length - 1)) {
	// 			//console.log("mul by 1: - "+valuesGroup[j][i]);
	// 			sum += valuesGroup[j][i];
	// 		} else if(i % 2) {
	// 			//console.log("mul by 4: - "+valuesGroup[0][i]);
	// 			sum += 4*(valuesGroup[j][i]);
	// 		} else {
	// 			//console.log("mul by 2: - "+valuesGroup[0][i]);
	// 			sum += 2*(valuesGroup[j][i]);
	// 		}
	// 	};
	// 	var deltaX = (valuesGroup[j].length - 1)*0.005;
	// 	var period = deltaX*2;
	// 	var area = (sum*deltaX)/3;
	// 	var Vpeak = area*1.570;
	// 	// console.log(Vpeak);
	// 	var sineConstruct = [];
	// 	for (var i = 0; i < valuesGroup[j].length; i++) {
	// 		var sineValue = (Vpeak*Math.sin(2*3.14159*(1/period)*i*0.005)).toFixed(4)
	// 		if(sineValue >= 0.0000)
	// 			sineConstruct.push(sineValue);
	// 		else
	// 			sineConstruct.push(0.0000);
	// 	};
	// 	approxGroups.push(sineConstruct);
	// };

	// var approxValues = [];
	// var k = 0;
	// for (var i = 0; i < valuesArray.length; i++) {
		
	// 	if(initState) {
	// 		for (var j = 0; j < headGroup.length; j++) {
	// 			approxValues.push(0);
	// 		};
	// 	}

	// 	if(valuesArray[i] == 0) {
	// 		approxValues[i] = 0;
	// 	}

	// 	else {
	// 		for (var j = 0; j < valuesGroup[k].length; j++) {
	// 			approxValues.push(approxGroups[k][j]);
	// 		};
	// 		i += (valuesGroup[k].length) - 1;
	// 		k++;
	// 	}
	// };

	//console.log(approxValues.toString());
}

ValueProcessor.prototype.getFrequency = function() {
	return this.frequency;
}

ValueProcessor.prototype.getNumValues = function() {
	return this.numValues;
}

module.exports = ValueProcessor;