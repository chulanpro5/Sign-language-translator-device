import json

finalData = []

label = ['Toitest' , 'XinChaotest' , 'MoiNguoitest']

for curLabel in label:
    newLabel = curLabel + '.json'
    f = open(newLabel,)
    Data = json.load(f)
    for curData in Data:
        exists = 'currentFrameRate' in curData[0]
        if exists == True:
            finalData.append(curData)
        
with open('test.json', 'w') as outfile:
    json.dump(finalData, outfile)