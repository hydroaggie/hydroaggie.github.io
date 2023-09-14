---
layout: post
title: Import GitHub Repo to GitLab
date: 2019-10-09 
description: Documentation on how to import GitHub repos to GitLab
tags: git
categories: geek
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

## Clone repo from Github to local machine

- Go to the repository on Github and copy the `clone with HTTPS` address
- On your local machine

```bash
git clone https://github.com/pnnl-sbrsfa/HFR-flow.git
```

- now the remote origin is pointing to `Github`

## Create new repo on Gitlab

- Go to [Gitlab-sbrsfa](gitlab.pnnl.gov/sbrsfa) group, click `New project` and give a project name (let's say `test`), then click `Create project`.
- After the new project `test` has been created, you will see an option at the bottom of the page saying `Push an existing Git repository`. 

```bash
cd existing_repo
git remote rename origin old-origin
git remote add origin https://gitlab.pnnl.gov/sbrsfa/test.git
git push -u origin --all
git push -u origin --tags # optional?
```

- Follow the command line instructions and you are all set.
- Now the remote origin is pointing to `Gitlab`
- To see all the remotes available

```bash
git remote -v
```

## Options to push changes

You can push your commit to different origins.

```bash
git push origin master # push to Gitlab
git push old-origin master # push to Github
```



