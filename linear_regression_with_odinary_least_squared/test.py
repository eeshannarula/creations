from lr_ols import LinearRegression
import numpy as np 

x = np.array([1,2,3,4,5,6,7,8,9,10])
y = np.array([1,2,3,4,5,6,7,8,9,10])

x_ = np.array([11,12,13,14,15,16,17,18,19,20])

function = LinearRegression.train(x,y)

for i in range(len(list(x_))):
    x__ = x_[i]
    print(function(x__))

