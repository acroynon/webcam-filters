function Application(){
	this.filter,
	this.main = function(){
		var that = this;
		this.filter = new NoFilter();
		var document = new Document();
		var videoElem = document.createAndAppendElement("video");
		var bufferCanvas = document.createAndAppendElement("canvas");
		var canvas = document.createAndAppendElement("canvas");
		var buttonContainer = document.createAndAppendElement("div");

		document.hideElement(videoElem);
		document.hideElement(bufferCanvas);
		document.addAttrbute(videoElem, "autoplay", "true");
		this.setupWebcamVideo(videoElem);

		this.setCanvasToVideoDimension(videoElem, bufferCanvas);
		this.setCanvasToVideoDimension(videoElem, canvas);

		this.mirrorVideoToCanvas(videoElem, bufferCanvas);
		this.applyFilter(bufferCanvas, canvas);

		this.createFilterButton("No Filter", new NoFilter(), buttonContainer, document);
		this.createFilterButton("Black & White", new BlackWhiteFilter(), buttonContainer, document);
	},

	this.setupWebcamVideo = function(videoElem){
		var webcam = new Webcam();
		if(webcam.webcamAvailable){
			webcam.getWebcam()
			.then(function(stream){
				videoElem.srcObject = stream;
			})
		}
	},

	this.mirrorVideoToCanvas = function(video, canvas){
		new Timer().createTimerTask(function(){
			canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
		}, 60)
	},

	this.setCanvasToVideoDimension = function(video, canvas){
		video.addEventListener('loadedmetadata',function(){
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
		});
	},

	this.applyFilter = function(rawCanvas, filterCanvas){
		var that = this;
		new Timer().createTimerTask(function(){
			that.filter.drawFilter(rawCanvas, filterCanvas);
		}, 60);
	}

	this.setFilter = function(newFilter){
		this.filter = newFilter;
	}

	this.createFilterButton = function(text, filter, parentElem, document){
		var that = this;
		var btn = document.createElement("button");
		btn.innerText = text;
		parentElem.appendChild(btn);
		btn.onclick = function(){
			that.setFilter(filter);
		}
	}

}

function Webcam(){
	this.webcamAvailable = function(){
		return (navigator.mediaDevices.getUserMedia);
	},
	this.getWebcam = function(){
		return navigator.mediaDevices.getUserMedia({video: true});
	}

}

function Document(){
	this.createElement = function(str){
		return document.createElement(str);
	},
	this.appendElement = function(elem){
		document.body.appendChild(elem);
	},
	this.createAndAppendElement = function(str){
		var elem = this.createElement(str);
		this.appendElement(elem);
		return elem;
	},
	this.hideElement = function(elem){
		elem.style.display = "none";
	}
	this.addAttrbute = function(elem, attr, value){
		elem[attr] = value;
	}
}

function Timer(){
	this.createTimerTask = function(func, fps){
		window.setInterval(func, 1000/fps);
	}
}

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


new Application().main();