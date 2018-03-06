function DNA()
{
	this.genes=[]
	for(var i=0;i<200;i++)
	{
		this.genes[i]=p5.Vector.random2D()
	}

	return this.genes
}


var population;
var count=200;

function setup() {
	createCanvas(600, 600);
	population=new population()
	
	
}

function draw() {
background(51)
frameRate(20)
count--
if(count<0)
{
	count=200
}
population.run()
}

function population()
{
	this.rockets=[]
    this.popsize=100

    for (var i =this.popsize; i >= 0; i--) {
		this.rockets[i]=new rocket()}
	this.run=function()
	{
		for (var i =this.popsize; i >= 0; i--) {
		
		this.rockets[i].show()
		this.rockets[i].update()

	}


	}
}





function rocket()
{
	this.pos=createVector(width/2,height-10);
	this.vil=createVector(1,-1)
	this.dna=new DNA()
	this.lifespan=count;

	this.show=function()
	{
		push()
		translate(this.pos.x,this.pos.y)
		rotate(this.vil.heading());
		fill(255)
		rect(0,0,50,10)

        pop()
	}

	this.update=function()
	{
		this.vil.add(random(this.dna))
		this.pos.add(this.vil)

		if(count==0)
		{
			this.pos.x=width/2
			this.pos.y=height-10
			this.vil.mult(0)
			
		}
	}
}



