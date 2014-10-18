import numpy as np
import nibabel
img = nibabel.load('path to any .nii.gz file')
data = img.get_data()

