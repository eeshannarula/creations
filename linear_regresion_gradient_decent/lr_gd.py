import numpy as np 
import math
import random
class LenearRegression:
    @staticmethod
    def train(X,Y,lr,epochs):
        m = random.random()
        b = random.random()
        for j in range(epochs):
            for i in range(len(X)):
                x = X[i]
                y = Y[i]
                y_ = m * x + b
                error = y - y_
                m = m + error * x * lr 
                b = b + error * lr

        return lambda x : m * x + b   