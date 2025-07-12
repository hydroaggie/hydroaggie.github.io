---
layout: post
title: Install Watershed Workflow
date: 2020-06-21 
description: Documentation on how to install Watershed Workflow
tags: python package
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

*Last updated: 2025-03-26*

For up to date guide, please refer to Zhi's blog post [here](https://github.com/ZhiLiHydro/ZhiLiHydro.github.io/blob/master/_posts/2022-04-20-blog-post-2.md).

This post follows Ethan's [documentation](https://ecoon.github.io/watershed-workflow/build/html/install.html) with a few edits. It has been tested on Mac (Intel chip, amd64) and Linux (i.e. NERSC).

## Docker installation (Recommended)

Watershed-workflow is now provided in a docker container.

- Install Docker Desktop app
- (optional) Download docker image: 

```bash
docker pull metsi/watershed-workflow
# or
docker pull ecoon/watershed_workflow-ats:latest
# or 
docker pull ecoon/watershed_workflow:latest
```

- Run docker

```bash
# cd into watershed-workflow repo
cd ~/github/watershed-workflow
# use the following for full capability of WW
python bin/run_ww_lab.py -p=9999 --pull --ats --data-library=/path/to/data_library /path/to/working/directory
# for example:
python bin/run_ww_lab.py -p=9999 --pull --ats --data-library=/Users/shuai/github/watershed-workflow/data_library /Users/shuai/github/DRB
# or 
docker run -it --rm -p 8899:8888 --pull always -e JUPYTER_ENABLE_LAB=yes -v /Users/shuai/github/watershed-workflow/data_library:/home/jovyan/data:delegated -v /Users/shuai/github:/home/jovyan/workdir:delegated ecoon/watershed_workflow-ats:master
```

- Follow the terminal prompt and open the browser using url begin with `http://127.0.0.1:9999/lab?token=xxxx`. **note: change port number from 8888 (default) to the one entered in the command line (e.g., 9999)!**

- Open one of the meshing notebook, change kernel to `Python3 (watershed_workflow)`

### Issues:

1. *Jupyter lab won't open in the browser.*

	The default port number is `8888` may be taken. Docker won't give any warning, but the user need to mannually change the port from `8888` to any other numbers (e.g., `8899`). Use the `docker run` command instead of `python bin/run_ww_lab.py`. Then in the browser, open `http://127.0.0.1:8899/lab?token=xxxx`



## Install Python env and packages

- for general use

```bash
$ conda create -n watershed_workflow -c conda-forge -c defaults python=3 ipython ipykernel jupyterlab nb_conda_kernels numpy matplotlib scipy meshpy fiona rasterio shapely cartopy pyepsg descartes pyproj requests sortedcontainers attrs pytest pandas geopandas netcdf4 h5py tqdm libarchive # added a few more
$ conda activate watershed_workflow
```

Check python packages.

```bash
$ python -c 'import numpy, matplotlib, scipy, rasterio, fiona, shapely, cartopy, meshpy.triangle; print("SUCCESS")'
```

## install Exodus II (on Mac)

### install compiler (if applicable)

- Install `cmake`. 

  - Download binary for Mac from [here](https://cmake.org/download/). Follow the prompt for installation. 
  - Add to path. 

  ```
  $ export PATH="/Applications/CMake.app/Contents/bin:$PATH"
  ```

- Install `gfortran`
  - Download [Homebrew](https://brew.sh/)
  - `brew install gcc`

### Configure Exodus

- Clone `seacas`

```
$ git clone https://github.com/gsjaardema/seacas.git
```

- Clone `watershed-workflow`

```
$ git clone https://github.com/ecoon/watershed-workflow.git
```

- Edit `configure-seacas.sh`

```bash
$ cd watershed-workflow/workflow_tpls/
$ vi configure-seacas.sh

# edit the following lines
CC=`which clang`  # use `which gcc` for Linux
CXX=`which clang++`  # use `which g++` for Linux
FC=`which gfortran`
# add/change the following path
CONDA_PREFIX=/opt/anaconda3/envs/watershed_workflow
SEACAS_SRC_DIR=/path/to/seacas/repo
```

- Configure

```bash
$ sh configure-seacas.sh
```

- Check if successful

```bash
$ export PYTHONPATH=${SEACAS_SRC_DIR}/install/lib
$ python -c 'import exodus; print("SUCCESS")'
```

If the installation is not successful (i.e., nothing inside the `seacas/install`), following the steps below to re-install.

### change python version (optional) 

- Manually write python version in `CMakeCache.txt`

```bash
$ cd seacas/build
$ vi CMakeCache.txt
```

- search for `python` and make the following changes

```bash
//Path to a program.
PYTHON_EXECUTABLE:FILEPATH=/opt/anaconda3/bin/python

//Default version of Python to find (must be 2.6 or greater
PythonInterp_FIND_VERSION:STRING=3.7 
```

- install again

```bash
# assume inside build/
$ make install
```

### Export paths

```bash
$ cd /path/to/watershed-workflow/repository
# add this and its subfolder `workflow_tpls` to `.bash_profile` to make it permanently
$ export PYTHONPATH=`pwd`:`pwd`/workflow_tpls:`pwd`/workflow:${PYTHONPATH}
# add the following for exodus to work
$ export PYTHONPATH="${PYTHONPATH}:/path/to/seacas/install/lib" 
```

## Install Watershed Workflow on CHPC
Request an interactive node. otherwise it's going to warn you about the computational resources.

- Login to CHPC and load the following modules. 
```bash
module load gcc/11.2.0 openmpi/4.1.4 cmake/3.26.0
```

```bash
$ salloc -N 1 -n 1 -t 1:00:00 -A notchpeak
```


### Install conda environment and packages

Note that `'shapely<2'` is only compatible with certain python versions like `python=3.10`. For an updated package list, see [here](https://github.com/environmental-modeling-workflows/watershed-workflow/blob/master/environments/create_envs.py). **Must install all packages in one go to avoid potential conflicts**

```bash
mamba create -n watershed_workflow

conda activate watershed_workflow

mamba install -c conda-forge 'shapely<2' python=3.10 ipykernel ipython jupyterlab matplotlib scipy pandas meshpy fiona rasterio cartopy descartes pyproj requests sortedcontainers attrs libarchive pytest  geopandas netcdf4 h5py tqdm cftime nbmake ipympl # must install all together to avoid conflicts
```

- Check if successful

```bash
$ python -c 'import numpy, matplotlib, scipy, rasterio, fiona, shapely, cartopy, meshpy.triangle; print("SUCCESS")'
```

### Install Exodus as part of SEACAS

See SEACAS [repo](https://github.com/sandialabs/seacas) and installation guide.

```bash
# download seacas
git clone https://github.com/sandialabs/seacas.git

# configure
cd seacas
export ACCESS=`pwd`

#install TPLs. This will take 30~60 minutes
CGNS=NO MATIO=NO FMT=NO CATCH2=NO ./install-tpl.sh

# build exodus
mkdir build
cd build
../cmake-exodus
make && make install
```

Note, only NetCDF is required for Exodus.

- Check if successful

```bash
export PYTHONPATH=${ACCESS}/lib; python -c 'import exodus; print("SUCCESS")'
```

### Install watershed-workflow

- Download the repo and install as a package

```bash
cd ~
git clone https://github.com/environmental-modeling-workflows/watershed-workflow.git
git checkout v1.5
cd watershed-workflow
python -m pip install -e .
```

- Export the Python path

Open `~/.custom.sh` and add the following line. 
```bash
export PYTHONPATH="/uufs/chpc.utah.edu/common/home/u6046326/shuai-group1/watershed-workflow/bin:/uufs/chpc.utah.edu/common/home/u6046326/shuai-group1/seacas/lib:${PYTHONPATH}"
```

- Source `~/.custom.sh` to make the changes effective.

```bash
source ~/.custom.sh
```

- Check if successful

```bash
cd watershed-workflow
pytest watershed_workflow/test
```

### Install aditional packages

This will install additional packages for writing ATS model xml files and visualization.

```bash
git clone https://github.com/amanzi/amanzi
cd amanzi/tools/amanzi_xml
python -m pip install -e .
```

```bash
git clone https://github.com/ecoon/ats_input_spec
cd ats_input_spec
python -m pip install -e .
```

```bash
git clone https://github.com/pinshuai/modvis 
cd modvis
python -m pip install -e .
```

## Common issues

1. if `workflow` module could not be imported, try adding the following to the notebook.

```python
import os,sys
sys.path.append(os.path.abspath("/path/to/watershed-workflow"))
```

2. `tinytree` could not be imported

```bash
(watershed_workflow) $ pip install tinytree
```

3. `libexodus.so` is not found

```bash
export CRAYPE_LINK_TYPE=dynamic
```

Then delete seacas repo and re-clone from GitHub. Do the configure again.
