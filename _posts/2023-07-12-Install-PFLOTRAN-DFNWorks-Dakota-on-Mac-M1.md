---
layout: post
title: Install PFLOTRAN on Mac M1
date: 2023-07-12 
description: Documentation on how to install PFLOTRAN on MacBook M1
tags: HPC code 
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

A Guide to Building PFLOTRAN, DFNWorks, and Dakota on Apple Silicon Macs  
*This has been tested on an Apple MacBook Pro with M1 Max chip (2021) running MacOS Ventura 13.4

## Prerequisites
- Install Xcode (14.3). Install Xcode command line tools (`xcode-select --install`)

- Install Anaconda3: https://www.anaconda.com/download#macos  . <span style="color:red;"> Mamba is preferred.</span>

```bash
conda install python numpy, h5py, scipy, matplotlib, seaborn, networkx

# or 
mamba create -n pflotran-short-course python numpy h5py scipy matplotlib seaborn networkx mplstereonet fpdf conda-build -c conda-forge
```

- Add the following to ~/.bash_profile

```bash
export PATH="/opt/homebrew/bin:$PATH"  
export PETSC_DIR==/Users/username/path_to_top_level_petsc 
export PETSC_ARCH=arch-darwin-c-opt  
export PFLOTRAN_DIR=/Users/username/path_to_top_level_pflotran 
export dfnworks_PATH=/Users/username/path_to_top_level_dfnworks 
export PFLOTRAN_EXE=/Users/username/path_to_top_level_pflotran/src/pflotran/pflotran export LAGRIT_EXE=/Users/username/path_to_top_level_LaGriT/build/lagrit 
export DFNGEN_EXE=/Users/username/path_to_top_level_dfnworks/DFNGen/DFNGen 
export PATH=/Users/username/path_to_top_level_Dakota/software/dakota/bin:$PATH

```
## Build  PFLOTRAN  
- Install gcc  

```bash
brew install gcc
```

- Set compilers: `cd /opt/homebrew/bin` and look for `gfortran, g++, gcc`. 
- <span style="color:red;"> IMPORTANT! Create symbolic links as needed</span>, e.g., `ln -s g++-13 g++` and `ln -s gcc-13 gcc`. This will avoid using `clang` instead, which may fail.
- `export PATH="/opt/homebrew/bin:$PATH"  `
- Create or navigate to your software directory

```bash
cd ~/software/  
git clone https://gitlab.com/petsc/petsc.git  
cd petsc  
git checkout v3.19.0  

./configure --with-gfortran=/opt/homebrew/bin/gfortran-13 --with-cxx=/opt/homebrew/bin/g++-13 --with-cc=/opt/homebrew/bin/gcc-13 --CFLAGS='-O3' --CXXFLAGS='-O3' --FFLAGS='-O3' --with-debugging=no --download-openmpi=yes --download-hdf5=yes --download-hdf5-fortran-bindings=yes --download-fblaslapack=yes --download-metis=yes --download-parmetis=yes --download-hypre=yes

export PETSC_DIR=/home/username/path_to_top_level_petsc
export PETSC_ARCH=arch-darwin-c-opt  
```

- Follow on-screen instructions for building and testing your PETSc installation 
```bash
make all
```

- Potentially: in `~/<path-to-top-level-petsc>/arch-darwin-c-opt/lib/petsc/conf/petscvariables`, delete `--oversubscribe`

```bash
# install PFLOTRAN
cd ~/software/  
git clone https://bitbucket.org/pflotran/pflotran.git 
cd pflotran/src/pflotran  
make pflotran  
# compile using multiple cores (e.g., 4 cores)
make -j4 pflotran

#install conda-build to use conda develop. conda develop command is to install developmental version 
conda install conda-build
conda develop /Users/username/path_to_top_level_pflotran/src/python/
```

## DFNWorks

```bash
# install LaGriT
cd ~/software/  
git clone https://github.com/lanl/LaGriT.git  
cd LaGriT/  
mkdir build/ && cd build/  
cmake .. && make  # make sure cmake is from homebrew/bin

# Install DFNWorks
cd ~/software/  
git clone https://github.com/lanl/dfnWorks.git  
cd dfnWorks/pydfnworks/bin  
git checkout aa02d61 
python fix_paths.py  
cd ../  
conda install -c conda-forge mplstereonet  
conda install -c conda-forge fpdf  
```
- Comment out `pyvtk` stuff in `pydfnworks/dfnGen/meshing/mesh_dfn_helper.py `. Perhaps you mean to comment out `import pyvtk`?
```bash
python setup.py bdist_wheel  
cd ../DFNGen/  
make  
cd ../DFNTrans/  
make  
conda develop /Users/username/path_to_top_level_dfnworks/pydfnworks/
```
## Dakota

1. Download Dakota (command line only): https://snl-dakota.github.io/docs/6.18.0/users/setupdakota.html#installation
```bash
cd ~/software/  
tar xzvf /path/to/Dakota-release.platform.tar.gz 
mv dakota-release.platform dakota
conda develop /path/to/Dakota/share/dakota/Python
```

## Other software
- Paraview  
    1. Download Paraview: https://www.paraview.org/download/
    
- HDFView  
    1. Download HDFView: https://www.hdfgroup.org/downloads/hdfview/