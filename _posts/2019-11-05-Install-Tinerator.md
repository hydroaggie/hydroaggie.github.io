---
layout: post
title: Install Tinerator
date: 2019-11-05 
description: Documentation on how to install Tinerator on Mac
tags: python package 
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

## Create new conda env 

The steps follows this [documentation](https://raw.githack.com/lanl/LaGriT/tinerator/html/install.html) with some changes.

- create conda env and install packages. A list of packages can be loaded using `requirements.txt`

```bash
# on NERSC
module load python

# make conda-forge channel the priority
conda config --add channels conda-forge
conda config --set channel_priority strict

conda create -n tinerator --file requirements.txt
source activate tinerator
```

- packages inside `requirements.txt`

```bash
# list of packages
python
ipykernel
richdem
matplotlib
numpy
scipy
rasterio
fiona
elevation
scikit-image
scikit-fmm
vtk
pyvista
ipywidgets
geopandas
#jupyterlab
```

##  Build LaGrit

[documentation](https://github.com/lanl/LaGriT/blob/master/documentation/INSTALL.md)

### Download source code from github

```bash
git clone https://github.com/lanl/LaGriT.git LaGriT
```

### build from binary file (optional)

```bash
wget "https://github.com/lanl/LaGriT/releases/download/v3.3.2/lagrit-linux-static"
chmod a+x lagrit-linux-static
```

### build `LaGrit` from source code

#### Install compiler

- IF ON Mac, change default gfortran compiler from clang to GNU

  ```bash
  alias gcc='gcc-9'
  alias g++='g++-9'
  ```


- IF on Ubuntu

```bash
sudo apt-get -y install gfortran libz-dev m4 bison
```

- on NERSC

```bash
module swap PrgEnv-intel PrgEnv-gnu
```



#### Building exodus

```bash
cd LaGriT
export LAGRIT_DIR=$PWD
make exodus
```

#### compile LaGriT

```bash
# make [option] [target], follow the prompt from previous step
make EXO_LIB_DIR=/Users/shua784/Dropbox/github/LaGriT/seacas/lib static 
```

#### testing 

```bash
make test
```

### Install PyLaGrit

```bash
cd $LAGRIT_DIR/PyLaGriT
python setup.py install
```

- add `lagrit_exe : "/software/LaGriT/src/lagrit"` path to `.pylagritrc` file

```bash
vi ~/.pylagritrc
```

## Install Tinerator

see [installation guide](https://lanl.github.io/tinerator/user_guide/installation.html)

```bash
git clone https://github.com/lanl/LaGriT.git tinerator && cd tinerator && git checkout tinerator
python setup.py install
```

## create Jupyter kernel

```bash
python -m ipykernel install --user --name tinerator --display-name tinerator
```

## Update Tinerator

Every time when developer made a new commit, do the following to update Tinerator.

```bash
source activate tin
(tin) $ cd $TINERATOR_SRC_DIR
(tin) $ git pull
(tin) $ python setup.py install
```



# Issues

1. *libpoppler.so.76: cannot open shared object file: No such file or directory*
  - This is likely caused by inconsistent package version between `default` and `conda-forge` channel. Try install packages using `conda-forge` channel. 
```bash
conda config --add channels conda-forge
conda config --set channel_priority strict
```

Your `~/.condarc` file contains the following:

```bash
channels:
  - conda-forge
  - defaults
channel_priority: strict
```

2. For docker use. *LaGriT executable is not defined.* Pylagrit could not find the executable defined in `.pylagritrc`

  - temporary hack: open `LaGriT/PyLaGriT/pylagrit/pylagrit.py`, replace the following:
```python
# if lagrit_exe is not None:
#        self.lagrit_exe = lagrit_exe 
self.lagrit_exe = '/Users/shua784/Dropbox/github/LaGriT/src/lagrit'
```

3. *Interactive widget did not show up*

   - install `nodejs`
   - enable extension

   ```bash
   jupyter labextension install @jupyter-widgets/jupyterlab-manager
   ```

   