import json

f = open('dataRaw.json',)  
nData = json.load(f) 

joint = ['dipPosition' , 'pipPosition' , 'mcpPosition']

"""

"""

Left = []
Right = []

rawData = {}
rawData['label'] = -1
rawData['ys'] = []

finalData = []

for data in nData:    
    rawData['label'] = data[0]['label']
    rawData['ys'] = []

    Left = []
    Right = []

    for curData in data:
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

    
    finalData.append(rawData)

print(len(finalData))

with open('rawData.json', 'w') as outfile:
    json.dump(finalData, outfile)


            