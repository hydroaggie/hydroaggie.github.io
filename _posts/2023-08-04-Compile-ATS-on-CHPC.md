---
layout: post
title: Install ATS on CHPC
date: 2023-08-04 
description: Documentation on how to install ATS on CHPC system
tags: HPC code 
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

This provides guidance on how to install ATS on UoU CHPC system. It mostly follows post [Install ATS on Linux](/blog/2021/Compile-ATS-Master-on-Linux) with a few modifications.

## Load modules

- Load compilers and cmake? 
```bash
module load gcc/11.2.0 openmpi/4.1.4 cmake/3.26.0
```
- check if `cmake` exists
```bash
which cmake
```
 - Get `OPENMPI_DIR`. The root directory can be found by the following command. **Do not include `bin/mpicc`**

```bash
# get the root directory of mpi
which mpicc 

# e.g.
/uufs/chpc.utah.edu/sys/spack/v019/linux-rocky8-x86_64/gcc-11.2.0/openmpi-4.1.4-fvjpa3zslc4266fazcxbv6ntjgojf6rx/bin/mpicc
```

## Installation

The steps follow [Install ATS on Linux](/blog/2021/Compile-ATS-Master-on-Linux).

## Modulefile
Creating a module file is useful for managing different versions of ats on HPC. The instructions follow this [post](https://hpc.ncsu.edu/Documents/user_modules.php)
- Create a fmodulefile

```bash
$ mkdir -p ATS_ROOT/modulefiles
# It is recommended to create different modulefiles for different compilers, arch, and ats versions
# e.g.,
$ mkdir -p ATS_ROOT/modulefiles/ats/tpls-0.98.6+amanzi-ats-master/chpc-notchpeak/gcc-11.2.0-openmpi-4.1.4

# create a textfile (can be any names. e.g., ats_v1.5)
$ vi v1.5-dev_e8cad556
# inside the file, put the following environment information. Make sure the file starts with `#%Module`
```

- Modulefile template

```bash
#%Module1.0#####################################################################
##
## modules modulefile
##
# provide a helper to describe the module
proc ModulesHelp { } {
    global mpi_bin

    puts stderr "\tATS ats/tpls-0.98.6+amanzi-ats-master/chpc-notchpeak/gcc-11.2.0-openmpi-4.1.4/opt repository, opt build"
    puts stderr ""
}

module-whatis   "ATS ats/tpls-0.98.6+amanzi-ats-master/chpc-notchpeak/gcc-11.2.0-openmpi-4.1.4/opt opt build"
# #############################################################################

## load modules during compilation
module load gcc/11.2.0
module load openmpi/4.1.4
module load cmake/3.26.0

## set environment variables
setenv MPI_DIR /uufs/chpc.utah.edu/sys/spack/v019/linux-rocky8-x86_64/gcc-11.2.0/openmpi-4.1.4-fvjpa3zslc4266fazcxbv6ntjgojf6rx

setenv AMANZI_TPLS_DIR /uufs/chpc.utah.edu/common/home/u6046326/github/ats-amanzi-Jul2023/amanzi_tpls-install-master-Release

setenv AMANZI_TPLS_BUILD_DIR /uufs/chpc.utah.edu/common/home/u6046326/github/ats-amanzi-Jul2023/amanzi_tpls-build-master-Release

setenv AMANZI_TPLS_BUILD_TYPE opt
setenv AMANZI_TRILINOS_BUILD_TYPE opt
setenv AMANZI_BUILD_TYPE opt
## (IMPORTANT!) set PATH and PYTHONPATH so the system can find ats
prepend-path    PATH            /uufs/chpc.utah.edu/common/home/u6046326/github/ats-amanzi-Jul2023/amanzi_tpls-install-master-Release/bin
prepend-path    PATH            /uufs/chpc.utah.edu/common/home/u6046326/github/ats-amanzi-Jul2023/amanzi-install-master-Release/bin

prepend-path    PYTHONPATH      /uufs/chpc.utah.edu/common/home/u6046326/github/ats-amanzi-Jul2023/amanzi_tpls-install-master-Release/SEACAS/lib
prepend-path    PYTHONPATH      /uufs/chpc.utah.edu/common/home/u6046326/github/ats-amanzi-Jul2023/repos/amanzi/tools/amanzi_xml
prepend-path    PYTHONPATH      /uufs/chpc.utah.edu/common/home/u6046326/github/ats-amanzi-Jul2023/repos/amanzi/src/physics/ats/tools/utils
prepend-path    PYTHONPATH      /uufs/chpc.utah.edu/common/home/u6046326/github/ats-amanzi-Jul2023/repos/amanzi/src/physics/ats/tools/meshing/meshing_ats
```

- Save the file. Put the following in `.bash_profile` or similar so the custom module is added when login. **No slash after modulefiles!**

```bash
module use -a /uufs/chpc.utah.edu/common/home/u6046326/github/ats-amanzi-Jul2023/modulefiles
```
- Search for custom modules. The system will find all modules with name 'ats' in them.

```bash
module avail ats
# or
module spider ats

# load the one you want
module load ats/tpls-0.98.6+amanzi-ats-master/chpc-notchpeak/gcc-11.2.0-openmpi-4.1.4/v1.5-dev_e8cad556
```
- Alternatively, enter `ml ats`, then hit `TAB`. It will list all available modules starting with `ats`

```bash
# load module
ml ats/tpls-0.98.6+amanzi-ats-master/chpc-notchpeak/gcc-11.2.0-openmpi-4.1.4/v1.5-dev_e8cad556
```

