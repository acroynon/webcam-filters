function BlackWhiteFilter(){
	NoFilter.call(this);
	this.applyFilter = function(rawImg, filterImg){
		var rawImgData = rawImg.data;
		var filterImgData = filterImg.data;
		for(i=0; i<rawImgData.length / 4; i++){
			var r = rawImgData[i * 4 + 0];
			var g = rawImgData[i * 4 + 1];
			var b = rawImgData[i * 4 + 2];
			var a = rawImgData[i * 4 + 3];
			filterImgData[i * 4 + 0] = (r+g+b)/3
			filterImgData[i * 4 + 1] = (r+g+b)/3
			filterImgData[i * 4 + 2] = (r+g+b)/3
			filterImgData[i * 4 + 3] = a 
		}
		return filterImg;
	}
}
BlackWhiteFilter.prototype = Object.create(NoFilter.prototype);
BlackWhiteFilter.prototype.constructor = BlackWhiteFilter