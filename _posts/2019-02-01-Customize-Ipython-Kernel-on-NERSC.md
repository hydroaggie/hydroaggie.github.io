---
layout: post
title: Create A Jupyter Kernel on HPC (Deprecated)
date: 2019-07-26
description: Documentation on how to create a Jupyter Kernel
tags:
  - code
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

This post is about customizing your kernel on [Jupyterhub](jupyter.nersc.gov). Here I will use `my_env` as my new environment name. Also see the documentation [here](https://docs.nersc.gov/services/jupyter/)

## Create a conda environment
  Open terminal on [Jupyterhub](jupyter.nersc.gov) and follow the instructions on this [website](https://conda.io/docs/user-guide/tasks/manage-environments.html) to create new conda environment. Alternatively, `ssh` into NERSC, load python,  then follow the steps to create conda environment.

```bash
module load python
```

- In terminal, type `conda env list` to see a list of environments, the current environment is indicated with an asterisk(`*`). 

- create new environment with some packages

```bash
conda create -n <my_env> python ipykernel r-essentials
```

note: this will create both python and R kernels. You can create just R kernel using `conda create -n <my_env> r-essentials`

- generate kernel spec file so that kernel can be found in Jupyter

```bash
python -m ipykernel install --user --name my_env --display-name MyEnv-jupyter
```

### Duplicate NERSC environment

Build identical conda environment from NERSC

- create spec file

```bash
conda list --explicit > spec-file.txt
```

- create an identical environment

```bash
conda create --name <my_env> --file spec-file.txt
```

## Install packages for Python

  - First, activate your environment (`conda activate <my_env>` does not work on NERSC due to restriction!)
```bash
source activate <my_env>
```
  By default, the active environemnt is bracketed at the begining of command prompt
```bash
(my_env) $
```
  You can see a list of installed packages using `conda list`.

  - Then, install package (e.g. `ipdb`) using `conda` in your new environment
  ```bash
  (my_env) $ conda install -c conda-forge ipdb
  ```
  - Alternately you can install package using `pip` 

```bash
  (my_env) $ pip install shapely
```

- Deactivate conda env

```bash
(my_env) $ conda deactivate
```

## install packages for R

- In the terminal, open `R` in your new conda env

  ```
  (my_env) $ R
  ```

- Install the package `plotly`

  ```R
  install.packages('plotly')
  ```

*note: you can also open a jupyter notebook with R kernel and install the package as in R.*

## Customize Jupyter Kernel

  - find `kernel.json` file
    The `kernel-spec` file should be located under your environment folder (`$HOME/.conda/envs/nersc/share/jupyter/kernels/python3/kernel.json`). Find detailed instruction [here](http://www.nersc.gov/users/data-analytics/data-analytics-2/jupyter-and-rstudio/)
  - edit `kernel.json` file to point python at the python in your`.conda` direcctory. You'll need to change the `"argv"` path to your conda directory like below:
  ```python
  {
 "argv": [
  "/global/homes/p/pshuai/.conda/envs/nersc/bin/python3",
  "-m",
  "ipykernel_launcher",
  "-f",
  "{connection_file}"
 ],
 "display_name": "Python 3",
 "language": "python"
}
  ```
  - save this file

## Choose your customized kernel

  Open [Jupyterhub](https://jupyter-dev.nersc.gov/user/pshuai/tree/global/project/projectdirs/m1800/jupyter/reach_scale_model/notebook) on Nersc, and switch current kernel to `Python [conda env:my_env]`. Then you should be able to import newly installed package on the kernel. 

---
# Common issue
1. **"ImportError: numpy.core.multiarray failed to import" when using virtual envirnment on NERSC**

  This is due to a version conflict.
  Solution: try `pip install -U numpy` update your numpy version.

