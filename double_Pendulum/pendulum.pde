class pendulum {
   PVector orign;
   float len;
   float x = 0;
   float y = 0;
   float av = 0;
   float aa = 0;
   float angle = PI/2;
   Boolean upper;
   Boolean mid;
   float mass;
   pendulum(float ox ,float oy ,float length , float a ,float mass,Boolean istop,Boolean havechild) {
      this.orign = new PVector(ox,oy);
      this.len = length;
      this.angle = a;
      this.mass = mass;
      this.upper = istop;
      this.mid = havechild;
    }
    
    void go() {
      
      av += aa;
      angle += av;
      //av *= 0.99;
      aa *= 0;
      
      x = orign.x + len * sin(angle);
      y = orign.y + len * cos(angle);
      
      fill(255,100,100);
      stroke(255,100,100);
      
      line(orign.x,orign.y,x,y);
      ellipse(x,y,20,20);
    
    }
    
    void accelarate(pendulum other) {
        
      if(upper) {
        float num1 = -1 * g * (2 * mass + other.mass) * sin(angle);
        float num2 = -1 * other.mass * g * sin(angle - 2 * other.angle);
        float num3 = -1 * 2 * sin(angle - other.angle) * other.mass;
        float num4 = other.av * other.av * other.len + av * av * len * cos(angle - other.angle);
        float dnom = len * (2 * mass + other.mass - other.mass * cos(2 * angle - 2 * other.angle));
        aa = (num1 + num2 + num3 * num4) / dnom;
        
         num1 = 2 * sin(angle - other.angle);
         num2 = (av * av * len * (mass + other.mass) + g * (mass + other.mass) * cos(angle) + other.av * other.av * other.len * other.mass * cos(angle - other.angle));
         dnom = other.len * (2 * mass + other.mass - other.mass * cos(2 * angle - 2 * other.angle));
        other.aa = (num1 * num2) / dnom;
      } else  if(mid){
        float num1 = 2 * sin(angle - other.angle);
        float num2 = (av * av * len * (mass + other.mass) + g * (mass + other.mass) * cos(angle) + other.av * other.av * other.len * other.mass * cos(angle - other.angle));
        float dnom = other.len * (2 * mass + other.mass - other.mass * cos(2 * angle - 2 * other.angle));
        other.aa = (num1 * num2) / dnom;
    }
  }
}
