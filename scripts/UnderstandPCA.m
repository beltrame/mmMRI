% Create some data
N = 100; % Number of subjects
M = 20000; % Number of voxels
X = randn(N,M); % random data


Z = X*X'; % Create a covariance matrix of the data
% But for this the means need to be removed from X, this is the
% standardization part (remove the mean)

% Creation of this Z matrix is needed so that the following step is
% tractable. The eigen decomposition is now done on a small matrix.
[W S] = svd(Z); % perform singular value decomposition of the data; Can also use eig(Z)
% W are the eigen vectors and S are the squared eigenvalues

% Plot the eigenvalues
figure(1)
bar(diag(sqrt(S)))


% Get the eigen images back. This brings the eigenvectors back into the
% image space
V = X'*W;

% Create the score matrix also called the subejct scaling factors
% These are one number per person per eigen image. These values represent
% the degree to which each person "expresses" the eigenimage. These scores
% can be used to determine the weighted combination that predicts
% something. They can also be used with other tools to determine different
% groups. 
T = X*V;

% From the T matrix you can do fancy things to create a new vector B which
% is a weighted combination of the eigenvectors. Note, that some of these
% eigenvectors can be set to ZERO to ignore them.

% Create the weighted  combination image as:

BImage = V*B;

% This will give you a single image which is a weighted combination of the
% eigen images that best describe your covariate.
% As a example you may use

