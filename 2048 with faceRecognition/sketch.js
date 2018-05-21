var grid;
var side;


function setup() {
  createCanvas(401, 401).parent('#container');
  grid = new blankGrid();
  side = 100;
  addNum(grid);
  addNum(grid);
  manager = new Handler();
  controllerDataset = new ControllerDataset(4);
}

function draw() {

  showGrid();
  manager.repeatWork();

}

// function keyPressed() {
//
//   let win = wingame();
//   if (win) {
//     alert('you have won the game!!')
//   }
//   if (keyCode == 39) {
//     var past = copyGrid(grid);
//     for (var i = 0; i < 4; i++) {
//       grid[i] = operate(grid[i]);
//     }
//     let changed = compair(past, grid);
//     if (changed) {
//       addNum(grid);
//
//     }
//   } else if (keyCode == 37) {
//
//     var past = copyGrid(grid);
//     let changed = compair(past, grid);
//     for (var i = 0; i < 4; i++) {
//
//       grid[i].reverse();
//       grid[i] = operate(grid[i]);
//       grid[i].reverse();
//       grid[i] = operate(grid[i]);
//       grid[i].reverse();
//       grid[i] = operate(grid[i]);
//       grid[i].reverse();
//
//
//     }
//
//     if (changed) {
//       addNum(grid);
//
//
//       for (var i = 0; i < 4; i++) {
//         //grid[i].reverse();
//         grid[i] = operate(grid[i]);
//         grid[i].reverse();
//       }
//     }
//   } else if (keyCode == 40) {
//
//     var past = copyGrid(grid)
//     grid = rotateGrid(grid);
//     for (var i = 0; i < 4; i++) {
//       grid[i] = operate(grid[i]);
//     }
//     grid = rotateGrid(grid);
//
//     let changed = compair(past, grid);
//     if (changed) {
//       addNum(grid);
//
//     }
//   } else if (keyCode == 38) {
//
//     var past = copyGrid(grid);
//     grid = rotateGrid(grid);
//
//     for (var i = 0; i < 4; i++) {
//
//       grid[i].reverse();
//       grid[i] = operate(grid[i]);
//       grid[i].reverse();
//
//
//     }
//     grid = rotateGrid(grid);
//     let changed = compair(past, grid);
//     if (changed) {
//       addNum(grid);
//     }
//
//   }
// }
//
function ButtonPressed() {
  predict();

  let win = wingame();
  if (win) {
    alert('you have won the game!!')
  }
  predict();
  switch (dirP) {
    case 'up':
      var past = copyGrid(grid);
      grid = rotateGrid(grid);

      for (var i = 0; i < 4; i++) {
        grid[i].reverse();
        grid[i] = operate(grid[i]);
        grid[i].reverse();
      }
      grid = rotateGrid(grid);
      let changed0 = compair(past, grid);
      if (changed0) {
        addNum(grid);
      }
      break;
    case 'down':
      var past = copyGrid(grid)
      grid = rotateGrid(grid);
      for (var i = 0; i < 4; i++) {
        grid[i] = operate(grid[i]);
      }
      grid = rotateGrid(grid);

      let changed1 = compair(past, grid);
      if (changed1) {
        addNum(grid);
      }
      break;
    case 'left':
      var past = copyGrid(grid);
      for (var i = 0; i < 4; i++) {
        grid[i] = operate(grid[i]);
      }
      let changed2 = compair(past, grid);
      if (changed2) {
        addNum(grid);
      }
      break;
    case 'right':
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
      }
      let changed3 = compair(past, grid);
      if (changed) {
        addNum(grid);
      }
      break;
    default:

  }
}
