from mpl_toolkits.mplot3d import Axes3D
import json
import matplotlib.pyplot as plt
import numpy as np
import time

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

f = open('Data.json',)
data = json.load(f)

Left = []

ax.set_xlabel("x axis")
ax.set_ylabel("y axis")
ax.set_zlabel("z axis")

Finger = ["pipPosition", "dipPosition", "mcpPosition"]

ax.scatter(xs = data["hands"][0]["palmPosition"][0] , ys = data["hands"][0]["palmPosition"][1] , zs = data["hands"][0]["palmPosition"][2], s = 100)

for i in range(0 , 5 , 1):
    x = []
    y = []
    z = []

    x.append(data["pointables"][i]["dipPosition"][0])
    x.append(data["pointables"][i]["pipPosition"][0])
    x.append(data["pointables"][i]["mcpPosition"][0])

    y.append(data["pointables"][i]["dipPosition"][1])
    y.append(data["pointables"][i]["pipPosition"][1])
    y.append(data["pointables"][i]["mcpPosition"][1])   

    z.append(data["pointables"][i]["dipPosition"][2])
    z.append(data["pointables"][i]["pipPosition"][2])
    z.append(data["pointables"][i]["mcpPosition"][2])

    x.append(data["hands"][0]["palmPosition"][0])

    y.append(data["hands"][0]["palmPosition"][1])

    z.append(data["hands"][0]["palmPosition"][2])

    ax.scatter(xs = x , ys = y , zs = z , s = 100)
    ax.plot3D(xs = x , ys = y , zs = z)

plt.show()

"""
"""