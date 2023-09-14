---
layout: post
title: Use Rkernel for Jupyter Notebook
date: 2021-04-08 
description: A tutorial on how to use Rkernel in Jupyter Notebook
tags: Jupyter R
categories: geek tutorial
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

This instruction works on Linux and macos platform. It is mostly borrowed from this [post](https://irkernel.github.io/installation) and [post](https://izoda.github.io/site/anaconda/r-jupyter-notebook/), and has been tested on Linux machine. 

### Create conda env and install r-irkernel

```bash
conda create -n r-kernel
# activate it
conda activate r-kernel
(r-kernel)$ conda install r-recommended r-irkernel jupyter
```

#### Install a specific version of R

```bash
# create conda env
conda create --name r_3.4.3
conda activate r_3.4.3
# search and install a different r version
(r_3.4.3) $ conda search r-base
(r_3.4.3) $ conda install -c r r=3.4.3
# after successful installation. check the R version
(r_3.4.3) $ which R
(r_3.4.3) $ R
# install irkernel and jupyter 
conda istall -c r r-irkernel jupyter
```



### Add r kernel to jupyter kernel spec [important!]

```bash
(r-kernel)$ R -e 'IRkernel::installspec()'
```

### (optional) check kernel spec

- See a list of kernel spec files

```bash
$ jupyter kernelspec list
Available kernels:
  exodus             /global/u2/p/pshuai/.local/share/jupyter/kernels/exodus
  geo                /global/u2/p/pshuai/.local/share/jupyter/kernels/geo
  ir                 /global/u2/p/pshuai/.local/share/jupyter/kernels/ir # make sure this exists!
```

- Change jupyter display kernel name

```bash
$ cd /global/u2/p/pshuai/.local/share/jupyter/kernels/ir
$ vi kernel.json

# change the display_name below
{
  "argv": ["/global/homes/p/pshuai/.conda/envs/r-kernel/lib/R/bin/R", "--slave", "-e", "IRkernel::main()", "--args", "{connection_file}"],
  "display_name": "iR", 
  "language": "R"
}
```

## Install R packages

- on command line

```bash
R -e 'install.packages("rgdal", repos = "https://cloud.r-project.org")' # avoid CRAN selection
```

- inside R

Open R from the conda env, and use the `install.packages("<package_name>")`

