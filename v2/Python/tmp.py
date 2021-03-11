coordinate = []

coordinateX = [-230 , -80 , 75 , 230]
coordinateY = [-230 , -80 , 75 , 230]

for i in range(0 , 3):
    for j in range(0 , 3):
        coor = [coordinateX[i] , coordinateY[j] , coordinateX[i + 1] , coordinateY[j + 1]]
        coordinate.append(coor)

print(coordinate)

import json

f = open('dataRaw.json',)  
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

    for curData in data:
        Left = []
        Right = []
        rawData['label'] = curData['label']
        if len(curData['hands']) == 1:
            palm = curData['hands'][0]['palmPosition']

            if curData['hands'][0]['type'] == 'left':
                for posJoint in curData['hands'][0]['palmPosition']:
                    Left.append(posJoint)

                for finger in range(0 , 5 , 1):
                    for curJoint in joint:
                        for id in range(len(curData['pointables'][finger][curJoint])):
                            Left.append(curData['pointables'][finger][curJoint][id] - palm[id])
                        
                        for coor in coordinate:
                            if coor[0] <= curData['pointables'][finger][curJoint][0] and curData['pointables'][finger][curJoint][0] <= coor[2] and coor[1] <= curData['pointables'][finger][curJoint][2] and curData['pointables'][finger][curJoint][2] <= coor[3]:
                                Left.append(curData['pointables'][finger][curJoint][0] - palm[0] + coor[2])
                                Left.append(curData['pointables'][finger][curJoint][1] )
                                Left.append(curData['pointables'][finger][curJoint][2] - palm[2] + coor[3])
                        
                for i in range(0 , 93 , 1): 
                    Right.append(0)

            elif curData['hands'][0]['type'] == 'right':
                for posJoint in curData['hands'][0]['palmPosition']:
                    Right.append(posJoint)

                for finger in range(0 , 5 , 1):
                    for curJoint in joint:
                        for id in range(len(curData['pointables'][finger][curJoint])):
                            Right.append(curData['pointables'][finger][curJoint][id] - palm[id])
                        for coor in coordinate:
                            if coor[0] <= curData['pointables'][finger][curJoint][0] and curData['pointables'][finger][curJoint][0] <= coor[2] and coor[1] <= curData['pointables'][finger][curJoint][2] and curData['pointables'][finger][curJoint][2] <= coor[3]:
                                Right.append(curData['pointables'][finger][curJoint][0] - palm[0] + coor[2])
                                Right.append(curData['pointables'][finger][curJoint][1] )
                                Right.append(curData['pointables'][finger][curJoint][2] - palm[2] + coor[3])
                
                for finger in range(0 , 93 , 1):
                    Left.append(0)

        elif len(curData['hands']) == 2:
            palm = curData['hands'][0]['palmPosition']

            for posJoint in curData['hands'][0]['palmPosition']:
                Left.append(posJoint)

            for posJoint in curData['hands'][1]['palmPosition']:
                Right.append(posJoint)
            
            for finger in range(0 , 5 , 1):
                    for curJoint in joint:
                        for id in range(len(curData['pointables'][finger][curJoint])):
                            Left.append(curData['pointables'][finger][curJoint][id] - palm[id])
                        for coor in coordinate:
                            if coor[0] <= curData['pointables'][finger][curJoint][0] and curData['pointables'][finger][curJoint][0] <= coor[2] and coor[1] <= curData['pointables'][finger][curJoint][2] and curData['pointables'][finger][curJoint][2] <= coor[3]:
                                Left.append(curData['pointables'][finger][curJoint][0] - palm[0] + coor[2])
                                Left.append(curData['pointables'][finger][curJoint][1] )
                                Left.append(curData['pointables'][finger][curJoint][2] - palm[2] + coor[3])
            
            palm = curData['hands'][1]['palmPosition']

            for finger in range(5 , 10 , 1):
                    for curJoint in joint:
                        for id in range(len(curData['pointables'][finger][curJoint])):
                            Right.append(curData['pointables'][finger][curJoint][id] - palm[id])
                        for coor in coordinate:
                            if coor[0] <= curData['pointables'][finger][curJoint][0] and curData['pointables'][finger][curJoint][0] <= coor[2] and coor[1] <= curData['pointables'][finger][curJoint][2] and curData['pointables'][finger][curJoint][2] <= coor[3]:
                                Right.append(curData['pointables'][finger][curJoint][0] - palm[0] + coor[2])
                                Right.append(curData['pointables'][finger][curJoint][1] )
                                Right.append(curData['pointables'][finger][curJoint][2] - palm[2] + coor[3])
    
        for tmp in Left:
            rawData['ys'].append(tmp)
        
        for tmp in Right:
            rawData['ys'].append(tmp)


    if len(rawData['ys']) == 930:
        finalData.append(rawData)             

print(len(finalData))

with open('rawData.json', 'w') as outfile:
    json.dump(finalData, outfile)


            


