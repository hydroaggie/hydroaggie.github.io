---
layout: post
title: Install PVGeo 
date: 2021-03-09 
description: Documentation on how to install PVGeo on Mac
tags: python package 
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---


The installation follows [official documentation](http://pvgeo.org/overview/getting-started.html) and [post](https://www.linkedin.com/pulse/paraview-pvgeo-plugins-howto-alexey-pechnikov/)

### install conda env

```bash
conda create -n pvgeoenv python=2.7
```

### install PVGeo

```bash
source activate pvgeoen
pvgeoenv $ pip install imageio==2.6.1 # need this to be compatible with PVGeo
pvgeoenv $ pip install PVGeo

# check if succussfully installed
pvgeoenv $ python -c "import PVGeo; print('success')"
```

## linking PVGeo with Paraview

```bash
pvgeoenv $ python -m PVGeo install echo

# this will print a bash command and paths for PV_PLUGIN_PATH and PYTHONPATH

#We are assuming you are on Mac OS:
#Copy paste the following line(s) to execute in your bash terminal:

curl -s  https://raw.githubusercontent.com/OpenGeoVis/PVGeo/master/installMac.sh | sh -s /opt/anaconda3/envs/pvgeoenv/lib/python2.7/site-packages


PYTHONPATH=/opt/anaconda3/envs/pvgeoenv/lib/python2.7/site-packages
PV_PLUGIN_PATH=/opt/anaconda3/envs/pvgeoenv/lib/python2.7/site-packages/PVPlugins
```

### load plugin

- open Paraview (`5.6.x` or higher)
- select `Tools --> Manage plugins--> Load New...`
- browse to `PV_PLUGIN_PATH`, and choose `PVGeo_All.py`
