import numpy as np
import nibabel
import os
import glob

DataDir = '/Users/jason/Desktop/BrainHack/brainimages'
file = '113_NZ_DWI_FA_reg2STD.nii'
img = nibabel.load(os.path.join(DataDir,file))

data = img.get_data()

MaskDir = '/Users/jason/Desktop/BrainHack/masks'
MaskFile = 'auditorynetwork_mask.nii'
MaskImg = nibabel.load(os.path.join(MaskDir,MaskFile))
MaskData = MaskImg.get_data()

MaskIndices = MaskData.nonzero()
NVoxelsMask = MaskData[MaskIndices].size

for datatType in ['*VBM_GM*' '*DWI_FA*' '*DWI_MD*' '*DWI_S0' '*MTR*']
    pass

for i in glob.glob('*DWI_FA*.nii'):
    img = nibabel.load(os.path.join(DataDir,i))
    data = img.get_data()

data = data[MaskIndices]