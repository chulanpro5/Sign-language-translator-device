import math

a = [2.0 , 8.3 , 9.3]
b = [2.55 , 12.44 , 59.333]
c = [7.33 , 199.33 , 7.99]

def createVector(A , B):
    c = [B[0] - A[0] , B[1] - A[1] , B[2] - A[2]]
    return c

def calCorner(A , B):
    return (A[0] * B[0] + A[1] * B[1] + A[2] * B[2]) / (math.sqrt(A[0] * A[0] + A[1] * A[1] + A[2] * A[2]) * math.sqrt(B[0] * B[0] + B[1] * B[1] + B[2] * B[2]))

A = createVector(a , b)
B = createVector(b , c)

print(math.acos(calCorner(A , B)))


