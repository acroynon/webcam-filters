function RetroFilter(){
	NoFilter.call(this);
	this.title = "Retro",
	this.applyFilter = function(rawImg, filterImg){
		var rawImgData = rawImg.data;
		var filterImgData = filterImg.data;
		var rawWidth = rawImg.width;
		var rawHeight = rawImg.height;
		var retroWidth = rawWidth/75;
		var retroHeight = rawWidth/75;
		var retroArray = [];
		// Go through raw pixels and sum the total values
		for(i=0; i<rawImgData.length / 4; i++){
			var r = rawImgData[i * 4 + 0];
			var g = rawImgData[i * 4 + 1];
			var b = rawImgData[i * 4 + 2];
			var a = rawImgData[i * 4 + 3];

			var x = i % rawWidth;
			var y = Math.floor(i / rawWidth);

			var retroX = Math.floor(x / retroWidth);
			var retroY = Math.floor(y / retroHeight);

			if(retroArray[retroX] == null){
				retroArray[retroX] = [];
			}

			if(retroArray[retroX][retroY] == null){
				retroArray[retroX][retroY] = {
					rTotal: 0,
					gTotal: 0,
					bTotal: 0,
					aTotal: 0,
					rAvg: 255,
					gAvg: 0,
					bAvg: 0,
					aAvg: 0,
					count: 0
				}
			}
			retroArray[retroX][retroY].rTotal += r;
			retroArray[retroX][retroY].gTotal += g;
			retroArray[retroX][retroY].bTotal += b;
			retroArray[retroX][retroY].aTotal += a;
			retroArray[retroX][retroY].count += 1;
		}

		// Calulate the average values for the retro pixels
		for(x=0; x<retroArray.length; x++){
			for(y=0; y<retroArray[0].length; y++){
				var retroPixel = retroArray[x][y];
				var count = rawImgData.length / 4;
				retroPixel.rAvg = Math.round(retroPixel.rTotal / retroPixel.count);
				retroPixel.gAvg = Math.round(retroPixel.gTotal / retroPixel.count);
				retroPixel.bAvg = Math.round(retroPixel.bTotal / retroPixel.count);
				retroPixel.aAvg = retroPixel.aTotal / retroPixel.count;
			}
		}

		// Assign values to the raw image from the retro pixels averages
		for(i=0; i<rawImgData.length / 4; i++){
			var x = i % rawWidth;
			var y = Math.floor(i / rawWidth);

			var retroX = Math.floor(x / retroWidth);
			var retroY = Math.floor(y / retroHeight);

			var retroPixel = retroArray[retroX][retroY];

			filterImgData[i * 4 + 0] = retroPixel.rAvg;
			filterImgData[i * 4 + 1] = retroPixel.gAvg;
			filterImgData[i * 4 + 2] = retroPixel.bAvg;
			filterImgData[i * 4 + 3] = retroPixel.aAvg;
		}
		return filterImg;
	}
	this.map = function(v, a, b, a1, b1){

	}
}
RetroFilter.prototype = Object.create(NoFilter.prototype);
RetroFilter.prototype.constructor = RetroFilter