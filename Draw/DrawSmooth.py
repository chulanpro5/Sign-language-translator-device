import json
import matplotlib.pyplot as plt
import numpy as np
import time
import math
f = open('smooth.json',)
Data = json.load(f)


clor = ['blue' , 'green' , 'red']
plt.title("Before Smooth")
plt.xlabel("x axis")
plt.ylabel("z axis")

x = []
y = []

for curData in Data:
    x.append(curData[0])
    y.append(-curData[2])

plt.scatter(x,y,s=50)
plt.show()