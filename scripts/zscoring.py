#!/usr/bin/python
#Zscoring .nii files so that each subject's brain scan of each modality is scaled (mean 0, SD 1) - this is important for certain machine learning algorithms. 

import os,sys
import numpy as np
import nibabel as nb
import glob

# TODO: we have to figure out how to make modules
import ImageReader

def zscoringNII(filename,sourcedir='../../brainimages'):
    """ zscores a .nii.gz image only on non-zero values 
        and saves the same file _Z.nii.gz    
    """

    # Read images
    reader = ImageReader.ImageReader(sourcedir)
    img = reader.get_raw_image(filename)
    data = img.get_data()
    affine = img.get_affine()
    
    # Compute non-zero mean
    nonzdata = data[np.nonzero(data)]
    meanz = np.mean(nonzdata)
    
    # z-scoring non-zero values
    # TODO: Use a matrix formulation for speed
    vect = np.vectorize(lambda x : (x-meanz)/meanz if x !=0.0 else 0.0)
    x = vect(data)
    
    new_image = nb.Nifti1Image(x, affine)
    nb.save(new_image, os.path.join(sourcedir, filename[:-7]+'_Z.nii.gz'))

# This is the standard way of checking if the file is being executed    
if __name__ == "__main__":
    if len(sys.argv)<2:
        print "Usage: zscoring.py <path to .nii.gz files>"
        sys.exit(0)
      
    for dataType in ['*VBM_GM*STD.nii.gz', '*DWI_FA*STD.nii.gz', '*DWI_MD*STD.nii.gz', '*DWI_S0*STD.nii.gz', '*MTR*brain.nii.gz']:
        files = glob.glob(os.path.join(sys.argv[1],dataType))
        print "\nFound "+dataType, len(files), "files\nProcessing..."
        # Counter
        i = 0            
        for imageFile in files:
            zscoringNII(imageFile, sourcedir='')
            i = i + 1
            sys.stdout.write("\r%d%%" % int((float(i)/len(files))*100))
            sys.stdout.flush()
