---
layout: page
permalink: /gallery/
title: Gallery
description: Moments from the field and group activities.
nav: true
nav_order: 4
images:
  slider: true
_styles: |
  swiper-slide img {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: min(600px, 60vw);
    margin: 0 auto;
  }
---

<!--
  Each section below is a Swiper carousel. Add a new photo by dropping a file
  into assets/img/gallery/<section>/ and adding a matching <swiper-slide> that
  calls figure.liquid with `path=` and `caption=`. No other changes needed.
-->

## Field

<swiper-container keyboard="true" navigation="true" pagination="true" pagination-clickable="true" rewind="true">
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/bsf-2025_1.jpg" caption="Blacksmith Fork River field campaign, 2025." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/bsf-2025_2.jpg" caption="Blacksmith Fork River field campaign, 2025." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/bsf-2025_3.jpg" caption="Blacksmith Fork River field campaign, 2025." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/ak-2024_1.jpeg" caption="Alaska field campaign, 2024." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/ak-2024_2.jpeg" caption="Alaska field campaign, 2024." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/ak-2024_3.jpeg" caption="Alaska field campaign, 2024." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/ak-2024_4.jpeg" caption="Alaska field campaign, 2024." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/ak-2024_5.jpeg" caption="Alaska field campaign, 2024." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/ak-2024_6.jpeg" caption="Alaska field campaign, 2024." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/lro-2022_1.jpg" caption="Logan River field campaign, 2022." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/lro-2022_2.jpg" caption="Logan River field campaign, 2022." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/lro-2022_3.jpg" caption="Logan River field campaign, 2022." class="img-fluid rounded z-depth-1" %}</swiper-slide>
</swiper-container>

## Group

<swiper-container keyboard="true" navigation="true" pagination="true" pagination-clickable="true" rewind="true">
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/group/group_2026.jpg" caption="Group photo, May 2026. From left: Tarun Agrawal, Collins Stephenson, Devon Hill, Pin Shuai, and Ehsan Ebrahimi." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/group/agu_2024.jpeg" caption="Academic family meet at AGU, 2024." class="img-fluid rounded z-depth-1" %}</swiper-slide>
</swiper-container>
