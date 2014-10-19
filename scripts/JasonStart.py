import numpy.ma as ma
import nibabel
import os
import glob
import sklearn
import sys

def getMask(dataFile, maskFile):
    maskFile = nibabel.load(maskFile).get_data()
    dataFile = dataFile[maskFile == 1]  # For generating a vector
    return dataFile

def createMatrix(DataDir, maskFile):
	matrix = {}
	for dataType in ['*VBM_GM*_z.nii', '*DWI_FA*_z.nii', '*DWI_MD*_z.nii', '*DWI_S0*_z.nii', '*MTR*_z.nii']:
		for imageFile in glob.glob(DataDir + dataType):
			subjectID = imageFile.split('/')[-1][0:3]
			if subjectID == "106": #Ignoring subject 106
				continue
        		data = nibabel.load(imageFile).get_data()
        		data_masked = getMask(data, maskFile)
	matrix[subjectID] = data_masked
	return ma.array(matrix.items(), dtype=dtype)

if __name__ == "__main__":
	if len(sys.argv)<2:
		print "Usage: JasonStart.py <path to .nii.gz files> <mask file>"
		sys.exit(0)
	DataDir = sys.argv[1]
	maskFile = sys.argv[2]

	n_components = 24
	
	dataArray = createMatrix(DataDir, maskFile)
	pca = sklearn.decomposition.RandomizedPCA(n_components=n_components).fit(dataArray)
