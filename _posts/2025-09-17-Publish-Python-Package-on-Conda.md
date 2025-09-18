---
layout: post
title: Publish A Python Package on Conda
date: 2025-09-17 
description: A tutorial on how to publish a python package on Conda 
tags: 
  - python 
categories: tutorial
giscus_comments: true
related_posts: true
featured: false
toc:
  sidebar: left
---

This post will show the process of publish a python package on Anaconda, specifically on conda-forge. The steps mostly follows this [post](https://blog.gishub.org/how-to-publish-a-python-package-on-conda-forge) by [Qiusheng Wu](https://github.com/giswqs) and the official [guide](https://docs.conda.io/projects/conda-build/en/stable/user-guide/tutorials/build-pkgs.html).

Before you start, make sure you have created and published the python package on Pypi.

## Create conda environment and install conda-install

In this example, we use `pypackage` as the environment name.

```
conda create --name pypackage python
conda activate pypackage
conda install conda-build
conda install grayskull
```

## Download Pypi package locally

This assumes that you have already published your package on Pypi. If not, please refer to my previous [post](https://hydroaggie.github.io/blog/2022/Publish-Python-Package-on-Pypi/) on how to publish a python package on Pypi.

You can download the package from Pypi using:

```
pip download --no-deps --no-binary :all: <package_name>
```

This will download a tarball file (e.g., `<package_name>-0.1.0.tar.gz`) to the current working directory.

## Create conda recipe
The only thing that's needed for creating the conda package is a `meta.yaml` file. I will use the [template](https://github.com/conda-forge/staged-recipes/blob/main/recipes/example/meta.yaml) provided by Conda-recipe.

To fill the `meta.yaml` file, we can use `grayskull` to generate a template based on the package on Pypi.

```
grayskull pypi <package_name>
```

Open the template and change the following fields:

- `package/name`: the name of your package
- `package/version`: the version of your package
- `source/url`: the URL of the source code, usually the tarball link on Pypi
- `source/sha256`: the sha256 checksum of the source code tarball. You can get it using `sha256sum <package_name-xxx.tar.gz>
`
- `requirements/build`: the build dependencies, usually `python` and `pip`
- `requirements/run`: the runtime dependencies, usually the packages listed in `requirements.txt` on Github repo
- license: the license of your package, e.g., `MIT`
- license_file: the license file, e.g., `LICENSE.txt`

The rest of the fields can be left as default.

## Add recipe to staged-recipes repo

- Fork the [staged-recipes](https://github.com/conda-forge/staged-recipes) repo
- Clone the forked repo to your local machine
- Create a new branch using `git checkout -b add-<package_name>`
- Create a new folder under `recipes` with the same name as your package
- Add the `meta.yaml` file to the new folder
- Commit the changes using `git commit -m "Add <package_name> recipe"`
- Push the changes to your forked repo using `git push origin add-<package_name
- Create a pull request to the original `staged-recipes` repo

After your PR passes the review (make sure your ping using the comment "@conda-forge/help-python, ready for review!"), it will be merged to the main branch and your package will be built and uploaded to conda-forge automatically.

## Test the package
You can create a new conda environment and install your package from conda-forge to test if it works.

```
conda create --name testenv python
conda activate testenv
conda install -c conda-forge <package_name>
```

## Update the package
To update the package, you need to:

1. Update the version number in the `meta.yaml` file.
2. Update the source/url using the new version from Pypi.
3. Download the new tarball and update the `source/url` and `source/sha256` fields in the `meta.yaml` file.
4. Commit the changes and push to your forked repo.
5. Create a pull request to the original `staged-recipes` repo.

## Reference

- Build conda package from scratch: https://docs.conda.io/projects/conda-build/en/stable/user-guide/tutorials/build-pkgs.html
- How to publish a python package on conda-forge: https://blog.gishub.org/how-to-publish-a-python-package-on-conda-forge






