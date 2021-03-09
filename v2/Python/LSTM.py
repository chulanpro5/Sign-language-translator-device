import numpy as np
import json
import keras
from keras.layers.embeddings import Embedding
from keras.utils import to_categorical
from keras.layers import Bidirectional, Lambda
from keras.models import Model, Input
from keras.models import Sequential
from keras.layers import Dense, Dropout, LSTM, Activation
from keras.utils import np_utils
from keras.callbacks import ModelCheckpoint

f = open('rawData.json',)  
data = json.load(f) 
c = []
xraw = []
x = []
y = []

for i in data:
    xraw.append(i["ys"])
    y.append(int(i["label"]))

for i in xraw:
  tmp = []
  print(len(i))
  for id in i:
    tmp.append(id)
  x.append(tmp)

x = np.asarray(x)

print(x.shape[0])

y = np.asarray(y)
x = x.reshape(x.shape[0],x.shape[1]//96,96)

model = Sequential()
model.add(LSTM(
  512,
  input_shape=(x.shape[1], x.shape[2]),
  return_sequences=True
))

model.add(Dropout(0.3))
model.add(LSTM(512))
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.3))
model.add(Dense(3, activation = 'softmax'))
model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=["accuracy"])

model.summary()

history = model.fit(x, y, validation_split=0.3,batch_size=32, epochs=50, verbose=1)

from matplotlib import pyplot as plt
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.title('model accuracy')
plt.ylabel('accuracy')
plt.xlabel('epoch')
plt.legend(['train', 'val'], loc='upper left')
plt.show()

plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('model loss')
plt.ylabel('loss')
plt.xlabel('epoch')
plt.legend(['train', 'test'], loc='upper left')
plt.show()

model.save('model.h5') 