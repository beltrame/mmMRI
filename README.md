How to open the client

* In chrome: open Tools >> Extensions
* Check developer mode
* Load unpacked extensions mmMRI/client
* Open a new tab with your applications (click on the app with red dots)

```bash
git clone https://github.com/beltrame/mmMRI.git
cd mmMRI/client
npm install
bower install
grunt
grunt appendSrcTags
```

How to run the server

```bash
git clone https://github.com/beltrame/mmMRI.git
cd mmMRI
npm install
node app.js

```





Brainhack 2014 preparation: Structural MRI

Project general purpose: many cognitive neuroscience labs collect multiple structural magnetic resonance images, and then use them in separate, parallel analyses. This ignores potentially interesting information in the relationships between information available from different imaging modalities in the same brain area. We would like to explore the possibility of combining these data in scientifically useful ways, specifically for small sample sizes with subtle differences that cognitive neuroscientists often deal with. This is in contrast to larger multimodal imaging efforts, which often focus on clinical vs. healthy populations for the purposes of disease state identification or prognosis (in these cases researchers are usually looking to classify a brain in to one of several groups that consist of very large number of subjects, and the differences between groups can be much larger). 
Although this is open to changing/warping by team members, our current focus is to increase the sensitivity of between group and regression-type analyses by combining information across several imaging modalities. 
The two main sorts of research questions are: 
1) Where in the brain do two groups differ? 
2) Where in the brain do differences correlate with some external continuous variables (e.g. age, or performance on a behavioural task of some kind)?
For both, it would be most valuable to obtain some indication of which modalities or combinations of modalities are relevant for determining a difference – not just an activated voxel. This is because some of the imaging modalities are interpretable physiologically, which is really interesting scientifically (more below).
Desired specifications of eventual tool (initial ideas): 
Input: the tool should take as input X pre-processed images in NIFTY format from N subjects (both values should be flexible), which have all been pre-processed to some degree (see below). These should all be registered to a standard space. It may be necessary to perform scaling and uniformity correction, depending on the tools used. For the first type of analysis, there should be some way of specifying group, and for the second, a way of inputting the covariate.  It would be an advantage to be able to input a mask (e.g. prepared from a probabilistic anatomical atlas) to focus on a region of interest - this will reduce computation time, and allow us to exclude uninteresting areas like ventricles. 
Output: the tool should output one or more volumes that indicates where differences are found, preferably with some degree of statistical validity (i.e. a statistical map, or images of some kind that could then be submitted to an existing statistical tool), and preferably that can be visualized by one of the freely available tools (e.g. FSLview, also one of the BrainHack projects was looking at visualizing / representing multimodal data). Note on visualization: visualization in brain imaging is very important because we can learn quite a bit about the structure and function of the brain from a pattern of differences beyond their mere magnitude / existence. Visualization and qualitative observations are therefore an important part of analysis, not just an afterthought. It would be wonderful to be able to interact/explore our results, for example, selectively showing information from different modalities to see how they relate spatially to one another. Some software may exist or be in progress in BrainHack to visualize multimodal images: we could look into this and try to generate output that could be visualized using existing tools…?
Probable obstacles: 
Co-registering within-subject data: For reasons of relating to the physics of MRI, the different scan sequences used to collect brain information cause distortions. For example, the accelerated echo planar image (EPI) sequence we use to collect the diffusion-weighted images (DWI) is known for distorting the ventral and occipital areas of the brain (See Fig 1). This can be partially corrected, but there is some uncertainty in how well different modality scans from the same individual line up with one another. This is a problem that needs to be solved before we get to group analysis (every effort has been made for the practice data), but we must be aware of this limitation. We may need to try some spatial smoothing or other solution if this turns out to be a problem.  
 
Figure 1: T1-weighted anatomical image (left) compared with the same subject’s raw DWI data (right)
Co-registering between-subject data: brain morphometry (shape) is highly variable even between healthy normal subjects, as is the micro-structure. This is a huge challenge for small datasets, because even if you line up your brains very well, there is no guarantee that the same spot on one brain will be doing the same processing as the same spot on another person’s brain. 
There has been a lot of work on how to best apply group analyses; the most common method is to use algorithms to stretch and compress each brain so that it fits more or less over a standard brain template. Given many degrees of freedom, you can make all brains look the same – but then you lose information about the differences you are interested in – there is a trade-off between comparability and preserving interesting differences.  As with within-subject registration problems, this is a pre-processing issue and not one we have to worry about at the moment, aside from being aware of how it might limit our ability to detect group differences. An alternative strategy, should this fail, would be to get a multimodal pattern of interest out at the subject level, summarize that with some variable or measure, and then perform group analyses on the extracted information. 

Suggested starting points for analyses: We have asked for some tips from Dr. Robert Brown at the MNI. He believes for this sort of a problem LDA, PCA, and ICA would be good starting points. Two notes we have not yet applied to the pre-processing steps are:
-	Registration to the atlas is usually not perfect though, especially in the cortex, so it's usually best to also segment the GM and multiply your atlas-based mask by the image-based cortex mask.  That way you don't get CSF in your ROI
-	You'll find that LDA/PCA/ICA works a lot better if you non-uniformity correct the images before you use them.  I'm not sure what FSL uses, but you can do it using the MINC tools program nu_correct, or the N4 algorithm in ITK.
Practice data set: our solutions should apply to a range of structural neuroimaging studies, but it will be helpful to have real data to play with so I have prepared some from one of my studies. We have permission to use this anonymized data for the Brainhack, but please don’t try to use it for anything else afterwards as it is not yet published.
Study description: 14 musicians and 13 non-musicians were scanned on the same Siemens Trio 3T scanner. We also have their ages and several kinds of behavioural data which pertain to their perception of sound and their musical skills (Note: 203_AL should be left out of behavioural analyses as we don’t have the behavioural data).
Registration: All prepared scans have been registered to standard MNI152 1mm space. [Details: DWI derived images were non-linearly co-registered to an FA average map that is in standard space directly; the T1 was non-linearly warped to standard space and its transformation applied to the MTR data that had been affine transformed to it; the VBM GM scans went through the standard FSL-VBM pipeline in which they were non-linearly warped to a study-average template which I think was warped to standard space]

NIFTY file format: we are working mostly with NIFTY (.nii) files, which FSL and several other common software packages use. The scanner outputs DICOM files, but no one works directly with these as they are quite arcane in structure; most people work with a number of other formats and may have to convert between them to use certain software functions. There are a number of free converters available, but be careful when converting because orientation information might not be preserved. This is particularly problematic because there is a history in our field of using both radiological (left side of brain appears on the right side of your screen) and neurological views (left side of brain appears on left side of screen), and right-left flips are difficult to spot – check carefully if you do have to convert!
NIFTY files can be zipped and unzipped for space reasons (gzip will result in *.nii.gz files and gunzip will result in *.nii files). Many FSL functions work on both, but for some functions and algorithms you might need to have the unpacked versions.
The structure of these files is described in detail, here: http://nifti.nimh.nih.gov/nifti-1/documentation/nifti1diagrams_v2.pdf 
More info: http://nifti.nimh.nih.gov/nifti-1/ 
http://nifti.nimh.nih.gov/nifti-1/documentation/hbm_nifti_2004.pdf 

Brain scan types and their meaning: <example file name in brackets>
T1-weighted image: <101_SH_T1_reg2STD.nii.gz>
To create a T1-weighted image, we wait for different amounts of magnetization to recover before measuring the MR signal by changing the repetition time (TR). This image weighting is useful for assessing the cerebral cortex, identifying fatty tissue, characterizing focal liver lesions and for post-contrast imaging. [wikipedia]
 
Figure 2: example T1 scan, in this type of image white matter has the highest intensity, followed by grey matter, and cerebrospinal fluid is black
This is the highest resolution (at least most details showing) scan we have. It has been used to derive the VBM and the transformation matrices to standard space, and can serve to orient you if you use it as a background image, but we probably don’t want to include it in the analysis (or maybe we do). It includes the skull and head so that would have to be masked off. 
T2-weighted image: <101_SH_DWI_S0_reg2STD.nii.gz>
To create a T2-weighted image, we wait for different amounts of magnetization to decay before measuring the MR signal by changing the echo time (TE). This image weighting is useful for detecting edema, revealing white matter lesions. [wikipedia] For our purposes, it just generally can be used to see differences between certain structures that you might not see in the T1 image. 

These have been derived from the diffusion weighted images, which were collected at 2mm resolution with an EPI sequence – not ideal but it may add some information. 
 
Figure 3: T2-weighted image (It looks like we have some non-uniformity (brightness) problems, so we might need to correct that.)
Fractional anisotropy: <101_SH_DWI_FA_reg2STD.nii.gz>
These data are derived from diffusion weighted imaging. The intensity of the voxel indicates the degree of directionality of matter (as measured by random water diffusion) in the voxel. It is used as an indication of white matter integrity/density, though there are some caveats in interpretation, for example, crossing white matter fibres will produce an area of low FA where they cross even though the voxel might be all made of dense white matter. While mostly used in white matter analyses, grey matter also has different degrees of myelinated axons passing through it, so it may be informative there too. 
 
Figure 4: Fractional anisotropy (FA) example. Note that the superior/posterior white spot in the sagittal section (left) is an artefact caused by the table shaking – this is not in an area we are interested in though. 
Mean diffusivity: <101_SH_DWI_MD_reg2STD.nii.gz>
Mean diffusivity is a lesser-used counterpart to FA that is also derived from diffusion-weighted images. High intensity means that water molecules can diffuse freely (e.g. CSF in ventricles), whereas darker areas mean that the water is restricted in its movement by the physical structure of the brain matter in which lies. 
 
Figure 5: Mean diffusivity (MD) image: high intensity means water can move freely, whereas darker colours means it is restricted
Magnetization transfer ratio (MTR): <101_SH_MTR_reg2STD_brain.nii.gz>
MT is a quantitative MRI technique based on interactions and exchanges between mobile protons in a free water pool and those bound to macromolecules. The magnetization transfer ratio (MTR) is derived from two specialized scan sequences, one in which an off-resonance saturation pulse is applied, and one in which it isn’t . From this we can calculate the MTR, which tells us something about the myelinisation of the matter contained in the voxel (higher intensity = lots of myelinisation). MTR has been used a lot in the study of multiple sclerosis to quantify the integrity of white matter, but as myelination patterns change with expertise and learning, it can also be useful in cognitive neuroscience.
 
Figure 6: Magnetization transfer ratio (MTR) example image. 
Voxel-based morphometry: <101_SH_VBM_GM_reg2STD.nii.gz>
This measure is derived from the T1 weighted image, and represents something like ’the concentration of gray matter in a voxel’. It has been criticized because it does not allow you to disentangle several possible contributors to the measure, but is still useful for identifying differences between subjects. Note that the intensity is weighted to compensate for the contraction or enlargement due to the non-linear component of the transformation from subject to standard space (each voxel of each registered grey matter image is multiplied by the Jacobian of the warp field). We only have grey matter VBM, so white matter and CSF has been masked off (set to zero) in these images. 
 
Figure 7: Voxel-based morphometry (VBM) of the grey matter (GM) – sample. High intensity has something to do with grey matter concentration in the voxel. 

fMRI contrast maps – a future possible addition: A current topic of interest is how structural and functional differences relate to one another – it would be nice if these could be included in the inputs to increase the range of research questions asked, and could probably be handled in a similar way if you put the output of first level fMRI analysis in as if it were an extra structural image type. 

Other files: 
</ROIs/auditorynetwork_mask.nii.gz>  is a sample mask (made of 0s and 1s) that indicates areas of potential interest for this dataset. In a sub folder you can find masks of the sub-regions if we want to start with a very specific region (they need to be binarized though). A good place to start for a small analysis would be <harvox_heschls.nii.gz>, this is the primary auditory cortex. 
< /covariates/maindemoandbehaviouralvars_raw.ods> is a LibreOffice spreadsheet containing some variables such as the subjects age and how they did on some perceptual and behavioural tasks. There is a raw score version, as well as a z-scored version, and sometimes if a smaller value indicates better performance, a version where the sign is inverted (this can make it easier to interpret final results). Note that subject 203_AL does not have behavioural data listed here; he would have to be excluded from this type of analysis.
The meaning of the covariates is as follows: 
Group: 1=mus, 2=non
Sex: 1=F,2=M
Age: years
Agez: years, z-scored (helpful pre-processing for certain types of analysis)
HINT: Hearing in Noise Test scores. A lower negative score represents a better score. NOTE: we had three non-native speakers, who have lower scores than they would have in their original language – they should probably be excluded (in bold)
(abs)HINT: the absolute value of above, so bigger is better (easier to understand in interactions)
HINTzpos: zscored
Finepitch: how well people can discriminate between very similar frequencies, lower scores are better. Subjects were presented with two tones and asked which was higher – these were repeated in a staircase procedure until the scores stabilized, averaged over 5 runs to helps stability. 
Finez: zscored
Finezpos: flipped so positive scores mean better performance.
Mel: Performance on a musical task in which subjects are presented with two short melodies – the second may be the same or slightly different than the first, and subject is to identify same/different. Higher values already represent better performance.
Melz: zscored
Trans: similar to Mel but the second presentation of the melody is transposed, either properly or with one note wrong – this is quite difficult, especially for non-musicians.
Transz: zscored
Rhythm: similar to Mel and Trans, but this task has a single tone played a number of times with rhythmic variations; the second presentation may be same or different than the first. 
Rhythmz: zscored. 
