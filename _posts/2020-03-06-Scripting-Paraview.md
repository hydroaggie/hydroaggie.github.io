---
layout: post
title: Scripting Paraview
date: 2020-03-06 
description: Tutorial on how to use scripts to batch process files in ParaView
tags: productivity
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

This tutorial will generate script to be run on NERSC to generate files in Paraview. 

## Generate Batch Script 

### Option 1 --Script Recording

1. Open local Paraview, go to `Tools`--`Start Trace`
2. After finished rendering, go to `Tools`--`Stop Trace`
3. It will pop up a python script with the recorded command lines. 
4. Save this `test.py` file.

### Option 2 -- Save statefile as .py

1. Complete the normal operations in Paraview
2. When ready, go to `File`--`Save State...`, in the `Files of type`, select the dropdown with `test.py` format
3. Open the generated `test.py` file, and modify it as you like.

## Run script on NERSC

See this [documentation](https://docs.nersc.gov/applications/paraview/#running-in-batch-mode) on running Paraview in Batch mode

1. Upload the local `test.py` file to NERSC
2. Use the following command to submit jobs

```bash
cori$ module load ParaView
cori$ start_pvbatch.sh 4 4 haswell 00:30:00 default debug `pwd`/test.py
```

3. You can change the file output directory in the `test.py`.
4. create a bash function to automate the process

```bash
pvbatch () {
    start_pvbatch.sh 4 4 haswell 00:30:00 default debug `pwd`/$1
}
```







