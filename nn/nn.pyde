import math;

class ActivationFunction:
    def __init__(self,func,dfunc):
        self.func = func;
        self.dfunc = dfunc;
        
sigmoid = ActivationFunction(
  lambda x: 1 / (1 + math.exp(-x)),
  lambda  y: y * (1 - y)
);


class Dlibs:
    def __init__(self,x,y,z):
        self.input_nodes = x;
        self.hidden_nodes = y;
        self.output_nodes = z;

        self.weights_ih = Matrix(self.hidden_nodes, self.input_nodes);
        self.weights_ho = Matrix(self.output_nodes, self.hidden_nodes);

        self.weights_ih.randomize();
        self.weights_ho.randomize();

        self.bias_h = Matrix(self.hidden_nodes, 1);
        self.bias_o = Matrix(self.output_nodes, 1);

        self.bias_h.randomize();
        self.bias_o.randomize();

        self.setLearningRate();
        self.setActivationFunction();
    
    def setLearningRate(self,learning_rate = 0.1):
        self.learning_rate = learning_rate;
  
    def setActivationFunction(self):
        self.activation_function = sigmoid;

    def predict(self,input_array):

        inputs = Matrix.fromArray(input_array);
        hidden = Matrix.multiply(self.weights_ih, inputs);
        hidden.add(self.bias_h);
        for i in range(hidden.rows):
            for j in range(hidden.cols):
                val = hidden.data[i][j];
                hidden.data[i][j] = self.activation_function.func(val);
                
        output = Matrix.multiply(self.weights_ho, hidden);
        output.add(self.bias_o);
        for i in range(output.rows):
            for j in range(output.cols):
                val = output.data[i][j];
                output.data[i][j] = self.activation_function.func(val);

        return output.dataSync();

    def train(self,input_array,target_array):
               inputs = Matrix.fromArray(input_array);
               hidden = Matrix.multiply(self.weights_ih, inputs);
               hidden.add(self.bias_h);
               for i in range(hidden.rows):
                   for j in range(hidden.cols):
                       val = hidden.data[i][j];
                       hidden.data[i][j] = self.activation_function.func(val);
                
               output = Matrix.multiply(self.weights_ho, hidden);
               output.add(self.bias_o);
               for i in range(output.rows):
                   for j in range(output.cols):
                       val = output.data[i][j];
                       output.data[i][j] = self.activation_function.func(val);

               targets = Matrix.fromArray(target_array);
               output_errors = Matrix.subtract(targets,output);

               gradients = output;
               for i in range(gradients.rows):
                   for j in range(gradients.cols):
                       val = gradients.data[i][j];
                       gradients.data[i][j] = self.activation_function.dfunc(val);
               gradients.mult(output_errors);
               gradients.mult(self.learning_rate);

               hidden_T = Matrix.transpose(hidden);
               weight_ho_deltas = Matrix.multiply(gradients, hidden_T);

               ##Adjust the weights by deltas
               self.weights_ho.add(weight_ho_deltas);
               ## Adjust the bias by its deltas (which is just the gradients)
               self.bias_o.add(gradients);

               ##Calculate the hidden layer errors
               who_t = Matrix.transpose(self.weights_ho);
               hidden_errors = Matrix.multiply(who_t, output_errors);

               ##Calculate hidden gradient
               hidden_gradient = hidden;
               for i in range(hidden_gradient.rows):
                   for j in range(hidden_gradient.cols):
                       val = hidden_gradient.data[i][j];
                       hidden_gradient.data[i][j] = self.activation_function.dfunc(val);
               hidden_gradient.mult(hidden_errors);
               hidden_gradient.mult(self.learning_rate);

               inputs_T = Matrix.transpose(inputs);
               weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

               self.weights_ih.add(weight_ih_deltas);
               self.bias_h.add(hidden_gradient);
