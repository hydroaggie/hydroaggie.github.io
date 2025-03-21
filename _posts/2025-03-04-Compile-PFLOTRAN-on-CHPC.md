---
layout: post
title: Install PFLOTRAN on CHPC
date: 2019-08-15
description: Documentation on how to install PFLOTRAN on CHPC notchpeak or similar HPC system
tags:
  - code
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

See this [documentation](https://www.pflotran.org/documentation/user_guide/how_to/installation/linux.html#linux-install) for installation on Linux machine.

## Setup environment
Login to CHPC and load the following modules. 
```bash
module load gcc/11.2.0 openmpi/4.1.4 cmake/3.26.0
```

## Install PETSc

Download Petsc from Bitbucket, and save it into directory `petsc_v3.20.2`, and checkout the latest version `3.20.2`.

```bash
git clone https://gitlab.com/petsc/petsc.git petsc_v3.20.2
cd petsc_v3.20.2
git checkout v3.20.2
```

Set current dir as `PETSC_DIR`, define `--PETSC_ARCH` to any name, and a subdir with the same name will be created under the `PETSC_DIR` (eg.`petsc_v3.20.2/notchpeak-gcc-8.5.0`)

```bash
export PETSC_DIR=$PWD
export PETSC_ARCH=notchpeak-gcc-8.5.0
```

## Configure PETSc

- Use the recommended configuration. This will install a Fortran compiler, MPI, HDF5, and BLAS/LAPACK.

```bash
./configure --COPTFLAGS='-O3' --CXXOPTFLAGS='-O3' --FOPTFLAGS='-O3 -Wno-unused-function -fallow-argument-mismatch' --with-debugging=no --download-mpich=yes --download-hdf5=yes --download-hdf5-fortran-bindings=yes --download-fblaslapack=yes --download-metis=yes --download-parmetis=yes
```

- After configure, you will see something similar to the following message:

```bash
xxx=========================================================================xxx
 # Configure stage complete. Now build PETSc libraries with (gnumake build):
   make PETSC_DIR=/uufs/chpc.utah.edu/common/home/shuai-group1/pflotran/petsc_v3.21.4 PETSC_ARCH=notchpeak-gcc-8.5.0 all
xxx=========================================================================xxx
```

- Follow the prompt to build PETSc:

```bash
make PETSC_DIR=/global/cfs/cdirs/m1800/pin/pflotran-perl/petsc_v3.20.2 PETSC_ARCH=perl-c-opt all
```

After the build is complete, you may check if the build is successful using:

```bash
# Now to check if the libraries are working do:
make PETSC_DIR=/uufs/chpc.utah.edu/common/home/shuai-group1/pflotran/petsc_v3.21.4 PETSC_ARCH=notchpeak-gcc-8.5.0 all
```
## Download and compile PFLOTRAN

```bash
git clone https://bitbucket.org/pflotran/pflotran pflotran_v6.0
cd pflotran_v6.0
# optional. To checkout a specific version
# cd pflotran && git checkout maint/v5.0
git checkout v6.0

cd src/pflotran
make -j4 pflotran # use parallel thread to compile? You can also try -j8, -j16... if more cores are available
```

After compilation is complete, a new file named `pflotran*` executable is generated at current directory. You can also move this executable to another directory, e.g. ` ./bin/pflotran*`, then you can export this directory to `PATH`.

```bash
mkdir bin && cd bin && cp ../pflotran .
export PATH=$PATH:/global/project/projectdirs/m1800/pin/pflotran/src/pflotran/bin
```
### Fast compilation (use with caution)

**Caution! This works if only a small change is made because the compilation will not rebuild all the dependencies.**

```bash
make pflotran fast=1
```

## Regression test

Do a regression test to see if pflotran if working. First, request an interactive node to run the regression test.

```bash
salloc -N 1 -C cpu -q interactive -t 01:00:00 -L SCRATCH -A m1800
srun -n 1 pflotran -pflotranin $PFLOTRAN_DIR/regression_tests/default/543/543_flow.in # need to use one core to run this example
```

Within seconds, the test model should finish, and the installation processes are done! 🎉

## Create modulefile
Use module is a great way to organize compiled codes. Here is a sample that I used for PFLOTRAN on NERSC.

```bash
#%Module1.0#####################################################################
##
## modules modulefile
##
proc ModulesHelp { } {
    global mpi_bin

    puts stderr "\tPFLOTRAN pflotran/5.0 repository, opt build"
    puts stderr ""
}

module-whatis   "PFLOTRAN pflotran/5.0 repository, opt build"
# #############################################################################

module load cpu

setenv PFLOTRAN_DIR /PATH/TO/PFLOTRAN_DIR
setenv PETSC_DIR /PATH/TO/PETSC_DIR
setenv PETSC_ARCH perl-c-opt

prepend-path    PATH            $env(PFLOTRAN_DIR)/src/pflotran/bin
prepend-path    PATH            $env(PETSC_DIR)/$env(PETSC_ARCH)/bin
prepend-path    PYTHONPATH      $env(PFLOTRAN_DIR)/src/python

```

## Realization dependent runs

PFLOTRAN supports running multiple realizations at once. Must have realization dependent dataset.

- run single realization

```bash
srun -n 32 pflotran pflotran.in -realization_id 1
```

- run all realization

```bash
srun -n 128 pflotran pflotran.in -stochastic -num_realizations 4 -num_groups 4
```

Note: `# of realizations per groups` equals `num_realizations/num_groups`; `# of cores per simulation = # of cores/num_groups`; in this case, 32 cores are used for one realization.

## Update PFLOTRAN

-  make sure `PETSC_DIR` and `PETSC_ARCH` are in your environment

```bash
export PETSC_DIR=$PWD
export PETSC_ARCH=perl-c-opt
```

- Pull the changes from remote repo

```bash
git pull 
```

- Recompile PFLOTRAN

```bash
cd pflotran/src/pflotran
make -j4 pflotran
# make pflotran fast=1
```

### Automatically update

use the following bash script to automatically update PFLOTRAN to the latest on master branch.

```bash
#! /bin/bash

echo "<<<<<<<<<<<<<<<<<<update pflotran repo<<<<<<<<<<<<<<<<<<"
git pull

echo "<<<<<<<<<<<<<<<<<<compile pflotran<<<<<<<<<<<<<<<<<<<<<<<"
cd ./src/pflotran
make -j8 pflotran
```

## Common issues
1. `module: command not found`. This happened on an interactive node with `zsh` shell.
	- To fix this, run `source $LMOD_PKG/init/zsh` prior to running any `module` command.