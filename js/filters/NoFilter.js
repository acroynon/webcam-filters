function NoFilter(){
	this.drawFilter = function(rawCanvas, filterCanvas){
		var rawImg = rawCanvas.getContext("2d").getImageData(0, 0, rawCanvas.width, rawCanvas.height);
		var filterImg = filterCanvas.getContext("2d").createImageData(filterCanvas.width, filterCanvas.height);
		var img = this.applyFilter(rawImg, filterImg);
		filterCanvas.getContext("2d").putImageData(img, 0, 0);
	},
	this.applyFilter = function(rawImg, filterImg){
		return rawImg;
	}
}