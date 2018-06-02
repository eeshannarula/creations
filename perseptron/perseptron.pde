perceptron p;
Point[] data;
Point[] points;
void setup(){
  size(500,500);
  p = new perceptron();
  data = new Point[100];
  points = new Point[100];
  for(int i = 0;i<100;i++){
    data[i] = new Point();
    points[i] = new Point();
  }
}

void draw(){
  line(0,0,width,height);
  for(Point point:points){
    float[] inputs = {point.x,point.y};
    int guess = p.guess(inputs);
    point.label = guess;
    point.show();
  }
}

void mousePressed(){
  train();
}
