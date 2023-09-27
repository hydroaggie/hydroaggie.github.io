---
layout: post
title: A Zotero to Obsidian Workflow
date: 2023-09-26
description: A workflow on how to export notes from Zotero to Obsidian
tags:
  - Zotero
  - Obsidian
  - Workflow
  - note-taking
categories: tutorial
giscus_comments: true
related_posts: true
featured: false
toc:
  sidebar: left
---

This tutorial combines the contents from [this](https://forum.obsidian.md/t/zotero-zotfile-mdnotes-obsidian-dataview-workflow/15536) and [this](https://medium.com/@alexandraphelan/an-updated-academic-workflow-zotero-obsidian-cffef080addd) blog with customization.
## Pre-requisites:
- Zotero (v6.0.27)
- Obsidian (v1.4.13)
- Obsidian plugins: Zotero Integration, Templater, Dataview
- Optional Zotero plugins: Zotfile, Better BibTex (used to create citation key)

## Setup

### Create a template for Zotero Integration
To add a template, go to ...

I started with the template provided in [this](https://medium.com/@alexandraphelan/an-updated-academic-workflow-zotero-obsidian-cffef080addd) post. I like the different callouts used for citation, abstract, and etc. However, I don't like the look of the annotations and the images are not embeded in the notes. 

I came across [this post](https://forum.obsidian.md/t/zotero-integration-import-templates/36310) in the Obsidian Forum, which color-codes the highlights and provides image embeding in the annotation. There is one little problem with the color style in the CSS snippet. The colors do not match the ones used in Zotero (see `Variables` in [ref](https://www.zotero.org/support/note_templates)). I have updated the CSS snippet and provided below.

In the end, I combined those two templates and came up with [this customized one]() that I really like.

Here is the color code for highlights:

| Color | Meaning | 
| :------- | :------: |
| <span style="color:yellow;"> yellow</span> | <span style="color:yellow;"> Relavent/important. The default color.</span>  | 
| <span style="color:green;"> green </span> | <span style="color:green;"> Follow up and read the cited papers. </span>  |  
| <span style="color:red;"> red </span> | <span style="color:red;"> Disagree with the author. </span> |  
| <span style="color:magenta;"> magenta </span> | <span style="color:magenta;"> The author critiques previous work or points out knowledge gaps. </span>  |  
| <span style="color:orange;"> orange </span> | <span style="color:orange;"> Questions/confusion about the statement </span>  |  

I will breakdown into different sections:
- Cite: 
- Synthesis:
- Link:
- Abstract:
- Annotations: The page link will take you back to the PDF reader in Zotero.**
- Metadata

```
{% raw %}
---
cssclass: literature-note
category: literaturenote
title: {{title}}
tags: {% if allTags %}{{allTags}}{% endif %}
citekey: {{citekey}}
status: unread
dateread:
---

> [!Cite]
> {{bibliography}}

>[!Synthesis]
>**Contribution**:: 
>
>**Related**:: {% for relation in relations | selectattr("citekey") %} [[@{{relation.citekey}}]]{% if not loop.last %}, {% endif%} {% endfor %}
>

> [!Link] 
> {%- for attachment in attachments | filterby("path", "endswith", ".pdf") %}
>  [{{attachment.title}}](file://{{attachment.path | replace(" ", "%20")}})  {%- endfor -%}.

> [!Abstract]-
> {%- if abstractNote %}
> {{abstractNote}}
> {%- endif -%}.


## Annotations

{%- macro colorValueToName(color) -%}
	{%- switch color -%}
		{%- case "#ffd400" -%}
			Relevant / important
		{%- case "#ff6666" -%}
			Disagree
		{%- case "#e56eee" -%}
			Critiques
		{%- case "#a28ae5" -%}
			Questions / confusion
		{%- case "#5fb236" -%}
			TODO / follow up
		{%- default -%}
			Note
	{%- endswitch -%}
{%- endmacro -%}

{%- macro calloutHeader(type) -%}
	{%- switch type -%}
		{%- case "highlight" -%}
			Highlight
		{%- case "strike" -%}
			Strikethrough
		{%- case "underline" -%}
			Underline
		{%- case "image" -%}
			Image
		{%- default -%}
			Note
	{%- endswitch -%}
{%- endmacro %}

{% persist "annotations" %}
{% set annots = annotations | filterby("date", "dateafter", lastImportDate) -%}
{% if annots.length > 0 %}
### Imported on {{importDate | format("YYYY-MM-DD h:mm a")}}

{% for color, annots in annots | groupby("color") -%}
#### {{colorValueToName(color)}}

{% for annot in annots -%}
> [!quote{% if annot.color %}|{{annot.color}}{% endif %}] {{calloutHeader(annot.type)}}
{%- if annot.annotatedText %}
> {{annot.annotatedText | nl2br}}
{%- endif -%}
{%- if annot.imageRelativePath %}
> ![[{{annot.imageRelativePath}}]]
{%- endif %}
{%- if annot.ocrText %}
> {{annot.ocrText}}
{%- endif %}
{%- if annot.comment %}
>
>> {{annot.comment | nl2br}}
{%- endif %}
>
> [Page {{annot.page}}](zotero://open-pdf/library/items/{{annot.attachment.itemKey}}?page={{annot.page}}) [{{annot.date | format("YYYY-MM-DD#h:mm a")}}]

{% endfor -%}
{% endfor -%}
{% endif %}
{% endpersist %}

>[!metadata]-
{% for type, creators in creators | groupby("creatorType") -%}
{%- for creator in creators -%}
> **{{"First" if loop.first}}{{type | capitalize}}**::
{%- if creator.name %} {{creator.name}}  
{%- else %} {{creator.lastName}}, {{creator.firstName}}  
{%- endif %}  
{% endfor %}~ 
{%- endfor %}    
> **Title**:: {{title}}  
> **Year**:: {{date | format("YYYY")}}   
> **Citekey**:: {{citekey}} {%- if itemType %}  
> **itemType**:: {{itemType}}{%- endif %}{%- if itemType == "journalArticle" %}  
> **Journal**:: *{{publicationTitle}}* {%- endif %}{%- if volume %}  
> **Volume**:: {{volume}} {%- endif %}{%- if issue %}  
> **Issue**:: {{issue}} {%- endif %}{%- if itemType == "bookSection" %}  
> **Book**:: {{publicationTitle}} {%- endif %}{%- if publisher %}  
> **Publisher**:: {{publisher}} {%- endif %}{%- if place %}  
> **Location**:: {{place}} {%- endif %}{%- if pages %}   
> **Pages**:: {{pages}} {%- endif %}{%- if DOI %}  
> **DOI**:: {{DOI}} {%- endif %}{%- if ISBN %}  
> **ISBN**:: {{ISBN}} {%- endif %}    

{% endraw %}
```

To add the CSS snippet, go to ...
Here is the updated CSS snippet:

```css
/* Yellow */
.literature-note .callout[data-callout-metadata="#ffd400"] {
  --callout-color: 255, 204, 0;
}

/* Red */
.literature-note .callout[data-callout-metadata="#ff6666"] {
  --callout-color: 255, 59, 48;
}

/* Orange */
.literature-note .callout[data-callout-metadata="#f19837"] {
  --callout-color: 255, 149, 0;
}

/* Green */
.literature-note .callout[data-callout-metadata="#5fb236"] {
  --callout-color: 40, 205, 65;
}

/* Blue */
.literature-note .callout[data-callout-metadata="#2ea8e5"] {
  --callout-color: 0, 122, 255;
}

/* Purple */
.literature-note .callout[data-callout-metadata="#a28ae5"] {
  --callout-color: 125, 84, 222;
}

/* Magenta */
.literature-note .callout[data-callout-metadata="#e56eee"] {
  --callout-color: 255, 0, 255;
}

/* Gray */
.literature-note .callout[data-callout-metadata="#aaaaaa"] {
  --callout-color: 50, 50, 50;
}
```
## Workflow

### Export annotation to note
After you made highlights and comments, export them to a note using xx. 
You can further format the color and text (see [note templates documentation](https://www.zotero.org/support/note_templates)). However, I will skip this and just use formatting in the Zotero Integration template.

### Import notes into Obsidian
Open command pallett:

Alternative, create a hotkey for that command.

In the pop-up box, type in the author to search for literature. Once found, hit `enter`. It will automatically generate a markdown note using the zotero template. 

Here is a screenshot shows the final markdown file in Obsidian. 

You can create internal links in the created file to generate a mind-map.


### Create table using Dataview


## References
- https://forum.obsidian.md/t/zotero-integration-import-templates/36310
- https://forum.obsidian.md/t/zotero-zotfile-mdnotes-obsidian-dataview-workflow/15536
- https://medium.com/@alexandraphelan/an-updated-academic-workflow-zotero-obsidian-cffef080addd

