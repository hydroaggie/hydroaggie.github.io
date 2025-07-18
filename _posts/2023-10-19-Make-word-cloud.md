---
layout: post
title: A simple word cloud from Google Scholar
date: 2023-10-19
description: Documentation on how to create a word cloud using your Google Scholar profile
tags:
  - word-cloud
categories: tutorial
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---

I recently discovered this Rshiny page for making a word cloud from any Google Scholar page. 

## Steps
1. Go to this [website](https://shiny.rcg.sfu.ca/u/rdmorin/scholar_googler/)
2. Enter your Google Scholar ID
3. Click `Cloud Me`
4. A word cloud is generated on the right. You can further tweak the shape and other details using the options on the left. 

## My word cloud

Here is the word cloud from my [Google Scholar](https://scholar.google.com/citations?user=Md_6je0AAAAJ) page. Hydrologic, river, exchange are keywords in my research. As a groundwater hydrologist, I am surprised to see that groundwater is not one of the big words. I think the website only grabs words from the paper titles, which may not provide the whole picture of my research.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/blog/GoogleScholar_wordcloud.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    My Google Scholar word cloud
</div>