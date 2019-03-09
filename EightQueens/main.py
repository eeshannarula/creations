import numpy as np

board = np.zeros((8,8))

class Queen:
    def __init__(self,pos):

        self.pos = pos

class Cell:

    def __init__(self,value):
        self.value = value

    def setVal(self,newVal):
        self.value = newVal

class Board:

    def __init__(self):

        self.queens = []

        def makeGrid(x,y):
            array = []
            for i in range(y):
                subarray = []
                for j in range(x):
                    subarray.append(Cell(0))
                array.append(subarray)
            return array
        self.grid = makeGrid(8,8)

    def checkAttack(self):

        counter = 0
        attacker_queens = []

        for queen in self.queens:
            x,y = queen.pos['x'],queen.pos['y']

            if  self.checkHorizontal(x,y) != True and  self.checkVertical(x,y) != True and self.checkCross(x,y) != True:
                counter += 1
            else:
                attacker_queens.append('(' + str(x+1)+','+str(y+1)+')')

        if counter == len(self.queens):
            print('True')
        else:
            print(attacker_queens[0])

    def checkHorizontal(self,x,y):
        counter = 0
        for cell in self.grid[y]:
            if self.grid[y].index(cell) != x:
                if cell.value == 0:
                    counter += 1
                elif cell.value == 1:
                    continue
        if counter == 7:
            return False
        else:
            return True

    def checkVertical(self,x,y):
        counter = 0

        for period in self.grid:
            if self.grid.index(period) != y:
                if period[x].value == 0:
                    counter += 1
                elif period[x].value == 1:
                    continue

        if counter == 7:
            return False
        else:
            return True

    def checkCross(self,x,y):

        counter = 0
        left_behind = 0
        for period in self.grid:
            y_ = self.grid.index(period)
            y_diff = y_ - y
            x_ = x + y_diff
            if x_ < 8 and x_ > -1:
                if x_ != x and y_ != y:
                    if self.grid[y_][x_].value == 0:
                        counter += 1
                    elif self.grid[y_][x_].value == 1:
                        continue
            else:
                left_behind += 1



        if counter == 7 - left_behind:
            return False
        else:
            return True

    def printgrid(self):
        array = []
        for i in self.grid:
            for j in i:
                array.append(j.value)
        a = np.array(array).reshape([8,8])
        print(a)


    def PlaceQueens(self,array):

     for cords in Board.makeQueensCords(array):
         self.queens.append(Queen(cords))
         self.grid[cords['y']][cords['x']].setVal(1)

    @staticmethod
    def makeQueensCords(array):
        returnarray = []
        for string in array:
            l = list(string)

            x = int(l[1]) - 1
            y = int(l[3]) - 1
            returnarray.append({'x':x,'y':y})
        return returnarray

# test

examples = [
["(2,1)", "(4,3)", "(6,3)", "(8,4)", "(3,4)", "(1,6)", "(7,7)", "(5,8)"],
["(2,1)", "(5,3)", "(6,3)", "(8,4)", "(3,4)", "(1,8)", "(7,7)", "(5,8)"],
["(2,1)", "(4,2)", "(6,3)", "(8,4)", "(3,5)", "(1,6)", "(7,7)", "(5,8)"]
]

queens = examples[1]


board = Board()
board.PlaceQueens(queens)

board.printgrid()
board.checkAttack()
