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
# Create a customized RSS feed for any website
Nowadays, some websites do not support RSS feed. You can achieve this using some Feed Creator tool (e.g., Fivefilters)

For tutorials ([part1](https://www.fivefilters.org/2021/how-to-turn-a-webpage-into-an-rss-feed/) and [part2](https://www.fivefilters.org/2021/how-to-turn-a-webpage-into-an-rss-feed-pt2/)) by fivefilters.

**The general steps are outlined below:**
- Go to https://createfeed.fivefilters.org/. Use the default `Simple selectors`
- Enter web page URL (e.g., https://www.nifa.usda.gov/grants/funding-opportunities)
- Get links inside the HTML elements with this id or class value
	- Go the the news website. Right click and select `inspect` (this applies to Chromium browser and Firefox)
	- Search for keywords appearing in the news article in the inspect page (HTML). Usually it has the following format: `<div class="CLASS_NAME">`
	- Some examples:
		- Use `post-title` as the class value for the above [website](https://www.nifa.usda.gov/grants/funding-opportunities). 
		- Use `summary-list__items` for New Yorker contributor ([example](https://www.newyorker.com/contributors/peter-hessler))
- Go back to the FiveFilters website. Enter the class value found above. Keep the rest of options unchanged.
- Click `Preview` at the bottom. The results of the RSS feed should appear on the right. Make sure the results on the right look correct.
- Right click `RSS Feed` button, and copy [link address](https://createfeed.fivefilters.org/extract.php?url=https%3A%2F%2Fwww.nifa.usda.gov%2Fgrants%2Ffunding-opportunities&in_id_or_class=post-title&max=5&order=document&guid=0).
- Open RSS app (e.g., [NetNewsWire](https://netnewswire.com/)). Subscribe using the copied link address.
- Now the RSS feed will appear in the app.

Note, the created RSS feed may not contain any abstract or summary of the article and you have to follow the link to go to the article page. But this serves my purpose since I am mostly looking for a quick way to get notification about something posted on a website. 