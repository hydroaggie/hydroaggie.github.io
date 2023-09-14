---
layout: post
title: Track Changes in LaTex
date: 2020-03-24 
description: Tutorial on how to create a tracked-changes PDF in LaTex 
tags: productivity
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

Overleaf has become a popular online latex editor for researchers. One of the advanges of Overleaf is that it can track all the changes like Word. It can also integrate with Git so that you can version control using Github. However, the drawback of using latex is that there is no convienient way to generate a tracked-changes version, especially for manuscript that contains images and references. 

Here, I will show a workaround to export tracked-changes version uisng `latexdiff` and `git-latexdiff`.

## Pre-requirements

- Download `MacTeX` [here](https://tug.org/mactex/), and follow the instructions to install. The file size is ~5 GB.

## Diff tex using `git-latexdiff`(recommended for `Git`)

Note source code on [Gitlab](https://gitlab.com/git-latexdiff/git-latexdiff), and this quick [tutorial](http://www.deanbodenham.com/learn/git-and-latexdiff.html)

### install `git-latexdiff`

```bash
$ git clone https://gitlab.com/git-latexdiff/git-latexdiff.git
$ cd git-latexdiff
$ sudo make install

# if installation failed, do manual installation to move `git-latexdiff` into one of the PATH folder
$ cp git-latexdiff /usr/local/bin/.
```

### diff command

```bash
# diff the changes in the previous commit 
git latexdiff --main manuscript.tex HEAD~1
# diff changes 2 commits back
git latexdiff --main manuscript.tex HEAD~2
# or use commit-hash
git latexdiff --main manuscript.tex c0b1428d8dc81dbe12bf28b17e83382df31c4200 HEAD
```


## Diff the tex files using `latexdiff`

- Save the different versions of tex files to local computer
- Using `latexdiff` and `pdflatex` on the command line

```bash
# generate diff version
latexdiff old.tex new.tex > diff.tex
# convert to pdf
pdflatex diff.tex
# generate .bbl file
bibtex diff # no file extension name
# rerun pdflatex twice to render figure ref and bibliography correctly
pdflatex diff.tex
pdflatex diff.tex 
```

Note:

1. Useful commands if the process paused: use `R` to run without stopping, `Q` to run quietly
1. If exernal file such as `SI.tex` exists, need to run `pdflatex` first on these files.

```bash
$ pdflatex SI.tex
$ pdflatex SI.tex
```

2. `latexdiff` has options for the visual markup styles such as `UNDERLINE, CTRADITIONAL, TRADITIONAL, CFONT, FONTSTRIKE, CHANGEBAR`.  (see [documentation](http://ctan.math.illinois.edu/support/latexdiff/doc/latexdiff-man.pdf) and [example](https://www.overleaf.com/learn/latex/Articles/Using_Latexdiff_For_Marking_Changes_To_Tex_Documents))

```Bash
latexdiff -t CTRADITIONAL old.tex new.tex > diff.tex
```

3. To prevent prompt on errors, use the following flag. Also you can type `Q` to quit the interactive session.

```bash
pdflatex -interaction=nonstopmode diff.tex
```

## caveats

- `git latexdiff` sometimes could not render the citation correctly, need to switch to `latexdiff` 
- `latexdiff` does not recognise the changes in figure if figure name is the same. Also it does not show the old vs new figure even if you have changed the name of the figure. It will just show the new figure in the `diff.tex`.
- If you use bibtex, it is recommended to include the `.bbl` file in the version management.

### bibliograph is not rendered correctly?

In this case, make sure you are using `.bbl` file instead of `.bib` file. To generate `.bbl` file, do the following:

```bash
# run pdflatex to generate .aux and .pdf file
$ pdflatex manuscript # e.g, manuscript is the main .tex file
$ bibtex manuscript # Do not add ".bib" extension
$ pdflatex manuscript #
$ pdflatex manuscript # yes, run twice to get the bib reference correctly rendered
```

For `git latexdiff`, try include `.bbl` file in git push? Otherwise the citation won't render.

### having external .tex file such as SupportingInformation.tex?

using `pdflatex` twice to make sure figures can be referenced correctly.

```bash
$ pdflatex SupportingInformation
$ pdflatex SupportingInformation

# make sure to run pdflatex on main tex again
$ pdflatex manuscript
```

