function BlackWhiteFilter(){
	NoFilter.call(this);
	this.title = "Black & White",
	this.applyFilter = function(rawImg, filterImg){
		var rawImgData = rawImg.data;
		var filterImgData = filterImg.data;
		for(i=0; i<rawImgData.length / 4; i++){
			var r = rawImgData[i * 4 + 0];
			var g = rawImgData[i * 4 + 1];
			var b = rawImgData[i * 4 + 2];
			var a = rawImgData[i * 4 + 3];
			var newValue = Math.min((r * 0.3) + (g * 0.59) + (b * 0.11), 255);;
			filterImgData[i * 4 + 0] = newValue;
			filterImgData[i * 4 + 1] = newValue;
			filterImgData[i * 4 + 2] = newValue;
			filterImgData[i * 4 + 3] = a;
		}
		return filterImg;
	}
}
BlackWhiteFilter.prototype = Object.create(NoFilter.prototype);
BlackWhiteFilter.prototype.constructor = BlackWhiteFilter

