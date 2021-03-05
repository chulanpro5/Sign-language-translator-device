import websocket
import os
try:
    import thread
except ImportError:
    import _thread as thread
import time
import json 
import sys

lastTime = 0

rawData = {}
rawData['xs'] = '2'
rawData['ys'] = []

print("Hello World")

finalData = {}
finalData['data'] = []

numData = 0
numCurFrame = 0

Left = []
Right = []

def on_message(ws, message):
    global lastTime
    global numCurFrame
    global numData
    global Left
    global Right
    global finalData

    data = json.loads(message)

    curTime = int(round(time.time())) * 10
    
    if curTime - lastTime > 4 :        
        lastTime = curTime
        numCurFrame += 1

        if len(data['hands']) == 1 :
            if data['hands'][0]['type'] == 'right' :
                for i in range(0 , 45 , 1) : 
                    Left.append(0)

                for i in range(0 , 5 , 1):
                    for id in data["pointables"][i]["dipPosition"] : 
                        Right.append(id)
                    for id in data["pointables"][i]["pipPosition"] : 
                        Right.append(id)
                    for id in data["pointables"][i]["mcpPosition"] : 
                        Right.append(id)

            elif data['hands'][0]['type'] == 'left' :
                for i in range(0 , 5 , 1):
                    for id in data["pointables"][i]["dipPosition"] : 
                        Left.append(id)
                    for id in data["pointables"][i]["pipPosition"] : 
                        Left.append(id)
                    for id in data["pointables"][i]["mcpPosition"] : 
                        Left.append(id)
                
                for i in range(0 , 45 , 1):
                        Right.append(0)

        elif len(data['hands']) == 2 :
            for i in range(5 , 10 , 1) :
                for id in data["pointables"][i]["dipPosition"] : 
                    Right.append(id)
                for id in data["pointables"][i]["pipPosition"] : 
                    Right.append(id)
                for id in data["pointables"][i]["mcpPosition"] : 
                    Right.append(id)
                                            
            for i in range(0 , 5 , 1) :
                for id in data["pointables"][i]["dipPosition"] : 
                    Left.append(id)
                for id in data["pointables"][i]["pipPosition"] : 
                    Left.append(id)
                for id in data["pointables"][i]["mcpPosition"] : 
                    Left.append(id)   

        if numCurFrame == 5:
            numCurFrame = 0
            numData += 1

            print(numData)

            print("Waiting...")

            lastTime += 2

            print("Start collecting...")

            for id in Left:
                rawData['ys'].append(id)
            for id in Right:
                rawData['ys'].append(id)

            finalData['data'].append(rawData)

            with open('dataRaw.json', 'w') as outfile:
                json.dump(finalData, outfile)

            rawData['ys'] = []
            Left = []
            Right = []

    if numData == 50:
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