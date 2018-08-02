import layers as lyrs
import tensors as jx

class model:
    def __init__(self):
        self.layers = []
        self.inptDone = False

    def setInputShape(self,shape):
        self.inputShape = shape
        self.inptDone = True

    def predict(self,inp):
        current = jx.tensor.copy(inp)
        for i  in self.layers :
            if isinstance(i.layer,lyrs.dense):
                current = i.layer.feedForward(current)
            if isinstance(i.layer,lyrs.conv2d):
                current = i.layer.convolution(current)
            if isinstance(i.layer,lyrs.pooling):
                typ = i.layer.typ
                if typ == 'maxpooling' or typ == 'maxPooling':
                    current = i.layer.maxPooling(current,i.layer.activation)
                elif typ == 'minpooling' or typ == 'minPooling':
                    current = i.layer.minPooling(current,i.layer.activation)                    
                elif typ == 'avgpooling' or typ == 'avgPooling':                  
                    current = i.layer.avgPooling(current,i.layer.activation)

        return current        
                

    def add(self,layer):

        if  isinstance(layer,lyrs.conv2d): 
            redutionX = ((self.inputShape[0] + (2 * layer.padding) - layer.kernalSize[0])/layer.stride)+1
            redutionY = ((self.inputShape[1] + (2 * layer.padding) - layer.kernalSize[1])/layer.stride)+1
            times = 1
            if self.inputShape[2]:
                times = self.inputShape[2]
            self.layers.append(layers(redutionX,redutionY,times,layer))
            self.inputShape = [redutionX,redutionY,layer.filters]
            if redutionX % 1 != 0 or redutionY % 1 != 0 or layer.filters % 1 != 0 :
                print('!model buit is not ok')
        if isinstance(layer,lyrs.dense):
                shape = 1
                for i in  self.inputShape:
                       shape *= i
                l = layer
                l.makeWeights(shape)
                self.layers.append(layers(1,layer.units,1,l))
                self.inputShape = [l.units]
        if isinstance(layer,lyrs.pooling):
            redutionX = ((self.inputShape[0] - layer.filterSize[0])/layer.stride)+1
            redutionY = ((self.inputShape[1] - layer.filterSize[1])/layer.stride)+1
            times = 1
            if self.inputShape[2]:
                times = self.inputShape[2]
            self.layers.append(layers(redutionX,redutionY,times,layer))
            self.inputShape = [redutionX,redutionY,self.inputShape[2]]
            if redutionX % 1 != 0 or redutionY % 1 != 0:
                print('!model buit is not ok')       
            
                
             
class layers:
    def __init__(self,redunctionX,redunctionY,times,layer):
        self.layer = layer
        self.times = times
        self.redunctionX = redunctionX
        self.redunctionY = redunctionY
        
    @staticmethod
    def conv2d(kernalSize,stride,filters,padding):
        return lyrs.conv2d(kernalSize,stride,filters,padding)
    @staticmethod
    def pooling(stride,filterSize,typ,act):
        return lyrs.pooling(stride,filterSize,typ,act)
    @staticmethod
    def dense(units,activation):
        return lyrs.dense(units,activation)
