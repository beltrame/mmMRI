# -*- coding: utf-8 -*-
"""
Created on Sun Oct 19 14:39:50 2014

@author: Imane
"""
from sklearn.cluster import KMeans

def kmeans(data, n):


    km=KMeans(init='k-means++', n_clusters=n, n_init=6)
    km.fit(data)
    idx = km.predict(data);
    ctrs = km.cluster_centers_
    return idx,ctrs