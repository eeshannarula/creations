import numpy as np 
import math

class KNN:
    def __init__(self,type = 'Backward_Elimination',n_neighbours = 3,x_ = None,y_ = None):
        self.type = type
        self.n_neighbours = n_neighbours
        self.x_ = x_
        self.y_ = y_
    

    def Backward_Elimination (self,X,y):
            if np.array(X).shape[0] != np.array(y).shape[0]:
                print('length of X must be equal to that of y :-  in ' + str(X.shape) + ' and ' + str(y.shape) + ' ~ ' + str(X.shape[0]) + ' != ' + str(y.shape[0]))    
            else:
                new_X = []
                new_Y = []
                for xi in X:
                    dists = []
                    index = []
                    neighbours = []
                    for xj in X:
                        if X.index(xi) != X.index(xj):
                           sumnum = 0
                           for j in range(len(xi)):
                               sumnum += (xi[j] - xj[j]) * (xi[j] - xj[j])
                           sumnum = math.sqrt(sumnum)
                           dists.append(sumnum)
                           index.append(X.index(xj))
                    for i in range(self.n_neighbours):
                        ind = dists.index(min(dists))
                        neighbours.append(y[ind])
                        del index[ind]
                        del dists[ind]
                    prediction = max(set(neighbours), key=neighbours.count)
                    correct = y[X.index(xi)]
                    if prediction == correct:
                        new_X.append(xi)
                        new_Y.append(correct)
                         
                return KNN(n_neighbours=self.n_neighbours,x_ = new_X,y_ = new_Y)

    def fit(self,x,y):
        # func = getattr(self,self.type)
        if self.type == 'Backward_Elimination':
            return self.Backward_Elimination(x.tolist(),y.tolist())
        if self.type == 'Simple':
            return KNN(n_neighbours=self.n_neighbours,x_ = x.tolist(),y_ = y.tolist())   

    def predict(self,x):
            
            if self.x_ == None or self.y_ == None:
                print('first train the model')
            else:
                dists = []
                neighbours = []
                for xj in self.x_:
                    sumnum = 0
                    for j in range(len(xj)):
                        sumnum += (x[j] - xj[j])*(x[j] - xj[j])
                    sumnum = math.sqrt(sumnum)
                    dists.append(sumnum)    
                for i in range(self.n_neighbours):
                    lowest = dists.index(min(dists))
                    neighbours.append(self.y_[lowest])
                    del dists[lowest]
                return max(set(neighbours), key=neighbours.count)

    def test(self,x,y):
        total = 0
        x_ = x.tolist()
        predictions = []
        for xi in x_:
            predictions.append(self.predict(xi))
        for i in range(len(x_)):
            correct = y[i]
            prediction = predictions[i] 
            if correct == prediction:
                total += 1   
        return (total/len(x)) * 100 
                   

    