# Author ~ Eeshan Narula
# Aim : make a classifier to classifiy an xray with Pneumonia or not

# importing libs
import os

# numpy for basic math
import numpy as np

# machine learning library
import keras as ks 

## extracting out model and layers from keras
from keras.layers import Conv2D, Dense, MaxPooling2D, Flatten, Dropout
from keras.models import Sequential
from keras.optimizers import SGD

# xrays are in DICOM formate. To get the we will use pydicom library
import pydicom
from pydicom.data import get_testdata_files

# labels are in csv formate. so we will use csv library
import csv

# Data will take time to load.so we will use a animated loding screen
import itertools
import threading
import time
import sys

# Function to load the xrays

def loadFiles(folder_name):
    data = []
    xrays = []
    for file_name in os.listdir(folder_name):
        ds = pydicom.dcmread(os.path.join(folder_name,file_name))
        if ds is not None:
            data.append(ds)
            xrays.append(ds.pixel_array)
    return data,xrays

done = False
#here is the animation for loading screen
def animate():
    for c in itertools.cycle(['|', '/', '-', '\\']):
        if done:
            break
        sys.stdout.write('\rloading ' + c)
        sys.stdout.flush()
        time.sleep(0.1)
    sys.stdout.write('\rDone!     ')

t = threading.Thread(target=animate)
t.start()

# loading xrays
data_raw,images = loadFiles('/Users/eeshannarula/Downloads/datas/all/stage_1_train_images')
print('Xray Data loded!')

# loading the labels
labelsPath = '/Users/eeshannarula/Downloads/datas/all/stage_1_train_labels.csv'

labels = []
with open(labelsPath, newline='') as csvfile:
    file = csv.reader(csvfile, delimiter=',', quotechar='|')
    for row in file:
        labels.append(row)
print('Csv labels loded')

#  Editing labels

y_ = []
for xray in data_raw:
    Id = xray.PatientID
    for row in labels:
        Id_ = row[0]
        if Id_ == Id:
            y_.append(row)

y = []
y.append(y_[0])
for i in range(1,len(y_)):
    if y_[i - 1][0] != y_[i][0]:
        y.append(y_[i])

for i in y:
    del i[0]

def convert(num):
    if num == '':
        return 0
    else:
        return float(num)/1024 

targets = []
for row in y:
    subarray = []
    subarray.append(convert(row[0]))
    subarray.append(convert(row[1]))
    subarray.append(convert(row[2]))
    subarray.append(convert(row[3]))
    subarray.append(int(row[4]))
    targets.append(subarray)

ys = np.array(targets) # our targets are ready now !!

print('labels ready!!')

xs__ = []
for i  in images:
    xs__.append(list(i))
    
xs = np.array(xs__).reshape([25684,1024,1024,1])

# loding is done so we will stop the animation
time.sleep(10)
done = True   

## Making the model

model = Sequential()

model.add(Conv2D(kernel_size = (3,3),filters = 8,activation = 'relu',input_shape = [1024,1024,1]))
model.add(MaxPooling2D(pool_size=(3,3)))

model.add(Conv2D(kernel_size = (3,3),filters = 16,activation = 'relu'))
model.add(MaxPooling2D(pool_size=(3,3)))

model.add(Conv2D(kernel_size = (3,3),filters = 32,activation = 'relu'))
model.add(MaxPooling2D(pool_size=(3,3)))

model.add(Dropout(0.2))
model.add(Flatten())

model.add(Dense(100))
model.add(Dense(64))
model.add(Dense(16))
model.add(Dense(5,activation = 'sigmoid'))

optimizer = SGD(lr = 0.01,decay=1e-6, momentum=0.9, nesterov=True)
model.compile(optimizer,loss = 'categorical_crossentropy')


model.fit(xs,ys,epochs=1,shuffle=True,batch_size=100)