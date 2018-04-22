class cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.reveled = false;
    this.side = width / 10;
    this.x = this.i * this.side;
    this.y = this.j * this.side;

    if (random(1) > 0.78) {
      this.bee = true;
    } else {
      this.bee = false;
    }
  }
  show() {
    push()
    noFill();
    stroke(255);
    strokeWeight(4);
    rect(this.x, this.y, this.side, this.side);
    pop()
    if (this.reveled) {
      if (this.bee) {
        push()
        fill(255, 0, 100);
        ellipse(this.x + this.side / 2, this.y + this.side / 2, this.side / 2, this.side / 2);
        pop()
        revealAll();
      } else {
        let totalNaighbours = this.checkNeighbours();
        if (totalNaighbours !== 0) {
          fill(100, 255, 100)
          text(totalNaighbours, this.x + this.side / 2, this.y + this.side / 2)
        } else if (totalNaighbours == 0) {
          push()
          this.revealNaighbours();
          fill(100, 0, 255)
          rect(this.x, this.y, this.side, this.side)
          pop();
        }
      }
    }
  }
  update() {
    if (mouseIsPressed) {
      if (mouseX > this.x && mouseX < this.x + this.side) {
        if (mouseY > this.y && mouseY < this.y + this.side) {
          this.reveled = true;
        }
      }
    }
  }
  checkNeighbours() {

    let top = null;
    let right = null;
    let bottom = null;
    let left = null;
    let topRight = null;
    let topLeft = null;
    let bottomLeft = null;
    let bottomRight = null;
    if (this.j - 1 >= 0) {
      top = grid[this.i][this.j - 1];
    };
    if (this.i + 1 <= cols - 1) {
      right = grid[this.i + 1][this.j];
    };
    if (this.j + 1 <= rows - 1) {
      bottom = grid[this.i][this.j + 1];
    };
    if (this.i - 1 >= 0) {
      left = grid[this.i - 1][this.j];
    }

    if (this.i + 1 <= cols - 1 && this.j - 1 >= 0) {
      topRight = grid[this.i + 1][this.j - 1];
    }

    if (this.i + 1 <= cols - 1 && this.j + 1 <= rows - 1) {
      bottomRight = grid[this.i + 1][this.j + 1];
    }

    if (this.i - 1 >= 0 && this.j + 1 <= rows - 1) {
      bottomLeft = grid[this.i - 1][this.j + 1];
    }

    if (this.i - 1 >= 0 && this.j - 1 >= 0) {
      topLeft = grid[this.i - 1][this.j - 1];

    }


    let total = 0;

    if (top !== null && top.bee) {
      total++;
    }
    if (right !== null && right.bee) {
      total++;
    }

    if (bottom !== null && bottom.bee) {
      total++;
    }

    if (left !== null && left.bee) {
      total++;
    }

    if (topRight !== null && topRight.bee) {
      total++;
    }
    if (bottomRight !== null && bottomRight.bee) {
      total++;
    }

    if (bottomLeft !== null && bottomLeft.bee) {
      total++;
    }

    if (topLeft !== null && topLeft.bee) {
      total++;
    }


    return total;

  }

  revealNaighbours() {
    let top = null;
    let right = null;
    let bottom = null;
    let left = null;
    let topRight = null;
    let topLeft = null;
    let bottomLeft = null;
    let bottomRight = null;
    if (this.j - 1 >= 0) {
      top = grid[this.i][this.j - 1];
    };
    if (this.i + 1 <= cols - 1) {
      right = grid[this.i + 1][this.j];
    };
    if (this.j + 1 <= rows - 1) {
      bottom = grid[this.i][this.j + 1];
    };
    if (this.i - 1 >= 0) {
      left = grid[this.i - 1][this.j];
    }

    if (this.i + 1 <= cols - 1 && this.j - 1 >= 0) {
      topRight = grid[this.i + 1][this.j - 1];
    }

    if (this.i + 1 <= cols - 1 && this.j + 1 <= rows - 1) {
      bottomRight = grid[this.i + 1][this.j + 1];
    }

    if (this.i - 1 >= 0 && this.j + 1 <= rows - 1) {
      bottomLeft = grid[this.i - 1][this.j + 1];
    }

    if (this.i - 1 >= 0 && this.j - 1 >= 0) {
      topLeft = grid[this.i - 1][this.j - 1];

    }

    if (top !== null && !top.bee) {
      top.reveled = true;
    }
    if (right !== null && !right.bee) {
      right.reveled = true;
    }

    if (bottom !== null && !bottom.bee) {
      bottom.reveled = true;
    }

    if (left !== null && !left.bee) {
      left.reveled = true;
    }

    if (topRight !== null && !topRight.bee) {
      topRight.reveled = true;
    }
    if (bottomRight !== null && !bottomRight.bee) {
      bottomRight.reveled = true;
    }

    if (bottomLeft !== null && !bottomLeft.bee) {
      bottomLeft.reveled = true;
    }

    if (topLeft !== null && !topLeft.bee) {
      topLeft.reveled = true;
    }

  }

}
