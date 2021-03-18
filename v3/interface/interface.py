import turtle
import time
from turtle import Screen
import speech_recognition as sr

saying = []
turt = turtle.Turtle()
WIDTH, HEIGHT = 1000 , 1000

screen = Screen()
screen.bgcolor('black')
screen.setup(WIDTH + 4, HEIGHT + 8)
screen.setworldcoordinates(0, 0, WIDTH, HEIGHT)

r = sr.Recognizer()

curSaying = ""
while True:
    with sr.Microphone() as source:
        audio = r.listen(source)

        try:
            curSaying = r.recognize_google(audio , language='vi-VN')
            print(curSaying)
        except:
            print("sorry")


    turt.hideturtle()
    turt.penup()
    turt.backward(0)

    if len(saying) == 0:
        saying.append(curSaying)

    if curSaying != saying[len(saying) - 1]:
        saying.append(curSaying)

    height = HEIGHT - 50
    for i in range(0 , len(saying)):
        message = saying[i]
        turt.setposition(WIDTH - (len(message) * 25), height)
        height -= 60
        turt.write(message, move=False, font=('monaco', 30, 'bold'), align='left')
        turt.color('white')

    time.sleep(1)
    if len(saying) > 5:
        turt.clear()
        saying = []