---
layout: post
title: Install PFLOTRAN on Mac (Depreciated)
date: 2019-08-01 
description: Documentation on how to install PFLOTRAN on Mac
tags: code 
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

The [documentation](https://www.pflotran.org/documentation/user_guide/how_to/installation/linux.html#linux-install) shows the steps for Linux and is the same for MacOS. The steps have been updated for PFLOTRAN v4.0

## Install fortran compiler

Go to this [website](https://github.com/fxcoudert/gfortran-for-macOS/releases) to download the latest `gfortran` installer for macOS. Then install `gfortran` on mac.

Check to see if it is available:

```bash
which gfortran # it should print out the path to the executable
```

## Download and install Petsc

Petsc version may change over time. Check the latest compatible version on [documentation](https://www.pflotran.org/documentation/user_guide/how_to/installation/linux.html#linux-install)

```bash
git clone https://gitlab.com/petsc/petsc.git petsc_v3.16.2
cd petsc_v3.16.2
git checkout v3.16.2
```

## configure Petsc

- Configure (This will take ~30 min)

```bash
# must include --download-hdf5-fortran-bindings=yes
./configure --CFLAGS='-O3' --CXXFLAGS='-O3' --FFLAGS='-O3' --with-debugging=no --download-mpich=yes --download-hdf5=yes --download-hdf5-fortran-bindings=yes --download-fblaslapack=yes --download-metis=yes --download-parmetis=yes

# python2.7 ./config/configure.py --CFLAGS='-O3' --CXXFLAGS='-O3' --FFLAGS='-O3' --with-debugging=no --download-mpich=yes --download-hdf5=yes --download-fblaslapack=yes --download-metis=yes --download-parmetis=yes --download-cmake=yes
```

note: only python v2 is supported.

- define `PETSC_DIR` and `PETSC_ARCH`. You will see prompts when the configuration is completed. Note: you can also find out the `PETSC_ARCH` by looking in the `configure.log` file and search for `PETSC_ARCH` after configuration is done.

```bash
export PETSC_DIR=$PWD
export PETSC_ARCH=arch-darwin-c-release 
```

## Compile Petsc

```bash
cd $PETSC_DIR
make all
```

## Download and compile PFLOTRAN

```bash
git clone https://bitbucket.org/pflotran/pflotran
# optionally checkout a tag version
git checkout maint/v4.0
cd pflotran/src/pflotran
# compile using multiple cores (e.g., 4 cores)
make -j4 pflotran
```

## regression test

```bash
cd pflotran/regression_tests/default/543

export MPIRUN=/Users/shua784/Dropbox/github/petsc/arch-darwin-c-debug/bin/mpiexec
$MPIRUN -n 1 $PFLOTRAN_EXE -pflotranin 543_flow.in # use only one core for this test
```

Once the test model is finished (should take less than few seconds), the installation processes are done!

## Update PFLOTRAN

-  make sure `PETSC_DIR` and `PETSC_ARCH` are in your environment

```bash
export PETSC_DIR=$PWD
export PETSC_ARCH=arch-darwin-c-release
```

- Pull the changes from remote repo

```bash
git pull
```

- Recompile PFLOTRAN

```bash
cd pflotran/src/pflotran
make -j4 pflotran

# fast recompile (this will not rebuild all dependencies, but can be useful for Sandbox testing)
make pflotran fast=1
```

