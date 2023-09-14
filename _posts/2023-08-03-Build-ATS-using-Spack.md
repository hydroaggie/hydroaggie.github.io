---
layout: post
title: Install ATS using Spack
date: 2023-08-03 
description: Documentation on how to install ATS using Spack on CHPC
tags: HPC code 
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

The post shows the steps to build ATS using Spack on CHPC. It roughly follows the instructions [here](https://github.com/amanzi/amanzi/blob/master/config/spack/README.md) and [here](https://github.com/CHPC-UofU/spack-config/blob/master/readme-user.md).
## Setting up User

- Create spack directories

```bash
mkdir -p $HOME/spack/local

mkdir -p $HOME/.spack

```

- Create `~/.spack/config.yaml` 

```bash
cp /uufs/chpc.utah.edu/sys/installdir/spack/0.20.1/etc/spack/config.yaml ~/.spack

# inside config.yaml, modify the root and template paths to the following:
root: $HOME/spack/local/builds

template_dirs:
  - $HOME/spack/local/templates

```

- Create `~/.spack/modules.yaml`

```bash
#inside modules.yaml, put the following:
modules:
  default:
    roots:
      lmod: $HOME/spack/local/modules
```

## Build Spack

```bash
# load spack
# $ source /uufs/chpc.utah.edu/sys/installdir/spack/0.20.1/share/spack/setup-env.sh

$ module load spack/0.20.1  

# setup compilers
# $ spack compiler find

# clone Amanzi
#$ git clone --recursive https://github.com/amanzi/amanzi
$ spack repo add PATH_TO_AMANZI/config/spack

# install Amanzi
$ spack install amanzi%gcc@11.2.0~tests physics=ats ^openmpi@4.1.4%gcc@11.2.0 fabrics=ucx +cxx+internal-hwloc schedulers=slurm +legacylaunchers ^ucx +mlx5_dv+verbs+ud+dc+rc+cma ^trilinos@13.0.0 target=nehalem  
```

Notes: 
-  `Error: cannot load package 'crunchtope' from the 'amanzi' repository: version() got an unexpected keyword argument 'default'` 
	- To fix this, use `spack edit crunchtope`, remove `default=True` from `version` keywords.


## Load modules
Load the modules for the built programs.

```bash
# add the module file path
module use -a /uufs/chpc.utah.edu/common/home/u6046326/spack/local/modules

# load the compiler environment first
ml gcc/11.2.0  openmpi/4.1.4
# Then load the program
ml linux-rocky8-x86_64/MPI/linux-rocky8-nehalem/gcc/11.2.0/openmpi/4.1.4/amanzi

```
  
A sample of the modulefile (aka. `master.lua`) is shown below:

```bash
-- -*- lua -*-
-- Module file created by spack (https://github.com/spack/spack) on 2023-08-10 09:44:38.438489
--
-- amanzi@master%gcc@11.2.0~geochemistry+hypre~ipo+shared~silo~tests build_system=cmake build_type=Release data_model=epetra generator=make mesh_framework=mstk mesh_type=unstructured physics=ats arch=linux-rocky8-nehalem/kfoqbao
--

whatis([[Name : amanzi]])
whatis([[Version : master]])
whatis([[Target : nehalem]])
whatis([[Short description : Amanzi, the Multi-Process HPC Simulator is a highly modular and extensible computational engine for simulations of flow and reactive transport. It is capable of simulating transient saturated and variably saturated (Richards) flows, transport with non-grid-aligned dispersion and a variety of reactions. In the future it will include non-isothermal, multi-phase multi-component, geo-mechanical, and surface water models. To achive this ambitious goal we are building Amanzi as a grass-roots collaboration of an emerging broader community of geoscienists, computational and computer scientists, and applied mathematicians. This broader community is leveraging its extensive experience, existing capabilities, and untapped advances from their areas of expertise to develop Amanzi.]])
```
