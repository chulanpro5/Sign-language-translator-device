import json

finalData = []

label = ['Toi' , 'Ten' , 'XinChao' , 'Toi2' , 'Ten2' , 'XinChao2']

for curLabel in label:
    newLabel = curLabel + '.json'
    f = open(newLabel,)
    Data = json.load(f)
    for curData in Data:
        exists = 'currentFrameRate' in curData[0]
        if exists == True:
            finalData.append(curData)
        
with open('dataRaw.json', 'w') as outfile:
    json.dump(finalData, outfile)