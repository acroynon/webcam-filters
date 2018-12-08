function Timer(){
	this.createTimerTask = function(func, fps){
		window.setInterval(func, 1000/fps);
	}
}