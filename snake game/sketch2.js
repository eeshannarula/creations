var s;
var food
var scl=20
function setup() {
  createCanvas(600,600)
  s=new snake()
  this.food=createVector(random(width-scl),random(height-scl))
  frameRate(10)
}

  
  

function draw() {
	background(0)
	
    s.update()
    s.show()
    s.death()
    fill(255,0,100)
    rect(food.x,food.y,scl,scl)

}

function snake()
{
	this.x=40
	this.y=40
	this.xspeed=1
	this.yspeed=0
	this. total=0;
    this. tail=[]
    
	this.update=function(){

         for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
       }
       if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
}

		this.x=this.x+this.xspeed*scl
		this.y=this.y+this.yspeed*scl
        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);

		//if(this.x<0){this.x=0}
		//if(this.y<0){this.y=0}
    //if(this.x>490){this.x=490}                
    //if(this.y>490){this.y=490} 

        if(dis(this.x,this.y,food.x,food.y)<scl)
        {
        	food.x=random(width)
        	food.y=random(height)
        	this.total=this.total+1

        }}
          
        this.dir=function(x,y)
{
	this.xspeed=x
	this.yspeed=y
}


              this.death=function(){
        	for(var i=0;i<this.tail.length;i++){
        		var pos=this.tail[i]
        		if((sqrt(sq(this.x-pos.x)+sq(this.y-pos.y)))<1)
        		{
        			this.total=0
        			this.tail=[]
        		}
            if(this.x==0 || this.x==width || this.y==0 || this.y==height)
              {
                this.total=0
                this.tail=[]
              }
        }
                   
    }
        
        



    this.show=	function(){
    	fill(225,225,225)
    	for (var i = 0; i < this.tail.length; i++) {
rect(this.tail[i].x, this.tail[i].y, scl, scl);}
    	rect(this.x,this.y,scl,scl)
    }

}




function keyPressed()
{
	 if(keyCode==38)
		{
			s.dir(0,-1)

		}

    if(keyCode==40)
    {
      s.dir(0,1)

    }
	
	if(keyCode==37)
		{
			s.dir(-1,0)
		}
	if(keyCode==39)
		{
			s.dir(1,0)
		}		
}

function dis(x,y,x1,y1)
{
	return sqrt(sq(x1-x)+sq(y1-y))
	

}