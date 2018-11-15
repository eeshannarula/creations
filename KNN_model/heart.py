from heart_diseasdata import load_data
from sklearn.model_selection import train_test_split
import numpy as np
from knn import KNN
import sklearn as sk
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import LinearSVC
from keras.models import Sequential
from keras.layers import Dense
from keras.optimizers import SGD

m = Sequential()
m.add(Dense(100))
m.add(Dense(50))
m.add(Dense(25))
m.add(Dense(4,activation = 'sigmoid'))
sgd = SGD()
m.compile(sgd,loss = 'binary_crossentropy')

model = KNeighborsClassifier(n_neighbors=20,)
clf = LogisticRegression(C = 0.01,multi_class='auto')
svm = LinearSVC(multi_class='crammer_singer')
data,targets = load_data()
xs,x_,ys,y_ = train_test_split(data,targets)

print(xs.shape)
print(x_.shape)
print(ys.shape)
print(y_.shape)

# knn = KNN(type='Simple')
# knn = knn.fit(xs,ys)

model.fit(xs,ys)
clf.fit(xs,ys)
svm.fit(xs,ys)
m.fit(xs,ys, )
# print('Accuracy :' + str(knn.test(x_,y_)) + ' % ')
print('Accuracy :' + str(model.score(x_,y_) * 100) + ' % ')
print('Accuracy :' + str(clf.score(x_,y_) * 100) + ' % ')
print('Accuracy :' + str(svm.score(x_,y_) * 100) + ' % ')