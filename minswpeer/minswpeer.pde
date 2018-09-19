import java.util.ArrayList;

 ArrayList<cell> grid = new ArrayList<cell>();
int rows=10;
int cols=10;


void setup(){
  size(600,600);
  
  for(int i=0;i<rows;i++){
    for(int j=0;j<cols;j++){
    grid.add(new cell(i,j));
    }
  }
  
  //print();
  
  
  
}


void draw(){
  background(255);
  for(cell c : grid){
    c.show();
    
  }
  
}
