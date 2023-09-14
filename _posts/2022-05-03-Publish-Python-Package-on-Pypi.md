---
layout: post
title: Publish A Python Package on Pypi
date: 2022-05-03 
description: A tutorial on how to publish a python package on Pypi 
tags: python package 
categories: geek
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

This post will show the process of creating a python package and publish it on Pypi. The steps mostly follows this [Youtube](https://www.youtube.com/watch?v=7FcX9uWDuIQ) by [Qiusheng Wu](https://github.com/giswqs).

Before you start, make sure you have created an account with Github and Pypi, and have installed Anaconda on your PC.

## Create conda environment and install Cookiecutter

In this example, we use `pypackage` as the environment name.
```
conda create --name pypackage python
conda activate pypackage
pip install cookiecutter
```

## Use Cookiecutter to generate template for a python package
I will use the template provided by [giswqs/pypackage](https://github.com/giswqs/pypackage) which is originally created by [audreyfeldroy/cookiecutter-pypackage](https://github.com/audreyfeldroy/cookiecutter-pypackage). The main differences is that the modified version used markdown instead of restructured text as documentation.

```
cookiecutter gh:giswqs/pypackage
```
This is prompt up a few questions asking about Full name, email address, Github username, project name (i.e., package name), project description, Pypi username, version, and etc. Then a folder with the same project name will be created under current working directory.

## Push to Github

### Create a repo on Github
Create an empty repo on Github with the same project name. Do no create README file! Here we use `demo` as the repo/project name.

### Initialize local repository with Git
```
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/pinshuai/demo.git
git push -u origin main
```

Add your python scripts under `./demo/demo/` and commit. Those scripts will be published on Pypi.

## Upload to Pypi

First install some packages (e.g., `twine`) that will be used to push to Pypi.
```
pip install -r ./demo/requirements_dev.txt
```

Create `dist` folder and create a tarball inside it.
```
python setup.py sdist
```

Use `twine` to upload the tarball to Pypi. This will ask for the username and passward for Pypi.
```
twine upload demo-0.0.1.tar.gz
```

Now the package has been successfully upload to Pypi! Now users can install the package using `pip install demo`.

## Deploy documentation website on Github Pages

The python package template already contains the necessary files (e.g, `mkdocs.yaml`) to deploy your documentation website using `MkDocs` on Github Pages. You will also find `/docs` folders with markdown files which will be used for documentation.

### Setup MkDocs
First, we need to install `MkDocs` and some plugins as specified in the `mkdocs.yaml`.
```bash
pip install mkdocs
pip install mkdocs-material
# plugins are optional 
pip install mkdocstrings
pip install mkdocs-git-revision-date-plugin
pip install mkdocs-jupyter
```

### Deploy the website
Simply run the following command under the repo. It should autimatically create the website on `pinshuai.github.io/demo`. Make sure the source of the GitHub Pages under Settings is pointed to `gh-pages` branch and `/(root)` folder.

```bash
 mkdocs gh-deploy
```

## Update package
To update the package after changes are made, follow the steps.

1. Change the version number in `setup.py`. E.g., change version: 0.0.1 --> 0.0.2

```bash
vi setup.py
# update version: x.y.z
```
2. Create a new tarball

```bash
python setup.py sdist
```
3. Upload the new created tarball to Pypi.

```bash
twine upload dist/demo-0.0.2.tar.gz
# follow the prompt to enter username and password for PyPI
# Enter your username: pinshuai
# Enter your password: xxxx
```
4. Check the Pypi website to see the new updated package.

5. To install a newer version of the package:

```bash
# upgrade the existing one. This may not work well if there are multiple newer versions
# also make sure to run the command outside of the package repo
pip install demo -U

# install a specific version and overwrite the existing ones
pip install -Iv demo==0.0.2
```


## Github Action
### Publish docs

Use the following template to publish docs. For this to work, you will need to enable read and write permission for workflows (Github --> Settings --> Actions --> General --> Workflow permissions)
```yaml
name: docs
on:
    push:
        branches:
            - main
jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: actions/setup-python@v2
              with:
                  python-version: 3.9
            - name: Install dependencies
              run: |
                  python -m pip install --upgrade pip
                  pip install --user --no-cache-dir Cython
                  # pip install --user -r requirements.txt
            - name: PKG-TEST
              run: |
                  python -m unittest discover tests/
            - run: pip install -r requirements_docs.txt
            - run: mkdocs gh-deploy --force 
```


## Trouble shooting
1. Pip could not find the latest version even though it is updated on Pypi website.
   - solution: update pip first using `pip install -U pip`, then install the package using `pip install -U PACKAGE_NAME`
## Reference

- My `modvis` python package: https://github.com/pinshuai/modvis
- `Pypackage` by Qiusheng Wu: https://github.com/giswqs/pypackage





