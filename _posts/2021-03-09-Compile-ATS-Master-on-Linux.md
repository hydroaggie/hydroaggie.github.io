---
layout: post
title: Install ATS on Linux
date: 2021-03-09
description: Documentation on how to install ATS on Linux system
tags: HPC code
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---


The following steps roughly follow the official guide [here](https://github.com/amanzi/amanzi/blob/master/INSTALL_ATS.md).

## Install packages (optional if on HPC)

- Install `cmake`
- make sure `open-mpi`, `lapack` has been installed

```bash
# openmpi
sudo apt-get install libopenmpi-dev openmpi-bin 
# lappack
sudo apt-get install libblas3gf libblas-doc libblas-dev liblapack3gf liblapack-doc liblapack-dev
```

- Get `OPENMPI_DIR`. The root directory can be found by the following command. **Do not include `bin/mpicc`**

```bash
# get the root directory of mpi
which mpicc 
# or
which mpicxx
which mpiftn
```

## Configure environment

- Create `set_env.sh` file with the following content.

```bash
#!/usr/bin/env bash

# EDIT THESE!
export ATS_BASE=/PATH/TO/ATS_ROOT # root dir for the installation
export ATS_BUILD_TYPE=Release # other options: Debug, RelWithDebInfo (release with debug info)
export ATS_VERSION=master # the branch for both amanzi and ats
export OPENMPI_DIR=/PATH/TO/MPI_DIR # this is important to include only the directory instead of /MPI_DIR/bin if mpirun exists inside /MPI_DIR/bin
# END EDIT THESE!

export AMANZI_TPLS_BUILD_DIR=${ATS_BASE}/amanzi_tpls-build-${ATS_VERSION}-${ATS_BUILD_TYPE}
export AMANZI_TPLS_DIR=${ATS_BASE}/amanzi_tpls-install-${ATS_VERSION}-${ATS_BUILD_TYPE}

export AMANZI_SRC_DIR=${ATS_BASE}/repos/amanzi
export AMANZI_BUILD_DIR=${ATS_BASE}/amanzi-build-${ATS_VERSION}-${ATS_BUILD_TYPE}
export AMANZI_DIR=${ATS_BASE}/amanzi-install-${ATS_VERSION}-${ATS_BUILD_TYPE}

export ATS_SRC_DIR=${AMANZI_SRC_DIR}/src/physics/ats
export ATS_DIR=${AMANZI_DIR}

# export path. This may not be necessary if using modulefile.
export PATH=${ATS_DIR}/bin:${PATH}
export PATH=${AMANZI_TPLS_DIR}/bin:${PATH}
export PYTHONPATH=${ATS_SRC_DIR}/tools/utils:${PYTHONPATH}
export PYTHONPATH=${AMANZI_TPLS_DIR}/SEACAS/lib:${PYTHONPATH}
```

- Source the environment

```bash
source set_env.sh
```
- (optional) to access `ats` and other binary file, put the following lines in `.bash_profile`

```bash
export PATH=${ATS_DIR}/bin:${PATH}
export PATH=${AMANZI_TPLS_DIR}/bin:${PATH}
```
## Download amanzi-ats

```bash
# clone amanzi, ats and other repos
git clone -b master --recursive http://github.com/amanzi/amanzi $AMANZI_SRC_DIR

# (optional) when the previous clone does not download ats automatically
git clone -b master http://github.com/amanzi/ats $ATS_SRC_DIR
```

## Edit bootstrap

```bash
vi ${AMANZI_SRC_DIR}/build_ATS_generic.sh

# change the following bootstrap flags and options. 
# Comments need to be removed after direct copy&paste!
${AMANZI_SRC_DIR}/bootstrap.sh \
   ${dbg_option} \
   --with-mpi=${OPENMPI_DIR} \
   --enable-shared \
   --disable-clm \ # disable this!
   --disable-structured  --enable-unstructured \
   --disable-stk_mesh --enable-mstk_mesh \
   --enable-hypre \
   --disable-silo \ # disable this!
   --disable-petsc \
   --disable-amanzi_physics \
   --enable-ats_physics \
   --disable-ats_dev \
   --enable-geochemistry \ # enable this!
   --amanzi-install-prefix=${AMANZI_DIR} \
   --amanzi-build-dir=${AMANZI_BUILD_DIR} \
   --tpl-install-prefix=${AMANZI_TPLS_DIR} \
   --tpl-build-dir=${AMANZI_TPLS_BUILD_DIR} \
   --tpl-download-dir=${ATS_BASE}/amanzi-tpls/Downloads \
   --tools-download-dir=${ATS_BASE}/amanzi-tpls/Downloads \
   --tools-build-dir=${ATS_BASE}/build \
   --tools-install-prefix=${ATS_BASE}/install \
   --with-cmake=`which cmake` \
   --with-ctest=`which ctest` \
   --branch_ats=${ATS_VERSION} \
   --parallel=8
```

- Use existing TPLs install. This may speed up the installation process.

```bash   
# If TPLs have already been built, and you don't want to go
# through that long process again, replace
#   --tpl-install-prefix=${AMANZI_TPLS_DIR} \
#   --tpl-build-dir=${AMANZI_TPLS_BUILD_DIR} \
#   --tpl-download-dir=${ATS_BASE}/amanzi-tpls/Downloads \
# with
#   --tpl-config-file=${AMANZI_TPLS_DIR}/share/cmake/amanzi-tpl-config.cmake \

${AMANZI_SRC_DIR}/bootstrap.sh \
   ${dbg_option} \
   --with-mpi=${OPENMPI_DIR} \
   --enable-shared \
   --disable-clm \ # disable this!
   --disable-structured  --enable-unstructured \
   --disable-stk_mesh --enable-mstk_mesh \
   --enable-hypre \
   --disable-silo \ # disable this!
   --disable-petsc \
   --disable-amanzi_physics \
   --enable-ats_physics \
   --disable-ats_dev \
   --enable-geochemistry \ # enable this!
   --amanzi-install-prefix=${AMANZI_DIR} \
   --amanzi-build-dir=${AMANZI_BUILD_DIR} \
   --tpl-config-file=${AMANZI_TPLS_DIR}/share/cmake/amanzi-tpl-config.cmake \
   --tools-download-dir=${ATS_BASE}/amanzi-tpls/Downloads \
   --tools-build-dir=${ATS_BASE}/build \
   --tools-install-prefix=${ATS_BASE}/install \
   --with-cmake=`which cmake` \
   --with-ctest=`which ctest` \
   --branch_ats=${ATS_VERSION} \
   --parallel=8

```

## Configure and install Amanzi-tpls, Amanzi, and ATS

- run the bootstrap

```bash
sh ${AMANZI_SRC_DIR}/build_ATS_generic.sh
```

After ~ 1hr, the installation would finish, with `ats` executable in `ats/amanzi-install-master-Release/bin/ats*`

- check ats version

```bash
$ which ats
$ ats --version # this will print out the version with the last 8 digits as hash tag from git commits
```

## Testing

- download testing problem. The regression tests are up to date, and is preferred for the testing.

```bash
cd ${ATS_BASE}/repos/amanzi/src/physics/ats/testing/ats-regression-tests
```

-  run test. Note that some of the tests can only be ran with a single core (CPU).

```bash
export PATH=${ATS_DIR}/bin:${PATH}

cd 01_richards_steadystate
mkdir test
cd test

# serial
ats --xml_file=../mfd.xml &> out.log

# parallel
mpirun -n 4 ats --xml_file=../mfd.xml &> out.log
```

- The test is successful if ats is running and printing outputs on the screen. You will get a summary of runtime at the end.