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