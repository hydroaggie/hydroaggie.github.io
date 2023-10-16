---
layout: post
title: A Tutorial on How to Create a Jupyter Book
date: 2022-06-15
description: A tutorial on how to create a Jupyter Book
tags:
  - website
  - jupyter
categories: geek
giscus_comments: true
related_posts: true
featured: true
toc:
  sidebar: left
---

Jupyter Book is used to build an open source, interactive book using Jupyter Notebooks and Markdowns. The best thing is that it can be easily hosted using Github Page so that people can always access the latest version of the book.

## Pre-requisite:
- Github account
- Git, Python
## Install Jupyter Book
```bash
# create virtual env
conda create -n jupyterbook -c conda-forge jupyter-book
conda activate jupyterbook
```

## Start with a template
- From the official website:

```bash
jb create mybook
```
This will create a folder with some template files. The two most important ones are `_toc.yml` and `_config.yml`.

- Using [Jupyter Book cookie-cutter](https://github.com/executablebooks/cookiecutter-jupyter-book). This will include Github Actions that can be used to automatically 
deploy the book. 

```bash
jupyter-book create --cookiecutter mybookpath/
```

### Create table of content
The format should look something like below: 
```bash
# In _toc.yml
format: jb-book
root: intro # this is the intro.md file which will be placed at the root directory of the book
chapters:
- file: markdown # a markdown.md file
- file: notebooks # Jupyter notebooks
```

Note the file path is relative to the root file (e.g., `intro.md`)

### configuaration
Edit the `_config.yml` file to change the book title, add logo, and a few buttons. 
```bash
# In _config.yml
title: My sample book
author: The Jupyter Book Community
logo: logo.png
execute:
  execute_notebooks: force # other options include `automatic`, `off`

# Add a bibtex file so that we can create citations
bibtex_bibfiles:
  - references.bib

```

## Build the book
Once you have added all the contents, you can build the book using
```bash
# navigate into src/ folder
cd src/ # or any folder that contains _config.yml
# build the book
jb build .
```
This will generate many HTML files which you can preview at `file://Users/my_path_to_book/_build/index.html`. You can continue to add contents and re-build the book. 

## Publish the book
- Create a Github repository for the book
- Initialize the local book with git and push it to Github


```bash
cd path/to/book
git init
git add .
git commit -m "initialize the repo"
git remote add origin https://github.com/pinshuai/ats-workflow.git

git push -u origin main
```

- Publish it online using GitHub Pages

```bash
# install ghp-import by copying all the book contents to a branch called `gh-pages`
pip install ghp-import

# build the book 
ghp-import -n -p -f ./_build/html
```

Now the book should be live at `https://<user>.github.io/<myonlinebook>/`

## Update the book
Just add or modify the contents, rebuild the book and push it to Github.

```bash
# cd into src dir where the _toc.yml is
cd mybook/src
jb build .
ghp-import -n -p -f ./_build/html
```

## Use Github Actions
Github Actions automates the process of building JupyterBook. So everytime when you make any changese to the book, it will be built automatically and published online!

- Add workflow. Create a folder named `.github/workflows` 
- Add a YAML file (e.g., `deploy.yml`) and add the following template

```yaml
name: deploy-book

# Only run this when the master branch changes
on:
  push:
    branches:
    - main
    # If your git repository has the Jupyter Book within some-subfolder next to
    # unrelated files, you can make this run only if a file within that specific
    # folder has been modified.
    #
    # paths:
    # - some-subfolder/**

# This job installs dependencies, builds the book, and pushes it to `gh-pages`
jobs:
  deploy-book:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    # Install dependencies
    - name: Set up Python 3.8
      uses: actions/setup-python@v2
      with:
        python-version: 3.8

    - name: Install dependencies
      run: |
        pip install -r requirements.txt
    # Build the book. src is the a subfolder under root. 
    - name: Build the book
      run: |
        jupyter-book build src 
    # Push the book's HTML to github-pages
    - name: GitHub Pages action
      uses: peaceiris/actions-gh-pages@v3.6.1
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: src/_build/html
```

Note: 
- the branch name should be the same as the one used by the repository (e.g., `main` not `master` in this case)
- The only things that need to be modified is the build command and `publish_dir`. The dir is relative to the root dir under main branch. So if your book content is at the root dir, use the following instead:

```yaml
jupyter-book build .

publish_dir: ./_build/html
```

## Helpful tutorials:
- https://ubc-dsci.github.io/jupyterdays/sessions/beuzen/jupyter_book_tutorial.html
- https://github.com/pabloinsente/jupyter-book-tutorial
