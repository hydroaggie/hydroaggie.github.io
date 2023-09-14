---
layout: post
title: Run ATS with Singularity Container
date: 2022-11-09 
description: Documentation on how to run ATS using Singularity on HPC
tags: HPC code 
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

Singularity is specifically suited for HPC environment as it does not require root permission. The image can access most files directly on HPC system. For a detailed comparions see [here](https://blogs.oregonstate.edu/learningbydoing/2022/01/04/docker-and-singularity-containers-which-one-is-better/)

Here is the instructions on how to run ATS using the Singularity container. This example has only been tested on the CHPC clusters.

## Requirements

- Singularity (or Apptainer) installed on HPC
- Docker image is available on Dockerhub

## Pull image from Dockerhub

- Find ATS image: [metis/ats](https://hub.docker.com/r/metsi/ats/tags) and select the appropriate tag
- (Optional) Request an interactive node if the image is too big. Sometimes the HPC will kill the pulling process due to large memory consumption.
- Pull using singularity. This will create a file named "ats_master-latest.sif"

```bash
# load module
$ module load singularity

# pull image from dockerhub. If this failed on HPC, you may need to request an interactive node.
$ singularity pull ats_master.sif docker://metsi/ats:master-latest
```


## Inspect image

To run image using multiple cores, the mpich version inside the image has to be compatible to the one installed in the HPC system. In this case, mpich version is `3.3.2`.

```bash
# shell into the image
singularity shell ats_master-latest.sif

# inside the image find the compiler and mpich version. E.g., mpich-3.3.2
singularity> /usr/bin/which mpirun
singularity> mpirun --version
Singularity> /usr/bin/which ats
Singularity> /home/amanzi_user/install/bin/ats --version
```
How to find out the gcc version?

## Run image

Test the image on CHPC notchpeak clusters. In case the HPC does not have the exact version, check to see if the latest version is compatible (e.g., mpich/3.4.2)

### Execute image

The commands following the image will be executed. 

```bash
# use meshconvert
singularity exec ats_master-latest.sif meshconvert mesh.exo mesh_sim.exo

# use XML converter
singularity exec ats_master-latest.sif python /home/amanzi_user/amanzi/src/physics/ats/tools/input_converters/xml-1.3-1.4.py input.xml -o output.xml

# use python script
singularity exec $SIF_ATS_1d5 python /home/amanzi_user/amanzi/src/physics/ats/tools/utils/rh_to_vp.py CC_met_data_2014-2018.h5 -f vp.h5
```

### Parallel jobs

```bash
# request an interactive job
salloc -N 1 -n 16 -A notchpeak-shared-short -p notchpeak-shared-short -t 2:00:00

# load required modules
ml singularity gcc/8.5.0 mpich/3.4.2

# launch jobs
mpirun -np 2 singularity exec ats_master-latest.sif ats --xml_file=input.xml
```

## Caveats

- If using multiple nodes causes significant slowdown, this likely means that the image itself communicates over ethernet instead of infiniBand. This requires modification of the image to make it compatible on infiniband. See an example of modifying image [here](https://github.com/CHPC-UofU/Singularity-meep-mpi). See detailed comparison between Ethernet and Infiniband [here](https://stackoverflow.com/questions/46933493/infiniband-explained).
