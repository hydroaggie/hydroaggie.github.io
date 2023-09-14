---
layout: post
title: Install PFLOTRAN on NERSC (Depreciated)
date: 2019-08-15 
description: Documentation on how to install PFLOTRAN on NERSC Cori
tags: code 
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

See this [documentation](https://www.pflotran.org/documentation/user_guide/how_to/installation/linux.html#linux-install) for installation on Linux machine.

## Install Petsc

Download Petsc from Bitbucket, and save it into directory `petsc_v3.11.3`, and checkout the latest version 3.11.3.

```bash
git clone https://gitlab.com/petsc/petsc.git petsc_v3.11.3
cd petsc_v3.11.3
git checkout v3.11.3
```

Set current dir as `PETSC_DIR`, define `--PETSC_ARCH` to any name, and a subdir with the same name will be created within eg.`./petsc_v3.11.3/cori_haswell_intel_19_0_3`

```bash
export PETSC_DIR=$PWD
export PETSC_ARCH=cori_haswell_intel_19_0_3
```

### Choose compiler

- on **haswell** nodes, use `craype-haswell`,  it should be the default one on Cori by checking using `module list`,  otherwise,  do the following

  ```bash
  module load craype-haswell
  ```

- on **KNL** nodes, use `craype-mic-knl` by swapping the default with the new compiler.

  ```bash
  module swap craype-haswell craype-mic-knl
  ```


### Load other modules

```bash
module load PrgEnv-intel
module swap cray-mpich cray-mpich        # yes, swap it
module load cray-hdf5-parallel
module load cmake
module load python # 2.7 or 3.7?
module unload darshan
```

## configure petsc

- use system installed hdf5 (recommended)

```bash
./config/configure.py --with-cc=cc --with-cxx=CC --with-fc=ftn --CFLAGS='-fast -no-ipo' --CXXFLAGS='-fast -no-ipo' --FFLAGS='-fast -no-ipo' --with-shared-libraries=0 --with-debugging=0 --with-clanguage=c --PETSC_ARCH=$PETSC_ARCH --download-parmetis=1 --download-metis=1 --with-hdf5=1 --with-c2html=0 --download-mumps=1 --download-scalapack=1 --with-clib-autodetect=0 --with-fortranlib-autodetect=0 --with-cxxlib-autodetect=0 --LIBS=-lstdc++
```

- Use the following command to configure petsc (download hdf5).

```bash
./config/configure.py --with-cc=cc --with-cxx=CC --with-fc=ftn --CFLAGS='-fast -no-ipo' --CXXFLAGS='-fast -no-ipo' --FFLAGS='-fast -no-ipo' --with-shared-libraries=0 --with-debugging=0 --with-clanguage=c --PETSC_ARCH=$PETSC_ARCH --download-parmetis=1 --download-metis=1 --download-hdf5=1 --with-c2html=0 --with-clib-autodetect=0 --with-fortranlib-autodetect=0 --with-cxxlib-autodetect=0 --LIBS=-lstdc++
```

- Glenn's modified version for new Cori sys

```bash
./config/configure.py \
PETSC_ARCH=cori_intel_19_0_3 \
--with-language=c \
--with-cc=cc --with-cxx=CC --with-fc=ftn \
COPTFLAGS='-g -O3 -fp-model fast' CXXOPTFLAGS='-g -O3 -fp-model fast' FOPTFLAGS='-g -O3 -fp-model fast' \
--download-hypre=1 --download-metis=1 --download-parmetis=1 --download-mumps=1 --download-scalapack=1 \
--with-hdf5=1 \
--with-debugging=0 \
--with-shared-libraries=0
```

- example of currently loaded modules on `haswell ` node

```bash
Currently Loaded Modulefiles:
  1) modules/3.2.11.4                                 14) job/2.2.4-7.0.1.1_3.29__g36b56f4.ari
  2) nsg/1.2.0                                        15) dvs/2.12_2.2.151-7.0.1.1_5.29__g7eb5e703
  3) altd/2.0                                         16) alps/6.6.57-7.0.1.1_5.1__g1b735148.ari
  4) intel/19.0.3.199                                 17) rca/2.2.20-7.0.1.1_4.33__g8e3fb5b.ari
  5) craype-network-aries                             18) atp/2.1.3
  6) craype/2.6.2                                     19) PrgEnv-intel/6.0.5
  7) cray-libsci/19.06.1                              20) craype-haswell
  8) udreg/2.3.2-7.0.1.1_3.24__g8175d3d.ari           21) cray-mpich/7.7.10
  9) ugni/6.0.14.0-7.0.1.1_7.27__ge78e5b0.ari         22) craype-hugepages2M
 10) pmi/5.0.14                                       23) cray-hdf5-parallel/1.10.5.2
 11) dmapp/7.1.1-7.0.1.1_4.36__g38cf134.ari           24) cmake/3.14.4
 12) gni-headers/5.0.12.0-7.0.1.1_6.24__g3b1768f.ari  25) python/2.7-anaconda-2019.07
 13) xpmem/2.2.20-7.0.1.1_4.5__g0475745.ari
```



- when seeing the following means configuration is sucessful.

```bash
xxx=========================================================================xxx
 Configure stage complete. Now build PETSc libraries with (gnumake build):
   make PETSC_DIR=/global/project/projectdirs/m1800/pin/petsc_v3.11.1 PETSC_ARCH=cori_haswell_intel_19_0_3 all
xxx=========================================================================xxx
```

## compile Petsc

```bash
cd $PETSC_DIR
make all
# or
# make PETSC_DIR=/global/project/projectdirs/m1800/pin/petsc_v3.11.1 PETSC_ARCH=cori_haswell_intel_19_0_3 all
```

## download and compile pflotran

```bash
git clone https://bitbucket.org/pflotran/pflotran pflotran
cd pflotran/src/pflotran
make -j4 pflotran # use parallel thread to compile? You can also try -j8, -j16... if more cores are available
```

after compilation is complete, a new file named `pflotran*` executable is generated at current directory. You can also move this executable to another directory, e.g. ` pflotran/src/pflotran/bin/pflotran*`, then you can export this directory to `PATH`.

### fast compilation	

Caution! This works if only a small change is made because the compilation will not rebuild all the dependencies.

```bash
make pflotran fast=1
```

## regression test

Do a regression test to see if pflotran if working.

```bash
export PFLOTRAN_EXE=/global/project/projectdirs/m1800/pin/pflotran/src/pflotran/pflotran
cd /global/project/projectdirs/m1800/pin/pflotran/regression_tests/default/543
```

request an interactive node to run the regression test.

```bash
salloc -N 1 -C haswell -q interactive -t 01:00:00 -L SCRATCH 
srun -n 1 $PFLOTRAN_EXE -pflotranin 543_flow.in # need to use one core to run this example
```

Within seconds, the test model should finish, and the installation processes are done!

## Realization dependent

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
export PETSC_ARCH=cori_haswell_intel_19_0_3
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

### automatically update

use the following bash script to automatically update PFLOTRAN to the latest on master branch.

```bash
#! /bin/bash
export PETSC_DIR=/global/project/projectdirs/pflotran/petsc-v3.13
export PETSC_ARCH=cori_intel_O

module load craype-haswell
module load PrgEnv-intel
module swap cray-mpich cray-mpich        # yes, swap it
module load cray-hdf5-parallel
module load cmake
module load python # 2.7 or 3.7?
module unload darshan

echo "<<<<<<<<<<<<<<<<<<update pflotran repo<<<<<<<<<<<<<<<<<<"
git pull

echo "<<<<<<<<<<<<<<<<<<compile pflotran<<<<<<<<<<<<<<<<<<<<<<<"
cd ./src/pflotran
make -j8 pflotran
```

