---
layout: post
title: Run Docker Images on Mac
date: 2019-08-03 
description: Documentation on how to run Docker Images on Mac
tags: docker 
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

## install Docker 

First download Docker Desktop for Mac from [here](https://docs.docker.com/docker-for-mac/install/). Install the package on your mac.

## Download Docker image

Here we use `ees16/tinerator` as an example

```bash
docker pull ees16/tinerator
```

See all available images

```bash
docker images
```

## View the content of the image

```bash
docker run -it ees16/tinerator sh
```

## Lauch the image on Jupyter

```bash
docker run -v $PWD:/home/jovyan/work -p 8888:8888 ees16/tinerator:latest jupyter lab
```

Note to kill the processes which are using or listening to port 8888, do the following

```bash
lsof -i TCP:8888
kill <PID>
```

If the notebook does not open, try to paste one of the links (similar) to the browser (i.e.,`http://127.0.0.1:8888/?token=44dbc7fd4da2598a8797ff0657721b74589e9444315f5802` ).

```html
http://(a65d926e15ba or 127.0.0.1):8888/?token=44dbc7fd4da2598a8797ff0657721b74589e9444315f5802
```

