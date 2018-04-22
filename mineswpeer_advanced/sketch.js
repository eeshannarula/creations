function make2dArray(cols, rows) {
  let arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = [];
  }
  return arr;
}

var grid;
var cols;
var rows;


function setup() {
  createCanvas(600, 600);
  rows = 10;
  cols = 10;
  grid = make2dArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new cell(i, j);
    }
  }
  // console.table(grid);
}

function draw() {
  background(51);
	frameRate(10);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
			grid[i][j].update();
    }
  }

}
