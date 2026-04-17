---
layout: page
permalink: /gallery/
title: Gallery
description: Moments from the field and group activities.
nav: true
nav_order: 4
images:
  slider: true
---

<!--
  Each section below is a Swiper carousel. Add a new photo by dropping a file
  into assets/img/gallery/<section>/ and adding a matching <swiper-slide> that
  calls figure.liquid with `path=` and `caption=`. No other changes needed.
-->

## Field

<swiper-container keyboard="true" navigation="true" pagination="true" pagination-clickable="true" rewind="true">
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/lro-2022_1.jpg" caption="Logan River field campaign, 2022." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/lro-2022_2.jpg" caption="Logan River field campaign, 2022." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/lro-2022_3.jpg" caption="Logan River field campaign, 2022." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/ak-2024_1.jpeg" caption="Alaska field campaign, 2024." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/ak-2024_2.jpeg" caption="Alaska field campaign, 2024." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/ak-2024_3.jpeg" caption="Alaska field campaign, 2024." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/ak-2024_4.jpeg" caption="Alaska field campaign, 2024." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/ak-2024_5.jpeg" caption="Alaska field campaign, 2024." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/gallery/field/ak-2024_6.jpeg" caption="Alaska field campaign, 2024." class="img-fluid rounded z-depth-1" %}</swiper-slide>
</swiper-container>

## Group

<swiper-container keyboard="true" navigation="true" pagination="true" pagination-clickable="true" rewind="true">
  <swiper-slide>{% include figure.liquid path="assets/img/4.jpg" caption="Placeholder — replace with a group photo." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/5.jpg" caption="Placeholder — replace with a group photo." class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid path="assets/img/6.jpg" caption="Placeholder — replace with a group photo." class="img-fluid rounded z-depth-1" %}</swiper-slide>
</swiper-container>
