---
layout: post
title: Create Customized RSS Feed for Any Website
date: 2022-10-06 
description: Documentation on how to create customized RSS feed
tags: RSS website 
categories: geek
giscus_comments: true
related_posts: true
toc:
  sidebar: left
---
  

For tutorials ([part1](https://www.fivefilters.org/2021/how-to-turn-a-webpage-into-an-rss-feed/) and [part2](https://www.fivefilters.org/2021/how-to-turn-a-webpage-into-an-rss-feed-pt2/)) by fivefilters.

- Go to https://createfeed.fivefilters.org/
- Enter web page URL (e.g., https://www.nifa.usda.gov/grants/funding-opportunities)
- Get links inside the HTML elements with this id or class value
	- right click and selecct `inspect`
  - simple selectors. E.g., Use "post-title" as the class value for the above website
  - Advanced selectors. 

- Click `Preview`. Make sure the results on the right look correct.
- Right click `RSS Feed` button, and copy [link address](https://createfeed.fivefilters.org/extract.php?url=https%3A%2F%2Fwww.nifa.usda.gov%2Fgrants%2Ffunding-opportunities&in_id_or_class=post-title&max=5&order=document&guid=0).
- Open RSS app (e.g., [NetNewsWire](https://netnewswire.com/)). Subscribe using the copied link address.
- Now the RSS feed will appear in the app.