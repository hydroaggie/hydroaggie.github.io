---
layout: post
title: A workaround for Version Control Jupyter Notebooks
date: 2019-09-06 
description: Documentation on how to use a workaround to version control juptyer notebooks
tags: git jupyter 
categories: productivity
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

Version control using `git` is quite simple for codes. However, since Jupyter notebook has a different format and often contains binary outputs, it is culumbersome to track those changes. Here is a workaround to save each notebook as script and version controllong those scripts instead. The idea is borrowed from [stackoverflow](https://stackoverflow.com/a/25765194/9319184).

## Use Git (updated 2023)
If you use Jupyter Lab, there is a Git plugin that you can use to diff the Jupyter notebooks.

## A workaround

- create a `jupyter_notebook_config.py` file. Alternatively, you can type `jupyter --config-dir` to see whether the file exists. If not, then create it by

```bash
jupyter notebook --generate-config
```

This will usually create `jupyter_notebook_config.py` under `~/.jupyter`.

- add the following lines to the `jupyter_notebook_config.py` file

```python
import os
from subprocess import check_call

def post_save(model, os_path, contents_manager):
    """post-save hook for converting notebooks to .py scripts"""
    if model['type'] != 'notebook':
        return # only do this for notebooks
    d, fname = os.path.split(os_path)
    check_call(['ipython', 'nbconvert', '--to', 'script', fname, '--output-dir', './src'], cwd=d)

c.FileContentsManager.post_save_hook = post_save
```

It will save a copy of the script into `./src` directory everytime the notebook is saved.

