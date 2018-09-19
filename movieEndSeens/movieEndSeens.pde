String lines;
String txt;
float y;
void setup() {
  
  size(1200,1200,P3D);
  
  String[] lines = loadStrings("mentToBe.txt");
  txt = join(lines,"\n");
  
  y = height;
}

void draw() {
  background(51);
  textAlign(CENTER);
  translate(width/2,height/2);
  textSize(20);
  rotateX(PI/8);
  fill(378,254,75);
  text(txt,-width/2,y,width,height);
  y-=1;
}
