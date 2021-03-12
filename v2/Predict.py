from numpy.core.defchararray import array
import websocket
import os
try:
    import thread
except ImportError:
    import _thread as thread
import time
import json 
import sys
import numpy as np
import keras
import time
from keras.layers.embeddings import Embedding
from keras.utils import to_categorical
from keras.layers import Bidirectional, Lambda
from keras.models import Model, Input
from keras.models import Sequential
from keras.layers import Dense, Dropout, LSTM, Activation
from keras.utils import np_utils
from keras.callbacks import ModelCheckpoint
# ==========================================

label = ['Xin Chào' , 'Tôi' , '' , 'Mọi Người' , '']

model = keras.models.load_model('model.h5')
#load model

#==========Chia o=============
coordinate = []

coordinateX = [-230 , -80 , 75 , 230]
coordinateY = [-230 , -80 , 75 , 230]

for i in range(0 , 3):
    for j in range(0 , 3):
        coor = [coordinateX[i] , coordinateY[j] , coordinateX[i + 1] , coordinateY[j + 1]]
        coordinate.append(coor)
#=======================

joint = ['dipPosition' , 'pipPosition' , 'mcpPosition']

index = [0 , 4 , 8 , 12 , 16]
lastTime = int(round(time.time() * 10 )) + 50

numData = -1
numCurFrame = 0

rawData = []
arrData = []

"""
"""

def process():
    global arrData
    for id in index:
        arrData.append(rawData[id])
    
    palm = arrData[0]['hands'][0]['palmPosition']
    
    for coor in coordinate:
        if coor[0] <= palm[0] and palm[0] <= coor[2] and coor[1] <= palm[2] and palm[2] <= coor[3]:
            cor = coor

    pre = []

    for curData in arrData:
        Right = []

        if len(curData['hands']) == 1:
            if curData['hands'][0]['type'] == 'right':            
                for finger in range(0 , 5 , 1):
                    for curJoint in joint:
                        for id in range(len(curData['pointables'][finger][curJoint])):
                            if id == 1: Right.append(curData['pointables'][finger][curJoint][id] - palm[id])
                            if id == 0: Right.append(curData['pointables'][finger][curJoint][id] - palm[id] + cor[0])
                            if id == 2: Right.append(curData['pointables'][finger][curJoint][id] - palm[id] + cor[1])
        
        for tmp in Right:
            pre.append(tmp)
    
    return pre

def predict():
    global rawData
    global arrData
    global lastTime

    test = []
    test.append(arrData)
    test = np.asarray(test)
    test = test.reshape(test.shape[0] , test.shape[1]//45 , 45)

    X = np.reshape(test[0] , (1,5,45))
    YRaw = model.predict(X)  
    Y = np.argmax(YRaw[0])
    YScore = YRaw[0][Y]

    if YScore >= 0.9999:
        print('Predict: ', label[np.argmax(model.predict(X)[0])]) 
        print('Score: ' , YScore)
        print('=======================')
        rawData = []
        arrData = []
        lastTime += 20

    else: 
        rawData.pop(1)
        print(len(rawData))

def on_message(ws, message):
    global lastTime
    global numCurFrame
    global numData
    global Left
    global Right
    global finalData
    global arrData
    global rawData

    data = json.loads(message)

    CurTime = int(round(time.time() * 10 )) 

    exist = 'currentFrameRate' in data
    if CurTime - lastTime > 1:
        rawData = []
        arrData = []
        lastTime = CurTime

    elif exist == True and CurTime - lastTime == 1 and len(data['hands']) > 0:
        #print(CurTime)
        #print(lastTime)

        lastTime = CurTime
        
        numCurFrame += 1

        if len(rawData) < 17:
            print(len(rawData))
            rawData.append(data)
        #add frame mới vào arrData
        #khúc này bọn e viết hàm process để đưa vào predict của mđ nhé. return của process(data) ra dưới dạng numpy
        # arrData đang ở dạng mảng numpy nha

        else:
            print(len(rawData))
            arrData = process()
            predict()
        
def on_error(ws, error):
    print(error)

def on_close(ws):
    print("### closed ###")

if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://localhost:6437/v7.json",
                            on_message = on_message,
                            on_error = on_error,
                            on_close = on_close)
    
    ws.run_forever()