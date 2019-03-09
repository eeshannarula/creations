import hashlib
import itertools

def break_pass_single(hash,password_digits):
    charsandnums = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,1,2,3,4,5,6,7,8,9'
    array = charsandnums.split(',')
    possibilities = [''.join(p) for p in itertools.product(array, repeat=password_digits)]
    for password in possibilities:
        hashpass = hashlib.md5(password.encode())
        if hashpass.hexdigest() == hash:
            print('password found :' + password)
            return True
            continue


def break_pass(hash,range_):
    for i in range(range_):
        a = break_pass_single(hash,i)
        if a == True:
            continue

break_pass('0e20bdcf52b00002c8df35c963b71298',6)
