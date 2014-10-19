# -*- coding: utf-8 -*-
"""
Created on Sun Oct 19 14:39:50 2014

@author: Imane
"""

from sklearn.cluster import MeanShift, 

def meanshiftt(data):

    bandwidth = estimate_bandwidth(data, quantile=0.2, n_samples=10)
    
    ms = MeanShift(bandwidth=bandwidth, bin_seeding=True)
    
    ms.fit(data)
    idx = ms.predict(data);
    ctrs = ms.cluster_centers_
    return idx, ctrs
