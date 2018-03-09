var lifespan=100;
var count=0;
var popul
var target;
var obs;
var cycles=0
var w=400
var h=40


function setup()
{
    createCanvas(600,600)
    popul=new population()
    
    target=createVector(width/2,30)
    obs=createVector(100,height/2)
}   

function draw()
{
    background(51)
    frameRate(30)
    popul.run()
    count++;
    
    if(count==lifespan)
    {
        
        popul.evaluate()
        popul.selection()
        count=0
        cycles++
       // console.log("cycle:"+cycles)
        
       // popul=new population()
        
    }
    fill(255,100,200)
    ellipse(target.x,target.y,20,20)
    //rectMode(CENTER)
    rect(obs.x ,obs.y ,w ,h)
    
}   

function population()
{
    this.rockets=[]
    var maxfit=0
    var popsize=50;
    this.popsize=50
    this.meatingpool=[]
    
    for(var i=0;i<popsize;i++)
    {
        this.rockets[i]=new rocket()
    }
    
    this.evaluate=function()
    {
        for (var i=0;i<popsize;i++) {
        
        this.rockets[i].calcFitness()
        if(this.rockets[i].fitness>maxfit)
        {
            maxfit=this.rockets[i].fitness;
        }}
        for(var i=0;i<popsize;i++){
        
        this.rockets[i].fitness/=maxfit;}
        
          
        this.meatingpool=[]
        
        for (var i=0; i<popsize; i++) {
        
        var n=this.rockets[i].fitness*1000
        for(var j=0;j<n;j++)
        {
            this.meatingpool.push(this.rockets[i])
            
        }        
        //console.log("number of times"+this.rockets[i].fitness/maxfit*1000)
        
        }
        
        //console.log("total length"+this.meatingpool.length)
        
        
    }
    
    this.selection=function()
    {
        var index=this.meatingpool.length
        var newRocket=[]
        for(var i=0;i<popsize;i++){
        
        //var i1=floor(random(1,this.meatingpool.length))
        var ind=this.meatingpool.length
        var i1=round(random(ind))
         var i2=round(random(ind))
              // console.log("total"+ind)
              // console.log("pa"+i1)
               //console.log("pb"+i2)
        
        var parentA=this.meatingpool[i1].dna
        var parentB=this.meatingpool[i2].dna
        
        
            var child=parentA.crossover(parentB)
           child.mutation();
            //console.log(child.genes.length)
            newRocket[i]=new rocket(child)

    }
    
    this.rockets=newRocket;
    
    }
    
    
    
    
    this.run=function()
    {
         for(var i=0;i<popsize;i++)
    {
        this.rockets[i].show()
        this.rockets[i].update()
    }
    }
}

function rocket(dna)
{
    this.pos=createVector(width/2,height-10);

    this.vil=createVector()
    
    this.acc=createVector()
    this.completed=false;
    this.crashed=false;
    
    if(dna)
    {
    
        this.dna=dna;
        
    }
    
    else
    {
    
    this.dna=new DNA()
    
    }
    
    this.fitness=0
    
    
    this.calcFitness=function()
    {
        var d=dist(target.x,target.y,this.pos.x,this.pos.y)
        this.fitness =map(d,0,width,width,0)
        if(d<20)
        {
            this.completed=true;
        }
        
        



    }
    


    this.show=function()

    {

        push()

        translate(this.pos.x,this.pos.y)

        rotate(this.vil.heading());

        fill(255,100)
        
        rectMode(CENTER)

        rect(0,0,25,5)

        pop()

    }

    this.update=function()

    {
    
    
    if(this.pos.x >obs.x && this.pos.x<obs.x+ w && this.pos.y>obs.y && this.pos.y < obs.y+ h){
        this.crashed =true
    }
    
    if(this.pos.x<0 || this.pos.x>width || this.pos.y<0 || this.pos.y>height)
    {
        this.crashed=true
    }
    
    
    
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);

    // If distance less than 10 pixels, then it has reached target

    if (d < 10) {

      this.completed = true;

      this.pos = target.copy();

    }

    
       if (this.completed) {

      


this.fitness *= 10;}

    // If rocket does not get to target decrease fitness

    if (this.crashed) {

      this.fitness /= 10;
      

    }
if(!this.completed && !this.crashed){

        this.vil.add(this.acc)

        this.pos.add(this.vil)
        
        this.acc.mult(0)
        
        this.acc.add(this.dna.genes[count])
        }
        

    }

} 


function DNA(genes)
{
    if(genes)
    {
    this.genes=genes
    }
    else
     {
     this.genes=[];
     for(var i=0;i<lifespan;i++)
    {
        this.genes[i]=p5.Vector.random2D()
        this.genes[i].setMag(2)        
    }
    }
    
    this.crossover = function(partner) {

    var newgenes = [];

  

    var mid = floor(random(this.genes.length));
//console.log("gene length"+ this.genes.length)

    for (var i = 0; i <lifespan; i++) {
  
    

      if (i >= mid) {

        newgenes[i] = this.genes[i];

      }

      

      else {

        newgenes[i] = partner.genes[i];

      }

    }

   

    return new DNA(newgenes);

  }

this.mutation = function() {

    for (var i = 0; i < this.genes.length; i++) {

      // if random number less than 0.01, new gene is then random vector

      if (random(1) < 0.01) {

        this.genes[i] = p5.Vector.random2D();
        
        this.genes[i].setMag(2)

      }

    }

  }


}         