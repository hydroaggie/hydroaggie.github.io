---
layout: post
title: Running Jupyter Notebooks from Remote Servers
date: 2019-09-19 
description: Documentation on how to run Jupyter Notebooks from remote servers through ssh
tags: jupyter 
categories: software
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

The instruction is borrowed from this [post](https://ljvmiranda921.github.io/notebook/2018/01/31/running-a-jupyter-notebook/)

## Prerequisites

- generate Jupyter config file. You will need this later to store password.

```bash
$ jupyter notebook --generate-config
Writing default config to: /home/usrname/.jupyter/jupyter_notebook_config.py
```

- generate password (also see this [doc](https://jupyter-notebook.readthedocs.io/en/stable/public_server.html#automatic-password-setup)). Enter and verify your password.

```bash
$ jupyter notebook password
Enter password:  ****
Verify password: ****
[NotebookPasswordApp] Wrote hashed password to /home/usrname/.jupyter/jupyter_notebook_config.json
```

## Run Jupyter from remote server

Here, I use `pinklady.pnl.gov` as a remote server. `ssh` into your remote server, and type the following command. 

```bash
usrname@pinklady $ jupyter lab --no-browser --port=8888
```

Note, port number `8888` is the default one that Jupyter uses, but you can change it to any other number theretically as long as it is not occupied (e.g., 8889, 8890, ...)

## Forward port between remote and local

In your local machine, using `ssh` and the following to forward port. You will be prompted to enter your password you used to log into remote server.

```bash
$ ssh -N -f -L localhost:8889:localhost:8888 shua784@pinklady.pnl.gov
shua784@pinklady.pnl.gov's password: 
```

Note, the first port number `8889` is the one used on your local machine. Similarly, you can switch it to other available port number (8888, 8890 and etc.). If the port number you are trying to use is occupied, you can use the following command (**on Mac**) to kill other processes that are listening to it, by

```bash
$ lsof -i TCP:8889
COMMAND   PID    USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
ssh     47477 shua784    7u  IPv6 0xfb88ca04eb4d849d      0t0  TCP localhost:ddi-tcp-2 (LISTEN)
ssh     47477 shua784    8u  IPv4 0xfb88ca04e68b58dd      0t0  TCP localhost:ddi-tcp-2 (LISTEN)
```

Then, kill the proceeses using `PID`

```bash
$ kill 47477
```

## Lauch Jupyter notebook

Open a browser in your local machine, and enter the following url in your address bar:

```bash
localhost:8889
```

It will open a new window and redirect you to the Jupyter home page. You will need to enter the `jupyter notebook password` from the first step.

