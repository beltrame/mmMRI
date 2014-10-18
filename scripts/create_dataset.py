# -*- coding: utf-8 -*-
"""
Created on Fri Oct 17 23:27:31 2014

@author: beltrame
"""

import sys
import os
import numpy as np    # 
import numpy.ma as ma # Masking arrays
import nibabel
#import sklearn

# Source directory (where to get the .nii.gz files)
sourcedir = 'brainimages'

## Image loading
#
# Image file example
# 111_GS_VBM_GM_reg2STD.nii.gz
# 111_GS = subject, first 1 means non-musician, 2 means musician
# VBM = modality {VBM_GM,DWI_FA,DWI_MD,DWI_S0,MTR}
# _reg2STD all the same
imagefile = '111_GS_VBM_GM_reg2STD.nii.gz'

# Load an image and convert it to an array
img = nibabel.load(os.path.join(sourcedir,imagefile))
data = img.get_data()

## Masking 
#
# Load a mask just like every other image
img = nibabel.load(os.path.join(sourcedir,imagefile))
mask = img.get_data()

# Applying a mask
#
# Notice that the I have negate the mask because we actually want what's
# in the mask
masked_array = ma.array(data,mask=np.logical_not(mask))

# Output 
print masked_array.shape
print 'Compressed array: \n', masked_array.compressed()
print 'Compressed shape: \n', masked_array.compressed().shape


