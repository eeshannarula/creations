from layers import conv2d, dense, flatten, activation, MinPooling2d, Maxpooling2d, AvgPooling2d
import numpy as np 
from functools import reduce

class Sequential:
    def __init__(self,inputShape):
        self.layers = []
        self.inputShape = inputShape
        self.currentshape = self.inputShape

    def add(self,layer):
        if isinstance(layer,conv2d) or isinstance(layer,Maxpooling2d) or isinstance(layer,AvgPooling2d) or isinstance(layer,MinPooling2d):
            self.currentshape = layer.outputshape(self.currentshape)
            self.layers.append(layer) 
            
        elif isinstance(layer,flatten):  
           self.currentshape = reduce(lambda x, y: x*y, self.currentshape)
           self.layers.append(layer)
            
        elif isinstance(layer,dense):
            layer.setInputnodes(self.currentshape)
            self.layers.append(layer) 
            self.currentshape = layer.units
            

    def predict(self,xs,forTraining = False):
        outputs = []
        output = np.array(list(xs).copy())
        outputs.append(output)
        for layer in self.layers:
              if isinstance(layer,conv2d):
                  output = layer.convolve(output)
                  outputs.append(output)

              if isinstance(layer,Maxpooling2d):
                  output = layer.maxpooling2d(output)
                  outputs.append(output)

              if  isinstance(layer,AvgPooling2d): 
                  output = layer.avgpooling2d (output)
                  outputs.append(output)

              if  isinstance(layer,MinPooling2d):
                  output = layer.minpooling2d(output)
                  outputs.append(output)

              if  isinstance(layer,flatten):
                  output = layer.makeflat(output)
                  outputs.append(output)

              if  isinstance(layer,dense):
                  output = layer.feedForward(output)
                  outputs.append(output)

        if forTraining is False:
            return output
        elif forTraining is True:
            return outputs          
           
    def flatten(self,array):
        return np.array(list(array).copy()).flatten()


    def fit(self,xs,ys,lr):
        outputs = self.predict(xs,forTraining=True)
        outputs.reverse()
        e = None
        error = ys - outputs[0]
        gradient = activation.apply(getattr(activation,'dsigmoid'),outputs[0])
        gradient = np.matmul(gradient,error)
        gradient = np.multiply(gradient,lr)
        x1tras = np.transpose(outputs[1])
        delta_weights1 = np.dot(x1tras,gradient)
        self.layers.reverse()
        self.layers[0].weights = np.add(self.layers[0].weights,delta_weights1)
        for i in range(1,len(outputs)-1):
            o = outputs[i]
            l = self.layers[i]
            inp = outputs[i + 1] 
            if isinstance(l,dense):
                w_t = np.transpose(self.layers[i -1].weights)
                if i == 1:
                    e = np.dot(w_t,error)
                else:
                    e = np.dot(w_t,e)
                grad = activation.apply(getattr(activation,'dsigmoid'),o)
                grad = np.multiply(grad,lr)
                grad = np.matmul(grad,e)
                xtras = np.transpose(inp)
                delta_weights = np.dot(xtras,grad)
                self.layers[i].weights = np.add(self.layers[i].weights,delta_weights)

            if isinstance(l,conv2d):
                w_t = None
                if not isinstance(self.layers[i - 1],flatten):
                    w_t = np.transpose(self.layers[i - 1].weights)
                else:
                    w_t = np.transpose(self.layers[i - 2].weights)
                print(e)
                print(w_t)
                e = np.dot(w_t,e)
                grad = activation.apply(getattr(activation,'drelu'),o)
                grad = np.multiply(grad,lr)    
                grad = np.matmul(self.flatten(grad),e)
                xtras = np.transpose(inp)  
                delta_weights = np.dot(xtras,grad) 
                self.layers[i].weights = np.add(self.layers[i].weights,delta_weights)   
        self.layers.reverse()        
            
           

model = Sequential([1,5,5])                         

model.add(conv2d(kernalSize = [3,3],filters = 3,padding = 0))
# model.add(Maxpooling2d(pool_size = [2,2]))

model.add(flatten())
model.add(dense(units = 10,activation = 'sigmoid'))
model.add(dense(units = 1,activation = 'sigmoid'))

xs = [
    np.array([[
        [1,0,1,0,1],
        [0,1,0,1,0],
        [1,0,1,0,1],
        [0,1,0,1,0],
        [1,0,1,0,1]
    ]]),
    np.array([[
        [1,1,1,1,1],
        [1,1,1,1,1],
        [1,1,1,1,1],
        [1,1,1,1,1],
        [1,1,1,1,1]
    ]])
]

ys = [
    np.array([1]),
    np.array([0]),
]
import random
for j in range(10000):
        i = random.randint(0,1)
        model.fit(xs[i],ys[i],0.01)

print(model.predict(np.array([1,0])))
print(model.predict(np.array([0,1])))
print(xs[0].shape)