---
layout: post
title: Create A Documentation Website using MkDocs
date: 2022-05-05 
description: A tutorial on how to create documentation page using MkDocs and Github Pages
tags: website documentation MkDocs 
categories: geek
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

After a python package is published, it is important to create documentation and publish it online. In this post, I will share how to create documentation using [MkDocs](https://www.mkdocs.org/) and publish it on [Github Pages](https://pages.github.com/). You may also want to checkout [this article](https://towardsdatascience.com/creating-software-documentation-in-under-10-minutes-with-mkdocs-b11f52f0fb10). 

## Requirement

- A Github repo for the python package
- python packages: pip, mkdocs, mkdocs-material
- Optional plugins: mkdocstrings, mkdocs-git-revision-date-plugin, mkdocs-jupyter

## Install MkDocs and plugins
- Use pip to install:
``` bash
pip install mkdocs
pip install mkdocs-material
# plugins are optional 
pip install mkdocstrings
pip install mkdocs-git-revision-date-plugin
pip install mkdocs-jupyter
```

- Initialize project

If you have cloned the github repo for the python package and the `mkdocs.yaml` exists, then do
```bash
# the PROJECT_NAME is usually the repo name on Github
cd PROJECT_NAME
```
Otherwise, do 

```bash
mkdocs new PROJECT_NAME
```

This will create a `mkdocs.yml` file and a folder named `/docs`. There is a single file named `index.md` within the folder.

The format of the `mkdocs.yml` is as follows:
```yaml
site_name: NAME
nav:
  - Home: index.md
  - Page2: page2.md
  - Section1:
    - Subpage1: subpage1.md
    - Subpage2: subpage2.md
theme:
  name: THEME_DOWNLOADED
```

The directory of the `/docs` looks like this:

```vim
PROJECT_NAME/
    docs/
        index.md
        about.md
        games/
             ping.md
             balloon.md
        rides/
             scary.md
             drop.md
    mkdocs.yaml
```

## Deploy the website

Run the following to generate a branch called "gh-pages" in your repo on Github:
```bash
 mkdocs gh-deploy
```

It should autimatically create the website on `USERNAME.github.io/PROJECT_NAME`. Make sure the source of the GitHub Pages under Settings is pointed to `gh-pages` branch and `/(root)` folder.

## Update documentation
- Update mkdocs.yml. If Jupyter notebooks are included, make sure notebooks are updated under `docs/notebooks` and new notebooks directories are added to `mkdocs.yml`.
- Deploy

```bash
 mkdocs gh-deploy
```