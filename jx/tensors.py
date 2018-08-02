import numpy as np
import math

class tensor:
    def __init__(self,array,shape = None):
        self.shape = shape
        self.__data = array
        if shape != None:
            self.__array = np.array(array).reshape(self.shape)
        else:
            self.__array = np.array(array)

    def dataSync(self):
        return list(self.__array.ravel()).copy()

    def getArray(self):
        return self.__array.copy()
    @staticmethod
    def add(a,b):
       if isinstance(a, tensor) and isinstance(b, tensor):
         if a.shape == b.shape:
             c = a.getArray() + b.getArray()
             shape = list(c.shape)
             return tensor(list(c),shape)
       elif isinstance(a, tensor) and not isinstance(b, tensor):
             c = a.getArray() + b
             shape = list(c.shape)
             return tensor(list(c),shape)
       elif  not isinstance(a, tensor) and isinstance(b, tensor):
             c = a + b.getArray()
             shape = list(c.shape)
             return tensor(list(c),shape)
            
       else: 
         print('nor A nor B is a instence of tensor')

    @staticmethod
    def sub(a,b):
       if isinstance(a, tensor) and isinstance(b, tensor):
         if a.shape == b.shape:
             c = a.getArray() - b.getArray()
             shape = list(c.shape)
             return tensor(list(c),shape)
       elif isinstance(a, tensor) and not isinstance(b, tensor):
             c = a.getArray() - b
             shape = list(c.shape)
             return tensor(list(c),shape)
       elif  not isinstance(a, tensor) and isinstance(b, tensor):
             c = a - b.getArray()
             shape = list(c.shape)
             return tensor(list(c),shape)
            
       else: 
         print('nor A nor B is a instence of tensor')

    @staticmethod
    def mul(a,b):
       if isinstance(a, tensor) and isinstance(b, tensor):
         if a.shape == b.shape:
             c = a.getArray() * b.getArray()
             shape = list(c.shape)
             return tensor(list(c),shape)
       elif isinstance(a, tensor) and not isinstance(b, tensor):
             c = a.getArray() * b
             shape = list(c.shape)
             return tensor(list(c),shape)
       elif  not isinstance(a, tensor) and isinstance(b, tensor):
             c = a * b.getArray()
             shape = list(c.shape)
             return tensor(list(c),shape)
            
       else: 
         print('nor A nor B is a instence of tensor')

    @staticmethod
    def matmul(a,b):
         if isinstance(a, tensor) and isinstance(b, tensor):
             c = np.matmul(a.getArray(),b.getArray())
             return tensor(list(c))
         else:
             print('nor A nor B is a instence of tensor')
        
    @staticmethod
    def transpose(a):
         if isinstance(a, tensor):
             c = a.getArray().transpose()
             shape = list(c.shape)
             return tensor(list(c),shape)
         else:
             print('A is not an instence of a tensor')

    def print(self):
        print(self.__array)

    @staticmethod
    def  sqrt(a):
        return tensor.map(a,np.sqrt)

    @staticmethod
    def  sq(a):
        return tensor.map(a,lambda x : x*x)

    @staticmethod
    def  pow(a,p):
        return tensor.map(a,lambda x : math.pow(x,p))
        
    @staticmethod
    def  floor(a):
        return tensor.map(a,np.floor)

    @staticmethod
    def  sigmoid(a):
        return tensor.map(a,lambda x : 1 / (1 + math.exp(-x)))

    @staticmethod
    def  relu(a):
        c = a.getArray()
        c = (abs(c) + c) / 2
        shape = list(c.shape)
        return tensor(list(c),shape)

    @staticmethod
    def  softmax(a):
        c = a.getArray()
        c = np.exp(c)/np.sum(np.exp(c))
        return tensor(c)

    @staticmethod
    def  tanh(a):
        return tensor.map(a , lambda x : (1 - math.exp(-1 * 2 * x))/(1 + math.exp(-1 * 2 * x)))

    @staticmethod
    def acos(a):
            return tensor.map(a,lambda x : math.acos(x))

    @staticmethod
    def  asin(a):
            return tensor.map(a,lambda x : math.asin(x))

    @staticmethod
    def  atan(a):
            return tensor.map(a,lambda x : math.atan(x))

    @staticmethod
    def  acosh(a):
            return tensor.map(a,lambda x : math.acosh(x))

    @staticmethod
    def  asinh(a):
            return tensor.map(a,lambda x : math.asinh(x))

    @staticmethod
    def  atanh(a):
            return tensor.map(a,lambda x : math.atanh(x))

    @staticmethod
    def  ceil(a):
            return tensor.map(a,lambda x : math.ceil(x))
        
    @staticmethod
    def createRandom(shape):
         a = np.random.random(shape)
         return tensor(list(a),shape)

    @staticmethod
    def random(shape):
         a = np.random.random(shape)
         return tensor(list(a),shape)

    @staticmethod
    def zeros(shape):
         a = np.zeros(shape)
         return tensor(list(a),shape)

    @staticmethod
    def ones(shape):
         a = np.ones(shape)
         return tensor(list(a),shape)
         
    @staticmethod
    def  map(a,func):
         if isinstance(a, tensor):
             c = np.array(list(map(func,a.getArray())))
             shape = list(c.shape)
             return tensor(list(c),shape)
         else:
             print('A is not an instence of a tensor')
             return None
            
    @staticmethod 
    def copy(a):
         c = a.getArray()
         shape = list(c.shape)
         return tensor(c,shape)
        
    @staticmethod       
    def makeArray(length,no):
        array = []
        for i in range(length):
            array.append(0)
        return array

    @staticmethod
    def padding(a):
         array = []
         layer = list(a.getArray())
         width = len(layer[0])
         array .append(tensor.makeArray(width + 2,0))
         for i in range(len(layer)):
             l = list(layer[i].copy())
             l.append(0)
             l.reverse()
             l.append(0)
             l.reverse()
             array.append(l)
             
         array .append(tensor.makeArray(width + 2,0))
         c = np.array(array)
         shape = c.shape
         return tensor(c,shape)
        
    def reshape(self,shape): 
      return tensor(self.getArray(),shape)

    @staticmethod
    def makeone(a):
        array = []
        for i in a:
            array.append(list(i.getArray()))
        return tensor(np.array(array))    
                   
    @staticmethod
    def flatten(a):
         tensor(a.getArray().flatten())
