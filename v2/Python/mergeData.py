import json

finalData = []

f = open('Toi.json',)  
nData = json.load(f) 

for curData in nData:
    finalData.append(curData)

f = open('Ten.json',)  
nData = json.load(f) 

for curData in nData:
    finalData.append(curData)


f = open('XinChao.json',)  
nData = json.load(f) 

for curData in nData:
    finalData.append(curData)


with open('dataRaw.json', 'w') as outfile:
    json.dump(finalData, outfile)