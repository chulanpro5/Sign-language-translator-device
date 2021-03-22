import websocket
import os
try:
    import thread
except ImportError:
    import _thread as thread
import time
import json 
import sys
#import pygame
#import pyaudio

lastTime = 0
fileName = 'H(test).json'
label = 8

print("Hello World")

f = open(fileName,)
finalData = json.load(f,)

print(len(finalData))
numData = -1
numCurFrame = 0

Left = []
Right = []
newData = []
#flag = 0
#pygame.mixer.init()

def on_message(ws, message):
    global lastTime
    global numCurFrame
    global numData
    global Left
    global Right
    global finalData
    global newData
    
    data = json.loads(message)

    curTime = int(round(time.time() * 10 )) 

    data['label'] = label


    if curTime - lastTime >= 1 : 
        #print(curTime)
        #print(lastTime)

        lastTime = curTime
        numCurFrame += 1

        print("[",numCurFrame , "]")

        newData.append(data)

        if numCurFrame == 5:
            numCurFrame = 0
            numData += 1
            print(numData)
            print('-----------------------------------------------')
            print("Waiting...")

            lastTime += 2

            finalData.append(newData)
            newData = []

            print("Start collecting...")

    if numData == 100:
        #pygame.mixer.music.load("ring.mp3")
        #pygame.mixer.music.play()
        print(len(finalData))
        finalData.pop(0)
        with open(fileName, 'w') as outfile:
                json.dump(finalData, outfile)
        
        sys.exit()
                
        
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