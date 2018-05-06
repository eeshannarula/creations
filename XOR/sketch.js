let trainingData;
let counter;
let nn;

function setup() {
  noCanvas();
  //neural network...
  nn = new NeuralNetwork(2, [4, 2], 1);
  //counter for epoches...
  counter = 0;
  //the data...
  trainingData = [{
      inputs: [1, 0],
      outputs: [1]
    },
    {
      inputs: [1, 1],
      outputs: [0]
    },
    {
      inputs: [0, 1],
      outputs: [1]
    },
    {
      inputs: [0, 0],
      outputs: [0]
    }
  ]
}

function train() {
    for (var i = 0; i < 10000; i++) {
      let data = random(trainingData);
      nn.train(data.inputs, data.outputs);
    }
    counter++;
    console.log('epoch:' + counter)
}

function guess() {
	let one = select("#input_one");
	let oneval = one.value();
	let two = select("#input_two");
	let twoval = two.value();
	let output = nn.predict([oneval,twoval]);
	let p = createP(output);
}
