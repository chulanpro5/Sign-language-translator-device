import json
import math

coordinate = []

coordinateX = [-230 , -138 , -46 , 46 , 138 , 230]
coordinateY = [-230 , -138 , -46 , 46 , 138 , 230]

for i in range(0 , 5):
    for j in range(0 , 5):
        coor = [coordinateX[i] , coordinateY[j] , coordinateX[i + 1] , coordinateY[j + 1]]
        coordinate.append(coor)

def createVector(A , B):
    c = [B[0] - A[0] , B[1] - A[1] , B[2] - A[2]]
    return c

def calCorner(A , B):
    return (A[0] * B[0] + A[1] * B[1] + A[2] * B[2]) / (math.sqrt(A[0] * A[0] + A[1] * A[1] + A[2] * A[2]) * math.sqrt(B[0] * B[0] + B[1] * B[1] + B[2] * B[2]))

def calDistance(A , B):
    return math.sqrt( (A[0] - B[0]) * (A[0] - B[0]) + (A[1] - B[1]) * (A[1] - B[1]) + (A[2] - B[2]) * (A[2] - B[2]))

f = open('rawData.json',)  
nData = json.load(f) 

joint = ['tipPosition' , 'dipPosition' , 'pipPosition' , 'mcpPosition']


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
        Right = []
        rawData['label'] = curData['label']

        if len(curData['hands']) == 1:
            if curData['hands'][0]['type'] == 'right':   
                disTance = []         
                cornerFinger = []
                curPalm = curData['hands'][0]['palmPosition']
                for finger in range(0 , 5 , 1):

                    disTance.append(curData['pointables'][finger])
                    j = []
                    cornerFinger.append(curData['pointables'][finger]['tipPosition'])
                    for curJoint in joint:
                        j.append(curData['pointables'][finger][curJoint])
                        #for id in range(len(curData['pointables'][finger][curJoint])):
                        #    if id == 1: Right.append(curData['pointables'][finger][curJoint][id] - palm[id])
                        #    if id == 0: Right.append(curData['pointables'][finger][curJoint][id] - palm[id] + cor[0])
                        #    if id == 2: Right.append(curData['pointables'][finger][curJoint][id] - palm[id] + cor[1])
                    
                    j.append(curData['hands'][0]['palmPosition'])
                    
                    for id in range(1 , 4):
                        A = createVector(j[id] , j[id - 1])
                        B = createVector(j[id] , j[id + 1])
                        Right.append(math.acos(calCorner(A , B)))
                    
                for id in range(0 , 4):
                    A = createVector(curPalm , cornerFinger[id])
                    B = createVector(curPalm , cornerFinger[id + 1])
                    Right.append(math.acos(calCorner(A , B)))
                    
                for id in range(0 , 4):
                    for curJoint in joint:
                        Right.append(calDistance(disTance[id][curJoint] , disTance[id + 1][curJoint]))
                    
        for tmp in Right:
            rawData['ys'].append(tmp)


    print(len(rawData['ys']))           

print(len(finalData))

with open('finalData.json', 'w') as outfile:
    json.dump(finalData, outfile)


            


