import json

finalData = []

f = open('rawData.json',)  
Data = json.load(f,)

curData = []

for data in Data:
    curData.append(data)
    if len(curData) == 5:
        finalData.append(curData)
        curData = []

print(len(finalData))

with open('dataRaw.json', 'w') as outfile:
    json.dump(finalData, outfile)