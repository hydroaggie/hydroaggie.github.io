---
layout: post
title: Tutorial on Building a PFLOTRAN Docker Image
date: 2025-02-04
description: A quick tutorial on how to build a Docker image for running PFLOTRAN and JupyterLab.
tags:
  - Docker
  - PFLOTRAN
categories: tutorial
giscus_comments: true
related_posts: true
featured: false
toc:
  sidebar: left
---

Docker is a powerful tool for creating reproducible environments. In this tutorial, I will show you how to build a Docker image for running PFLOTRAN and JupyterLab. The image is built on top of the `ubuntu:20.04` image and includes PFLOTRAN, PETSc, and JupyterLab. The image is built for both `x86_64` and `arm64` architectures on a Mac M1 chip.

## Pre-requisites:
- Docker installed on your machine. If you don't have Docker installed, you can download it from [here](https://docs.docker.com/get-docker/).

## Setup

### Create a Dockerfile
A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. The Dockerfile named "`dockerfile-jupyter-pflotran`" for building PFLOTRAN is shown below. 

```dockerfile
# Base image and setup
FROM ubuntu:22.04 AS base
LABEL org.opencontainers.image.ref.name="ubuntu"
LABEL org.opencontainers.image.version="22.04"
LABEL org.opencontainers.image.authors="Pin Shuai"
LABEL org.opencontainers.image.description="Docker image for running PFLOTRAN v6.0 with JupyterLab"

ARG NB_USER=aggie
ARG NB_UID=1000
ARG NB_GID=100
ARG PETSC_VERSION=v3.21.4  # Replace with the desired PETSc version so it works with the pflotran branch
ARG pflotran_branch=v6.0  # Replace with the desired PFLOTRAN branch
ENV DEBIAN_FRONTEND=noninteractive
ENV NB_USER=$NB_USER NB_UID=$NB_UID NB_GID=$NB_GID
ENV SHELL=/bin/bash
ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

ENV PETSC_DIR=/scratch/petsc \
    PETSC_ARCH=petsc-arch 

# Add fix-permissions script
COPY fix-permissions /usr/local/bin/fix-permissions
RUN chmod +x /usr/local/bin/fix-permissions

# Install prerequisites
RUN apt update -qq && \
    apt install -y --no-install-recommends \
        git make cmake gcc gfortran g++ wget nano vim python3 python3-pip lcov ca-certificates && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*


# Create user and set permissions. -m creates the home directory, -s sets the shell, -N does not create a group
RUN useradd -m -s /bin/bash -N -u $NB_UID $NB_USER && \
    fix-permissions /home/$NB_USER

# Conda and Python setup
USER $NB_USER
WORKDIR /home/$NB_USER

# install jupyter and Install Python packages
RUN pip3 install -U virtualenv
RUN pip3 install -U jupyterlab h5py matplotlib hydroeval numpy scipy pandas && pip3 cache purge
ENV PATH=/home/${NB_USER}/.local/bin:$PATH

# Add JupyterLab configuration
USER root
COPY jupyter_server_config.py /etc/jupyter/
COPY jupyter_notebook_config.py /etc/jupyter/
RUN chmod +x /etc/jupyter/jupyter_server_config.py 
RUN chmod +x /etc/jupyter/jupyter_notebook_config.py
RUN mkdir /home/${NB_USER}/.jupyter
COPY jupyter_notebook_config.py /home/${NB_USER}/.jupyter
RUN chmod +x /home/${NB_USER}/.jupyter/jupyter_notebook_config.py
RUN chown -R $NB_USER /home/${NB_USER}/.jupyter
COPY start.sh start-notebook.sh start-singleuser.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/start*.sh

# Set up the build environment
WORKDIR /scratch

# Expose ports and final configuration
ENV JUPYTER_ENABLE_LAB=yes
EXPOSE 8888

# Build MPICH
RUN wget https://www.mpich.org/static/downloads/4.1/mpich-4.1.tar.gz --no-check-certificate

# Copy and build PETSc
COPY ./build-petsc.sh /scratch/build-petsc.sh
RUN chmod +x /scratch/build-petsc.sh && /scratch/build-petsc.sh
ENV PATH=/scratch/mpich-4.1/install/bin:$PATH

# Verify PETSc environment
RUN echo "PETSC version = ${PETSC_VERSION}" && \
    echo "PETSC directory = ${PETSC_DIR}" && \
    echo "PETSC arch = ${PETSC_ARCH}"

# Build PFLOTRAN
RUN git clone https://bitbucket.org/pflotran/pflotran.git /scratch/pflotran && \
    cd /scratch/pflotran && \
    git checkout ${pflotran_branch} 
RUN echo "PFLOTRAN branch = ${pflotran_branch}"
WORKDIR /scratch/pflotran/src/pflotran
RUN make clean && \
    make -j4 \
        gnu_code_coverage=1 \
        gnu_runtime_checks=1 \
        catch_warnings_as_errors=1 \
        pflotran 

WORKDIR /scratch/pflotran/src/pflotran/bin
RUN cp ../pflotran .

RUN chown $NB_UID:$NB_GID --from=root:root -R  /scratch/pflotran/src 

# Set PFLOTRAN environment variables
ENV PFLOTRAN_DIR=/scratch/pflotran \
    PFLOTRAN_EXE=/scratch/pflotran/src/pflotran/pflotran

# Set work directory back to user home
USER $NB_USER
WORKDIR /home/${NB_USER}
# RUN echo "Current user is: $(whoami) in working directory: $(pwd)"
# add pflotran to PATH 
ENV PATH=/scratch/pflotran/src/pflotran/bin:$PATH

# append the PATH and additional commands to the bashrc
RUN echo $PATH && \
    echo "export PATH=${PATH}" >> ~/.bashrc

# Copy the local .bashrc file into the image
COPY ./local_bashrc /scratch/local_bashrc
# Append the local .bashrc to the user's .bashrc in the image
RUN cat /scratch/local_bashrc >> ~/.bashrc

# Copy the local .vimrc file into the image
COPY ./local_vimrc /scratch/local_vimrc
# Append the local .vimrc to the user's .vimrc in the image
RUN touch ~/.vimrc && cat /scratch/local_vimrc >> ~/.vimrc

# Copy the local gitconfig file into the image
COPY ./gitconfig /scratch/gitconfig
# Append the local gitconfig to the user's gitconfig in the image
RUN touch ~/.gitconfig && cat /scratch/gitconfig >> ~/.gitconfig

# Final stage: Add metadata and expose ports
# LABEL maintainer="Your Name <your.email@example.com>"
EXPOSE 8888

# create a work directory
WORKDIR /home/${NB_USER}/work

```

### Build the Docker image
The script below builds the Docker image using dockerfile `dockerfile-jupyter-pflotran`. 

- General Build. The build architecture defaults to the host machine (e.g., `arm64`). Note the `.` in the end of the command which specifies the build context. For my Mac M1 chip, the build is pretty fast (~30 minutes). 

```bash
docker build --progress=plain -f ./dockerfile-jupyter-pflotran -t pshuai/jupyter-pflotran:v6.0 .
```

- Platform-specific Build. The build architecture is specified as `linux/amd64`. Because the build is done on a Mac M1 chip, it took very long time (almost 2 hrs) to complete. 

```bash
docker build --platform linux/amd64 --progress=plain -f ./dockerfile-jupyter-pflotran -t pshuai/pflotran-jupyter-amd64:v6.0 .
```

- Multiplatform Build. The build architecture is specified as `linux/amd64,linux/arm64`. Must include the `--push` flag to push the image to Dockerhub. **Docker does not save multi-platform images unless the `--push` flag is used**. The build took about 2 hrs on my Mac M1 chip. 

```bash
# First, create a new builder instance (e.g., desktop-linux) that enables building for multiple platforms.
docker buildx create --use desktop-linux

# to check the builder instance
docker buildx ls

# start build with the --platform args. 
# IMPORTANT! add --push to push to Dockerhub, otherwise the multi-platform image will not be saved! 
docker buildx build --platform linux/amd64,linux/arm64 --progress=plain -f ./dockerfile-jupyter-pflotran -t pshuai/jupyter-pflotran-multiplatform:latest -t pshuai/jupyter-pflotran-multiplatform:base_v6 --push .

```

After the build is complete, you can pull the image and check the architecture on your machine. 

```bash
docker run --rm pshuai/jupyter-pflotran-multiplatform:latest uname -m

#If you're running on an x86-64 machine, you should see x86_64
x86_64
#If you're running on an ARM machine, you should see 
aarch64
```

### Inspect the Docker image
You can inspect the Docker image to see the layers and the size of the image. 

```bash
docker inspect pshuai/jupyter-pflotran-multiplatform:latest
```

You can also just check the labels of the image. 

```bash
docker inspect --format='{{json .Config.Labels}}' pshuai/jupyter-pflotran-multiplatform:latest
```

## Run the image
### Run PFLOTRAN
To run PFLOTRAN, use the following command. `$(PFLOTRAN_DIR)` is the directory to your PFLOTRAN repository. This will mount the `ufd` directory to the container's `/home/aggie/work` directory and run the `ufd_abc.in` input file. You will see the screen output from PFLOTRAN if docker runs successfully. 

```bash
docker run -it --rm -v $PFLOTRAN_DIR/regression_tests/ufd:/home/aggie/work pshuai/jupyter-pflotran-arm64:v6.0 pflotran -pflotranin ./ufd_abc.in
```

## Run JupyterLab
To run JupyterLab, use the following command. `$(pwd)` is the current directory in your terminal.

```bash
docker run -it --rm -p 8888:8888  -v $(pwd):/home/aggie/work pshuai/jupyter-pflotran-arm64:v6.0 jupyter lab --ip=0.0.0.0 --allow-root --NotebookApp.token=''
```

This will print out the following in the terminal:
```bash
    Jupyter Server 2.15.0 is running at:
    http://6392a6f60965:8888/lab
    http://127.0.0.1:8888/lab
```
Open a browser and copy and paste the following `http://127.0.0.1:8888/lab` in the address to access the active jupyterlab session. 

## Push to Dockerhub

```bash
# check docker images
docker images

# login to dockerhub
$ docker login -u pshuai
Password: xxxx

# tag the local image with the remote repo. you can tag the same image multiple times with different tag names.
$ docker tag pshuai/jupyter-pflotran-arm64:v6.0 pshuai/jupyter-pflotran-arm64:v6.0
$ docker tag pshuai/jupyter-pflotran-arm64:latest pshuai/jupyter-pflotran-arm64:latest
# push to dockerhub after you created a new repo on Dockerhub; -a pushes all tags
$ docker push -a pshuai/jupyter-pflotran-arm64

```

## Update the image
To update the existing image, you don't need to rebuild the image from scratch. You can simply update the Dockerfile and run the following command to rebuild the image. 

### Update the Dockerfile
Use the existing image as your BASE image and create a new Dockerfile named `dockerfile-jupyter-pflotran-updated`. For example, you can add new packages.

```dockerfile
# This will use the existing multiplatform image as the base image. Choose the platform that you want to use.
FROM pshuai/jupyter-pflotran-multiplatform:base_v6 AS base

USER root
# Install packages: tree
RUN apt update -qq && \
    apt install -y --no-install-recommends \
        tree && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

ARG NB_USER=aggie

EXPOSE 8888

USER ${NB_USER}
# cd to work directory
WORKDIR /home/${NB_USER}/work

```

### Build the updated image
- For general build, use the following command.
 
```bash
docker build --platform linux/arm64 --progress=plain -f ./dockerfile-jupyter-pflotran-updated -t pshuai/jupyter-pflotran-arm64:latest .
```

- For multiplatform build, use the following command. 

```bash
docker buildx build --platform linux/amd64,linux/arm64 --progress=plain -f ./dockerfile-jupyter-pflotran-updated -t pshuai/jupyter-pflotran-multiplatform:latest --push .
```

## Common Issues
1. The docker image size is too large. 
- This may be due to the build cache. You can clean up the cache by running the following command. 

```bash
# this will only install the packages that are necessary for the build
 apt install -y --no-install-recommends

 # remove the cache
 rm -Rf petsc-arch/externalpackages
```

- The size may increase significantly if you `chown` ownership of the files. See the post [here](https://gabnotes.org/chowning-files-dockerfile-can-take-lot-space/).

## References
- [Docker Documentation](https://docs.docker.com/)
- [Docker Multi-platform builds](https://docs.docker.com/build/building/multi-platform/)

