import tensors as jx 
import numpy as np 
####################################################################################
class conv2d:
    def __init__(self,kernalSize,stride,filters,padding):
        self.kernalSize = kernalSize
        self.stride = stride
        self.filters = filters
        self.padding = padding

        self.weights = []
        for i in range(self.filters):
            self.weights.append(jx.tensor.createRandom(self.kernalSize))

    def convolution(self,inputs):
        outputs = []
        
        for i in inputs.getArray():
            for f in self.weights:
                outputs.append(conv2d.runFilter(jx.tensor(i),f,self.stride,self.padding))

        for l in outputs:
            l = jx.tensor.relu(l)

        return jx.tensor.makeone(outputs)    
                
    @staticmethod
    def runFilter(i,f,s,p):
        if isinstance(i,jx.tensor) and isinstance(f,jx.tensor):
            c = jx.tensor.copy(i)
            for k in range(p):
                c = jx.tensor.padding(c)    
            inp = list(c.getArray())
            width = len(inp[0])
            height = len(inp)

            filt = list(f.getArray())
            fwidth = len(filt[0])
            fheight = len(filt)

            wjumps = ((width - fwidth) / s) + 1
            hjumps = ((height - fheight) / s) + 1

            if(wjumps % 1 == 0 and hjumps % 1 == 0):
                array = []
                for i in range(int(hjumps)):
                    for j in range(int(wjumps)):
                       total = 0
                       for k in range(s):
                            for l in range (s):
                                y = i + k
                                x = j + l
                                total += inp[y][x] * filt[k][l]
                                                      
                       array.append(total)
                       
                return jx.tensor(array,[int(wjumps),int(hjumps)])
            
####################################################################################                

class pooling:
    def __init__(self,stride,filterSize,typ,activation):
        self.stride = stride
        self.typ = typ
        self.filterSize = filterSize
        self.activation = activation

    def maxPooling(self,inputs,activation):
        outputs = []

        for i in inputs.getArray():
                outputs.append(pooling.runFilter(jx.tensor(i),self.stride,self.filterSize,lambda x : max(x)))

        for l in outputs:
            l = activation(l)

        return jx.tensor.makeone(outputs)    

    def minPooling(self,inputs,activation):
        outputs = []

        for i in inputs.getArray():
                outputs.append(pooling.runFilter(jx.tensor(i),self.stride,self.filterSize,lambda x : min(x)))

        for l in outputs:
            l = activation(l)

        return jx.tensor.makeone(outputs)

    def avgPooling(self,inputs,activation):
        outputs = []

        for i in inputs.getArray():
                outputs.append(pooling.runFilter(jx.tensor(i),self.stride,self.filterSize,lambda l : sum(l) / float(len(l))))

        for l in outputs:
            l = activation(l)

        return jx.tensor.makeone(outputs)    
    
        
        
    @staticmethod
    def runFilter(i,s,fs,func):
        if isinstance(i,jx.tensor):
            inp = list(i.getArray())
            width = len(inp[0])
            height = len(inp)

            fwidth = fs[0]
            fheight = fs[1]

            wjumps = ((width - fwidth) / s) + 1
            hjumps = ((height - fheight) / s) + 1
            
            if(wjumps % 1 == 0 and hjumps % 1 == 0):
                array = []
                for i in range(int(hjumps)):
                    for j in range(int(wjumps)):
                       total = 0
                       a = []
                       for k in range(s):
                            for l in range (s):
                                y = i + k
                                x = j + l
                                a.append(inp[y][x])
                       total = func(a)         
                       array.append(total)
                       
                return jx.tensor(array,[int(wjumps),int(hjumps)])        
            
####################################################################################
            
class dense:
    def __init__(self,units,activation):
        self.units = units
        self.activation = activation

    def makeWeights(self,inputnodes):    
        self.weights = jx.tensor.createRandom([int(self.units),int(inputnodes)])

    def feedForward(self,inp):
           i = jx.tensor(inp.getArray().flatten())
           return self.activation(jx.tensor.matmul(self.weights,i))
        
####################################################################################
