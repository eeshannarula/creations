float g = 0.2;

PGraphics canvas;

float px2;
float py2;
float cx, cy;
pendulum p1;
pendulum p2;
pendulum p3;
//pendulum p4;
void setup() {
  size(1000,1000);
  p1 = new pendulum(width/2,height/2 -200,100,PI/2,10,true,false);
  p2 = new pendulum(p1.x,p1.y,70,0,10,false,false);
  //p3 = new pendulum(p2.x,p2.y,50,0,0,false,true);
  //p4 = new pendulum(p3.x,p3.y,100,0,0,false,false);
  px2 = p2.x;
  py2 = p2.y;
  cx = 0;
  cy = 0;
  
  canvas = createGraphics(width, height);
  canvas.beginDraw();
  canvas.background(255);
  canvas.endDraw();
}

void draw() {
   px2 = p2.x;
  py2 = p2.y;
  background(0);
  
  imageMode(CORNER);
  image(canvas, 0, 0, width, height);
  
  p2.orign.x = p1.x;
  p2.orign.y = p1.y;
  //p3.orign.x = p2.x;
  //p3.orign.y = p2.y;
  //p4.orign.x = p3.x;
  //p4.orign.y = p3.y;
  
  p1.go();
  p2.go();
  //p3.go();
  //p4.go();
  
  p1.accelarate(p2);
  //p2.accelarate(p3);
  //p3.accelarate(p4);
  
  canvas.beginDraw();
  //canvas.background(255, 255);
  canvas.translate(cx, cy);
  canvas.stroke(0);
  if (frameCount > 1) {
    canvas.line(px2, py2, p2.x, p2.y);
  }
  canvas.endDraw();


 
}


void keyPressed() {
  canvas.clear();
}
