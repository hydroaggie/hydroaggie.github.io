---
layout: post
title: Run Docker Images Using Shifter on HPC
date: 2019-08-02 
description: Documentation on how to run Docker Images through Shifter on HPC
tags: docker shifter
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

Shifter is developed at NERSC and is used to create image (e.g., Docker image) to run on NERSC due to the reserved root permission. This [documentation](https://docs.nersc.gov/programming/shifter/how-to-use/) shows the steps to use Shifter to download and run the image. And this [docomentation](https://docs.nersc.gov/services/jupyter/#shifter-kernels-on-jupyter) shows how to run image in Jupyter.

## Download Docker image

Here we use an example image `ees16/tinerator:latest`.

```bash
shifterimg -v pull docker:ees16/tinerator:latest
```

To see a list of images,

```bash
shifterimg images
```

## Run image from the command line

To run the image from Cori command line,

```bash
shifter --image=docker:ees16/tinerator:latest -e HOME=$HOME /bin/bash
```



## Run image on Jupyter

[doc](https://docs.nersc.gov/connect/jupyter/#shifter-kernels-on-jupyter)

You do not need to create a new kernel for this. The new kernel name inside ``~/.local/share/jupyter/kernels` will be used. 

In this case, it is called `shifter-jupyter`.

### Create kernel spec file 

- create kernel spec file `kernel.json` and put it under `~/.local/share/jupyter/kernels/shifter-jupyter/kernel.json`
- Put the following in the `kernel.json` file

```json
{
 "argv": [
  "shifter",
  "-e",
  "HOME=/global/homes/p/pshuai",
  "--volume=/global/homes/p/pshuai/docker_files:/home/jovyan/work",
  "--image=ees16/tinerator:latest",
  "/opt/conda/bin/python",
  "-m",
  "ipykernel_launcher",
  "-f",
  "{connection_file}"
 ],
 "display_name": "shifter-jupyter",
 "language": "python"
}
```

### Mount volume

Before mounting any local volume to the container, do the following. 

```bash
setfacl -m u:nobody:x ~/ 
setfacl -m u:nobody:x ~/docker_files/ 
```

In this case, `~/docker_files` is open to anyone in the system.

###  launch Jupyter

- Go to [jupyter.nersc.gov](jupyter.nersc.gov) and login with username.
- Switch kernel to `shifter-jupyer`





