---
layout: post
title: Academic Usecase with Claude
date: 2025-09-17 
description: A collection of usecases with Claude Code for academic. 
tags: 
  - python 
categories: tutorial
giscus_comments: true
related_posts: true
featured: false
toc:
  sidebar: left
---

With agent AI tools taken the world by storm, this post explores various academic use cases with Claude, an AI language model developed by Anthropic. We will cover how to leverage Claude, especially the CLI--Claude Code, for tasks such as research assistance, codebase support, and academic writing.

## Literature Search
I usually start my research by doing a literature search on Google Scholar. Find a few interesting papers and then based on those papers search for other related papers (e.g., papers that have cited them). This is time-consuming and often I find myself getting lost in the sea of papers. With Claude, I can quickly find relevant papers based on a specific topic or keyword using natural language. For example, if I'm interested in "machine learning in hydrology," I can ask Claude to retrieve relevant papers published in the last 5 years. This allows me to quickly get an overview of the current research landscape and identify key papers that are relevant to my work.

```Find the top 5 most cited papers on "machine learning in hydrology" published in the last 5 years.```

Claude will search the web including Google Scholar and return a list of relevant papers, including their titles, authors, publication years, and even a brief summary if available. 

Then, I can further ask Claude to look for papers that have cited these key papers, like a citation graph, to get other relevant papers.

Optionally, you can ask Claude to retrieve the PDF or fulltext of the papers if they are accessible. You can then pass those papers to Zotero for management and annotation (see next section).

You can even ask Claude to write a literature review based on the retrieved papers, though I have haven't tried that yet.

### Setup
- Install the [Paper Search MCP](https://github.com/openags/paper-search-mcp).

```bash
git clone https://github.com/openags/paper-search-mcp.git ~/paper-search-mcp

# Set up the skill for Claude Code
mkdir -p ~/.claude/skills/paper-search
cp ~/paper-search-mcp/claude-code/SKILL.md ~/.claude/skills/paper-search/SKILL.md
```

- Edit the `SKILL.md` file to replace the placeholder values `<REPO_PATH>`. You can also just ask Claude to edit the file for you.


## Subscription through Gmail
- This may sound the most scary thing is to have claude access your personal email. But if you know what you are doing, you can set up a separate Gmail account just for this purpose. 
- Subscribe to google scholar alerts for your research topic and have the alerts sent to this Gmail account. Then you can set up a MCP to access this Gmail account and retrieve the alerts. 
- Enable Gmail MCP.
- You can also ask Claude to summarize the alerts by creating a newsletter.


## Literature Management

### Search for Relevant Papers in Zotero
I found this most useful. I use Zotero to manage my references, and I often struggle to search for relevant papers when the library contains hundreds of entries. The search function in Zotero just not that good. With Claude, I can quickly find papers related to a specific topic or keyword using natual language. For instance, if I'm researching "machine learning in hydrology," I can ask Claude to retrieve relevant papers from my Zotero library, using a prompt like:

```Find papers in my Zotero library related to "machine learning in hydrology" in the last 5 years.```

Then Claude will return a list of relevant papers, including their titles, authors, publication years, and even a brief summary if available. This saves me a lot of time and helps me stay organized with my research materials.

The main benefit of using Zotero is it prevents Claude from hallucinating papers that do not exist. 

### Summarize Research Papers
Another great use case is summarizing research papers. I often like to annotate papers while I read and I have developed a color code for different annotations, when I am done, I can then export the annotations as notes to my Obsidian app (see my previous [post](2023-09-26-A-Zotero-to-Obsidian-Workflow.md) on this workflow). I also like to write a little summary to show the key points and important gaps. These were all done mannualy and it can be time-consuming when you have many papers. With Claude, I can quickly generate summaries of papers based on my annotations and let it write the note into Zotero or Obsidian. For example, I can ask:

```Summarize the key findings and knowledge gaps of Shuai et al., 2017 based on my annotations and write this as note in Zotero.```

Claude may ask a few clarifying questions about the note. It will then generate a concise summary based on the annotations. When you open Zotero, the note is there. This is especially useful when I want to quickly review the key points of a paper without having to read through the entire document again. It also helps me keep my notes organized and easily accessible for future reference. 

You can also ask Claude to write a "when to cite" section based on the summary and annotatoins.

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

## Codebase expert
I often use open source code for my research, but sometimes it can be difficult to understand how the code works, especially when the codebase is large and complex. For example, I used ATS for hydrologic modeling and sometimes I need to know how ATS calculate certain fields and what the governing equations are. With Claude, I can quickly get the answer by asking specific questions about how certain functions or modules work. For example, if I want to understand how ATS calculates longwave radiation internally, I can ask Claude:

```Can you explain how the longwave radiation is calculated in ATS?```

Claude will then search through the codebase and provide a detailed explanation of the relevant functions and equations used in the calculation. 

### Setup
This requires a customzied MCP that connect to the codebase. Without a MCP, Claude will try to search the web or the GitHub repo, which may not be efficient and may lead to hallucination. With a MCP, Claude can directly access the codebase and provide accurate and detailed explanations.

I do not have experience with this, so I just ask Claude to build the MCP for me using existing examples. I mostly followed the `pywrdrb-mcp` [example](https://waterprogramming.wpcomstaging.com/2026/03/03/a-beginners-guide-for-the-llm-curious-part-2-custom-model-context-protocol-to-improve-llm-supported-code-development/) and followed their [repo](https://github.com/Pywr-DRB/pywrdrb-mcp) structure.

In the end, I built a custom MCP--`ats-mcp`, which I can use to ask questions about the ATS codebases including source codes, documentation, testing problems, and demo examples across multiple repositories. 

## Other Applications
- **Git commit message**: Use Claude to generate descriptive commit messages based on the changes in the code. Just say:

```commit this```
  
This requires authentication with GitHub or other version control systems. I find Claude to be very helpful in generating clear and concise commit messages that I often forget what changes I made.

## Tips
These are some tips that I found useful when using Claude. Many of these can also be found in the [official documentation](https://code.claude.com/docs/en/best-practices) and community posts (e.g., [claude-code-tips](https://github.com/ykdojo/claude-code-tips)).

- **Context matters**. Use `@` to directly reference files and `/add-dir` to add a directory to the context, or paste screenshots or code snippets. This will help Claude understand the task better and provide more accurate responses. However, too much context will slow down Claude and make it forgot what was told earlier. 
  
- Plan first before you let Claude do the work. Ask Claude to come up with a detailed plan for a task. Let Claude ask you clarifying questions to make sure it understands the task correctly. This will save you time and tokens in the long run. E.g., ```I want to build a personal website. Interview me in detail to understand my needs and preferences, then come up with a detailed plan for how to build the website.```

- Provide verification or success criteria for the task you want to accomplish. If possible, provide some test cases or expected outputs (e.g., a screenshot). At the minimum, put a "success criteria"  section in the end of the prompt and let Claude verify if the task is accomplished successfully. 

- Ask Claude to correct its own mistakes. If you find that the response from Claude is not accurate or contains errors, you can ask it to correct itself and put what it has learned into the memory so it won't make the same mistake again. It's kind of like train an AI to improve itself over time.

- Provide a concise readme file--`CLAUDE.md` for every project. This could include specific instructions, commands, best practices, and common gotchas for using Claude with that project. 

- Use skills--`SKILL.md` for repetitive workflows. If you find yourself doing the same thing over and over again, consider creating a skill for it. For example, if you often ask Claude to create a newsletter from common sources in a specific format, you can create a skill (e.g., `/create-newsletter`) that automates this process. 

- Ask Claude if you don't know how to do something. For example, if you want to set up a MCP but don't know how to do it, just ask Claude: ```How can I set up a MCP to connect to my codebase?``` Even better, provide an example that you found somewhere and ask Claude to understand it and learn from it: ```Use this example (link to the example) to learn how to set up a MCP, then use it to create a MCP for my codebase.```

- Don't be afraid to experiment and try new things with Claude. The more you use it, the more you will discover its capabilities and how it can best assist you in your academic work.

## Reference

- https://waterprogramming.wpcomstaging.com/2026/03/03/a-beginners-guide-for-the-llm-curious-part-2-custom-model-context-protocol-to-improve-llm-supported-code-development
- https://code.claude.com/docs/en/best-practices
- https://github.com/ykdojo/claude-code-tips
- 






