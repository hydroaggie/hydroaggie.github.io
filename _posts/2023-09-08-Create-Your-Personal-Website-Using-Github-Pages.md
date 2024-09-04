---
layout: post
title: Create Your Academic Website using GitHub Pages
date: 2023-09-08 
description: A tutorial on how to create an academic website for personal and group use.
tags: GitHub Jekyll website
categories: geek
giscus_comments: true
related_posts: true
featured: true
toc:
  sidebar: left
---

This tutorial shows simple steps you need to take to set up your personal website using [GitHub Pages](https://pages.github.com/) and [Jekyll](https://jekyllrb.com/) templates. It is completely free! You can also find [official document page](https://pages.github.com/), YouTube [tutorials](https://www.youtube.com/watch?v=QyFcl_Fba-k), and [blogs](https://jayrobwilliams.com/posts/2020/06/academic-website/) online. 

## Pre-requisites
- GitHub account. Before we start, make sure you have a [GitHub](https://github.com/) account.
- Docker. Install Docker locally on your computer. This will be used to run Docker images.

## Find a template 
To avoid building from scratch, start with a template. There are many templates on Github. Here are a few that focus on academia. We will use al-folio as an example in this blog. 
- [al-folio](https://github.com/alshedivat/al-folio): A Jekyll theme website for academics. You can use it to build both personal and group/lab pages. There are many examples listed in the Readme. I personally used it to create my [group website](https://hydroaggie.github.io/). There is a cool [video](https://www.youtube.com/watch?v=g6AJ9qPPoyc) on how to setup.
- [academicpages](https://github.com/academicpages/academicpages.github.io): Another template for academic websites. It provides detailed instructions on its readme. Also see this [blog](https://jayrobwilliams.com/posts/2020/06/academic-website/) as an example.

## Installation
- Go to `https://github.com/alshedivat/al-folio`, click the green button `Use this template` and select `Create a new repository`. Follow the instructions to create a new repo. **Remember to use `your_github_name/your_github_name.github.io` as the new repository name**. This will allow GitHub Page to work.
- Go to the newly created repo  `your_github_name/your_github_name.github.io`, click `Code` and clone the repo. You can also choose to open with GitHub Desktop. Here is a command line example.
```bash
git clone https://github.com/your_github_name/your_github_name.github.io.git
cd your_github_name.github.io
```
- Local setup using Docker (**Recommended**). Follow the instructions [here](https://github.com/alshedivat/al-folio/blob/master/INSTALL.md#local-setup-using-docker-recommended). Alternatively, you can [set up locally](https://github.com/alshedivat/al-folio#local-setup-legacy) by installing several packages (this may be challenging for new users).
- Once the local setup is successful, you will see a prompt with the local server address on screen. 
```bash
 Auto-regeneration: enabled for 'Path/to/your_github_name.github.io'
    Server address: http://127.0.0.1:4000
```
- Open a browser with the server address (e.g., `http://127.0.0.1:4000`). You will see the same template as shown [here](https://alshedivat.github.io/al-folio/).

## Deploy to GitHub
Now we will make some changes and deploy your website using Github Pages.

- Open `_config.yml` file in the repo, set `url` to `https://your_github_name.github.io` and leave `baseurl` empty.
- Enable automatic deployment of your website. Basically, this will allow you to update your website automatically whenever you push any changes to your repo. 
	- Go to `https://github.com/your_github_name/your_github_name.github.io`. Go to `Settings --> Actions --> General --> Action permissions --> Allow all actions and reusable workflows`.  Go to `Settings --> Actions --> General --> Workflow permissions --> Read and write permissions`. Click Save at the bottom.
- Make any changes to your repo. You can change your name and other details in `_config.yml` file. Commit and push your changes. This will trigger the deploy action. 
```bash
git add _config.yml
git commit -m "update name"
git push
```
- Now your repo should have a newly built branch named `gh-pages`. Go to `Settings --> Pages --> Build and deployment`, change `Source --> Deploy from a branch`, `Branch --> gh-pages` (**Important**).
- You should be able to see your website live at `https://your_github_name.github.io`.

## (Optional) sync with upstream template
If you would like to keep updated with the upstream template, you can do so by creating a new workflow. 
- Go to `Settings -> Actions -> General -> Workflow permissions`, check `Allow GitHub Actions to create and approve pull requests` and save your changes.
- Navigate to `your_github_name.github.io/.github/workflows`. Create a `sync.yml` file with the following content:

```yaml
name: Sync from template
on:
    # cronjob trigger
  schedule:
  - cron:  "0 0 1 * *"
  # manual trigger
  workflow_dispatch:
jobs:
  repo-sync:
    runs-on: ubuntu-latest
    steps:
      # To use this repository's private action, you must check out the repository
      - name: Checkout
        uses: actions/checkout@v3
      - name: actions-template-sync
        uses: AndreasAugustin/actions-template-sync@v0.7.3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          source_repo_path: alshedivat/al-folio
          upstream_branch: master
```
- Save and commit the changes.
- Alternatively you can manually merge the remote repo:

```bash
# Assuming the current directory is <your-repo-name>
$ git remote add upstream https://github.com/alshedivat/al-folio.git
$ git fetch upstream
# find the most recent release version
$ git rebase v0.9.0
```

- The rebase will add ALL the commit history from upstream. Once rebased, you will see merge conflicts. Try resolving those conflicts using `git mergetool`. 

```bash
git mergetool

# once merge is complete, continue rebase
git rebase --continue
```
- After rebase is done, you may see your local master has diverged from origin/master. 

>Your branch and ‘origin/master’ have diverged,  
	and have xx and xx different commits each, respectively.

Try force push. This will force origin/master to be sync with local master. BE careful of this if you are working with a team as it will rewrite the history (like someone has time traveled in the past and changed the course of the history).

```bash
git push --force
```