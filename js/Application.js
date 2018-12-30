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

		this.createFilterButton(new NoFilter(), buttonContainer, document);
		this.createFilterButton(new BlackWhiteFilter(), buttonContainer, document);
		this.createFilterButton(new SepiaFilter(), buttonContainer, document);
		this.createFilterButton(new ThreeBitFilter(), buttonContainer, document);
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

	this.createFilterButton = function(filter, parentElem, document){
		var that = this;
		var btn = document.createElement("button");
		btn.innerText = filter.title;
		parentElem.appendChild(btn);
		btn.onclick = function(){
			that.setFilter(filter);
		}
	}

}