function Webcam(){
	this.webcamAvailable = function(){
		return (navigator.mediaDevices.getUserMedia);
	},
	this.getWebcam = function(){
		return navigator.mediaDevices.getUserMedia({video: true});
	}

}