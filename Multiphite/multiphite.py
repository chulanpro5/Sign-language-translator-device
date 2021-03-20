#from tkinter import *
import tkinter as tk
import threading
import time
import speech_recognition as sr


def action1():
    global lbl

    window = tk.Tk()
    window.title("alo alo")
    window.geometry("800x600")
    #them label
    lbl = tk.Label(window, text="hello_world", fg = "red", font=("monaco", 30))
    lbl.place(relx = 50 , rely = 50 , anchor = 'se')
    lbl.grid(column = 10 , row = 10)

    window.mainloop()

def get_audio():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Tôi: ", end='')
        audio = r.listen(source, phrase_time_limit=5)
        try:
            text = r.recognize_google(audio, language="vi-VN")
            print(text)
            return text
        except:
            print("...")
            return 0

def stop():
    print("Hẹn gặp lại bạn sau!")

def get_text():
    while True:
        text = get_audio()
        if text:
            return text.lower()
        else:
            print("Bot không nghe rõ. Bạn nói lại được không!")

"""
def action2():
    global lbl

    lbl.configure(text = "testArr[i]")
    #while True:
    #    get_text()
"""

def action2():
    global lbl
    
    #lbl.configure(text = "testArr[i]")
    while True:
        printText = get_text()
        lbl.configure(text = printText)

threading.Thread(
    target=action1
).start()

threading.Thread(
    target=action2()
).start()