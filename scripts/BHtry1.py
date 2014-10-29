# -*- coding: utf-8 -*-
"""
Created on Sat Oct 25 20:34:32 2014

@author: Imane
"""
import numpy as np
import matplotlib.pyplot as plt
#from os import listdir
#from os.path import isfile, join
#from zscoring import zscoringNII
#from masking import maskdata
from sklearn.decomposition import PCA
from k_means import kmeans

#Applying PCA and plotting
fn = "dataZM\dataMask2.npy"
d=np.load(fn)
pca = PCA(n_components=2)
pca.fit(d)
dpca=pca.transform(d)

plt.scatter(dpca[:,0], dpca[:,1], marker='o', color='b')


#Applying kmeans and plotting
idx, ctrs = kmeans(dpca, 2)

plt.scatter(dpca[(idx==0),0], dpca[(idx==0),1], marker='o', color='r')
plt.scatter(dpca[(idx==1),0], dpca[(idx==1),1], marker='o', color='b')
plt.scatter(ctrs[:,0], ctrs[:,1], marker='o', color='k', linewidths=5)
