
import os
import numpy as np
import nibabel as nb

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
    zscoringNII('111_GS_VBM_GM_reg2STD.nii.gz')