
int activationFunction(float n) {
  if(n>0) {
    return 1;
  }else{
    return -1;
  }
}
class perceptron{
  float[] weights;
  perceptron(){
    weights = new float[2];
    for (double w:weights){
      w = Math.random() * 2 - 1;
    }
  }
  
  int guess(float[] inputs){
    float sum = 0;
    for(int k = 0;k<weights.length;k++){
      sum+= weights[k] * inputs[k];
    }
    return activationFunction(sum); 
  }
  
  void train(float[] inputs,float t) {
    float sum = 0;
    float target = t;
    for(int k = 0;k<2;k++){
      sum+= weights[k] * inputs[k];
    }
    float o =  activationFunction(sum);
    float error = target - o;
    float lr = 0.1;
    for (int i = 0;i<weights.length;i++){
      weights[i] += error * inputs[i]*lr;
    }
  }
}
void train(){
  for(Point point:data){
   float[] inputs = {point.x,point.y};
   p.train(inputs,point.label);
  }
}
