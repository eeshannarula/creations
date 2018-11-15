import pandas as pd
from sklearn.model_selection import train_test_split
import numpy as np

class Data:
    def __init__(self,path):
        self.datadash = list(open(path))
        self.data = []
        for row in self.datadash:
            self.data.append(row.split(','))
        self.classes = self.data[0]
        self.dataset = self.setup()
        
        

    def setup(self):

        dataset = [[]] * len(self.data[0])
        for row in self.data:
            for i in range(len(self.data[0])):
                dataset[i].append(row[i])
            # del row[len(row)-1]    
            
        return dataset

    def getrow(self,name):
        index = self.classes.index(name)
        if index is not None:
            return np.array(self.dataset[index].copy())
        else:
            print('name is not ok!')
    
    def split(self):
        xdata = np.array(self.data)
        ydata = np.array(self.dataset[len(self.dataset)-1])
        return train_test_split(xdata,ydata)

        


     