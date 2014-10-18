% Create some data
N = 100; % Number of subjects
M = 20000; % Number of voxels
X = randn(N,M); % random data

Z = X*X'; % Create a covariance matrix of the data

[W S] = svd(Z); % perform singular value decomposition of the data;
% W are the eigen images and S are the squared eigenvalues

% Plot the eigenvalues
figure(1)
bar(diag(sqrt(S)))

% Create the score matrix also called the subejct scaling factors
% These are one number per person per eigen image. These values represent
% the degree to which each person "expresses" the eigenimage. These scores
% can be used to determine the weighted combination that predicts
% something. They can also be used with other tools to determine different
% groups. For instance, you may want to determine how 


T = X*W;

% Once the weights of the T vectors are created call it: B then the
% corresponding image can be created.

BImage = W*B;

% This will give you a single image which is a weighted combination of the
% eigen images that best describe your covariate.
% As a example you may use


A1 = u;