function make2dArray(cols,rows)
{
  var arr=new Array(cols)
  for(var i=0;i<arr.length;i++)
  {
    arr[i]=new Array(rows)
  }
  return arr;
}
var grid;
var cols;
var rows;
var s=20;
function setup(){
createCanvas(501,501)
     cols=floor(width/s);
     rows=floor(height/s);
    grid=make2dArray(cols,rows);
    for(var i=0;i<cols;i++)
    {
      for(var j=0;j<rows;j++){
         grid[i][j]=new cell(i,j)

      }

    }
}

function draw(){
  background(51)
  for(var i=0;i<cols;i++)
  {
    for(var j=0;j<rows;j++){
       grid[i][j].show()
       grid[i][j].nabhour()
       if(grid[i][j].contains()==true){
         grid[i][j].rev=true
         if( grid[i][j].n==0 )
         {
           grid[i][j].evale()
         }
         if(grid[i][j].bee==true){
           for(var u=0;u<cols;u++)
           {
             for(var v=0;v<rows;v++){
                  grid[u][v].rev=true

             }}
         }
       }


    }

  }
  }
  function bomb(){

  this.x;
  this.y;
  this.width;
  this.height;
  this.rev=false
  this.or;
  this.show=function(x,y,w,h)
  {
    this.x=x;
    this.y=y;
    this.width=w;
    this.height=h;

    fill(100,0,255)
    rect(this.x,this.y,this.width,this.height)
    fill(255,0,0)
    if(this.rev==true){
    ellipse(this.x+50,this.y+50,50,50)}
  }

  }
  function cell(i,j)
  {this.bee;
    if(random(1)>0.8){
    this.bee=true}
    else{this.bee=false}
    this.rev=false
    this.i;
    this.j;
    this.x;
    this.y;
  this.n=0;


    //this.side;
    this.show=function()
    {
      this.i=i;
      this.j=j;
      this.x=i*s;
      this.y=j*s;
      this.flag=1
      fill(255)
      rect(this.x,this.y,s,s)
       if(this.rev==true)
       {
         if(this.bee==true)
         {
           fill(255,0,0)
          ellipse(this.x+10,this.y+10,10,10)

                  }
         else {

           fill(100)
           rect(this.x,this.y,s,s)
           fill(255,100,0)
  if(this.n>0){
          // strokeWeight(4)
         text(this.n,this.x+8,this.y+14)
         if(this.flag==0)
         {
           text('F',this.x+8,this.y+14)
         }
       }}

       }
  if(keyIsPressed){
    if(keyCode===13)
    {
      if(this.flag==1){
      this.flag=0}
      else{this.flag=1}
    }
  }
    }
    this.contains=function()
    {
      if(mouseIsPressed==true)
      {
        if(
          mouseX>this.x && mouseX<this.x+s  &&
          mouseY>this.y && mouseY<this.y+s
        ){
        return true


        }
      }
    }
    this.nabhour=function()
    {
      if(this.bee==true)
      {
        this.n=-1;
      }
        var total=0;
      for(var v=-1;v<=1;v++){
        for(var u=-1;u<=1;u++){
          var i=this.i+v
          var j=this.j+u
          if(i>-1 && i<cols && j>-1 && j<rows){
           var na=grid[i][j]
            if(na.bee==true){
              total++

            }}}
             //console.log(total)
            this.n=total;

          //  return total;

      }

    }
    this.evale=function()
    {
      for(var v=-1;v<=1;v++){
        for(var u=-1;u<=1;u++){
          var i=this.i+v
          var j=this.j+u
          if(i>-1 && i<cols && j>-1 && j<rows){
           var na=grid[i][j]
            if(na.bee!=true && na.rev==false){
              na.rev=true;

            }}}
    }
  }}

  function doubleClicked(){
    if(this.flag==1){
    this.flag=0}
    else{this.flag=1}
  }
