import math as mth 
import numpy as np 
from scipy import signal
import skimage.measure

class conv2d:

    def  __init__(self,kernalSize,filters,padding):
        self.kernalSize = kernalSize
        self.filters = filters
        self.padding = padding

        self.weights = np.random.random_integers(low = -1000,high = 1000,size = [self.filters,self.kernalSize[0],self.kernalSize[1]]) / 1000
    
    def convolve(self, inputs):
        output = []
        for input in inputs:
            for weight in self.weights:
                output.append(signal.convolve2d(input, weight, boundary='fill', mode='valid',fillvalue =self.padding))
        return np.array(output) 

    def getWeights(self):
        return np.array(list(self.weights).copy()) 

    def outputshape(self,input_shape):
        return input_shape[0] * self.filters,input_shape[1] + 2 * self.padding - self.kernalSize[0] + 1,input_shape[2] + 2 * self.padding - self.kernalSize[1] + 1


class activation:

    @staticmethod
    def relu(num):
        return max(0,num)

    @staticmethod
    def sigmoid(num):
       return 1 / (1 + mth.exp(-1 * num))

    @staticmethod
    def dsigmoid(num):
       return num * (1 - num)

    @staticmethod
    def drelu(num):
        if num > 0:
            return 1
        else:
            return 0   

    @staticmethod
    def softmax(num,total):
        return mth.exp(num)/total    

    @staticmethod
    def apply(func,array):
        vfunc = np.vectorize(func)
        return vfunc(array)

class Maxpooling2d:
    def __init__(self,pool_size):
        self.pool_size = pool_size

    def feedForward(self,ndarray):
        output = []
        for inp in ndarray:
            output.append(skimage.measure.block_reduce(inp, tuple(self.pool_size), np.max))
        return np.array(output)  

    def maxpooling2d(self,inp):
        output = []
        for i in inp:
            width = len(i[0])
            height = len(i)

            kwidth = self.pool_size[0]
            kheight = self.pool_size[1]

            wjumps = ((width - kwidth) / 1) + 1
            hjumps = ((height - kheight) / 1) + 1

            if(wjumps % 1 == 0 and hjumps % 1 == 0):
               array = [] 
               for I in range(int(hjumps)):
                   for j in range(int(wjumps)):
                       total = 0
                       a = []
                       for k in range(1):
                           for L in range(1):
                               y = I + k
                               x = j + L
                               a.append(list(i)[y][x])
                       total = max(a)
                       array.append(total)
               output.append(array)               
        return np.array([output]).reshape([inp.shape[0],int(wjumps),int(hjumps)])
            

    def outputshape(self,input_shape):
        return input_shape[0],input_shape[1] - self.pool_size[0] + 1,input_shape[2] - self.pool_size[1] + 1  

class MinPooling2d:
    def __init__(self,pool_size):
        self.pool_size = pool_size

    def feedForward(self,ndarray):
        output = []
        for inp in ndarray:
            output.append(skimage.measure.block_reduce(inp, tuple(self.pool_size), np.min))

        return np.array(output)

    def minpooling2d(self,inp):
        output = []
        for i in inp:
            width = len(i[0])
            height = len(i)

            kwidth = self.pool_size[0]
            kheight = self.pool_size[1]

            wjumps = ((width - kwidth) / 1) + 1
            hjumps = ((height - kheight) / 1) + 1

            if(wjumps % 1 == 0 and hjumps % 1 == 0):
               array = [] 
               for I in range(int(hjumps)):
                   for j in range(int(wjumps)):
                       total = 0
                       a = []
                       for k in range(1):
                           for L in range(1):
                               y = I + k
                               x = j + L
                               a.append(list(i)[y][x])
                       total = min(a)
                       array.append(total)
               output.append(array)               
        return np.array([output]).reshape([inp.shape[0],int(wjumps),int(hjumps)])
                

    def outputshape(self,input_shape):
        return input_shape[0],input_shape[1] - self.pool_size[0] + 1,input_shape[2] - self.pool_size[1]
class AvgPooling2d:

    def __init__(self,pool_size):
        self.pool_size = pool_size

    def feedForward(self,ndarray):
        output = []
        for inp in ndarray:
            output.append(skimage.measure.block_reduce(inp, tuple(self.pool_size), np.mean))
        return np.array(output) 

    def mean(self,array):
        return sum(array)/len(array)    

    def avgpooling2d(self,inp):
        output = []
        for i in inp:
            width = len(i[0])
            height = len(i)

            kwidth = self.pool_size[0]
            kheight = self.pool_size[1]

            wjumps = ((width - kwidth) / 1) + 1
            hjumps = ((height - kheight) / 1) + 1

            if(wjumps % 1 == 0 and hjumps % 1 == 0):
               array = [] 
               for I in range(int(hjumps)):
                   for j in range(int(wjumps)):
                       total = 0
                       a = []
                       for k in range(1):
                           for L in range(1):
                               y = I + k
                               x = j + L
                               a.append(list(i)[y][x])
                       total = self.mean(a)
                       array.append(total)
               output.append(array)               
        return np.array([output]).reshape([inp.shape[0],int(wjumps),int(hjumps)])
            

    def outputshape(self,input_shape):
        return input_shape[0],input_shape[1] - self.pool_size[0] + 1,input_shape[2] - self.pool_size[1]

class flatten:
    def makeflat(self,ndarray):
        return ndarray.flatten()

class dense:
    def __init__(self,units,activation):
        self.activation = activation
        self.units = units

    def setInputnodes(self,inputnodes):
        self.inputnodes = inputnodes
        self.weights = np.random.random_integers(low = -1000,high = 1000,size = (int(self.units),int(self.inputnodes))) / 1000
 
    def feedForward(self,inputs):
        return activation.apply(getattr(activation,self.activation),np.matmul(self.weights, inputs))
          
    def getWeights(self):
        return np.array(list(self.weights).copy)

