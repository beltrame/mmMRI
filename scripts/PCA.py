# -*- coding: utf-8 -*-
"""
Created on Sun Oct 19 12:39:25 2014

@author: beltrame
"""

import sklearn
import sklearn.preprocessing
import os
import numpy as np
from ImageReader import ImageReader
import glob
import logging
import pickle
from sklearn.decomposition import PCA

# Some constants
datadir = '../../brainimages'
maskFile = '../../masks/submasks/harvox_heschls.nii.gz'
suffix = '.nii.gz'
n_components = 26

# Convenience image reager
reader = ImageReader('')

# Use the mask to determine the dataset size
masksize = reader.get_mask_size(maskFile)
dataset = np.zeros((26,masksize*5))

# Counter
modality = -1
subjects = {}

# Collect all data in a nice dataset
for dataType in [ x+suffix for x in ['*VBM_GM*_Z', '*DWI_FA*_Z', '*DWI_MD*_Z', '*DWI_S0*_Z', '*MTR*_Z']]:
    print dataType
    subject = 0
    modality=modality+1
    for imageFile in glob.glob(os.path.join(datadir,dataType)):
        subjectID = imageFile.split('/')[-1][0:3]
        if subjectID not in subjects.keys():
            subjects[subjectID] = subject
            subject = subject+1
        print "Reading: "+imageFile
        data_masked = reader.mask_image(imageFile, maskFile)
        dataset[subjects[subjectID],masksize*modality:masksize*modality+masksize]=data_masked.compressed()

pickle.dump(dataset,open("dataset.pickle","wb"))

# Standardize the dataset
sklearn.preprocessing.scale(dataset)

# Compute PCA
print("Extracting the top %d eigenbrains from %d brains"
      % (n_components, dataset.shape[0]))

pca = PCA(n_components=n_components, whiten=True).fit(dataset)
