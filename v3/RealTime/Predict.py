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
import math
import pyttsx3
from tkinter import *
import tkinter
import threading
import time
import speech_recognition as sr

# ==========================================

label = ['Xin Chào' , 'Tôi' , 'Tên' , 'Mọi Người' , 'Khỏe Mạnh' , 'Tác giả' , 'Mèo' , 'Thích']

oneHandModel = keras.models.load_model('oneHandModel.h5')
bothHandModel = keras.models.load_model('bothHandModel.h5')
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

joint = ['tipPosition' , 'dipPosition' , 'pipPosition' , 'mcpPosition'] # joint name

index = [0 , 4 , 8 , 12 , 16] # index Frame

lastTime = int(round(time.time() * 10 )) + 50 # model chạy sau 5s
lastNumHands = 0

rawData = [] # Dữ liệu thô lấy từ LeapMotion
arrData = [] # Dữ liệu sau khi xử lí

#==========Xử lí dữ liệu thô (One hand)==================

#================================

#================================

def TextToSpeech(saying):
    engine = pyttsx3.init()

    voices = engine.getProperty("voices")

    engine.setProperty("voice" , voices[1].id)
    engine.say(saying)
    engine.runAndWait()

def createVector(A , B):
    c = [B[0] - A[0] , B[1] - A[1] , B[2] - A[2]]
    return c

def calCorner(A , B):
    return (A[0] * B[0] + A[1] * B[1] + A[2] * B[2]) / (math.sqrt(A[0] * A[0] + A[1] * A[1] + A[2] * A[2]) * math.sqrt(B[0] * B[0] + B[1] * B[1] + B[2] * B[2]))

def calDistance(A , B):
    return math.sqrt( (A[0] - B[0]) * (A[0] - B[0]) + (A[1] - B[1]) * (A[1] - B[1]) + (A[2] - B[2]))


def processOneHand():
    global arrData
    arrData = []
    pre = []

    for id in index:
        arrData.append(rawData[id])
    
    palm = arrData[0]['hands'][0]['palmPosition']
    
    #==== Tim o de quy ve =======

    for coor in coordinate:
        if coor[0] <= palm[0] and palm[0] <= coor[2] and coor[1] <= palm[2] and palm[2] <= coor[3]:
            cor = coor
    
    #============================

    for curData in arrData:
        Right = []

        if len(curData['hands']) == 1 and curData['hands'][0]['type'] == 'right':    
            curPalm = curData['hands'][0]['palmPosition'] # Lay Palm cua khung hinh hien tai
            cornerFinger = [] # Tinh goc giua 2 ngon tay
            
            for finger in range(0 , 5 , 1):
                j = [] # Tinh goc giua cac khop tay trong 1 ngon tay
                cornerFinger.append(curData['pointables'][finger]['tipPosition'])
                for curJoint in joint:
                    j.append(curData['pointables'][finger][curJoint])
                
                j.append(curData['hands'][0]['palmPosition'])
                
                #Tinh goc giua cac khop tay
                
                for id in range(1 , 4):
                    A = createVector(j[id] , j[id - 1])
                    B = createVector(j[id] , j[id + 1])
                    EE = calCorner(A , B)
                    if EE > 1.0 : EE = 1.0
                    if EE < -1.0: EE = -1.0
                    Right.append(math.degrees(math.acos(EE)))
                
                #==========================

            # Tinh goc giua 2 ngon tay

            for id in range(0 , 4):
                A = createVector(curPalm , cornerFinger[id])
                B = createVector(curPalm , cornerFinger[id + 1])
                EE = calCorner(A , B)
                if EE > 1.0 : EE = 1.0
                if EE < -1.0: EE = -1.0
                Right.append(math.degrees(math.acos(EE)))

            #=========================

            #Lay vector chi huong cua tung ngon tay

            for finger in range(0 , 5 , 1):
                for id in range(0 , 3):
                    Right.append(curData['pointables'][finger]['direction'][id] * 100)

            #=========================

            for id in range(0 , 3):
                Right.append(curData['hands'][0]['palmNormal'][id] * 100)
        
            for i in range(0 , 5):
                Right.append(curPalm[0] - palm[0] + cor[0])
                Right.append(curPalm[1] - palm[1])
                Right.append(curPalm[2] - palm[2] + cor[2])
    
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
            curPalmLeft = curData['hands'][0]['palmPosition']
            curPalmRight = curData['hands'][1]['palmPosition']
            cornerFinger = []

            for finger in range(0 , 5 , 1):
                j = []
                cornerFinger.append(curData['pointables'][finger]['tipPosition'])
                for curJoint in joint:
                    j.append(curData['pointables'][finger][curJoint])
                    #for id in range(len(curData['pointables'][finger][curJoint])):
                    #    if id == 1: Left.append(curData['pointables'][finger][curJoint][id] - palm[id])
                    #    if id == 0: Left.append(curData['pointables'][finger][curJoint][id] - palm[id] + cor[0])
                    #    if id == 2: Left.append(curData['pointables'][finger][curJoint][id] - palm[id] + cor[1])
                
                j.append(curData['hands'][0]['palmPosition'])
                
                for id in range(1 , 4):
                    A = createVector(j[id] , j[id - 1])
                    B = createVector(j[id] , j[id + 1])
                    EE = calCorner(A , B)
                    if EE > 1.0 : EE = 1.0
                    if EE < -1.0: EE = -1.0
                    Left.append(math.degrees(math.acos(EE)))
                
            for id in range(0 , 4):
                A = createVector(curPalmLeft , cornerFinger[id])
                B = createVector(curPalmLeft , cornerFinger[id + 1])
                EE = calCorner(A , B)
                if EE > 1.0 : EE = 1.0
                if EE < -1.0: EE = -1.0
                Left.append(math.degrees(math.acos(EE)))
            
            for finger in range(0 , 5 , 1):
                for id in range(0 , 3):
                    Left.append(curData['pointables'][finger]['direction'][id] * 100)

            for id in range(0 , 3):
                Left.append(curData['hands'][0]['palmNormal'][id] * 100)
            

            for i in range(0 , 5):
                Right.append(curPalmLeft[0] - palmLeft[0] + corLeft[0])
                Right.append(curPalmLeft[1] - palmLeft[1])
                Right.append(curPalmLeft[2] - palmLeft[2] + corLeft[2])

            cornerFinger = []

            for finger in range(5 , 10 , 1):
                j = []
                cornerFinger.append(curData['pointables'][finger]['tipPosition'])
                for curJoint in joint:
                    j.append(curData['pointables'][finger][curJoint])
                    #for id in range(len(curData['pointables'][finger][curJoint])):
                    #    if id == 1: Right.append(curData['pointables'][finger][curJoint][id] - palm[id])
                    #    if id == 0: Right.append(curData['pointables'][finger][curJoint][id] - palm[id] + cor[0])
                    #    if id == 2: Right.append(curData['pointables'][finger][curJoint][id] - palm[id] + cor[1])
                
                j.append(curData['hands'][0]['palmPosition'])
                
                for id in range(1 , 4):
                    A = createVector(j[id] , j[id - 1])
                    B = createVector(j[id] , j[id + 1])
                    EE = calCorner(A , B)
                    if EE > 1.0 : EE = 1.0
                    if EE < -1.0: EE = -1.0
                    Right.append(math.degrees(math.acos(EE)))
                
            for id in range(0 , 4):
                A = createVector(curPalmRight , cornerFinger[id])
                B = createVector(curPalmRight , cornerFinger[id + 1])
                EE = calCorner(A , B)
                if EE > 1.0 : EE = 1.0
                if EE < -1.0: EE = -1.0
                Right.append(math.degrees(math.acos(EE)))
            
            for finger in range(5 , 10 , 1):
                for id in range(0 , 3):
                    Right.append(curData['pointables'][finger]['direction'][id] * 100)

            for id in range(0 , 3):
                Right.append(curData['hands'][1]['palmNormal'][id] * 100)

            for i in range(0 , 5):
                Right.append(curPalmRight[0] - palmRight[0] + corRight[0])
                Right.append(curPalmRight[1] - palmRight[1])
                Right.append(curPalmRight[2] - palmRight[2] + corRight[2])

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
    global curSaying
    test = []
    test.append(arrData)
    test = np.asarray(test)
    test = test.reshape(test.shape[0] , test.shape[1]//52 , 52)

    X = np.reshape(test[0] , (1,5,52))
    YRaw = oneHandModel.predict(X)  
    Y = np.argmax(YRaw[0])
    YScore = YRaw[0][Y]

    if YScore >= 0.8:
        curSaying = label[np.argmax(oneHandModel.predict(X)[0])]
        print('Predict: ', curSaying) 
        TextToSpeech(curSaying)
        addText('Tôi: ' + curSaying)
        #print('Score: ' , YScore)
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
    global curSaying
    test = []
    test.append(arrData)
    if len(arrData) != 520:
        rawData.pop(1)
        return
    test = np.asarray(test)
    test = test.reshape(test.shape[0] , test.shape[1]//104 , 104)

    X = np.reshape(test[0] , (1,5,104))
    YRaw = bothHandModel.predict(X)  
    Y = np.argmax(YRaw[0])
    YScore = YRaw[0][Y]

    if YScore >= 0.9999:
        curSaying = label[np.argmax(bothHandModel.predict(X)[0])]
        print('Predict: ', curSaying) 
        TextToSpeech(curSaying)
        addText('Tôi: ' + curSaying)
        #print('Score: ' , YScore)
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
                    if rawData[0]['hands'][0]['type'] == 'right':
                        arrData = processOneHand()
                        predictOneHand()
                    else : rawData.pop(1)
                elif curNumHands == 2:
                    arrData = processBothHand()
                    predictBothHand()

#============================================


def on_error(ws, error):
    print(error)

def on_close(ws):
    print("### closed ###")



def webSocket():
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://localhost:6437/v7.json",
                            on_message = on_message,
                            on_error = on_error,
                            on_close = on_close)
    
    ws.run_forever()

lbl = [[], [] , [] , [] , []]
curLbl = []

def UI():
    global lbl
    global curLbl
    global printText
    window = Tk()
    window.title("alo alo")
    window.geometry("800x600")
    window.configure(bg = 'black')
    X = 550
    Y = 0
    for i in range(5):
        curLbl.append("")
        lbl[i] = Label(window, text= "", fg = "white", font=("Arial", 30) , bg = 'black')
        #lbl[i].grid(column = 0, row = i)
        Y = Y + 70
        lbl[i].place(x = 0 * 0 , y = Y)
    curLbl.append('test')

    window.mainloop()

def addText(newText):
    global lbl
    global curLbl

    lbl[4].configure(text = newText)
    for i in range(0 , 4):
        lbl[i].configure(text = curLbl[i + 1])
        curLbl[i] = curLbl[i + 1]
    curLbl[4] = newText

def get_audio():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        audio = r.listen(source, phrase_time_limit=5)
        try:
            text = r.recognize_google(audio, language="vi-VN")
            print(text)
            return text
        except:
            return 0

def speech_to_text():
    while True:
        text = get_audio()
        if text:
            addText(text)
            #return 0
        else:
            print("...")

threading.Thread(
    target=webSocket
).start()

threading.Thread(
    target=speech_to_text
).start()

threading.Thread(
    target= UI
).start()