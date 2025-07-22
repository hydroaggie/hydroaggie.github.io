---
layout: post
title: How to use LaTeX in VScode as an Overleaf alternative
date: 2025-07-22
description: Tutorial on how to use LaTeX in VScode as an alternative to Overleaf
tags:
  - LaTeX
  - VScode
categories: tutorial
giscus_comments: true
related_posts: true
featured: false
toc:
  sidebar: left
---

This post follows the [original blog](https://mark-wang.com/blog/2022/latex/) by Mark Wang with a few modifications. 

## Motivation

I previously used [Overleaf](https://www.overleaf.com/), a cloud-based LaTeX editor, during my time at PNNL. Overleaf is excellent for creating professional manuscripts and supports collaboration, especially for premium users. However, after moving to the university, I lost access to the premium subscription and had to rely on the free version, which comes with limitations such as restricted compile time and slower performance. This prompted me to search for alternatives, and I discovered Mark Wang's [post](https://mark-wang.com/blog/2022/latex/) about using LaTeX in VSCode as a replacement for Overleaf. If you're curious about how LaTeX works in VSCode, I recommend checking out his original [post](https://mark-wang.com/blog/2022/latex/) for a detailed overview.

## Setup environment

You will need a local installation of LaTeX, VScode and LaTex-Workshop extension to make it work.

### Installing LaTeX

To install LaTeX using Mac as an example, go to TeX Live [quick install page](https://tug.org/texlive/quickinstall.html). I followed the macOS approach by downloading MacTeX (~6 GB) and installing it on my Mac Studio (Apple silicon).

### Installing VScode and extension

Install VSCode for Mac from the offical [website](https://code.visualstudio.com/download). Once installed, open VSCode and install the extension named `LaTeX Workshop`.


## Using LaTeX in VSCode

First, download or locate the LaTeX files on your computer. For me, I have downloaded my LaTeX files from Overleaf. Then use VSCode to open the folder that contains the LaTeX files. Open the LaTeX file (e.g., `paper.tex`) using the VSCode editor. 

Now you can view and edit your LaTeX file and make any changes. After you are done, click on the green triangle located on the top right panel to compile the LaTeX file. Or simply use keyboard shortcut `Cmd + Option + B` (Mac) or `Ctrl + Alt + B` (Windows/Linux) to compile the LaTeX file.

To view the compiled PDF, you can either click on the `View LaTeX PDF` button on the top right panel or use the keyboard shortcut `Cmd + Option + V` (Mac) or `Ctrl + Alt + V` (Windows/Linux). This will open a new tab in VSCode showing the compiled PDF.

To jump from a specific line in the LaTeX file to the corresponding location in the PDF, you can use the `SyncTeX` feature. Simply place your cursor on the line you want to jump from and press `Cmd + Option + J` (Mac) or `Ctrl + Alt + J` (Windows/Linux). This will synchronize the LaTeX file with the PDF and take you to the corresponding location. To do the reverse, you can click on the PDF and press `Cmd + Click` (Mac) or `Ctrl + Click` (Windows/Linux) to jump back to the LaTeX file.

## Configuring LaTeX-Workshop to make it more like Overleaf

1. To enable auto build in VSCode, go to the settings (`Cmd + Shift + P`) and search for "Preferences: Configure language specific settings...". Check the box for "Files: Auto Save". This will automatically trigger the build when you make changes, allowing for an instant preview of your latest PDF.
2. Under the same settings, go to "Editor: Word Wrap". Set it to `on` to enable line wrapping in LaTeX files.

## Conclusion

Using LaTeX in VSCode is a great alternative to Overleaf, especially if you prefer a local setup or you do not need collaboration features. Plus, you can also utilize the rich collection of extensions offered by VSCode. For example, you can use the CoPilot extension to get AI-assisted writing suggestions.

On the downside, this setup requires a local installation of LaTeX, which can take up significant disk space and may require some initial configuration. However, once set up, it provides a powerful and flexible environment for writing LaTeX documents.