---
layout: post
title: Create A Jupyter Kernel
date: 2019-07-26 
description: Documentation on how to create a Jupyter Kernel
tags: code 
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

This will show how to create customized conda environment on Mac/Linux. The procedures should also apply to Windows systems.

## Install conda

Refer to the [user guide](https://conda.io/projects/conda/en/latest/user-guide/install/index.html)

### Install Mamba (recommended)

Mamba is a fast, drop-in replacement for conda. It can greatly speed up the environment creation process. Refer to the [documentation](https://mamba.readthedocs.io/en/latest/installation/mamba-installation.html) for installation instructions. After installing, you can use `mamba` in place of `conda` for most commands.

## Create new conda env

### Python

This example shows how to create new environment called `my_env` while specify the python version you want. Several packages are required including: `python`, `jupyterlab`, `ipykernel`. The other packages are optional and are appended to the end. 

```bash

# general command. The capital words need to be replaced by the user.
$ conda create --name ENV_NAME -c conda-forge PACKAGES

# for example, specify python version to 3.6.5
$ conda create --name my_env -c conda-forge python=3.6.5 jupyterlab=3 

# for jupyter env (a typical base environment for running python)
$ conda create --name jupyter -c conda-forge python jupyterlab ipykernel ipywidgets jupyterlab_widgets jupyterlab-git numpy pandas scipy scikit-learn matplotlib seaborn tqdm geopandas h5py

# for geo/vis/plot
$ conda create --name geo -c conda-forge python ipykernel ipywidgets numpy pandas matplotlib seaborn scipy scikit-learn tqdm shapely rasterio PyShp geopandas h5py netcdf4 xarray rioxarray utm cartopy panel nco jupyter_contrib_nbextensions
```

> ##### TIP
>
> It is recommended to include all the essential packages during environment creation to avoid issues such as package incompatibility later.
{: .block-tip }


## Create kernel spec file for Jupyter (must do this inside the activated env!)

In order for Jupyter to find your kernel, run following command and optionally choose the display kernel name

```bash
$ conda activate my_env

(my_env) $ python -m ipykernel install --user --name my_env --display-name My-Jupyter-Env
```

## Install additional packages

Before you install any package, activate the new conda env just created.

```bash
$ conda activate my_env
```

Then install other packages using `conda`

```bash
(my_env) $ conda install ipykernel numpy
```

Or using `pip`

```bash
(my_env) $ pip install matplotlib
```



## Launch Jupyter

Lauch Jupyter lab and you should see you new kernel `My-Jupyter-Env` from the kernel dropdown.

```bash
(my_env) $ jupyter lab
# or launch the classic notebook
(my_env) $ jupyter notebook 
```

## Remove a jupyter kernel

```bash
#check available kernels
jupyter kernelspec list
# remove selected kernel
jupyter kernelspec uninstall unwanted-kernel
```

###  Install Jupyterlab extentions

```bash
#check installed server extension
jupyter serverextension list
# install selected extention
conda install -c conda-forge jupyterlab-git
```

## Export Conda env

```bash
# only the main packages are exported
conda env export --from-history > environment.yml 

conda env create -f environment.yml # the env name is included in the .yml file
conda activate widget
python -m ipykernel install --user --name widget --display-name widget

jupyter labextension install @jupyter-widgets/jupyterlab-manager # enable widget
```





