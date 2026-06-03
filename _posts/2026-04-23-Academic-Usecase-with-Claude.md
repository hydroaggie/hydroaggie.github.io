---
layout: post
title: Academic Use Cases with Claude
date: 2026-04-23
last_updated: 2026-06-03
description: A collection of use cases for academics using Claude Code.
tags:
  - claude
  - MCP
  - AI tools
categories: tutorial
giscus_comments: true
related_posts: true
featured: true
toc:
  sidebar: left
---


With agentic AI tools taking the world by storm, this post explores various academic use cases with [Claude Code](https://code.claude.com/docs/en/overview), an AI assistant developed by Anthropic. We will focus on research tasks such as literature assistance, codebase support, etc. The idea is to use AI as your personal research assistant but not to replace your own thinking and creativity.

> **Note:** This post will be updated as I discover new use cases and tools. Check back for the latest additions.
{: .block-tip }

## Literature Search

I usually start my research by doing a literature search on Google Scholar, finding a few interesting papers, and then—based on those papers—searching for other related papers (e.g., papers that have cited them). This is time-consuming and often I find myself getting lost in the sea of papers. With Claude, I can quickly find relevant papers based on a specific topic or keyword using natural language. For example, if I'm interested in "machine learning in hydrology," I can ask Claude to retrieve relevant papers published in the last 5 years using a prompt like:

```
Find the top 5 most cited papers on "machine learning in hydrology" published in the last 5 years.
```

Claude will search the web including Google Scholar and return a list of relevant papers, including their titles, authors, publication years, and even a brief summary if available. Then, I can further ask Claude to look for papers that have cited these key papers, like a citation graph, to get other relevant papers. Optionally, you can ask Claude to retrieve the PDF or fulltext of the papers if they are accessible. You can then pass those papers to Zotero for management and annotation (see next section).

You can even ask Claude to write a literature review based on the retrieved papers, though I haven't tested that yet.

### Setup
- Install the [Paper Search MCP](https://github.com/openags/paper-search-mcp).

```bash
git clone https://github.com/openags/paper-search-mcp.git ~/paper-search-mcp

# Set up the skill for Claude Code
mkdir -p ~/.claude/skills/paper-search
cp ~/paper-search-mcp/claude-code/SKILL.md ~/.claude/skills/paper-search/SKILL.md
```

- Edit the `SKILL.md` file to replace the placeholder values `<REPO_PATH>`. You can also just ask Claude to edit the file for you.



## Literature Management

### Search for Relevant Papers in Zotero

I find this the most useful feature. I use Zotero to manage my references, and I often struggle to find relevant papers when the library contains hundreds of entries. The search function in Zotero is just not that good. With Claude, I can quickly find papers related to a specific topic or keyword using natural language. For instance, if I'm researching "machine learning in hydrology," I can ask Claude to retrieve relevant papers from my Zotero library, using a prompt like:

```
Find papers in my Zotero library related to "machine learning in hydrology" in the last 5 years.
```

Then Claude will return a list of relevant papers, including their titles, authors, publication years, and even a brief summary if available. This saves me a lot of time and helps me stay organized with my research materials.

The main benefit of using Zotero is it prevents Claude from hallucinating papers that do not exist. 

### Summarize Research Papers
Another great use case is summarizing research papers. I often annotate papers as I read and have developed a color code for different annotation types. When I am done, I export the annotations as notes to my Obsidian app (see my previous [post]({% post_url 2023-09-26-A-Zotero-to-Obsidian-Workflow %}) on this workflow). I also like to write a short summary highlighting the key points and knowledge gaps. All of this was done manually, and it can be time-consuming when you have many papers. With Claude, I can quickly generate summaries of papers based on my annotations and let it write the note into Zotero or Obsidian. For example, I can ask:

```
Summarize the key findings and knowledge gaps of Shuai et al., 2017 based on my annotations and write this as note in Zotero.
```

Claude may ask a few clarifying questions about the note. It will then generate a concise summary based on the annotations. When you open Zotero, the note is there. This is especially useful when I want to quickly review the key points of a paper without having to read through the entire document again. It also helps me keep my notes organized and easily accessible for future reference. 

You can also ask Claude to write a "when to cite" section based on the summary and annotations.

### Setup

- Install the [Zotero MCP](https://github.com/54yyyu/zotero-mcp).


```bash
# install zotero mcp
uv tool install zotero-mcp-server

# set up 
zotero-mcp setup  # Auto-configure (Claude Desktop supported)
# this will configure a few options

#optional. this will enable pdf outline extraction, scite citation...
uv tool install "zotero-mcp-server[all]"    # Full install with all features
```

- Enable Zotero Local API: `Settings-->Advanced-->Miscellaneous`, toggle the box for *Allow other applications on this computer to communicate with Zotero*. It will say `Available at http://localhost:23119/api/`
- Initialize and Update database. 

```bash
# Build the semantic search database (fast, metadata-only)
zotero-mcp update-db

# Build with full-text extraction (slower, more comprehensive)
zotero-mcp update-db --fulltext
```

## Manage Email Subscription 

I often subscribe to Google Scholar alerts for my research topic and have them sent to my Gmail account. I then read those emails to find new papers relevant to my research. With Claude, I can automate this process by having it access my Gmail account and retrieve the alerts and create a well formatted newsletter for me on a regular basis (e.g., weekly). Claude can intelligently group papers by themes, summarize the key findings, and even highlight the most relevant papers based on my research interests. This way, I can stay up-to-date with the latest research without having to manually check my email for alerts.

This may sound like the scariest scenario—having Claude access your personal email—but if you prefer not to use your personal account, you can set up a separate dummy Gmail account just for this purpose.


### Setup

Set up is pretty straightforward. You just need to connect your Gmail account to Claude.
- Download and install the Claude Desktop app.
- Go to `Customize-->Connectors-->Gmail` and connect your Gmail account. You can choose the different read/write permissions based on your needs.


## Codebase Expert

I often use open-source code in my research, but it can be difficult to understand how it works, especially when the codebase is large and complex. For example, I use ATS for hydrologic modeling and sometimes need to know how ATS calculates certain fields and what the governing equations are. With Claude, I can quickly get the answer by asking specific questions about how certain functions or modules work. For example, if I want to understand how ATS calculates longwave radiation internally, I can ask Claude:

```
Can you explain how the longwave radiation is calculated in ATS?
```

Claude will then search through the codebase and provide a detailed explanation of the relevant functions and equations used in the calculation. 

### Setup

This requires a customized MCP that connects to the codebase. Without an MCP, Claude will try to search the web or the GitHub repo, which may not be efficient and can lead to hallucinations. With an MCP, Claude can directly access the codebase and provide accurate, detailed explanations.

I do not have experience with this, so I just ask Claude to build the MCP for me using existing examples. I mostly followed the `pywrdrb-mcp` [example](https://waterprogramming.wpcomstaging.com/2026/03/03/a-beginners-guide-for-the-llm-curious-part-2-custom-model-context-protocol-to-improve-llm-supported-code-development/) and adopted their [repo](https://github.com/Pywr-DRB/pywrdrb-mcp) structure.

In the end, I built a custom MCP—`ats-mcp`—which I can use to ask questions about the ATS codebase, including source code, documentation, test cases, and demo examples across multiple repositories.

## USGS Water Data Retrieval

Retrieve USGS water data using the [USGS Water Data MCP](https://github.com/pinshuai/usgs-water-mcp). This MCP uses the USGS Water Data API to retrieve water data such as streamflow, groundwater levels, and water quality parameters based on user queries. For example, if I want to retrieve streamflow data for a specific location and time period, I can ask Claude:

```
Plot the streamflow for the Logan River in Utah for the last year.
```


## Other Applications

- **Git commit message**: Use Claude to generate descriptive commit messages based on the changes in the code. Just say:

```
commit this
```
  
This requires authentication with GitHub or another version control system. I find Claude very helpful for generating clear and concise commit messages, especially since I often forget exactly what changes I made.

## Tips

These are some tips that I found useful when using Claude. Many of these can also be found in the [official documentation](https://code.claude.com/docs/en/best-practices) and community posts (e.g., [claude-code-tips](https://github.com/ykdojo/claude-code-tips)).

- **Context matters**. Use `@` to directly reference files and `/add-dir` to add a directory to the context, or paste screenshots or code snippets. This will help Claude understand the task better and provide more accurate responses. However, too much context will slow down Claude and cause it to forget what was told earlier.
  
- **Plan first** before you let Claude do the work. Ask Claude to come up with a detailed plan for a task. Let Claude ask you clarifying questions to make sure it understands the task correctly. This will save you time and tokens in the long run. E.g.,```I want to build a personal website. Interview me in detail to understand my needs and preferences, then come up with a detailed plan for how to build the website.```

- Provide **verification** or success criteria for the task you want to accomplish. If possible, provide some test cases or expected outputs (e.g., a screenshot). At the minimum, put a "success criteria"  section in the end of the prompt and let Claude verify if the task is accomplished successfully. This can greatly reduce the chances of getting an inaccurate or incomplete response from Claude. 

- Ask Claude to correct its own mistakes. If you find that the response from Claude is not accurate or contains errors, you can ask it to correct itself and put what it has learned into the memory so it won't make the same mistake again. It is kind of like training an AI to improve itself over time.

- Provide a concise readme file--`CLAUDE.md` for every project. This could include specific instructions, commands, best practices, and common gotchas for using Claude with that project. 

- Use skills--`SKILL.md` for repetitive workflows. If you find yourself doing the same thing over and over again, consider creating a skill for it. For example, if you often ask Claude to create a newsletter from common sources in a specific format, you can create a skill (e.g., `/create-newsletter`) that automates this process. 

- Ask Claude if you don't know how to do something. For example, if you want to set up a MCP but don't know how to do it, just ask Claude:```
How can I set up a MCP to connect to my codebase?``` Even better, provide an example that you found somewhere and ask Claude to understand it and learn from it: ```Use this example (link to the example) to learn how to set up a MCP, then use it to create a MCP for my codebase.```

- Don't be afraid to experiment and try new things with Claude. The more you use it, the more you will discover its capabilities and how it can best assist you in your academic work.

## Reference

- [A Beginner's Guide for the LLM-Curious, Part 2](https://waterprogramming.wpcomstaging.com/2026/03/03/a-beginners-guide-for-the-llm-curious-part-2-custom-model-context-protocol-to-improve-llm-supported-code-development)
- [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices)
- [claude-code-tips](https://github.com/ykdojo/claude-code-tips)







