coordinate = []

coordinateX = [-230 , -138 , -46 , 46 , 138 , 230]
coordinateY = [-230 , -138 , -46 , 46 , 138 , 230]

for i in range(0 , 5):
    for j in range(0 , 5):
        coor = [coordinateX[i] , coordinateY[j] , coordinateX[i + 1] , coordinateY[j + 1]]
        coordinate.append(coor)

import json

f = open('rawData.json',)  
nData = json.load(f) 

joint = ['dipPosition' , 'pipPosition' , 'mcpPosition']

"""

"""

Left = []
Right = []

finalData = []

for data in nData:  
    rawData = {}  
    rawData['ys'] = []
    
    if len(data[0]['hands']) != 1: continue

    palm = data[0]['hands'][0]['palmPosition']

    for coor in coordinate:
        if coor[0] <= palm[0] and palm[0] <= coor[2] and coor[1] <= palm[2] and palm[2] <= coor[3]:
            cor = coor

    for curData in data:
        Left = []
        Right = []
        rawData['label'] = curData['label']

        if len(curData['hands']) == 1:
            if curData['hands'][0]['type'] == 'right':            
                for finger in range(0 , 5 , 1):
                    for curJoint in joint:
                        for id in range(len(curData['pointables'][finger][curJoint])):
                            if id == 1: Right.append(curData['pointables'][finger][curJoint][id] - palm[id])
                            if id == 0: Right.append(curData['pointables'][finger][curJoint][id] - palm[id] + cor[0])
                            if id == 2: Right.append(curData['pointables'][finger][curJoint][id] - palm[id] + cor[1])
        
        for tmp in Right:
            rawData['ys'].append(tmp)


    if len(rawData['ys']) == 225:
        finalData.append(rawData)             

print(len(finalData))

with open('finalData.json', 'w') as outfile:
    json.dump(finalData, outfile)


            


