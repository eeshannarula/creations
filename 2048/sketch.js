var grid;
var side;


function setup() {
  createCanvas(401, 401);
  grid = new blankGrid();
  side=100;
   addNum(grid);
   addNum(grid);

}

function draw() {

  showGrid();

}

function keyPressed() {
  if (keyCode == 39) {
    var past = copyGrid(grid);
    for (var i = 0; i < 4; i++) {
      grid[i] = operate(grid[i]);
    }
    let changed = compair(past, grid);
    if (changed) {
      addNum(grid);

    }
  } else if (keyCode == 37) {

    var past = copyGrid(grid);
    let changed = compair(past, grid);
    for (var i = 0; i < 4; i++) {

      grid[i].reverse();
      grid[i] = operate(grid[i]);
      grid[i].reverse();
      grid[i] = operate(grid[i]);
      grid[i].reverse();
      grid[i] = operate(grid[i]);
      grid[i].reverse();

      // grid[i] = operate(grid[i]);
      // grid[i].reverse();
      //grid[i].reverse();
      //grid[i]=operate(grid[i]);

    }

    if (changed) {
      addNum(grid);


      for (var i = 0; i < 4; i++) {
        //grid[i].reverse();
        grid[i] = operate(grid[i]);
        grid[i].reverse();
      }
    }
  } else if (keyCode == 40) {

    var past = copyGrid(grid)
    grid = rotateGrid(grid);
    for (var i = 0; i < 4; i++) {
      grid[i] = operate(grid[i]);
    }
    let changed = compair(past, grid);
    if (changed) {
      addNum(grid);

    }
    grid = rotateGrid(grid);
  } else if (keyCode == 38) {

    var past = copyGrid(grid);
    grid = rotateGrid(grid);
    let changed = compair(past, grid);
    for (var i = 0; i < 4; i++) {

      grid[i].reverse();
      grid[i] = operate(grid[i]);
      grid[i].reverse();
      // grid[i] = operate(grid[i]);
      // grid[i].reverse();



      //grid[i].reverse();
      //grid[i]=operate(grid[i]);

    }
    if (changed) {
      addNum(grid);
    }

    grid = rotateGrid(grid);
  }
}
