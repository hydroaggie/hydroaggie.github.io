---
layout: post
title: A Tutorial on How to Create a Jupyter Book
date: 2022-06-15
description: A tutorial on how to create a Jupyter Book
tags:
  - website
  - jupyter
  - tutorial
categories: geek
giscus_comments: true
related_posts: true
featured: true
toc:
  sidebar: left
---
*Last updated: 2023-11-29*

Jupyter Book is used to build an open source, interactive book using Jupyter Notebooks and Markdowns. The best thing is that it can be easily hosted using Github Page so that people can always access the latest version of the book.

## Pre-requisite:
- Github account
- Git, Python
## Install Jupyter Book
- From the [official website](https://jupyterbook.org/en/stable/start/overview.html):

```bash
# create virtual env
conda create -n jupyterbook -c conda-forge jupyter-book
conda activate jupyterbook
```

## Create a book template

### Option 1: cookie cutter (Recommended)
Using [Jupyter Book cookie-cutter](https://github.com/executablebooks/cookiecutter-jupyter-book). This will include Github Actions that can be used to automatically.
- Install `cookiecutter`

```bash
$ pip install -U cookiecutter jupyter-book
```
- Create the template following prompts. The `PATH/TO/BOOK` is where you want your book folder to be created. The values within the brackets are the default values if you hit enter.

```bash
$ jupyter-book create --cookiecutter PATH/TO/BOOK

# then following the screen prompt to answer the following questions:
author_name [Captain Jupyter]: Tomas Beuzen
github_username [tomasbeuzen]:
book_name [My Book]:
book_slug [my_book]:
book_short_description [This cookiecutter creates a simple boilerplate for a Jupyter Book.]: My first Jupyter Book!
version ['0.1.0']:
Select open_source_license:
1 - MIT license
2 - BSD license
3 - Apache Software License 2.0
4 - CC BY 4.0
5 - CC BY-SA 4.0
6 - None
Choose from 1, 2, 3, 4, 5, 6 [1]:
Select include_ci:
1 - github
2 - gitlab
3 - no
Choose from 1, 2, 3 [1]:
```
- Install the book packages

```bash
$ cd my_book
$ pip install -r requirements.txt
```

### Option 2: default
- Use the official command to create a template.

```bash
jb create mybook
```
This will create a folder with some template files. The two most important ones are `_toc.yml` and `_config.yml`.

- Create table of content. Inside `_toc.yml`, the format should look something like below: 

```bash
# In _toc.yml
format: jb-book
root: intro # this is the intro.md file which will be placed at the root directory of the book
chapters:
- file: markdown # a markdown.md file
- file: notebooks # Jupyter notebooks
```
Note the file path is relative to the root file (e.g., `intro.md`)

- configuaration. Edit the `_config.yml` file to change the book title, add logo, and a few buttons. 

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
cd my_book/ # or any folder that contains _config.yml
# build the book
jb build .
```
This will create a folder named `_build` with generate HTML files which you can preview by opening `_build/html/index.html`. Now you can continue updating contents and re-build the book. 

## Publish the book
- Create a Github repository for the book. E.g., `GITHUB_USER/REPO_NAME.git`
- Initialize the local book with git and push it to Github

```bash
cd path/to/book
git init
git add .
git commit -m "initialize the repo"
git remote add origin https://github.com/GITHUB_USER/REPO_NAME.git

git push -u origin main
```
Go to your github repo and you will see the pushed material.

- Publish it online using GitHub Pages

```bash
# install ghp-import by copying all the book contents to a branch called `gh-pages`
pip install ghp-import

# build the book 
ghp-import -n -p -f ./_build/html
```

Now the book should be live at `https://GITHUB_USER.github.io/REPO_NAME/`

## Update the book 

### GitHub Actions (Recommended)
Github Actions automates the process of building JupyterBook. So everytime when you make any changese to the book, it will be built automatically and published online! **If you used the cookie-cutter to create the template, it automatically created this action for you**. You can double check this on GitHub to see if `.github/workflows`  exists.

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

{: .important }
> - The branch name should be the same as the one used by the repository (e.g., `main` not `master` in this case)
> - The only things that need to be modified is the build command `jupyter-book build .` and `publish_dir`. The dir is relative to the root dir under main branch. So if your book content is at the root dir, use the following instead:

```yaml
jupyter-book build .

publish_dir: ./_build/html
```

### Update manually
Just add or modify the contents, rebuild the book and push it to Github.

```bash
# cd into dir where the _toc.yml is
cd my_book/
jb build . && ghp-import -n -p -f ./_build/html
```

## Notes
- For some reason, the url to github repo is incorrect. You can fix this by editing the repository section in `_config.yml`.
```bash
# Information about where the book exists on the web
repository:
  url: https://github.com/hydroaggie/group_handbook  # Online location of your book
```

## Helpful tutorials:
- https://ubc-dsci.github.io/jupyterdays/sessions/beuzen/jupyter_book_tutorial.html
- https://github.com/pabloinsente/jupyter-book-tutorial
