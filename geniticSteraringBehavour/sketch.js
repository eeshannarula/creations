let population;
let food = [];
let poison = [];

function setup() {
  createCanvas(800, 500);
  population = new Population();
  for (var i = 0; i < 50; i++) {
    food[i] = new Food(random(width), random(height));
    poison[i] = new Poison(random(width), random(height));
  }
}

function draw() {
  background(51);

  if (frameCount % 10 == 0) {
    food.push(new Food(random(width), random(height)));
    poison.push(new Poison(random(width), random(height)));
  }

  if (poison.length > 201) {
    poison.splice(poison.length - 1, 1);
  }
  if (food.length > 201) {
    food.splice(food.length - 1, 1);
  }
  population.render();
  if (population.checkAllDie()) {
    population = population.meatingpool();
  }
  for (let f of food) {
    f.show();
  }
  for (let p of poison) {
    p.show();
  }
}
