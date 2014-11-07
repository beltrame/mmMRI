# -*- coding: utf-8 -*-
"""
Created on Sun Oct 19 13:55:44 2014

@author: beltrame
"""

import sys, getopt
import pickle
import sklearn.preprocessing
from sklearn.decomposition import PCA
from matplotlib import pyplot
from sklearn.cluster import KMeans

def kmeans(data, n):
    km=KMeans(init='k-means++', n_clusters=n, n_init=6)
    km.fit(data)
    idx = km.predict(data);
    ctrs = km.cluster_centers_
    return idx,ctrs


def main(argv):
    maskfile = ''
    n_components = 26
    try:
      opts, args = getopt.getopt(argv,"hm:c:",["maskfile=","components="])
    except getopt.GetoptError:
      print 'pipeline.py -m <maskfile> -c <# components>'
      sys.exit(2)
    for opt, arg in opts:
      if opt == '-h':
         print 'Usage:\n\tpipeline.py -m <maskfile> -c <# components>'
         sys.exit()
      elif opt in ("-m", "--maskfile"):
         maskfile = arg
      elif opt in ("-c", "--components"):
         n_components = arg
    
    dataset = pickle.load(open('dataset.pickle','rb'))

    # PCA
    # Standardize the dataset
    sklearn.preprocessing.scale(dataset)

    # Fit the model
    pca = PCA(n_components=n_components, whiten=True).fit(dataset)
    
    # Transform the dataset
    dataPCA = pca.transform(dataset)

    # LEARNING
    idx,ctrs = kmeans(dataPCA,2)
    
    idx=idx+1    
    pyplot.bar(range(0,26,1),idx)

if __name__ == "__main__":
   main(sys.argv[1:])
    