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
            if curData['hands'][0]['type'] == 'left':
                for posJoint in curData['hands'][0]['palmPosition']:
                    Left.append(posJoint)

                for finger in range(0 , 5 , 1):
                    for curJoint in joint:
                        for posJoint in curData['pointables'][finger][curJoint]:
                            Left.append(posJoint)
                
                for i in range(0 , 48 , 1): 
                    Right.append(0)

            elif curData['hands'][0]['type'] == 'right':
                for posJoint in curData['hands'][0]['palmPosition']:
                    Right.append(posJoint)

                for finger in range(0 , 5 , 1):
                    for curJoint in joint:
                        for posJoint in curData['pointables'][finger][curJoint]:
                            Right.append(posJoint)
                
                for finger in range(0 , 48 , 1):
                    Left.append(0)

        elif len(curData['hands']) == 2:
            for posJoint in curData['hands'][0]['palmPosition']:
                Left.append(posJoint)

            for posJoint in curData['hands'][1]['palmPosition']:
                Right.append(posJoint)
            
            for finger in range(0 , 5 , 1):
                for curJoint in joint:
                    for posJoint in curData['pointables'][finger][curJoint] :
                        Left.append(posJoint)
            
            for finger in range(5 , 10 , 1):
                for curJoint in joint:
                    for posJoint in curData['pointables'][finger][curJoint] :
                        Right.append(posJoint)
    
        for tmp in Left:
            rawData['ys'].append(tmp)
        
        for tmp in Right:
            rawData['ys'].append(tmp)

<<<<<<< HEAD
<<<<<<< HEAD
    if len(rawData['ys']) == 480:
        finalData.append(rawData)        
=======
    print(rawData['label'])

    finalData.append(rawData)        
>>>>>>> parent of d1242b0 (as)
=======
    print(rawData['label'])

    finalData.append(rawData)        
>>>>>>> ea08a4288dd206cac81080c880aa06f41dc2d159

print(len(finalData))

print(finalData[0]['label'])

with open('rawData.json', 'w') as outfile:
    json.dump(finalData, outfile)


            