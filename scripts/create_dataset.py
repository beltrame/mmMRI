# -*- coding: utf-8 -*-
"""
Created on Fri Oct 17 23:27:31 2014

@author: beltrame
"""

import os
import numpy as np    # 
import glob
import pandas as pd
from ImageReader import ImageReader

# Source directory (where to get the .nii.gz files)
sourcedir = 'brainimages'

# Some constants
datadir = '../../brainimages'
maskFile = '../../masks/submasks/harvox_heschls.nii.gz'
suffix = '*_Z.nii.gz'
n_components = 26

# Convenience image reager
reader = ImageReader('')

# Use the mask to determine the dataset size
masksize = reader.get_mask_size(maskFile)

#%%
## Create dataset multi-indexed structure
#
modes = [ 'VBM_GM', 'DWI_FA' , 'DWI_MD' , 'DWI_S0' , 'MTR', "T1" ]

# Columns are the modalities
columns = []

# Subcolumns are just an unravel of the mask index
# TODO: make it the actual voxel coordinates
subcolumns = [x for x in range(masksize)]*len(modes)

# Create columns for all modalities
for mode in modes:
    columns = columns+ [mode]*masksize;

arrays = [columns, subcolumns]
tuples = list(zip(*arrays))

cols = pd.MultiIndex.from_tuples(tuples, names=['Mode', 'Feature'])

## Create subject names as index
#

# Find all subject names
idx = glob.glob(os.path.join(datadir,'*'+modes[0]+suffix))

# Extract subject ID and convert to int
idx = [ int(x.split('/')[-1][0:3]) for x in idx ]

# Sort to avoid mixups
idx.sort()

## Instantiate dataframe
#
voxels = pd.DataFrame(np.zeros((26,masksize*len(modes))), columns=cols, index=idx)

#%% Collect all data in a nice dataset
# For each MRI modality
for mode in modes:
    
    print(mode)
    if mode == 'T1':
            suffix= '*STD.nii.gz'
    fileglob = '*'+mode+suffix
    for imageFile in glob.glob(os.path.join(datadir,fileglob)):

        print("Reading: "+imageFile)
        data_masked = reader.mask_image(imageFile, maskFile)

        subjectID = int(imageFile.split('/')[-1][0:3])
        print('Adding '+str(subjectID)+' '+mode )
        voxels.loc[subjectID][mode] = data_masked.compressed()

#%%  Covariates
df = pd.io.parsers.read_csv('../../covariates/covariates.csv', index_col=0,header=[0,1])
dataframe = pd.concat((voxels, df), axis=1)