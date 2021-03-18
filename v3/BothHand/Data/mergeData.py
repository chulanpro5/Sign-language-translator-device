import json
import os
import sys

finalData = []
fileName = 'rawTest'

label = ['KhoeManh(test)' , 'TacGia(test)' , 'Meo(test)' , 'Ten(test)']

#XinChao: 0
#Toi: 1
#Ten: 2
#MoiNguoi: 3

for curLabel in label:
    newLabel = curLabel + '.json'
    f = open(newLabel,)
    Data = json.load(f)
    numTest = 0
    print(len(Data))
    for curData in Data:
        exists = 'currentFrameRate' in curData[0]
        if exists == True and numTest < 100:
            finalData.append(curData)
            numTest += 1
        
with open(fileName + '.json', 'w') as outfile:
    json.dump(finalData, outfile)