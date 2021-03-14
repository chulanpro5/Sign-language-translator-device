import json
import matplotlib.pyplot as plt
import numpy as np
import time
import math
f = open('Data2D.json',)
data = json.load(f)
x_number_list = []
y_number_list = []

plt.title("Extract Number Root ")
plt.xlabel("Number")
plt.ylabel("Extract Root of Number")

print(len(data))

for curData in data:
    x_number_list.append(curData['hands'][0]['palmPosition'][0])
    y_number_list.append(abs(curData['hands'][0]['palmPosition'][2]))

plt.scatter(x_number_list, y_number_list, s=100)

plt.show()