var bird;
var pipes=[];
function setup()
{
	createCanvas(600,600)
	 bird=new bird()
	 pipes.push(new pipe());
}
function draw()
{
	background(0)
	bird.update()
	bird.show()
	if(frameCount%100==0)
	{
		pipes.push(new pipe())
	}
	for(var i=0;i<pipes.length;i++)
	{
		pipes[i].show()
		pipes[i].update()
		if (pipes[i].hits(bird)) {console.log('hits')}
		if(pipes[i].offscreen()){
			pipes.splice(i,1)
		}
	}
}

function keyPressed()
{
	bird.pressing()
	//console.log('keyPressed')
}
function bird()
{


	this.upforce=80
	this.r=30
	this.x=width/2
	this.y=height/2
	this.gravity=4
	this.vilocity=1
	this.uplift=-10

	this.update=function()

	{   //this.gravity=this.gravity+this.vilocity
		//this.upforce=this.upforce+this.vilocity*2
		this.y=this.y+this.gravity

        if(this.y+this.r>height)
        	{
        		this.y=width
        		this.vilocity=this.gravity
        	}

	}

    this.show=function()
    {

    	fill(255,255,255)
    	ellipse(this.x,this.y,this.r,this.r)

    }

    this.pressing=function()
    {
    	this.y=this.y-this.upforce
    	console.log('upforce')
    }

    if(keyIsPressed){this.press();
    	//console.log('keyIsPressed')
    }
}

function pipe()
{    this.color=false
	this.top=random(height/2)
	this.bottom=random(height/2)
	this.pipex=width
	this.width=30
    this.speed=2
	this.update=function()
	{
		this.pipex-=this.speed


	}

	this.hits=function(bird){
		if(bird.y<this.top || bird.y>height-this.bottom){
			if(bird.x>this.pipex && bird.x<this.pipex+this.width){
				this.color=true
				return true

			}


			else{this.color=false}
		}
	}

	this.show=function()
	{
		fill(255,255,255)
		if(this.color==true){fill(255,0,100)}
		rect(this.pipex,0,this.width,this.top)
		rect(this.pipex,height-this.bottom,this.width,this.bottom)
	}
	this.offscreen=function()
	{
		if(this.pipex+this.width<0){return true}
		else{return false}
	}
}
