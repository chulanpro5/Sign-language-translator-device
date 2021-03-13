from mpl_toolkits.mplot3d import Axes3D
import json
import matplotlib.pyplot as plt
import numpy as np
import time

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

f = open('data3D.json',)
data = json.load(f)

Left = []

ax.set_xlabel("x axis")
ax.set_ylabel("y axis")
ax.set_zlabel("z axis")

Finger = ["tipPosition" , "pipPosition", "dipPosition", "mcpPosition"]

ax.scatter(xs = data[0]["hands"][0]["palmPosition"][0] , ys = data[0]["hands"][0]["palmPosition"][1] , zs = data[0]["hands"][0]["palmPosition"][2], s = 100)

for i in range(0 , 5 , 1):
    x = []
    y = []
    z = []

    x.append(data[0]["pointables"][i]["tipPosition"][0])
    x.append(data[0]["pointables"][i]["dipPosition"][0])
    x.append(data[0]["pointables"][i]["pipPosition"][0])
    x.append(data[0]["pointables"][i]["mcpPosition"][0])

    y.append(data[0]["pointables"][i]["tipPosition"][1])
    y.append(data[0]["pointables"][i]["dipPosition"][1])
    y.append(data[0]["pointables"][i]["pipPosition"][1])
    y.append(data[0]["pointables"][i]["mcpPosition"][1])   

    z.append(data[0]["pointables"][i]["tipPosition"][2])
    z.append(data[0]["pointables"][i]["dipPosition"][2])
    z.append(data[0]["pointables"][i]["pipPosition"][2])
    z.append(data[0]["pointables"][i]["mcpPosition"][2])

    x.append(data[0]["hands"][0]["palmPosition"][0])

    y.append(data[0]["hands"][0]["palmPosition"][1])

    z.append(data[0]["hands"][0]["palmPosition"][2])

    ax.scatter(xs = x , ys = y , zs = z , s = 100)
    ax.plot3D(xs = x , ys = y , zs = z)

plt.show()

"""
"""