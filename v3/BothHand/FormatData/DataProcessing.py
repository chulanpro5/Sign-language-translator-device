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
    return (A[0] * B[0] + A[1] * B[1] + A[2] * B[2]) / ( math.sqrt(A[0] * A[0] + A[1] * A[1] + A[2] * A[2]) * math.sqrt(B[0] * B[0] + B[1] * B[1] + B[2] * B[2]) )

def calDistance(A , B):
    return math.sqrt( (A[0] - B[0]) * (A[0] - B[0]) + (A[1] - B[1]) * (A[1] - B[1]) + (A[2] - B[2]) * (A[2] - B[2]))

f = open('rawTest.json',)  
nData = json.load(f) 

joint = ['tipPosition' , 'dipPosition' , 'pipPosition' , 'mcpPosition']

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
            curPalmLeft = curData['hands'][0]['palmPosition']
            curPalmRight = curData['hands'][1]['palmPosition']
            cornerFinger = []

            for finger in range(0 , 5 , 1):
                j = []
                cornerFinger.append(curData['pointables'][finger]['tipPosition'])
                for curJoint in joint:
                    j.append(curData['pointables'][finger][curJoint])
                    #for id in range(len(curData['pointables'][finger][curJoint])):
                    #    if id == 1: Left.append(curData['pointables'][finger][curJoint][id] - palm[id])
                    #    if id == 0: Left.append(curData['pointables'][finger][curJoint][id] - palm[id] + cor[0])
                    #    if id == 2: Left.append(curData['pointables'][finger][curJoint][id] - palm[id] + cor[1])
                
                j.append(curData['hands'][0]['palmPosition'])
                
                for id in range(1 , 4):
                    A = createVector(j[id] , j[id - 1])
                    B = createVector(j[id] , j[id + 1])
                    EE = calCorner(A , B)
                    if EE > 1.0 : EE = 1.0
                    if EE < -1.0: EE = -1.0
                    Left.append(math.degrees(math.acos(EE)))
                
            for id in range(0 , 4):
                A = createVector(curPalmLeft , cornerFinger[id])
                B = createVector(curPalmLeft , cornerFinger[id + 1])
                EE = calCorner(A , B)
                if EE > 1.0 : EE = 1.0
                if EE < -1.0: EE = -1.0
                Left.append(math.degrees(math.acos(EE)))
            
            for finger in range(0 , 5 , 1):
                for id in range(0 , 3):
                    Left.append(curData['pointables'][finger]['direction'][id] * 100)

            for id in range(0 , 3):
                Left.append(curData['hands'][0]['palmNormal'][id] * 100)
            

            for i in range(0 , 5):
                Right.append(curPalmLeft[0] - palmLeft[0] + corLeft[0])
                Right.append(curPalmLeft[1] - palmLeft[1])
                Right.append(curPalmLeft[2] - palmLeft[2] + corLeft[2])

            cornerFinger = []

            for finger in range(5 , 10 , 1):
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
                    EE = calCorner(A , B)
                    if EE > 1.0 : EE = 1.0
                    if EE < -1.0: EE = -1.0
                    Right.append(math.degrees(math.acos(EE)))
                
            for id in range(0 , 4):
                A = createVector(curPalmRight , cornerFinger[id])
                B = createVector(curPalmRight , cornerFinger[id + 1])
                EE = calCorner(A , B)
                if EE > 1.0 : EE = 1.0
                if EE < -1.0: EE = -1.0
                Right.append(math.degrees(math.acos(EE)))
            
            for finger in range(5 , 10 , 1):
                for id in range(0 , 3):
                    Right.append(curData['pointables'][finger]['direction'][id] * 100)

            for id in range(0 , 3):
                Right.append(curData['hands'][1]['palmNormal'][id] * 100)

            for i in range(0 , 5):
                Right.append(curPalmRight[0] - palmRight[0] + corRight[0])
                Right.append(curPalmRight[1] - palmRight[1])
                Right.append(curPalmRight[2] - palmRight[2] + corRight[2])

            #for finger in range(0 , 5 , 1):
            #        for curJoint in joint:
            #            for id in range(len(curData['pointables'][finger][curJoint])):
            #                if id == 1: Left.append(curData['pointables'][finger][curJoint][id] - palmLeft[id])
            #                if id == 0: Left.append(curData['pointables'][finger][curJoint][id] - palmLeft[id] + corLeft[0])
            #                if id == 2: Left.append(curData['pointables'][finger][curJoint][id] - palmLeft[id] + corLeft[1])
            

            #for finger in range(5 , 10 , 1):
            #        for curJoint in joint:
            #            for id in range(len(curData['pointables'][finger][curJoint])):
            #                if id == 1: Right.append(curData['pointables'][finger][curJoint][id] - palmRight[id])
            #                if id == 0: Right.append(curData['pointables'][finger][curJoint][id] - palmRight[id] + corRight[0])
            #                if id == 2: Right.append(curData['pointables'][finger][curJoint][id] - palmRight[id] + corRight[1])
    
        for tmp in Left:
            rawData['ys'].append(tmp)
        
        for tmp in Right:
            rawData['ys'].append(tmp)


    if len(rawData['ys']) == 520:
        finalData.append(rawData)             

print(len(finalData))

with open('finalTestData.json', 'w') as outfile:
    json.dump(finalData, outfile)