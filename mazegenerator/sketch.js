function make2dArray(cols,rows)
{
	var arr=new Array(cols);
	for (var i = 0; i < arr.length; i++) {
	arr[i]=new Array(rows);
		}
	return arr;
}

var grid;
var stack=[]
var cols;
var rows;
var current;
var s=20
var next;
function setup() {
	createCanvas(800, 800);
	cols=floor(width/s);
	rows=floor(height/s);
	grid=make2dArray(cols,rows)

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j <rows; j++) {
			grid[i][j]=new cell(i,j);
		}
	}

current=grid[0][0];
//current.visited=true;

}

function draw() {
         background(51);
			 frameRate(10);



				 for (var i = 0; i < cols; i++)
				  {
					 for (var j = 0; j <rows; j++)
					  {
						 grid[i][j].show();}}
						 if(current){
              next=current.checkNeighbours()
             //if(current==grid[i][j]){

						 if(next){


						 removeWalls(current,next)
						 current.visited=true;
					   fill(255)
						 noStroke()
						 rect(current.x,current.y,s,s)
             current=next;
						 stack.push(current);
						 //console.log(current)

					 }
						 else
						{
							// var cell=stack.pop()
							current.visited=true;
						 current=stack.pop()
							// stack.slice(index,1)
							// current=stack[index]
						// }
					 // }
				 //}
			 }
		 }
			}



						// if(current==grid[i][j])
						// {
							// current.current=true;


							 // fill(255,0,100)
							// rect(current.x,current.y,current.side,current.side)
						 //}




function cell(i,j)
{
	   /*
       top-right-bottom-left
			 top   =[0];
			 right =[1];
			 bottom=[2];
			 left  =[3];
		 */
	   this.edges=[true,true,true,true]
     this.i=i;
		 this.j=j;
		 this.side=20;
		 this.x=this.i*this.side;
		 this.y=this.j*this.side;

		 this.visited=false;

		 this.show=function()
		 {
			 noFill();
			 stroke(255)
			 strokeWeight(4);
			if(this.edges[0]==true)
			{
				line(this.x,this.y,this.x+this.side,this.y)
			}
			if(this.edges[1]==true)
			{
				line(this.x+this.side,this.y,this.x+this.side,this.y+this.side)
			}
			if(this.edges[2]==true)
			{
				line(this.x,this.y+this.side,this.x+this.side,this.y+this.side)
			}
			if(this.edges[3]==true)
			{
				line(this.x,this.y,this.x,this.y+this.side)
			}

       if(this.visited)
			 {
				 fill(255,100,255,100)
				 noStroke()
				 rect(this.x,this.y,this.side,this.side);
				 //this.visited=true;
			 }


		 }

		 this.checkNeighbours=function()
		 {
			 //chek surroundins...

        var neighbours=[];
        if(i>=0 && i<=cols-1 && j-1 >=0 && j-1<=rows-1){
        var top=grid[i][j-1];}
				if(i+1>=0 && i+1<=cols-1 && j >=0 && j<=rows-1){

				var right=grid[i+1][j];}
				if(i>=0 && i<=cols-1 && j+1 >=0 && j+1<=rows-1){

				var bottom=grid[i][j+1];}
				if(i-1>=0 && i-1<=cols-1 && j >=0 && j<=rows-1){

				var left=grid[i-1][j];}

				if (top && !top.visited)
				{
					     neighbours.push(top)
				}
				if (right && !right.visited)
				{
					neighbours.push(right)
				}
				if (bottom && !bottom.visited)
				{
					neighbours.push(bottom)
				}
				if (left && !left.visited)
				{
					neighbours.push(left)
				}


				//console.log(neighbours)
        if(neighbours.length<0){
        return false;
         }
		  	else
				{
					var r=random(neighbours);
      	  return r;
				}

		 }
}

function removeWalls(a,b)
{
	if(a && b){
	var x=a.i-b.i;
	var y=a.j-b.j;

	if(x==-1)
	{
		a.edges[1]=false;
		b.edges[3]=false;
	}
	else if(x==1)
	{
		a.edges[3]=false;
		b.edges[1]=false;
	}
	 if(y==-1)
	{
		a.edges[2]=false;
		b.edges[0]=false;
	}
	else if(y==1)
	{
		a.edges[0]=false;
		b.edges[2]=false;
	}


}
}
