import numpy as np
import math as mth 
import random

class classifier:
    
    def seperate(self,x,y):
        unique = np.unique(y)
        c = [[]] * len(unique.tolist())
        for i in range(len(x.tolist())):
            x_ = x[i]
            y_ = y[i]
            for j in len(unique.tolist()):
                if y_ == unique[j]:
                    c[j].append(x_,y_)
        return c            



    def test(self,x,y):
        shape = np.array(x[0]).shape
        self.w1 = np.random.rand(shape)
        