import json

f = open('dataRaw.json',)  
data = json.load(f) 

joint = ['dipPosition' , 'pipPosition' , 'mcpPosition']

"""

"""

Left = []
Right = []

for curData in data:
    if len(curData['hands']) == 1:
        if curData['hands'][0]['type'] == 'left':
            for posJoint in curData['hands'][0]['palmPosition']:
                Left.append(posJoint)
            for curJoint in joint:
                for posJoint in curData['pointables'][0][curJoint]:
                    Left.append(posJoint)

        elif curData['hands']['type'] == 'right':
            for posJoint in curData['hands'][0]['palmPosition']:
                Right.append(posJoint)
            for curJoint in joint:
                for posJoint in curData['pointables'][0][curJoint]:
                    Right.append(posJoint)        
    else:
        for hand in curData['hands']:
            if hand['type'] == 'left':
                for posJoint in hand['palmPosition']:
                    Left.append(posJoint)
                for curJoint in joint:
                    for posJoint in hand['pointables'][curJoint]:
                        Left.append(posJoint)
            
            elif hand['type'] == 'right':
                for posJoint in hand['palmPosition']:
                    Right.append(posJoint)
                for curJoint in joint:
                    for posJoint in hand['pointables'][curJoint]:
                        Right.append(posJoint) 
