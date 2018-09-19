class cell{
  
  int x;
  int y;
  int i;
  int j;
  int side=width/10;
  boolean bee;
  
  cell(int i_,int j_){
     i=i_;
     j=j_;
     x=i*side;
     y=j*side;
     if(random(1)>0.8){
       bee=true;
     } else {
       bee=false;
     }
     
     //print(x+':'+y+":"+i+":"+j);
   
  }
  
  void show(){
    fill(255);
    rect(x,y,60,60);
    if(bee){
      fill(255,0,100);
     ellipse(x+side/2,y+side/2,side/2,side/2); 
    }
  }
  
  int takeIndex(int i,int j){
    int index=i * j * cols;
    return index;
  }
  
  void checkNaighbours(){
    int n=0;
    int top=takeIndex(i,j-1);
    int rigth=takeIndex(i+1,j);
    int down=takeIndex(i,j+1);
    int left=takeIndex(i-1,j);
    
  }
  
  
  
}
