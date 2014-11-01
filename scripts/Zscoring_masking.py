# -*- coding: utf-8 -*-
"""
Created on Sat Oct 25 20:34:32 2014

@author: Imane
"""
import numpy as np
from os import listdir
from os.path import isfile, join
from zscoring import zscoringNII
from masking import maskdata

#Applying Z-score and saving in NII files
sourcedir = 'brainimages'
filenames = [ f for f in listdir(sourcedir) if isfile(join(sourcedir,f)) ]
newFn = []
for i in range (0, len(filenames)):
    fn = filenames[-1]
    zscoringNII(fn, sourcedir)
    newFn.extend(fn[:-7]+'_Z.nii.gz')
    
#Applying a mask and gathering data    
#I am aware it is messily done but this was written for the sake of testing
    
sourcedir = 'brainimages'
filenames = [ f for f in listdir(sourcedir) if isfile(join(sourcedir,f)) ] #a list of data file names
masksrc = 'masks\submasks'
masknm = [ f for f in listdir(masksrc) if isfile(join(masksrc,f)) ] #a list of the masks' names
for k in range(0, len(masknm)):
    data = []
    for i in range (0, len(filenames)):
        fn = filenames[i]
        ms = maskdata(fn, sourcedir, masknm[k]) #harvox_heschls.nii
        ums = ms.compressed()    
        ums=np.asarray(ums).reshape(-1)
        
        if (i==0):
            data = ums
        else:  
            data = np.vstack([data, ums]) #The result in data is a matrix of dim. (156 x len(ms.compressed)
            
    #unrolling data -> putting the voxels of every subject in one vector (row)   
    del(d)
    for i in range(0,26):  
        x=np.asarray(data[i:i+5,:]).reshape(-1)
        if (i==0):
            d = x
        else:  
            d = np.vstack([d, x]) #The result in d is a matrix of dim. (26 x len(ms.compressed)*6)
        i+=5
    
    np.save("dataMask"+str(k), d)
