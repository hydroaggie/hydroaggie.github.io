---
layout: post
title: Install ATS on NERSC 
date: 2020-08-18 
description: Documentation on how to install ATS v1.0 on NERSC
tags: code 
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

The instruction follows this [ATS Installation Guide](https://github.com/amanzi/amanzi/blob/master/INSTALL_ATS.md) with a few changes for compilation on NERSC Cori environment. To get some background on compiling codes on NERSC, see this [tutorial](https://www.nersc.gov/users/computational-systems/cori/programming/compiling-codes-on-cori/) on NERSC website.

## Pre-requirements

### set architechture

The default is `haswell`. If using `knl` do the following:

```bash
module swap craype-haswell craype-mic-knl
```

### Set programming env

- GNU

The default environment on NERSC is `PrgEnv-intel`, and you need to switch to `PrgEnv-gnu`, which is applicable for most open-source codes.

```bash
module swap PrgEnv-intel PrgEnv-gnu
module load cmake
module load python/3.7-anaconda-2019.10
```

This is what it looks like using `module list`

```bash
Currently Loaded Modulefiles:
  1) modules/3.2.11.4
  2) altd/2.0
  3) darshan/3.1.7
  4) gcc/8.3.0
  5) craype-haswell # or craype-mic-knl
  6) craype-hugepages2M
  7) craype-network-aries
  8) craype/2.6.2
  9) cray-mpich/7.7.10
 10) cray-libsci/19.06.1
 11) udreg/2.3.2-7.0.1.1_3.31__g8175d3d.ari
 12) ugni/6.0.14.0-7.0.1.1_7.33__ge78e5b0.ari
 13) pmi/5.0.14
 14) dmapp/7.1.1-7.0.1.1_4.48__g38cf134.ari
 15) gni-headers/5.0.12.0-7.0.1.1_6.28__g3b1768f.ari
 16) xpmem/2.2.20-7.0.1.1_4.10__g0475745.ari
 17) job/2.2.4-7.0.1.1_3.36__g36b56f4.ari
 18) dvs/2.12_2.2.156-7.0.1.1_8.9__g5aab709e
 19) alps/6.6.58-7.0.1.1_6.4__g437d88db.ari
 20) rca/2.2.20-7.0.1.1_4.46__g8e3fb5b.ari
 21) atp/2.1.3
 22) PrgEnv-gnu/6.0.5
 23) cmake/3.14.4
 24) python/3.7-anaconda-2019.10 # new
```

- Intel

```bash
module load cmake/3.18.2
module swap  craype-hugepages2M craype-hugepages8M

# Module list

```



### Set path

- If `set_env.sh` is available, do

```bash
source set_env.sh
```

Put the following in the file. The `OPENMPI_DIR` is the same as `MPICH_DIR` from previous step. 

```bash
#!/bin/sh
# set static build, this may change in the future
export CRAYPE_LINK_TYPE=dynmaic # as of 10/22/2020

# environment variables for compiling ats
export ATS_BASE=/global/project/projectdirs/m1800/pin/ats-master
export ATS_BUILD_TYPE=Release # OR Debug
export ATS_VERSION=master
export OPENMPI_DIR=$MPICH_DIR # automatically get from CRAY_MPICH_DIR

export AMANZI_TPLS_BUILD_DIR=${ATS_BASE}/amanzi_tpls-build-${ATS_VERSION}-${ATS_BUILD_TYPE}
export AMANZI_TPLS_DIR=${ATS_BASE}/amanzi_tpls-install-${ATS_VERSION}-${ATS_BUILD_TYPE}

export AMANZI_SRC_DIR=${ATS_BASE}/repos/amanzi
export AMANZI_BUILD_DIR=${ATS_BASE}/amanzi-build-${ATS_VERSION}-${ATS_BUILD_TYPE}
export AMANZI_DIR=${ATS_BASE}/amanzi-install-${ATS_VERSION}-${ATS_BUILD_TYPE}

export ATS_SRC_DIR=${AMANZI_SRC_DIR}/src/physics/ats
export ATS_DIR=${AMANZI_DIR}

export PATH=${ATS_DIR}/bin:${PATH}
export PATH=${AMANZI_TPLS_DIR}/bin:${PATH}
export PYTHONPATH=${ATS_SRC_DIR}/tools/utils:${PYTHONPATH}
export PYTHONPATH=${AMANZI_TPLS_DIR}/SEACAS/lib:${PYTHONPATH}
```

## Download and compile Amanzi

### make base dir

```bash
mkdir -p ${ATS_BASE}
cd ${ATS_BASE}
```

### clone Amanzi from Github

```bash
git clone -b master http://github.com/amanzi/amanzi $AMANZI_SRC_DIR

# optional
git clone -b master http://github.com/amanzi/ats $ATS_SRC_DIR
```

### configure Amanzi TPLs, Amanzi, and ATS

- First, you need to modify the `$AMANZI_SRC_DIR/bootstrap.sh` script.

```bash
# change the following. Is this enough?
known_c_compilers="cc"
known_cxx_compilers="CC"
known_fortran_compilers="ftn"
```

- Then, edit the `$AMANZI_SRC_DIR/build_ATS_generic.sh` or run the following

```bash
sh build_ATS_generic.sh
```



```bash
vi ${AMANZI_SRC_DIR}/build_ATS_generic.sh

# change the following flags and options
${AMANZI_SRC_DIR}/bootstrap.sh \
   ${dbg_option} \
   --with-mpi=${OPENMPI_DIR} \
   --enable-shared \
   --disable-clm \ #changed
   --disable-structured  --enable-unstructured \
   --disable-stk_mesh --enable-mstk_mesh \
   --enable-hypre \
   --disable-silo \  # changed
   --disable-petsc \
   --disable-amanzi_physics \
   --enable-ats_physics \
   --disable-ats_dev \
   --disable-geochemistry \
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
   --parallel=8 \
   --arch=NERSC  # added!
```



### run bootstrap

```bash
sh ${AMANZI_SRC_DIR}/build_ATS_generic.sh
```

It will take 1~2 hr to complete.

## Run testing problem

### Download the example repo

```bash
cd $ATS_BASE
mkdir testing
cd testing
git clone -b master http://github.com/amanzi/ats-demos
```

### Run a test

- then run the test problem

```bash
cd ats-demos/01_richards_steadystate
ats --xml_file=./richards_steadystate.xml &> out.log

# on NERSC
salloc -N 1 -C haswell -q interactive -t 00:30:00 -L SCRATCH
srun -n 1 ats --xml_file=./richards_steadystate.xml 
```

It should take less than a second to finish!



# Running ATS on NERSC

- (optional) if using ATS from IDEAS/Exasheds repo

```bash
export IDEAS_HOME=/project/projectdirs/m2398/ideas
source ${IDEAS_HOME}/tools/init/ideas.bashrc

# do one of the following to load ATS exe.
module load ATS/dev-transpiration/basic/Release/PrgEnv-gnu-6.0.5

# or 
# module purge
module use -a /global/project/projectdirs/m3421/ats-new/modulefiles
#module load ats/master/cori-haswell/intel-6.0.5-mpich-7.7.10/opt
module load ats/ecoon-land_cover/cori-haswell/intel-6.0.5-mpich-7.7.10/opt
```

- first request some interactive node

```bash
salloc -N 1 -C haswell -q interactive -t 00:30:00 -L SCRATCH
```

- make sure `meshconvert` and `ats` is within your PATH

```bash
~ $ which meshconvert
/global/project/projectdirs/m1800/pin/ats/amanzi-tpls-install-Debug/bin/meshconvert
~ $ which ats
/global/project/projectdirs/m1800/pin/ats/ats-install-Debug/bin/ats
```

- partion mesh. 

```bash
srun -n 128 meshconvert --partition-method=2 ../CoalCreek_mesh-100m-frac1pct-landcover.exo ./CoalCreek_final_mesh.par
```

- launch job

```bash
srun -n 32 ats --xml_file=./spinup-soil.xml 
```

## Update ATS

````bash
$ cd $ATS_SRC_DIR # this should be under /amanzi/src/physics/ats
$ git pull
$ cd $AMANZI_SRC_DIR
$ git pull
$ cd $AMANZI_BUILD_DIR
$ make -j8 install
````

# Compile ATS on Lawrencium (LBNL)

- set environment

```bash
# get modules and library
export MODULEPATH=$MODULEPATH:/global/home/groups-sw/pc_ideas/modules 
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/global/home/groups-sw/pc_ideas/sources/lapack-3.9.0-gcc-9.2/build-shared/lib
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/global/home/groups-sw/pc_ideas/sources/lapack-3.9.0-gcc-9.2/build-static/lib
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/global/home/groups-sw/pc_ideas/software/gcc-9.2.0-modules/lapack/3.5.0/lib64
export PATH=$PATH:/global/home/groups-sw/pc_ideas/software/gcc-9.2.0-modules/lapack/3.5.0/lib
# setup ats install env
export ATS_BASE=/global/home/users/pshuai/ats_master
export ATS_BUILD_TYPE=Release # OR Debug
export ATS_VERSION=master
export OPENMPI_DIR=/global/software/sl-7.x86_64/modules/gcc/9.2.0/openmpi/4.0.1-gcc # do not include ./bin

# load modules
module load gcc/9.2.0
module load openmpi/4.0.1-gcc
module load gcc-9.2.0/lapack/3.9.0
module load cmake/3.15.0
```

- the rest of the steps are the same as installation on Cori. No need to change `bootstrap.sh`

