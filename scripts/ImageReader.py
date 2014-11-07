# -*- coding: utf-8 -*-
"""
Created on Fri Oct 17 23:27:31 2014

@author: beltrame
"""

import os
import numpy as np    # 
import numpy.ma as ma # Masking arrays
import nibabel
#import sklearn

class ImageReader:
    """ Class to read .nii image files """
   
    def __init__(self,sourcedir='.'):
        """ Constructor, takes a default source directory """
        self.sourcedir = sourcedir

    def get_image(self,imagefile):
        """ Returns a data structure with the voxel contents """        
        
        # Load an image and convert it to an array
        img = nibabel.load(os.path.join(self.sourcedir,imagefile))
        
        return img.get_data()
        
    def get_raw_image(self,imagefile):
        """ Returns a data structure with the voxel contents """        
        
        # Load an image and convert it to an array
        img = nibabel.load(os.path.join(self.sourcedir,imagefile))
        
        return img
    
    def get_shape(self,imagefile):
        img = self.get_image(imagefile)
        return img.shape
    
    def get_mask_size(self,maskfile):
        img = self.get_image(maskfile)
        return np.count_nonzero(img)
    
    def mask_image(self,imagefile, maskfile):
        """ 
            Masks an image using the specified nii file
            INPUT:  imagefile - the image file
                    mask_file - filename and path of the mask
            OUTPUT: a numpy.ma masked array
        """
        
        ## Masking 
        #
        # Load a mask just like every other image
        img = self.get_image(imagefile)
        mask = self.get_image(maskfile)
                
        # Applying a mask
        #
        # Notice that the I have negate the mask because we actually want what's
        # in the mask
        masked_array = ma.array(img,mask=np.logical_not(mask))
        
        # Output 
        return masked_array


if __name__ == "__main__":
    
    # Some little testing, won't work if you don't have the files    
    i = ImageReader('brainimages')
    data = i.get_image('111_GS_VBM_GM_reg2STD.nii.gz')
     
    mask = i.mask_image('111_GS_VBM_GM_reg2STD.nii.gz','../masks/auditorynetwork_mask.nii.gz')
    print(np.count_nonzero(mask.compressed()))
    
    mask = i.mask_image('111_GS_VBM_GM_reg2STD.nii.gz','../masks/submasks/harvox_heschls.nii.gz')
    print(np.count_nonzero(mask.compressed()))
    