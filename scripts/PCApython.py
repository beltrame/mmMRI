import numpy as np

N = 20
M = 100

X = np.random.randn(N,M)

Z = np.dot(X,X.transpose())

U, s, V  = np.linalg.svd(Z)
# show the eigen values
pyplot.bar(range(0,len(s),1),s)

V = np.dot(X.transpose(),U)

T = np.dot(X,V)

