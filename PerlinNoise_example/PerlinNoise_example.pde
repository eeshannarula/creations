float x;
float y;
float jump;
float t=width/2;

void setup(){
  size(400,400);
  background(51);
  x=0;
  y=height/2;
  jump=8;

}


void draw(){
  if(x<width){
  x+=2;
  t-=0.005;
  //t=map(t,0,1,0,height);
  y=noise(t);
  y=map(y,0,1,0,height);
  fill(255);
  ellipse(x,y,10,10);
  }
  
  
}
