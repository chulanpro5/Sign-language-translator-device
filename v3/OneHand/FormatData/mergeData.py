import json
import os
import sys

finalData = []
fileName = 'finalData'

label = ['MoiNguoi', 'XinChao', 'Toi']

#XinChao: 0
#Toi: 1
#Ten: 2
#MoiNguoi: 3

for curLabel in label:
    newLabel = curLabel + '.json'
    f = open(newLabel,)
    Data = json.load(f)
    for curData in Data:
        exists = True
        if exists == True:
            finalData.append(curData)
        
with open(fileName + '.json', 'w') as outfile:
    json.dump(finalData, outfile)