import json

coordinate = []

coordinateX = [-230 , -80 , 75 , 230]
coordinateY = [-230 , -80 , 75 , 230]

for i in range(0 , 3):
    for j in range(0 , 3):
        coor = [coordinateX[i] , coordinateY[j] , coordinateX[i + 1] , coordinateY[j + 1]]
        coordinate.append(coor)

f = open('rawData.json',)  
nData = json.load(f) 

joint = ['dipPosition' , 'pipPosition' , 'mcpPosition']

"""

"""

Left = []
Right = []

finalData = []

for data in nData:  

    if len(data[0]['hands']) != 2: continue

    rawData = {}  
    rawData['ys'] = []

    palmLeft = data[0]['hands'][0]['palmPosition']
    palmRight = data[0]['hands'][1]['palmPosition']

    for coor in coordinate:
        if coor[0] <= palmLeft[0] and palmLeft[0] <= coor[2] and coor[1] <= palmLeft[2] and palmLeft[2] <= coor[3]:
            corLeft = coor

    for coor in coordinate:
        if coor[0] <= palmRight[0] and palmRight[0] <= coor[2] and coor[1] <= palmRight[2] and palmRight[2] <= coor[3]:
            corRight = coor
            
    for curData in data:
        Left = []
        Right = []
        rawData['label'] = curData['label']

        if len(curData['hands']) == 2:
            palm = curData['hands'][0]['palmPosition']
            
            for finger in range(0 , 5 , 1):
                    for curJoint in joint:
                        for id in range(len(curData['pointables'][finger][curJoint])):
                            if id == 1: Left.append(curData['pointables'][finger][curJoint][id] - palmLeft[id])
                            if id == 0: Left.append(curData['pointables'][finger][curJoint][id] - palmLeft[id] + corLeft[0])
                            if id == 2: Left.append(curData['pointables'][finger][curJoint][id] - palmLeft[id] + corLeft[1])
            
            palm = curData['hands'][1]['palmPosition']

            for finger in range(5 , 10 , 1):
                    for curJoint in joint:
                        for id in range(len(curData['pointables'][finger][curJoint])):
                            if id == 1: Right.append(curData['pointables'][finger][curJoint][id] - palmRight[id])
                            if id == 0: Right.append(curData['pointables'][finger][curJoint][id] - palmRight[id] + corRight[0])
                            if id == 2: Right.append(curData['pointables'][finger][curJoint][id] - palmRight[id] + corRight[1])
    
        for tmp in Left:
            rawData['ys'].append(tmp)
        
        for tmp in Right:
            rawData['ys'].append(tmp)


    if len(rawData['ys']) == 450:
        finalData.append(rawData)             

print(len(finalData))

with open('finalData.json', 'w') as outfile:
    json.dump(finalData, outfile)


            