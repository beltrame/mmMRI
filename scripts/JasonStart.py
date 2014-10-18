import numpy.ma as ma
import nibabel
import os
import glob

DataDir = '/home/wang/Downloads/BrainHack/'
maskFile = DataDir + 'auditorynetwork_mask.nii'

if False:
    DataDir = '/Users/jason/Desktop/BrainHack/brainimages'
    file = '113_NZ_DWI_FA_reg2STD.nii'
    img = nibabel.load(os.path.join(DataDir, file))
    data = img.get_data()

def getMask(dataFile, maskFile):
    #MaskDir = DataDir
    #MaskDir = '/Users/jason/Desktop/BrainHack/masks'
    #MaskFile = 'auditorynetwork_mask.nii'
    #MaskImg = nibabel.load(os.path.join(MaskDir,MaskFile))
    #MaskData = MaskImg.get_data()

    #MaskIndices = MaskData.nonzero()
    #NVoxelsMask = MaskData[MaskIndices].size

    maskFile = nibabel.load(maskFile).get_data()
    # dataFile[maskFile == 0] = 0  # For maintaining 3D array integrity
    dataFile = dataFile[maskFile == 1]  # For generating a vector
    return dataFile

matrix = {}
for dataType in ['*VBM_GM*.nii', '*DWI_FA*.nii', '*DWI_MD*.nii', '*DWI_S0*.nii', '*MTR*.nii']:
    for imageFile in glob.glob(DataDir + dataType):
        #img = nibabel.load(os.path.join(DataDir,imageFile))
        subjectID = imageFile.split('/')[-1][0:3]
        data = nibabel.load(imageFile).get_data()
        data_masked = getMask(data, maskFile)
        matrix[subjectID] = data_masked

pass