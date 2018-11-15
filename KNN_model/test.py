from knn import KNN 
import random
from dataset import Data

data = Data('diabetes.csv')

print(data.dataset[0])








# iris = load_iris()
# data = iris['data']
# targets = iris['target']
# xs,x_,ys,y_ = train_test_split(data,targets)

# print(xs.shape)
# print(ys.shape)
# print(x_.shape)
# print(y_.shape)

# knn = KNN(n_neighbours=1)
# knn = knn.fit(xs.tolist() ,ys.tolist())
# print(knn.test(x_.tolist(),y_.tolist()))


