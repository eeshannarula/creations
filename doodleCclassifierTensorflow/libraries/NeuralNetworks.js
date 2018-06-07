// function sigmoid(x) {
//   return x + (1 - Math.exp(-x));
// }
//
// function dsig(y) {
//   return y * (1 - y)
// }

class ActivationFunction {
  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}

let sigmoid = new ActivationFunction(
  x => 1 / (1 + Math.exp(-x)),
  y => y * (1 - y)
);

let tanh = new ActivationFunction(
  x => Math.tanh(x),
  y => 1 - (y * y)
);

class NeuralNetwork {
  constructor(a, b, c) {
    if (a instanceof NeuralNetwork) {
      //NUMBER OF NODES..
      this.input_nodes = a.input_nodes;
      this.hidden_nodes = a.hidden_nodes;
      this.output_nodes = a.output_nodes;

      //MAKING WEIGHTS MATRIX..
      this.weights_ih = a.weights_ih;
      this.weights_ho = a.weights_ho;

      //BIASIES..
      this.bias_h = a.bias_h;
      this.bias_o = a.bias_o;
    }
    //NUMBER OF NODES..
    this.input_nodes = a;
    this.hidden_nodes = b;
    this.output_nodes = c;
    //MAKING WEIGHTS MATRIX..
    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    //RANDOMIZING WEIGHTS..
    this.weights_ih.randomize();
    this.weights_ho.randomize();
    //BIASIES..
    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);
    //RANDOMIZING BIASIES..
    this.bias_h.randomize();
    this.bias_o.randomize();

    this.setLearningRate();
    this.setActivationFunction();


  }

  setLearningRate(learning_rate = 0.1) {
    this.learning_rate = learning_rate;
  }

  setActivationFunction(func = sigmoid) {
    this.activation_function = func;
  }

  predict(inputs_array) {
    //GET THE INPUTS MATRIX..
    var inputs = Matrix.fromArray(inputs_array);


    var hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    hidden.map(this.activation_function.func);



    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(this.activation_function.func);

    return output.toArray();

  }

  train(inputs_array, target_array) {
    var inputs = Matrix.fromArray(inputs_array);


    var hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    hidden.map(this.activation_function.func);



    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(this.activation_function.func);

    let Target = Matrix.fromArray(target_array);
    let output_error = Matrix.subtract(Target, output);

    let gradient = Matrix.map(output, this.activation_function.dfunc);
    gradient.multiply(output_error);
    gradient.multiply(this.lerningRate);

    let hidden_T = Matrix.transpose(hidden);
    let who_d = Matrix.multiply(gradient, hidden_T);

    this.weights_ho.add(who_d);
    this.bias_o.add(gradient);

    let who_t = Matrix.transpose(this.weights_ho)
    let hidden_error = Matrix.multiply(who_t, output_error);

    let hidden_gradient = Matrix.map(hidden, this.activation_function.dfunc);
    hidden_gradient.multiply(hidden_error);
    hidden_gradient.multiply(this.lerningRate);

    let input_t = Matrix.transpose(inputs)
    let wih_d = Matrix.multiply(hidden_gradient, input_t)

    this.weights_ih.add(wih_d);
    this.bias_h.add(hidden_gradient);

  }



}
