import numpy as np
from sklearn.decomposition import pca

def CalculateScalingFactorsPCA(data):
    # Create the covariance matrix
    Z = np.dot(data,data.transpose())
    # perform the SVD decomposition
    U, s, V = pca.linalg.svd(Z)
    # The eigenimages here are actuakly not eigenimages but a transposed 
    # version of the eigenvectors.
    # Recreate the eigenimages
    V = np.dot(data.transpose(),U)
    # Calculate the individual expression of the eigenimages
    T = np.dot(data,V)
    return T,V

