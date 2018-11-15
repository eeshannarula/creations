from tkinter import *

top = Tk()
size = 10
bord = [[]] * size
for row in bord:
    for i in range(size):
        bord.append(Button(top))
for i in range(size):
    for j in range(size):
        bord[i][j].grid(row = i,column = j)    
top.mainloop()
