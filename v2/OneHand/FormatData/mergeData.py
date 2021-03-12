import json
import os
import sys

finalData = []
fileName = 'rawData'

label = ['Toi', 'toi2' , 'MoiNguoi' , 'XinChao', 'xinchao2']

#XinChao: 0
#Toi: 1
#Ten: 2
#MoiNguoi: 3

for curLabel in label:
    newLabel = curLabel + '.json'
    f = open(newLabel,)
    Data = json.load(f)
    for curData in Data:
        exists = 'currentFrameRate' in curData[0]
        if exists == True:
            finalData.append(curData)
        
with open(fileName + '.json', 'w') as outfile:
    json.dump(finalData, outfile)