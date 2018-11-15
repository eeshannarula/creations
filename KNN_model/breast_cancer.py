import json
from knn import KNN
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
cancer = load_breast_cancer()
import tkinter
from tkinter import *
from tkinter import messagebox
# Attributs:
# Ten real-valued features are computed for each cell nucleus: 
# radius (mean of distances from center to points on the perimeter)
# texture (standard deviation of gray-scale values)
# perimeter
# area
# smoothness (local variation in radius lengths)
# compactness (perimeter^2 / area - 1.0)
# concavity (severity of concave portions of the contour)
# concave points (number of concave portions of the contour)
# symmetry
# fractal dimension (“coastline approximation” - 1)

xs,x_,ys,y_ = train_test_split(cancer['data'],cancer['target']) 

knn = KNN(n_neighbours=1,type = 'Backward_Elimination')
knn = knn.fit(xs,ys)
# print('Accuracy : ' + str(knn.test(x_,y_)) + ' % ')
Accuracy = str(knn.test(x_,y_))
top = Tk()
###################################
# Mean
Lradius_mean = Label(top, text="radius_mean")
Lradius_mean.grid(row = 0,column = 1)
# Lradius_mean.pack( )
Eradius_mean = Entry(top, bd =5)
Eradius_mean.grid(row = 1,column = 1)
# Eradius_mean.pack()

Ltexture_mean = Label(top, text="texture_mean")
Ltexture_mean.grid(row = 2,column = 1)
# Ltexture_mean.pack( )
Etexture_mean = Entry(top, bd =5)
Etexture_mean.grid(row = 3,column = 1)
# Etexture_mean.pack() 

Lperimeter_mean = Label(top, text="perimeter_mean")
Lperimeter_mean.grid(row = 4,column = 1)
# Lperimeter_mean.pack( )
Eperimeter_mean = Entry(top, bd =5)
Eperimeter_mean.grid(row = 5,column = 1)
# Eperimeter_mean.pack()

Larea_mean = Label(top, text="area_mean")
Larea_mean.grid(row = 6,column = 1)
# Larea_mean.pack( )
Earea_mean = Entry(top, bd =5)
Earea_mean.grid(row = 7,column = 1)
# Earea_mean.pack()

Lsmoothness_mean = Label(top, text="smoothness_mean")
Lsmoothness_mean.grid(row = 8,column = 1)
# Lsmoothness_mean.pack( )
Esmoothness_mean = Entry(top, bd =5)
Esmoothness_mean.grid(row = 9,column = 1)
# Esmoothness_mean.pack()

Lcompactness_mean = Label(top, text="compactness_mean")
Lcompactness_mean.grid(row = 10,column = 1)
# Lcompactness_mean.pack( )
Ecompactness_mean = Entry(top, bd =5)
Ecompactness_mean.grid(row = 11,column = 1)
# Ecompactness_mean.pack()

Lconcavity_mean = Label(top, text="concavity_mean")
Lconcavity_mean.grid(row = 12,column = 1)
# Lconcavity_mean.pack( )
Econcavity_mean = Entry(top, bd =5)
Econcavity_mean.grid(row = 13,column = 1)
# Econcavity_mean.pack()

Lconcave_points_mean = Label(top, text="concave points_mean")
Lconcave_points_mean.grid(row = 14,column = 1)
# Lconcave_points_mean.pack( )
Econcave_points_mean = Entry(top, bd =5)
Econcave_points_mean.grid(row = 15,column = 1)
# Econcave_points_mean.pack()

Lsymmetry_mean = Label(top, text="symmetry_mean")
Lsymmetry_mean.grid(row = 16,column = 1)
# Lsymmetry_mean.pack( )
Esymmetry_mean = Entry(top, bd =5)
Esymmetry_mean.grid(row = 17,column = 1)
# Esymmetry_mean.pack()

Lfractal_dimension_mean = Label(top, text="fractal dimension_mean")
Lfractal_dimension_mean.grid(row = 18,column = 1)
# Lfractal_dimension_mean.pack( )
Efractal_dimension_mean = Entry(top, bd =5)
Efractal_dimension_mean.grid(row = 19,column = 1)
# Efractal_dimension_mean.pack()
###################################
# Standerd error
Lradius_standerd_error = Label(top, text="radius_standerd_error")
Lradius_standerd_error.grid(row = 0,column = 2)
# Lradius_standerd_error.pack()
Eradius_standerd_error = Entry(top, bd =5)
Eradius_standerd_error.grid(row = 1,column = 2)
# Eradius_standerd_error.pack()

Ltexture_standerd_error = Label(top, text="texture_standerd_error")
Ltexture_standerd_error.grid(row = 2,column = 2)
# Ltexture_standerd_error.pack()
Etexture_standerd_error = Entry(top, bd =5)
Etexture_standerd_error.grid(row = 3,column = 2)
# Etexture_standerd_error.pack()

Lperimeter_standerd_error = Label(top, text="perimeter_standerd_error")
Lperimeter_standerd_error.grid(row = 4,column = 2)
# Lperimeter_standerd_error.pack( )
Eperimeter_standerd_error = Entry(top, bd =5)
Eperimeter_standerd_error.grid(row = 5,column = 2)
# Eperimeter_standerd_error.pack()

Larea_standerd_error = Label(top, text="area_standerd_error")
Larea_standerd_error.grid(row = 6,column = 2)
# Larea_standerd_error.pack( )
Earea_standerd_error = Entry(top, bd =5)
Earea_standerd_error.grid(row = 7,column = 2)
# Earea_standerd_error.pack()

Lsmoothness_standerd_error = Label(top, text="smoothness_standerd_error")
Lsmoothness_standerd_error.grid(row = 8,column = 2)
# Lsmoothness_standerd_error.pack( )
Esmoothness_standerd_error = Entry(top, bd =5)
Esmoothness_standerd_error.grid(row = 9,column = 2)
# Esmoothness_standerd_error.pack()

Lcompactness_standerd_error = Label(top, text="compactness_standerd_error")
Lcompactness_standerd_error.grid(row = 10,column = 2)
# Lcompactness_standerd_error.pack( )
Ecompactness_standerd_error = Entry(top, bd =5)
Ecompactness_standerd_error.grid(row = 11,column = 2)
# Ecompactness_standerd_error.pack()

Lconcavity_standerd_error = Label(top, text="concavity_standerd_error")
Lconcavity_standerd_error.grid(row = 12,column = 2)
# Lconcavity_standerd_error.pack( )
Econcavity_standerd_error = Entry(top, bd =5)
Econcavity_standerd_error.grid(row = 13,column = 2)
# Econcavity_standerd_error.pack()

Lconcave_points_standerd_error = Label(top, text="concave points_standerd_error")
Lconcave_points_standerd_error.grid(row = 14,column = 2)
# Lconcave_points_standerd_error.pack( )
Econcave_points_standerd_error = Entry(top, bd =5)
Econcave_points_standerd_error.grid(row = 15,column = 2)
# Econcave_points_standerd_error.pack()

Lsymmetry_standerd_error = Label(top, text="symmetry_standerd_error")
Lsymmetry_standerd_error.grid(row = 16,column = 2)
# Lsymmetry_standerd_error.pack( )
Esymmetry_standerd_error = Entry(top, bd =5)
Esymmetry_standerd_error.grid(row = 17,column = 2)
# Esymmetry_standerd_error.pack()

Lfractal_dimension_standerd_error = Label(top, text="fractal dimension_standerd_error")
Lfractal_dimension_standerd_error.grid(row = 18,column = 2)
# Lfractal_dimension_standerd_error.pack( )
Efractal_dimension_standerd_error = Entry(top, bd =5)
Efractal_dimension_standerd_error.grid(row = 19,column = 2)
# Efractal_dimension_standerd_error.pack()
###################################
# Worst
Lradius_worst = Label(top, text="radius_worst")
Lradius_worst.grid(row = 0,column = 3)
# Lradius_worst.pack( )
Eradius_worst = Entry(top, bd =5)
Eradius_worst.grid(row = 1,column = 3)
# Eradius_worst.pack()

Ltexture_worst = Label(top, text="texture_worst")
Ltexture_worst.grid(row = 2,column = 3)
# Ltexture_worst.pack()
Etexture_worst = Entry(top, bd =5)
Etexture_worst.grid(row = 3,column = 3)
# Etexture_worst.pack()

Lperimeter_worst = Label(top, text="perimeter_worst")
Lperimeter_worst.grid(row = 4,column = 3)
# Lperimeter_worst.pack( )
Eperimeter_worst = Entry(top, bd =5)
Eperimeter_worst.grid(row = 5,column = 3)
# Eperimeter_worst.pack()

Larea_worst = Label(top, text="area_worst")
Larea_worst.grid(row = 6,column = 3)
# Larea_worst.pack( )
Earea_worst = Entry(top, bd =5)
Earea_worst.grid(row = 7,column = 3)
# Earea_worst.pack()

Lsmoothness_worst = Label(top, text="smoothness_worst")
Lsmoothness_worst.grid(row = 8,column = 3)
# Lsmoothness_worst.pack( )
Esmoothness_worst = Entry(top, bd =5)
Esmoothness_worst.grid(row = 9,column = 3)
# Esmoothness_worst.pack()

Lcompactness_worst = Label(top, text="compactness_worst")
Lcompactness_worst.grid(row = 10,column = 3)
# Lcompactness_worst.pack( )
Ecompactness_worst = Entry(top, bd =5)
Ecompactness_worst.grid(row = 11,column = 3)
# Ecompactness_worst.pack()

Lconcavity_worst = Label(top, text="concavity_worst")
Lconcavity_worst.grid(row = 12,column = 3)
# Lconcavity_worst.pack( )
Econcavity_worst = Entry(top, bd =5)
Econcavity_worst.grid(row = 13,column = 3)
# Econcavity_worst.pack()

Lconcave_points_worst = Label(top, text="concave points_worst")
Lconcave_points_worst.grid(row = 14,column = 3)
# Lconcave_points_worst.pack( )
Econcave_points_worst = Entry(top, bd =5)
Econcave_points_worst.grid(row = 15,column = 3)
# Econcave_points_worst.pack()

Lsymmetry_worst = Label(top, text="symmetry_worst")
Lsymmetry_worst.grid(row = 16,column = 3)
# Lsymmetry_worst.pack( )
Esymmetry_worst = Entry(top, bd =5)
Esymmetry_worst.grid(row = 17,column = 3)
# Esymmetry_worst.pack()

Lfractal_dimension_worst = Label(top, text="fractal dimension_worst")
Lfractal_dimension_worst.grid(row = 18,column = 3)
# Lfractal_dimension_worst.pack()
Efractal_dimension_worst = Entry(top, bd =5)
Efractal_dimension_worst.grid(row = 19,column = 3)
# Efractal_dimension_worst.pack()
###############################
def tellprediction():
    ##################################
      radius_mean = float(Entry.get(Eradius_mean))
      texture_mean = float(Entry.get(Etexture_mean))
      perimeter_mean = float(Entry.get(Eperimeter_mean))
      area_mean = float(Entry.get(Earea_mean))
      smoothness_mean = float(Entry.get(Esmoothness_mean))
      compactness_mean = float(Entry.get(Ecompactness_mean))
      concavity_mean = float(Entry.get(Econcavity_mean))
      concave_points_mean = float(Entry.get(Econcave_points_mean))
      symmetry_mean = float(Entry.get(Esymmetry_mean))
      fractal_dimension_mean = float(Entry.get(Efractal_dimension_mean))
    ##################################  
      radius_worst = float(Entry.get(Eradius_worst))
      texture_worst = float(Entry.get(Etexture_worst))
      perimeter_worst = float(Entry.get(Eperimeter_worst))
      area_worst = float(Entry.get(Earea_worst))
      smoothness_worst = float(Entry.get(Esmoothness_worst))
      compactness_worst = float(Entry.get(Ecompactness_worst))
      concavity_worst = float(Entry.get(Econcavity_worst))
      concave_points_worst = float(Entry.get(Econcave_points_worst))
      symmetry_worst = float(Entry.get(Esymmetry_worst))
      fractal_dimension_worst = float(Entry.get(Efractal_dimension_worst))
      #################################
      radius_standerd_error = float(Entry.get(Eradius_standerd_error))
      texture_standerd_error = float(Entry.get(Etexture_standerd_error))
      perimeter_standerd_error = float(Entry.get(Eperimeter_standerd_error))
      area_standerd_error = float(Entry.get(Earea_standerd_error))
      smoothness_standerd_error = float(Entry.get(Esmoothness_standerd_error))
      compactness_standerd_error = float(Entry.get(Ecompactness_standerd_error))
      concavity_standerd_error = float(Entry.get(Econcavity_standerd_error))
      concave_points_standerd_error = float(Entry.get(Econcave_points_standerd_error))
      symmetry_standerd_error = float(Entry.get(Esymmetry_standerd_error))
      fractal_dimension_standerd_error = float(Entry.get(Efractal_dimension_standerd_error)) 
      #################################    
      inp = [radius_mean,texture_mean,perimeter_mean,area_mean,smoothness_mean,compactness_mean,concavity_mean,concave_points_mean,symmetry_mean,fractal_dimension_mean,radius_standerd_error,texture_standerd_error,perimeter_standerd_error,area_standerd_error,smoothness_standerd_error,compactness_standerd_error,concavity_standerd_error,concave_points_standerd_error,symmetry_standerd_error,fractal_dimension_standerd_error,radius_worst,texture_worst,perimeter_worst,area_worst,smoothness_worst,compactness_worst,concavity_worst,concave_points_worst,symmetry_worst,fractal_dimension_worst]
      if not any(x is None for x in inp):
        prediction = knn.predict(inp)
        message = None
        if prediction == 0:
            message = 'Cancer : Malignant'
        else:
            message = 'No Cancer : Benign'    
        messagebox.showinfo("Results", message + '  Accuracy ~ ' + Accuracy + ' % ')
      else:
        messagebox.showerror('ERRROR','BLANKS NOT FILLED PROPERLY')   

b = Button(top,text='predict',command=tellprediction)
b.grid(row = 20,column = 2)

top.mainloop()