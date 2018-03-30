function make2dArray(cols,rows)
{
	var arr=new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i]=new Array(rows);
		}
		return arr;
}

var grid;
var grid2;
var cols;
var rows;
var current;

function setup() {
	createCanvas(400, 400);
	cols=width/40;
	rows=height/40;
	grid=make2dArray(cols,rows)

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j <rows; j++) {
			grid[i][j]=new cell(i,j);
		}
	}

current=grid[0][0];




}

function draw() {
         background(51);
				 frameRate(5);

				 for (var i = 0; i < cols; i++) {
					 for (var j = 0; j <rows; j++) {
						 grid[i][j].show();

						 if(current==grid[i][j])
						 {
							 grid[i][j].current=true;
							 grid[i][j].visited=true;
							 var next=grid[i][j].checkNeighbours()
							 current=next;
						 }
						 // else{
							//  grid[i][j].current=false;
						 // }
					 }
				 }



}

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
		 this.side=40;
		 this.x=this.i*this.side;
		 this.y=this.j*this.side;
		 this.current=false;
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

       if(this.current)
			 {
				 fill(255,100,0)
				 rect(this.x,this.y,this.side,this.side);
				 this.visited=true;
			 }

		 }

		 this.checkNeighbours=function()
		 {
			 //chek surroundins...

        var neighbours=[];
        if((j-1)>-1){
        var top=grid[i][j-1];}
				if((i+1)<=cols-1){
				var right=grid[i+1][j];}
				if((j+1)<=rows-1){
				var bottom=grid[i][j+1];}
				if((i-1)>-1){
				var left=[i-1][j];}

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

				var r=random(neighbours);

		    return r;

		 }
}
