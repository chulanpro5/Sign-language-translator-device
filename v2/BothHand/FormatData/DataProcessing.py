import json

f = open('XinChao_Toi_Ten_MoiNguoi.json',)  
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
                
                for i in range(0 , 48 , 1): 
                    Right.append(0)

            elif curData['hands'][0]['type'] == 'right':
                for posJoint in curData['hands'][0]['palmPosition']:
                    Right.append(posJoint)

                for finger in range(0 , 5 , 1):
                    for curJoint in joint:
                        for id in range(len(curData['pointables'][finger][curJoint])):
                            Right.append(curData['pointables'][finger][curJoint][id] - palm[id])
                
                for finger in range(0 , 48 , 1):
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
            
            palm = curData['hands'][1]['palmPosition']

            for finger in range(5 , 10 , 1):
                    for curJoint in joint:
                        for id in range(len(curData['pointables'][finger][curJoint])):
                            Right.append(curData['pointables'][finger][curJoint][id] - palm[id])
    
        for tmp in Left:
            rawData['ys'].append(tmp)
        
        for tmp in Right:
            rawData['ys'].append(tmp)


    if len(rawData['ys']) == 480:
        finalData.append(rawData)             

print(len(finalData))

with open('finalData.json', 'w') as outfile:
    json.dump(finalData, outfile)


            