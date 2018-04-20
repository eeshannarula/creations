class Matrix {


  constructor(rows, cols) {
    this.rows = rows; //ROWS..
    this.cols = cols; //COLS..
    //MATRIX GRID ...
    this.grid = new Array(this.rows);
    for (var i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(this.cols);
    }
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.grid[i][j] = 0;
      }
    }

  }

  randomize() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.grid[i][j] = Math.random() * 2 - 1;
      }
    }
  }

  print() {
    console.table(this.grid);
  }

  add(m) {
    if (m instanceof Matrix) {

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.grid[i][j] += m.grid[i][j];
        }
      }

    } else {
      //ADDITION BY A SINGLE NUMBER...
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.grid[i][j] += m;
        }
      }
    }
  }

  static add(m, n) {
    if (m instanceof Matrix && n instanceof Matrix) {
      //ELEMENT WISE ADDITION...
      if (m.rows == n.rows && m.cols == n.cols) {
        var result = new Matrix(n.rows, n.cols);
        for (var i = 0; i < n.rows; i++) {
          for (var j = 0; j < n.cols; j++) {
            result.grid[i][j] = n.grid[i][j] + m.grid[i][j];
          }
        }
        return result;
      } else {
        console.log('error')
        return undefined;
      }
    }
  }


  sub(m) {
    if (m instanceof Matrix) {
      //ELEMENT WISE ADDITION...
      if (m.rows == this.rows && m.cols == this.cols) {
        for (var i = 0; i < this.rows; i++) {
          for (var j = 0; j < this.cols; j++) {
            this.grid[i][j] -= m.grid[i][j];
          }
        }
      }
    } else {
      //ADDITION BY A SINGLE NUMBER...
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.grid[i][j] -= m;
        }
      }
    }
  }

  static sub(m, n) {
    if (m instanceof Matrix && n instanceof Matrix) {
      //ELEMENT WISE ADDITION...
      if (m.rows == n.rows && m.cols == n.cols) {
        var result = new Matrix(n.rows, n.cols);
        for (var i = 0; i < n.rows; i++) {
          for (var j = 0; j < n.cols; j++) {
            result.grid[i][j] = m.grid[i][j] - n.grid[i][j];
          }
        }
        return result;
      } else {
        console.log('error')
        return undefined;
      }
    }
  }

  mult(m) {
    //DOT PRODUNT...
    if (m instanceof Matrix) {
      if (m.rows != this.cols) {
      //  console.log('rows of a must be equal to cols of b');
        return undefined;
      } else {
        var result = new Matrix(this.rows, m.cols)
        for (var i = 0; i < result.rows; i++) {
          for (var j = 0; j < result.cols; j++) {
            let sum = 0;
            for (var k = 0; k < m.rows; k++) {
              sum += this.grid[i][k] * m.grid[k][j]
            }

            result.grid[i][j] = sum;
          }
        }
        return result;
      }
    }
  }

  produnct(m) {
    //DOT PRODUNT...
    if (m instanceof Matrix) {
      if (m.rows != this.cols) {
      //  console.log('rows of a must be equal to cols of b');
        return undefined;
      } else {
        //var result = new Matrix(this.rows, m.cols)
        for (var i = 0; i < this.rows; i++) {
          for (var j = 0; j < m.cols; j++) {
            let sum = 0;
            for (var k = 0; k < m.rows; k++) {
              sum += this.grid[i][k] * m.grid[k][j]
            }

            this.grid[i][j] = sum;
          }
        }
      }
    }
  }

  static mult(m, n) {
    //DOT PRODUNT...STATIC VERSION...
    if (m instanceof Matrix) {
      if (m.rows != n.cols) {
        //console.log('rows of a must be equal to cols of b');
        return undefined;
      } else {
        var result = new Matrix(n.rows, m.cols)
        for (var i = 0; i < result.rows; i++) {
          for (var j = 0; j < result.cols; j++) {
            let sum = 0;
            for (var k = 0; k < m.rows; k++) {
              sum += n.grid[i][k] * m.grid[k][j]
            }

            result.grid[i][j] = sum;
          }
        }
        return result;
      }
    }
  }

  multiply(m) {
    //SCALER PRODUNCT...
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.grid[i][j] *= m;
      }
    }
  }

  static copy(m) {
    var result = new Matrix(m.rows, m.cols);
    for (var i = 0; i < result.rows; i++) {
      for (var j = 0; j < result.cols; j++) {
        result.grid[i][j] = m.grid[i][j];
      }
    }
    return result;
  }

  static transpose(m) {
    var result = new Matrix(m.cols, m.rows);
    for (var i = 0; i < result.rows; i++) {
      for (var j = 0; j < result.cols; j++) {
        result.grid[i][j] = m.grid[j][i];
      }
    }
    return result;
  }

  static vectorToMatrix(m) {
    var result = new Matrix(m.length, 1)
    for (var i = 0; i < result.rows; i++) {
      result.grid[i][0] = m[i];
    }
    return result;
  }

  static matrixToVector(m) {
    var result = [];
    for (var i = 0; i < m.rows; i++) {
      result[i] = m.grid[i][0];
    }
    return result;
  }

  map(f) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        let val = this.grid[i][j];
        this.grid[i][j] = f(val);
      }
    }
  }

  static map(m, f) {
    var result = new Matrix(m.rows, m.cols);
    for (var i = 0; i < result.rows; i++) {
      for (var j = 0; j < result.cols; j++) {
        var val = m.grid[i][j];
        result.grid[i][j] = f(val);
      }
    }
    return result;
  }

}
