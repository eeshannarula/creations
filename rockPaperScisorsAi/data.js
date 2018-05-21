let data = [{
    inputs: [1, 0, 0],
    targets: [0, 1, 0]
  },
  {
    inputs: [0, 1, 0],
    targets: [0, 0, 1]
  },
  {
    inputs: [0, 0, 1],
    targets: [1, 0, 0]
  }
]

let emojis = {
  paper: '🖐',
  stone: '✊',
  scisor: '✌️'
}

function train(epochs) {
  let times = epochs ? epochs : 1;
  for (var i = 0; i < times; i++) {
    let batch = random(data);
    nn.train(batch.inputs, batch.targets);
  }
}

function test() {
  let counter = 0;
  for (var i = 0; i < 1000; i++) {
    let batch = random(data);
    let output = nn.predict(batch.inputs);
    let m = output.indexOf(max(output));
    let c = batch.targets.indexOf(max(batch.targets));
    if (m == c) {
      counter++;
    }
  }
  realC = floor((counter / 1000) * 100);
  correctness = floor((counter / 1000) * 100) + '%';
}
