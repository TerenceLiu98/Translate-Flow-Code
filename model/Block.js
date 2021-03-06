Block = function(x, y, ctx, command, id){
	/*Coord*/
	this.x = x;
	this.y = y;
	this.name = "";
	this.ctx = ctx;
	this.ctx.font = "15px Courier New";
	this.h = 40;
	this.m = 10;
	this.command = command;
	this.w = this.ctx.measureText(this.command).width;
	this.selected = false;
	this.double_selected = false;
	this.moving = false;
	this.executing = false;
	this.links = new Array();
	this.type= "";
	this.id = -1;
	
}

Block.prototype.propText = 1;
Block.prototype.commandchanged = false;


Block.prototype.printRegular = function(){

	this.ctx.font = "15px Courier New";
	this.ctx.lineWidth = "2";
	this.ctx.strokeStyle = "black";
	this.ctx.fillStyle = "white";
	
	this.printBlock();
	this.printText();

	this.printLinks();
	if(ef.debug)
	this.printColider();
}

Block.prototype.printLinks = function(color){
	
	if(this.links.length < 1 )
		 return;
	 
	this.ctx.globalAlpha = 1;
	//for(var i=0; i<this.links.length; i++){
		this.ctx.strokeStyle = color == undefined?"#000":color;
		this.ctx.beginPath();
		
		var x_start = this.x + this.w/2 + this.m/2;
		var y_start = this.y+this.h;
		var y_middle = 0;
		var y_end =  0;
		var x_end = this.links[0].x + this.links[0].w/2 + this.m/4 - 2;
		
		//dependendo da posição do bloco, o link pode ser por baixo ou por cima		
		if(this.y > this.links[0].y ){
		
			y_end =  this.links[0].y + this.links[0].h;
			var y_middle = y_start + this.h + 20;
			this.ctx.drawImage(ef.direction2, x_end - 5, y_end, 10, 10);
		
		}else{
			y_end =  this.links[0].y;
			var y_middle = y_start + (y_end - y_start) / 2;
			this.ctx.drawImage(ef.direction, x_end - 5, y_end - 10, 10, 10);
		}
		

		this.ctx.moveTo(x_start, y_start);
		this.ctx.lineTo(x_start, y_middle);
		this.ctx.lineTo(x_end, y_middle);
		this.ctx.lineTo(x_end, y_end);
		
		this.ctx.stroke();
		
		
	//}
}


Block.prototype.printSelected = function(){
	this.ctx.strokeStyle = "#4286f4";
	this.ctx.font = "15px Courier New";
	this.ctx.fillStyle = "white";
	this.ctx.lineWidth = "2";
	this.printBlock();
	this.printText();
	this.printLinks();
}

Block.prototype.printDoubleSelected = function(){
	this.ctx.strokeStyle = "#4286f4";
	this.ctx.font = "15px Courier New";
	this.ctx.fillStyle = "white";
	this.ctx.lineWidth = "2";
	this.printBlock();
	this.printText();
	this.printLinks();
}


Block.prototype.printMoving = function(){
	this.ctx.font = "15px Courier New";
	this.ctx.fillStyle = "white";
	this.ctx.lineWidth = "2";
	this.ctx.strokeStyle = "#aaa";
	this.printBlock();
	this.printText();
	this.ctx.setLineDash([4, 2]);
	this.printLinks("#aa");
	this.ctx.setLineDash([0, 0]);
}

Block.prototype.printExecuting = function(){
	this.ctx.font = "italic 15px Courier New";
	this.ctx.fillStyle = "#4286f4";
	this.ctx.lineWidth = "2";
	this.ctx.strokeStyle = "#fff";
	this.printBlock();
	this.printText("white");
	this.ctx.strokeStyle = "#000";
	this.printLinks("#aa");
	this.ctx.setLineDash([0, 0]);
}

	
Block.prototype.click = function(x, y){

	if ( ( (x > this.x)  
		&&  (x < this.x+ this.w+this.m*2)) 
		&& ( (y > this.y)  
		&&  (y < this.y+this.h))) {
		return true;	
	}
	
	return false;
}


Block.prototype.print = function(){
	
	if(this.moving){
		this.printMoving();
	}else if(this.double_selected){
		this.printDoubleSelected();
	}else if(this.selected){
		this.printSelected();
	}else if(this.executing){
		this.printExecuting();
	}else{
		this.printRegular();
	}
}

Block.prototype.updateCommand = function(command){
	this.command = command;
	this.resizeBlock();
}

Block.prototype.getCommand = function(command){
		return this.command;

}
	
Block.prototype.resizeBlock = function(){
	this.w = parseInt(this.ctx.measureText(this.command).width * this.propText);
}

Block.prototype.clearLinks = function(idblock){
	if(this.__proto__ == Decision.prototype){ 
		this.linkyes = null;
		this.linkno = null;	
	}else
	this.links = new Array();
}

Block.prototype.addLink = function(block){
	
	if(this.__proto__ == Decision.prototype){
		if(this.linkyes == null)
			this.linkyes = block;
		else		
			this.linkno = block;			
	}else
		this.links.push(block);
}

Block.prototype.removeLinks = function(block){
	for(var i = 0; i < this.links.length; i++){
		if(this.links[i] == block)
			this.links.splice(i, 1); 
	}
}
Block.prototype.printColider = function(){
	this.ctx.strokeStyle = "#42f445";
	this.ctx.strokeRect(this.x, this.y, this.w + this.m *2 , this.h); 
}

Block.prototype.getType = function(){
	return this.type;
}

Block.prototype.setInitialState = function(){
	this.moving = false;
	this.selected = false;
	this.double_selected = false;
}

Block.prototype.setCommandChanged = function(changed){
	this.commandchanged = changed;
}

Block.prototype.getCommandChanged = function(){
	return this.commandchanged;
}
