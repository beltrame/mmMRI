import os
import csv


InputFile = 'CSV.csv'
Covariates = ReadCovariates(InputFile)

def ReadCovariates(InputFile):
	# open the file 
	C = csv.reader(open(InputFile,'rU'))
	# Read out the header
	headers = C.next()
	# Create something for the data
	column = {}
	# create one column per value in the header
	for h in headers:
		column[h] = []
	# read the data and append it to column
	for row in C:
		for h, v in zip(headers,row):
			column[h].append(v)
	# change the format of the data to float		
	for h in headers:
		column[h] = np.array(column[h]).astype('float64')
	# return the data
	Covariates = column
	return Covariates
		
	
			