# -*- coding: utf-8 -*-
"""
Created on Sun Oct 19 13:55:44 2014

@author: beltrame
"""

import sys, getopt
import pickle
import sklearn.preprocessing
from sklearn.decomposition import PCA

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
    
    dataset = pickle.load(open('/home/user03/data/dataset.pickle','rb'))

    # PCA
    # Standardize the dataset
    sklearn.preprocessing.scale(dataset)

    # Fit the model
    pca = PCA(n_components=n_components, whiten=True).fit(dataset)
    
    # Transform the dataset
    dataPCA = pca.transform(dataset)

    # LEARNING
    print dataPCA

if __name__ == "__main__":
   main(sys.argv[1:])
    