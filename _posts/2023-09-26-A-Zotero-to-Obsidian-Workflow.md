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

I have started using [Zotero](https://www.zotero.org/) as my primary literature manager after using Mendeley for many years (the only thing I miss from Mendeley is the search function). I like the flexibility and rich function of Zotero, which offers a wide selection of plugins. I also like to use the highlights and comments as I read papers inside Zotero.

This year I started a new note-taking app, [Obsidian](https://obsidian.md/), which I really like. If you don't know what Obsidian is, check out this nice [article](https://waterprogramming.wordpress.com/2022/10/21/markdown-based-scientific-and-computational-note-taking-with-obsidian/) by Water Programming. Obsidian becomes my all-in-one place for my notes including meeting, research, and daily notes. Since I have been making reading notes in Zotero, I started thinking if it is possible to port my literature notes into Obsidian. I did a bit search online, and found many people have already figured out different ways to achieve this. This tutorial combines the contents from [this Obsidian post](https://forum.obsidian.md/t/zotero-zotfile-mdnotes-obsidian-dataview-workflow/15536) and [this Medium article](https://medium.com/@alexandraphelan/an-updated-academic-workflow-zotero-obsidian-cffef080addd) on the Zotero-Obsidian workflow with some customization.

## Pre-requisites:
- Zotero (v6.0+)
- Obsidian (v1.4+)
- Obsidian plugins: [Zotero Integration](https://github.com/mgmeyers/obsidian-zotero-integration), Templater, Dataview
- Zotero plugins: [Better BibTeX for Zotero](https://retorque.re/zotero-better-bibtex/installation/), Zotfile, 
- (Optional) Zotero Browser Extension for Chrome/Firefox. This may be useful for downloading papers to Zotero.

## Setup

### Install Obsidian plugins
For this workflow to work, you will need to install `Zotero Integration, Templater, Dataview` plugins.

It may be difficult to find where the plugins are for the first time. 
- Click the settings icon (ie. ) in the lower left corner of the app.
- Click `Community plugins` on the left panel and select `browse`. This will open window with a list of plugins.
- Search for the plugin (e.g., `Zotero Integration`), click `install`
- Once installed, click `enable`. **This step is necessary to activate the plugin** 

Once you have all the plugins installed, you need to change the settings for each.

#### Zotero Integration Settings

Change settings in the Zotero Integration plugin.
- Go to `Settings --> Community plugins --> Zotero Integration`
- Set `Zotero` as the Database
- Set `Note Import Location`. This is where the notes will be stored in Obsidian. I use `literature` folder in my vault.
- Under `Import Formats`, click `Add Import Format` and add `Output Path` for notes and `Image Output Path`. Choose `Template File` as the template file for Zotero notes. I will provide a template below. Choose the `Bibliography Style`. I use `APA` style.

### Install Zotero plugins
You may need the following plugins: 
It's a bit inconvenient to install Zotero plugins. 
- Download the `.xpi` file for each plugin (e.g., Go to xx)
- Open Zotero, go to `Tools --> Add-ons`
- Click settings icon on the upper right, select `Install Add-on from File...`
- Locate the downloaded `.xpi` file, click `open`, and select `install`

#### Better BibTeX for Zotero
This plugin is useful for creating citation keys (e.g., `author_year`) for papers.
- The citation key is used as note title in Obsidian. To change the citation keys
	- Go to `Zotero --> Settings --> Advanced --> Advanced Configuration --> Config Editor`, search for `better-bibtex.citekeyFormat`. Double click to edit the format.
The default is `​auth.lower + shorttitle(3,3) + year`. I used `auth.capitalize+ year.postfix('\_') + journal` (e.g., `Tashie2022_WaterResour.Res.`). More formatting options are available [here](https://retorque.re/zotero-better-bibtex/citing/)


### Create a template for Zotero Integration

To add a template, create a markdown file named `zotero note template.md`. You can also put it under a folder (e.g., `templates`).

I started with the template provided in [this](https://medium.com/@alexandraphelan/an-updated-academic-workflow-zotero-obsidian-cffef080addd) post. I like the different callouts used for citation, abstract, and etc. However, I don't like the look of the annotations and the images are not embeded in the notes. 

I came across [this post](https://forum.obsidian.md/t/zotero-integration-import-templates/36310) in the Obsidian Forum, which color-codes the highlights and provides image embeding in the annotation. There is one little problem with the color style in the CSS snippet. The colors do not match the ones used in Zotero (see `Variables` in [ref](https://www.zotero.org/support/note_templates)). I have updated the CSS snippet and provided below.

In the end, I combined those two templates and came up with a customized one(see code block below) that I really like.

Here is the color code for highlights:

| Color | Meaning | 
| :------- | :------: |
| <span style="color:yellow;"> yellow</span> | <span style="color:yellow;"> Relavent/important. The default color.</span>  | 
| <span style="color:green;"> green </span> | <span style="color:green;"> Follow up and read the cited papers. </span>  |  
| <span style="color:red;"> red </span> | <span style="color:red;"> Disagree with the author. </span> |  
| <span style="color:magenta;"> magenta </span> | <span style="color:magenta;"> The author critiques previous work or points out knowledge gaps. </span>  |  
| <span style="color:orange;"> orange </span> | <span style="color:orange;"> Questions/confusion about the statement </span>  |  

I will breakdown into different sections:
- Cite: Citation of the paper
- Synthesis: Your personal opinions on this paper.
- Link: Link to the PDF file on your local PC.
- Abstract: Abstract of the article.
- Annotations: All highlights, notes, comments (including box comments), links grouped by color. 
- Metadata: all metadata associated with the paper which are useful for data query using DataView.

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

### Add CSS snippet
To add the CSS snippet, go to ...
```bash
# go to the root directory of your vault (i.e., where notes are stored)
cd PATH/TO/VAULT/.obsidian/snippets
# create a css file, you can also use text editor to create a file. Make sure the file has .css as extention
vi callouts.css
```

Inside the `callouts.css` file, paste the updated CSS snippet as follows:

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

To enable the CSS snippet

- Go to `Settings --> Appearance --> CSS snippets`
- Enable the newly installed snippet (i.e., `callouts`)

This should automatically color your callouts in the notes.

## Workflow

### Highlight and comment
Highlight and comment on the paper as you read. Use the color code for different highlight colors. Use box comment for images (this will save images as snapshots in Obsidian).

### Import the note into Obsidian
Open command pallett and search for `Zotero: Create Literature Note`.Alternative, create a hotkey for that command (e.g., `ctrl + opt + Z`).

In the pop-up box, type in the author to search for literature. Once found, hit `enter`. It will automatically generate a markdown note using the zotero template. 

Here is a screenshot shows the final markdown file in Obsidian. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
		{% include figure.liquid loading="eager" path="assets/img/obsidian_note.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

- The nice thing about the annotations is that each annotation has a link to the page number in the paper. When clicking on the link, it will bring you back to highlighted page of the PDF in Zotero. 
- All snapshots are embeded under annotations, which make it extremely useful for storing key figures.

- Add additional notes. You may add additional notes under `Synthesis` which may include the main contribution of the paper, the impression of the paper and other notes. **Any edits added outside of Synthesis and Annotations will be overriden when the same note is imported again!**. See the Tips below on how to create a customized note section that prevents override.

### Create table using Dataview
Once you have a collection of notes, you can create a DataView query which lists all papers and their key information in a table. This may be helpful for writting literature review.

# Advanced Tips

- If the title of the paper contains colon (`:`), it will mess up the header formatting in the obsidian notes. The workaround is to replace it with something like `-`.
- If you want to add more information in the template and are wondering which keywords to use, you can use `Zotero Data Explorer` to inspect all available keywords. In Obsidian, open command palallet and search for `Zotero Data Explorer`. Once opened, choose `Prompt For Selection` and the associated paper, you will see all meta information.
- The annotations do not have internal links. However, you can add internal links in comments. Simply added comments after the highlights and keywords with internal links (e.g., `[[keyword]]`)
- Obsidian does not auto-sync the literature notes. If new annotations are made in Zotero, the user has to manually pull updated by importing the same literature note again (refer to this [discussion](https://forums.zotero.org/discussion/comment/399431/#Comment_399431)).
- The `persist` tag prevents content from being overwritten. Any notes made in between the `persist` tag will be preserved. In the example below, the notes made in the `notes` section will be preserved. Thus, additional new notes can be added in the `notes` section without being overwritten.

```
{% raw %}
{% persist "notes" %}
{% endpersist %}
{% endraw %}
```

# References
- https://forum.obsidian.md/t/zotero-integration-import-templates/36310
- https://forum.obsidian.md/t/zotero-zotfile-mdnotes-obsidian-dataview-workflow/15536
- https://medium.com/@alexandraphelan/an-updated-academic-workflow-zotero-obsidian-cffef080addd

