import math
import itertools

def makecases(string):
    if checkStr(string):
        return list(dict.fromkeys(list(itertools.permutations(list(string)))))



def checkStr(string):
    counter = 0
    array = list(string)
    for i in list(string):
        if i == 's' or i =='S' or i == 'c' or i == 'C':
            counter += 1
    if counter == len(array):
        return True
    else:
        return False

def countScore(string):
    power = 1
    damage = 0
    for i in string:
        if i == 's' or i =='S':
            damage += power
        elif i == 'c' or i == 'C':
            power *= 2
    return damage


def hacks(string):
    ways = 0
    array = makecases(string)
    max_damage = countScore(list(string))

    for i in array:
        if countScore(i) < max_damage:
            ways += 1
    return ways


print(hacks('CSCSS'))
