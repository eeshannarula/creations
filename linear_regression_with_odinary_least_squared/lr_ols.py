import numpy as np 
import math as mth 

class LinearRegression:
        
    @staticmethod
    def train(X,Y):
            m = 0
            b = 0
            num = 0
            den = 0
            x_mean = sum(list(X))/len(list(X))
            y_mean = sum(list(Y))/len(list(Y))
            
            for i in range(len(list(X))):
                x = X[i]
                y = Y[i]
                num += ((x - x_mean) * (y - y_mean))
                den += (x - x_mean) * (x - x_mean)
            m = num/den     
            b = y_mean - m * x_mean        
            return lambda x: m * x + b

