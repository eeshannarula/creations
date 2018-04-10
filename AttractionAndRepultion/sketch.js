var attractors = [];
var agents = [];
var paths;
var count;
var total;

function setup() {
  createCanvas(500, 500);
  count = 1000;
  total = 1;


  for (var i = 0; i < count; i++) {
    paths = [{
        x: -50,
        y: random(height)
      },
      {
        x: width + 50,
        y: random(height)
      },
      {
        x: random(width),
        y: -50
      },
      {
        x: random(width),
        y: height + 50
      }
    ]
    let p = random(paths);
    let x = p.x;
    let y = p.y;
    agents[i] = new agent(x, y);
  }



}

function draw() {
  background(51);

  if (frameCount % 10000 == 0) {
    let pa = [{
        x: -50,
        y: random(height)
      },
      {
        x: width + 50,
        y: random(height)
      },
      {
        x: random(width),
        y: -50
      },
      {
        x: random(width),
        y: height + 50
      }
    ]
    let p = random(pa);
    let x = p.x;
    let y = p.y;
    agents.push(new agent(x, y));
  }

  for (var i = 0; i < attractors.length; i++) {
    attractors[i].show();
    for (var j = 0; j < agents.length; j++) {
      agents[j].attract(attractors[i]);
    }
  }

  for (var i = 0; i < agents.length; i++) {
    agents[i].update();
    agents[i].show();
  }

}

function mousePressed() {
  attractors.push(new attractor(mouseX, mouseY));
}
