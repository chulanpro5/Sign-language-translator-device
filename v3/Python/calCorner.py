import math

a = [1.0 , 4.0 , 0.0]
b = [1.0 , 1.0 , 0.0]
c = [5.0 , 1.0 , 0.0]

def createVector(A , B):
    c = (B[0] - A[0] , B[1] - A[1] , B[2] - A[2])
    return c

def calCorner(A , B):
    return (A[0] * B[0] + A[1] * B[1] + A[2] * B[2]) / (math.sqrt(A[0] * A[0] + A[1] * A[1] + A[2] * A[2]) * math.sqrt(B[0] * B[0] + B[1] * B[1] + B[2] * B[2]))

A = createVector(a , b)
B = createVector(b , c)

print(math.degrees(math.acos(calCorner(A , B))))


