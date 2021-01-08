import speech_recognition as sr

recognizer = sr.Recognizer()

''' recording the sound '''
while True:
    with sr.Microphone() as source:
        recognizer.adjust_for_ambient_noise(source , duration=1)
        recorded_audio = recognizer.record(source , duration=3)

    ''' Recorgnizing the Audio '''
    
    try:
        text = recognizer.recognize_google(
                recorded_audio, 
                language="vi-VN"
            )
        print("Decoded Text : {}".format(text))

    except Exception as ex:
        print('Try again')