from tkinter import *
import tkinter
import threading
import time
import speech_recognition as sr

lbl = [[] , [] , [] , [] , []]
text = ['Tôi : Xin chào', 'Tôi : Mọi người' , 'Chào bạn' , 'Rất vui được gặp bạn' , '...']
curLbl = []

def UI():
    global lbl
    global curLbl
    global printText

    window = Tk()
    window.title("alo alo")
    window.geometry("1920x1080")
    window.configure(bg = 'black')
    X = 550
    Y = 0
    for i in range(5):
        curLbl.append("")
        lbl[i] = Label(window, text= text[i], fg = "white", font=("Arial", 60) , bg = 'black')
        #lbl[i].grid(column = 0, row = i)
        Y = Y + 150
        lbl[i].place(x = 500 , y = Y)
    
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
            addText('Tôi: ' + text)
            #return 0
        else:
            print("...")

threading.Thread(
    target=UI
).start()
"""
threading.Thread(
    target=speech_to_text
).start()
"""