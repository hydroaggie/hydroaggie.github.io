---
layout: post
title: A Git Tutorial
date: 2020-04-23 
description: Tutorial on how to use Git
tags: productivity
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

## Why use Git?
Git is a popular version control tool that helps track changes made in a document. It has become the de facto standard version control system used by most software developers. 

If you are not using it, you are missing out a lot. 

##  Git Basics

This will cover the basics of `git` functions. GitHub also has a [git cheat sheet](https://education.github.com/git-cheat-sheet-education.pdf).

- `git clone`
- `git status`
- `git add`
- `git commit -m "commit_message"`
- `git pull`
- `git push`

## Use Git for Collaboration

This will cover situation when you are collaborating with other people. 



## What to do when you have a conflict?

- Option 1 -- Fix it!
- Option 2 -- revert to head.



### Tips and Resources

- Always use `git pull` before you push to the repo. 
- Some good GUI to use. e.g., [Sublime Merge](https://www.sublimemerge.com/), [VScode](https://code.visualstudio.com/)
- Command diff tool. e.g., `vimdiff`. need to configure first. [tutorial](https://www.rosipov.com/blog/use-vimdiff-as-git-mergetool/)

```bash
git config merge.tool vimdiff
git config merge.conflictstyle diff3
git config mergetool.prompt false

# after a merge conflict
git mergetool
```

