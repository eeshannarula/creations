function showGrid() {



  for (var i = 0; i < 4; i++) {

    for (var j = 0; j < 4; j++) {

      var txt = grid[i][j];
      var val = grid[i][j];

      var y = i * side;
      var x = j * side;


      push()
      fill(colorsSizes[grid[i][j] + ''].color);
      rect(x, y, side, side);
      pop()
      if (txt != 0) {
        textSize(colorsSizes[grid[i][j] + ''].size);
        textAlign(CENTER, CENTER);
        text(txt, x + 50, y + 50);
      }

    }
  }

}

function addNum(grid) {

  var options = [];
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (grid[i][j] == 0) {
        options.push({
          x: i,
          y: j
        })
      }
    }
  }



  var selected = random(options);
  var r = random(1)
  if (r < 0.9) {
    grid[selected.x][selected.y] = 2;
  } else {
    grid[selected.x][selected.y] = 4;
  }



}

function blankGrid() {
  var blankgrid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  return blankgrid;

}

function slide(row) {
  var arr = row.filter(x => x)

  var zeroes = 4 - arr.length;
  for (var i = 0; i < zeroes; i++) {
    arr.push(0)
  }
  arr.reverse();

  return arr;
}

function combine(row) {

  for (var i = 0; i < 4; i++) {



    if (row[i + 1] == row[i]) {
      row[i] = row[i + 1] + row[i];
      row[i + 1] = 0;

    }

  }

  return row;

}

function operate(row) {
  row = slide(row);
  // console.log(row)
  row = combine(row);
  // console.log(row)
  row = slide(row);
  // console.log(row)
  //  addNum(grid);



  return row;
}

function copyGrid(grid) {
  var newGrid = new blankGrid()
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      newGrid[i][j] = grid[i][j];
    }
  }
  return newGrid;
}

function rotateGrid(grid) {
  var newGrid = copyGrid(grid);
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var g = grid[j][i];
      newGrid[i][j] = g;
    }
  }
  return newGrid;
}

function rotateGridAntiClockWise(grid) {
  var newGrid = copyGrid(grid);
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      newGrid[j][i] = grid[i][j];
    }
  }
  return newGrid;
}

function compair(a, b) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (a[i][j] != b[i][j]) {
        return true;
      }
    }
  }


  return false;

}

function wingame() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if(grid[i][j]==2048)
      {
        return true;
      }
    }
  }
  return false;
}

function loseGame(){

}
