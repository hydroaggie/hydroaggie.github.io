---
layout: post
title: Fuzzy Search using FZF
date: 2021-07-01
description: A tutorial on how to use FZF fuzzy search capability to quickly find files
tags:
  - tutorial
  - mac
categories: tutorial
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---
# FZF tutorial

FZF is a command line tool to fuzzy search files. See [github README](https://github.com/junegunn/fzf). 

## Installation

- (**Recommended**) System independent installation. This works on Linux/Unix and does not require root privilege.

```bash
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
```

- On MacOS

```bash
$ brew installl fzf
```

​	- (optional) Follow the prompt to install shell extension to use auto-completion and key binding

```bash
$ /opt/homebrew/opt/fzf/install
#or 
$ /usr/local/opt/fzf/install # press enter
```


- (**Recommended**) install either `rg` (ripgrep) or `ag` (the Silver Searcher?) to make searching much faster

```bash
$ brew install ripgrep

# then add the following to .bashrc (or .zshrc) to use with fzf
export FZF_DEFAULT_COMMAND='rg --files --hidden' # if using rg. Options include "--hidden --follow --glob --type". See help with `rg -h`
```

- Customization. Choose the appreance, the order and window size, etc.

```bash
export FZF_DEFAULT_OPTS='-m --height 50% --layout=reverse --border --inline-info'
```

This is what I have in my bashrc:

```bash
if type rg &> /dev/null; then
  export FZF_DEFAULT_COMMAND='rg --files --hidden'
  export FZF_DEFAULT_OPTS="-m --height 50% --layout=reverse --border --inline-info 
  --preview-window=:hidden
  --preview '([[ -f {} ]] && (bat --style=numbers --color=always {} || cat {})) || ([[ -d {} ]] && (tree -C {} | less)) || echo {} 2> /dev/null | head -200'
  --bind '?:toggle-preview' 
"
fi


# add alias to bash

alias cf='c $(fzf)' # navigate to different directory. This requires the `c` bash function enabled.
alias f='fzf' # search current directory

# optionally use rg with fzf. This requires `rg` installation.
alias in='rg . | fzf --print0'  # use -e for exact match; use -u for unrestricted match (i.e., skip .ignore files)
alias F='rg . --files --hidden --unrestricted | fzf --print0'
```

## Command line usage

```bash
$ fzf
# search syntax
s$ # end with s
^s # begin with s
's # exact match
!s # inverse match

# use with other command
$ vi $(fzf)
$ cd $(fzf)
```

- Fzf provide several command-line shortcut after installation:

  - `Ctrl + T`: paste the path of file or directory found on the command line
  - `Ctrl + R`: find history command and paste command on the command line. Most useful.
  - `Alt + C`: cd to specific directory. Note this shortcut will not work on some MacOS system, try `Esc + C` or add `bindkey "ç" fzf-cd-widget` to .zshrc [ref](https://github.com/junegunn/fzf/issues/164)

- auto completion. use `TAB` to auto-complete the command.

  ```bash
    $ vi ~/Dropbox/**<tab>
    $ cd ~/Dropbox/**<tab>
    $ ls ~/**<tab>
    $ ssh **<tab>
    $ kill<tab>
```

## Use with Vim

Fuzzy file search within vim. Following instructions to install both  `fzf` [link](https://github.com/junegunn/fzf) and `fzf.vim` [link](https://github.com/junegunn/fzf.vim).

```bash
vi ~/.vimrc
" Plug 'junegunn/fzf', { 'do': { -> fzf#install() } } # do this if not installed by homebrew
Plug 'junegunn/fzf.vim'

# add the following inside .vimrc if installed using homebrew
set rtp+=/usr/local/opt/fzf 
```

- `:FZF` fuzzy search *current* directory, or `:FZF ~` search *home* directory 
  - `<Enter>`: open file in current window
  - `Ctrl + T`: open file in new [tab page](http://vimdoc.sourceforge.net/htmldoc/tabpage.html); `gt` next tab; `gT` previous tab; `<number>gt` go to tab#N
  - `Ctrl + X`: open file in new horizontal window
  - `Ctrl + V`: open file in new vertical window

- add key mapping 

```bash
# search current dir
nnoremap <silent> <leader>f :FZF<cr>
# search entire home dir
nnoremap <silent> <leader>F :FZF ~<cr>
```

## Advanced feature

### Preview

It is good to preview text based file (non-binary), but it is **not recommended** to set as a default option.

```bash
$ fzf --preview 'cat {}' 
# add highlight to preview
$ fzf --preview 'bat --style=numbers --color=always --line-range :500 {}' # need to install bat first using `brew install bat`
```

Add the following in the bash to auto toggle preview with `?`. See [post](https://betterprogramming.pub/boost-your-command-line-productivity-with-fuzzy-finder-985aa162ba5d)

```bash
export FZF_DEFAULT_OPTS="-m --height 50% --layout=reverse --border --inline-info 
  --preview-window=:hidden
  --preview '([[ -f {} ]] && (bat --style=numbers --color=always {} || cat {})) || ([[ -d {} ]] && (tree -C {} | less)) || echo {} 2> /dev/null | head -200'
  --bind '?:toggle-preview' 
"
```

### Ingore files

To avoid search system files and other directories, we can use `.rgignore`, `.ignore`, and `.gitignore` files to specify directories to ignore when searching. Note  `.rgignore` overwrite  `.ignore`, which overwrite `.gitignore` rules.

```bash
# inside a ~/.rgignore file
Applications/
Library/
**/.git/*
# this will ignore files relative to the level of .rgignore file
```

- use shortcut `Ctrl + T` does not apply the ignore rules? Try `fzf` instead.

### unignore files
If we don't want to ignore the files in the `.ignore, .gitignore, .rgignore` files, we can use the following command.

```bash
# search all files including hidden and ignore files
rg . --files --hidden --unrestricted | fzf --print0
```

### Grep in files

Sometimes we may want to search by keyword in Files instead of filenames. This uses the `rg` backend.

```bash
# exact match
rg . | fzf --print0 -e # remove -e for fuzzy match
```

