function SepiaFilter(){
	NoFilter.call(this);
	this.title = "Sepia",
	this.applyFilter = function(rawImg, filterImg){
		var rawImgData = rawImg.data;
		var filterImgData = filterImg.data;
		for(i=0; i<rawImgData.length / 4; i++){
			var r = rawImgData[i * 4 + 0];
			var g = rawImgData[i * 4 + 1];
			var b = rawImgData[i * 4 + 2];
			var a = rawImgData[i * 4 + 3];
			filterImgData[i * 4 + 0] = Math.min((r * 0.393) + (g * 0.769) + (b * 0.189), 255);
			filterImgData[i * 4 + 1] = Math.min((r * 0.349) + (g * 0.689) + (b * 0.168), 255);
			filterImgData[i * 4 + 2] = Math.min((r * 0.272) + (g * 0.534) + (b * 0.131), 255);
			filterImgData[i * 4 + 3] = a;
		}
		return filterImg;
	}
}
SepiaFilter.prototype = Object.create(NoFilter.prototype);
SepiaFilter.prototype.constructor = SepiaFilter

