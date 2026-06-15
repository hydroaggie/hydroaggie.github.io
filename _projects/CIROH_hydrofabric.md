---
layout: page
title: Hydrofabric Enhancement
description: "CIROH: Advance water management-hydrologic model coupling to improve hydrologic forecasting in managed watersheds"
img: assets/img/logos/NOAA-CIROH_logo.png
importance: 1
category: Active
related_publications: false
toc_sections:
  - id: summary
    label: Project Summary
  - id: news
    label: Project News
updates:
  - date: 2026-05-01
    title: "First Publication from the Project!"
    text: "New publication out by [Ebrahimi et al. (2026)](https://doi.org/10.1016/j.envsoft.2026.106955) on the development of an extended hydrofabric as a standardized geospatial database for reproducible water management modeling. This works produced a model-ready water management dataset for coupling water management models (e.g., MODSIM) with national-scale hydrologic models (e.g., NHM and NWM), and demonstrates the application of the extended hydrofabric in the headwaters of the Colorado River Basin."
    img: assets/img/projects/ebrahimi2026_graphical_abstract.jpg
  - date: 2026-05-28
    title: "2026 CIROH DevCon: Ehsan Ebrahimi Receives Inaugural Early Career Paper Award"
    text: "Congratulations to [Ehsan Ebrahimi](/members/Ehsan_Ebrahimi) for receiving the inaugural Early Career Paper Award at the 2026 CIROH Developers Conference in Salt Lake City! As part of the award, Ehsan presented a keynote talk on the extended hydrofabric and its application in coupling water management models with hydrologic models."
    img: assets/img/projects/ehsan_early_career_award.jpg
  - date: 2024-12-09
    title: "First Team Meet Up at AGU 2024"
    text: "We meet as a group during the AGU 2024 meeting in Washington D.C. [Ehsan Ebrahimi](/members/Ehsan_Ebrahimi) presents a poster on our project. Picture shows (from left to right) Sophia, Enrique, me and Ehsan."
    img: assets/img/projects/agu2024_team_meetup.jpg
_styles: |
  .project-toc {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    margin-bottom: 1.75rem;
    background: var(--global-bg-color, #f8f9fa);
    border: 1px solid var(--global-divider-color, #dee2e6);
    border-radius: 0.375rem;
    font-size: 0.875rem;
  }
  .project-toc-label {
    font-weight: 600;
    color: var(--global-text-color, #343a40);
    margin-right: 0.25rem;
  }
  .project-toc-link {
    padding: 0.2rem 0.6rem;
    border-radius: 0.25rem;
    color: var(--global-theme-color, #0066cc);
    text-decoration: none;
    transition: background 0.15s;
  }
  .project-toc-link:hover {
    background: var(--global-hover-color, #e9ecef);
  }
  .project-news {
    margin-top: 0.5rem;
  }
  .news-group-block {
    margin-bottom: 1.5rem;
  }
  .news-group {
    font-size: 1rem;
    font-weight: 700;
    color: var(--global-theme-color, #0066cc);
    border-bottom: 2px solid var(--global-theme-color, #0066cc);
    padding-bottom: 0.25rem;
    margin-bottom: 0.75rem;
  }
  .news-entry {
    padding: 1.5rem 0;
    border-top: 1px solid var(--global-divider-color, #dee2e6);
    margin-bottom: 0;
  }
  .news-entry-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--global-text-color, #343a40);
    margin-bottom: 0.75rem;
  }
  .news-body p:last-child {
    margin-bottom: 0;
  }
---

<span id="top"></span>
{% include project_toc.liquid %}

## Project Summary {#summary}
---
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/extended_hydrofabric.png" title="Extended hydrofabric" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Project overview. Water management infrastructure includes reservoirs, agricultural and domestic water use.
</div>


Human activities such as water diversion, reservoir management, and irrigation significantly impact streamflow. While water management models (WMMs) address these aspects, they are not seamlessly integrated with hydrologic models. This project aims to bridge this gap by enhancing the existing national hydrologic geospatial fabric (hydrofabric) and creating data and tools for coupling WMMs with hydrologic models. The project has two main objectives: (1) to extend the hydrofabric to include water management infrastructure and water use data for coupling WMMs and hydrologic models, and (2) to demonstrate the applicability of this extension by coupling a WMM (e.g., MODSIM) with USGS Enterprise Capacity (EC) models in selected managed watersheds. The overarching expected contribution is to identify a roadmap, requirements, and challenges for coupling WMMs and hydrologic models nationwide. The research plan involves tasks focused on identifying data availability, gaps, and challenges in representing water management infrastructure and water use in the hydrofabric for coupling WMMs and hydrologic models. These tasks include data review, developing methods for extending the hydrofabric, and creating software packages and workflows for processing data for the WMMs. The project will test the model coupling using the enhanced hydrofabric in one or two selected managed watersheds. The project's outcomes are expected to improve water forecasting in managed watersheds by integrating human effects into the modeling system. It will result in an extended hydrofabric and tools for coupling WMMs with the EC hydrologic models, aiding water resource assessment and supply forecasting in managed watersheds. This is critical for effective water resource management, particularly under changing climatic conditions.

**Funding Agency**:

U.S. Geological Survey (USGS) through the Cooperative Institute for Research to Operations in Hydrology (<a href="https://ciroh.ua.edu/">CIROH</a>) with The University of Alabama.

**Team**:

[Pin Shuai](/members/Pin_Shuai), Utah State University (PI)

Enrique Triana, RTI International (Co-PI)

[Ehsan Ebrahimi](/members/Ehsan_Ebrahimi), Utah State University (PhD student)

Sophia Bakar, RTI International (Intern)

**Duration**:

2023-2025

**Total Funding**:

$340,000

<a href="https://ciroh.ua.edu/research-projects/advance-water-management-hydrologic-model-coupling-to-improve-hydrologic-forecasting-in-managed-watersheds/"><b>External Link</b></a>

## Project News {#news}
---
{% include project_news.liquid %}

<p><a href="#top" class="project-toc-link">&#8593; Back to top</a></p>
