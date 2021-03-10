coordinate = []

coordinateX = [-230 , -80 , 75 , 230]
coordinateY = [-230 , -80 , 75 , 230]

for i in range(0 , 3):
    for j in range(0 , 3):
        coor = [coordinateX[i] , coordinateY[j] , coordinateX[i + 1] , coordinateY[j + 1]]
        coordinate.append(coor)

print(coordinate)


