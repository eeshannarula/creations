mport random as r;

def make2dArray(rows,cols):
    arr = [];
    for i in range(rows):
        arr.append([]);
        for j in range(cols):
           arr[i].append(0);
    return arr;

class Matrix:
    def __init__(self,rows,cols):
        self.rows = rows;
        self.cols = cols;
        self.shape = [rows,cols];
        self.data = make2dArray(self.rows,self.cols);

    def randomize(self):
        for i in range(self.rows):
            for j in range(self.cols):
                self.data[i][j] = r.random() * 2 - 1;

    def add(self,m):
        if isinstance(m, Matrix):
            if m.rows != self.rows:
                if m.cols != self.cols:
                    print('rows and cols of a must match rows and cols of b');
            else:
              for i in range(self.rows):
                  for j in range(self.cols):
                      self.data[i][j] = self.data[i][j] + m.data[i][j];
        else:
            for i in range(self.rows):
                    for j in range(self.cols):
                       self.data[i][j] = self.data[i][j] + m;

    def mult(self,m):
        if isinstance(m, Matrix):
            if m.rows != self.rows:
                if m.cols != self.cols:
                    print('rows and cols of a must match rows and cols of b');
            else:
              for i in range(self.rows):
                  for j in range(self.cols):
                      self.data[i][j] = self.data[i][j] * m.data[i][j];
        else:
            for i in range(self.rows):
                    for j in range(self.cols):
                        self.data[i][j] = self.data[i][j] * m;

    def subtract(self,m):
        if isinstance(m, Matrix):
            if m.rows != self.rows:
                if m.cols != self.cols:
                    print('rows and cols of a must match rows and cols of b');
            else:
              for i in range(self.rows):
                  for j in range(self.cols):
                      self.data[i][j] = self.data[i][j] - m.data[i][j];
        else:
            for i in range(self.rows):
                    for j in range(self.cols):
                        self.data[i][j] = self.data[i][j] - m;

    def map(self,func):
        for i in range(self.rows):
            for j in range(self.cols):
                val = self.data[i][j];
                self.data[i][j] = func(val,i,j);        
                
        
                    
    @staticmethod
    def multiply(a,b):
        if isinstance(a, Matrix):
            if isinstance(b, Matrix):
                if a.cols != b.rows:
                    print('cols of a must be equal to rows of b');
                    return;
                else:
                    m_ = Matrix(a.rows,b.cols);
                    for i in range(m_.rows):
                        for j in range(m_.cols):
                            val = m_.data[i][j];
                            sum = 0;
                            for k in range(a.cols):
                                sum = sum + (a.data[i][k] * b.data[k][j]);
                            m_.data[i][j] = sum;
                    return m_;

    @staticmethod
    def subtract(a,b):
        if isinstance(a, Matrix):
            if isinstance(b, Matrix):
                if a.rows != b.rows and a.cols != b.cols:
                    print('cols and rows of a must be equal to cols and rows of b');
                    return;
                else:
                    m_ = Matrix(a.rows,a.cols);
                    for i in range(m_.rows):
                        for j in range(m_.cols):
                            m_.data[i][j] = a.data[i][j] - b.data[i][j];
                    return m_;        
                
    @staticmethod               
    def transpose(m):
        m_ = Matrix(m.cols,m.rows);
        for i in range(m_.rows):
            for j in range(m_.cols):
                m_.data[i][j] = m.data[j][i];
        return m_;        
        
    def dataSync(self):
        arr = [];
        for i in range(self.rows):
            for j in range(self.cols):
                arr.append(self.data[i][j]);
        return arr;        

    @staticmethod               
    def mapG(m,func):
        return Matrix(m.rows, m.cols).map(lambda e,i,j: func(m.data[i][j],i,j));

    def print(self):
        print('[');
        for i in range(self.rows):
            print(self.data[i]);
        print(']');

    @staticmethod  
    def fromArray(array):
        m_ = Matrix(len(array),1);
        for i in range(m_.rows):
          for j in range(m_.cols):
                m_.data[i][j] = array[i];
        return m_;        
