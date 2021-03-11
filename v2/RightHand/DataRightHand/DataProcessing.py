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

    for curData in data:
        Left = []
        Right = []
        rawData['label'] = curData['label']
        if len(curData['hands']) == 1:
            palm = curData['hands'][0]['palmPosition']
            if curData['hands'][0]['type'] == 'right':
                for posJoint in curData['hands'][0]['palmPosition']:
                    Right.append(posJoint)

                for finger in range(0 , 5 , 1):
                    for curJoint in joint:
                        for id in range(len(curData['pointables'][finger][curJoint])):
                            Right.append(curData['pointables'][finger][curJoint][id] - palm[id])
        
        for tmp in Right:
            rawData['ys'].append(tmp)

    if len(rawData['ys']) == 240:
        finalData.append(rawData)             

print(len(finalData))

with open('finalData.json', 'w') as outfile:
    json.dump(finalData, outfile)


            