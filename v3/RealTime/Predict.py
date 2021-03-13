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

label = ['Xin Chào' , 'Tôi' , 'Tên' , 'Mọi Người' , 'Khỏe Mạnh']

oneHandModel = keras.models.load_model('oneHandModel.h5')
bothHandModel = keras.models.load_model('bothHandModel_2.h5')
#load model

#==================Chia o===================
coordinate = []

coordinateX = [-230 , -138 , -46 , 46 , 138 , 230]
coordinateY = [-230 , -138 , -46 , 46 , 138 , 230]

for i in range(0 , 5):
    for j in range(0 , 5):
        coor = [coordinateX[i] , coordinateY[j] , coordinateX[i + 1] , coordinateY[j + 1]]
        coordinate.append(coor)
#=========================================================

joint = ['dipPosition' , 'pipPosition' , 'mcpPosition'] # joint name

index = [0 , 4 , 8 , 12 , 16] # index Frame

lastTime = int(round(time.time() * 10 )) + 50 # model chạy sau 5s
lastNumHands = 0

rawData = [] # Dữ liệu thô lấy từ LeapMotion
arrData = [] # Dữ liệu sau khi xử lí

#==========Xử lí dữ liệu thô (One hand)==================
def processOneHand():
    global arrData
    arrData = []
    pre = []

    for id in index:
        arrData.append(rawData[id])
    
    palm = arrData[0]['hands'][0]['palmPosition']
    
    for coor in coordinate:
        if coor[0] <= palm[0] and palm[0] <= coor[2] and coor[1] <= palm[2] and palm[2] <= coor[3]:
            cor = coor

    

    for curData in arrData:
        Right = []

        if len(curData['hands']) == 1:    
            for finger in range(0 , 5 , 1):
                for curJoint in joint:
                    for id in range(len(curData['pointables'][finger][curJoint])):
                        if id == 1: Right.append(curData['pointables'][finger][curJoint][id] - palm[id])
                        if id == 0: Right.append(curData['pointables'][finger][curJoint][id] - palm[id] + cor[0])
                        if id == 2: Right.append(curData['pointables'][finger][curJoint][id] - palm[id] + cor[1])
    
        for tmp in Right:
            pre.append(tmp)
    
    return pre

#======================================================

#==========Xử lí dữ liệu thô (Both hand)===============

def processBothHand ():
    global arrData
    arrData = []
    pre = []

    for id in index:
        arrData.append(rawData[id])

    palmLeft = arrData[0]['hands'][0]['palmPosition']
    palmRight = arrData[0]['hands'][1]['palmPosition']

    for coor in coordinate:
        if coor[0] <= palmLeft[0] and palmLeft[0] <= coor[2] and coor[1] <= palmLeft[2] and palmLeft[2] <= coor[3]:
            corLeft = coor

    for coor in coordinate:
        if coor[0] <= palmRight[0] and palmRight[0] <= coor[2] and coor[1] <= palmRight[2] and palmRight[2] <= coor[3]:
            corRight = coor

    for curData in arrData:
        Left = []
        Right = []

        if len(curData['hands']) == 2:            
            for finger in range(0 , 5 , 1):
                    for curJoint in joint:
                        for id in range(len(curData['pointables'][finger][curJoint])):
                            if id == 1: Left.append(curData['pointables'][finger][curJoint][id] - palmLeft[id])
                            if id == 0: Left.append(curData['pointables'][finger][curJoint][id] - palmLeft[id] + corLeft[0])
                            if id == 2: Left.append(curData['pointables'][finger][curJoint][id] - palmLeft[id] + corLeft[1])
            
            for finger in range(5 , 10 , 1):
                    for curJoint in joint:
                        for id in range(len(curData['pointables'][finger][curJoint])):
                            if id == 1: Right.append(curData['pointables'][finger][curJoint][id] - palmRight[id])
                            if id == 0: Right.append(curData['pointables'][finger][curJoint][id] - palmRight[id] + corRight[0])
                            if id == 2: Right.append(curData['pointables'][finger][curJoint][id] - palmRight[id] + corRight[1])
        for tmp in Left:
            pre.append(tmp)
        
        for tmp in Right:
            pre.append(tmp)
    
    return pre

#======================================================

#==============Nhận diện kí tự (One hand)==============
def predictOneHand():
    global rawData
    global arrData
    global lastTime

    test = []
    test.append(arrData)
    test = np.asarray(test)
    test = test.reshape(test.shape[0] , test.shape[1]//45 , 45)

    X = np.reshape(test[0] , (1,5,45))
    YRaw = oneHandModel.predict(X)  
    Y = np.argmax(YRaw[0])
    YScore = YRaw[0][Y]

    if YScore >= 0.9999:
        print('Predict: ', label[np.argmax(oneHandModel.predict(X)[0])]) 
        print('Score: ' , YScore)
        print('=======================')
        rawData = []
        arrData = []
        lastTime += 20

    else: 
        rawData.pop(1)
        print(len(rawData))
#=======================================================

#==============Nhận diện kí tự (Both hand)==============
def predictBothHand():
    global rawData
    global arrData
    global lastTime

    test = []
    test.append(arrData)
    test = np.asarray(test)
    test = test.reshape(test.shape[0] , test.shape[1]//90 , 90)

    X = np.reshape(test[0] , (1,5,90))
    YRaw = bothHandModel.predict(X)  
    Y = np.argmax(YRaw[0])
    YScore = YRaw[0][Y]

    if YScore >= 0.9999:
        print('Predict: ', label[np.argmax(bothHandModel.predict(X)[0])]) 
        print('Score: ' , YScore)
        print('=======================')
        rawData = []
        arrData = []
        lastTime += 20

    else: 
        rawData.pop(1)
        print(len(rawData))
#================================================

#=========Lấy dữ liệu thô từ Leap Motion=========
def on_message(ws, message):
    global lastTime
    global numCurFrame
    global numData
    global Left
    global Right
    global finalData
    global arrData
    global rawData
    global lastNumHands

    data = json.loads(message)

    exist = 'currentFrameRate' in data #Kiểm tra tồn tại bàn tay trong Frame

    if exist == True:
        curNumHands = len(data['hands'])
        CurTime = int(round(time.time() * 10 ))  # Lấy thời gian hiện tại

        if CurTime - lastTime > 1 or curNumHands != lastNumHands or len(data['hands']) > 2 or len(data['hands']) == 0: #Kiểm tra điều kiện
            rawData = []
            arrData = []
            lastTime = CurTime
            lastNumHands = curNumHands

        elif CurTime - lastTime == 1:
            #print(CurTime)
            #print(lastTime)

            lastTime = CurTime
            lastNumHands = curNumHands

            if len(rawData) < 17:
                print(len(rawData))
                rawData.append(data)

            else:
                print(len(rawData))
                if curNumHands == 1:
                    arrData = processOneHand()
                    predictOneHand()
                elif curNumHands == 2:
                    arrData = processBothHand()
                    predictBothHand()

#============================================


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