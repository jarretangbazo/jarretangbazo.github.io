---
layout: default
title: Home
---

<div class="hero">
  <p class="eyebrow">Applied Economist &amp; Research Methodologist</p>
  <h1>Jarret Angbazo</h1>
  <p class="lede">Quantitative research, causal inference, and honest writing on Nigerian development, data, and soccer.</p>
  <div class="hero-actions">
    <a class="btn primary" href="{{ '/resume/' | relative_url }}">Download resume</a>
    <a class="btn" href="{{ '/portfolio/' | relative_url }}">View portfolio</a>
  </div>
</div>

<hr class="section-divider">

<h2>What I do</h2>
<p>
  I'm a research methodologist and applied economist with a background spanning
  NORC at the University of Chicago, the World Bank's Development Economics Research
  Group, and Innovations for Poverty Action, with fieldwork across more than 20
  countries in Sub-Saharan Africa. My core strength is quantitative analysis and
  causal inference &mdash; survey design, program evaluation, and turning messy data
  into decisions people can act on.
</p>

<h2>Recent work</h2>
<ul class="list-plain">
  <li class="entry">
    <div class="meta"><span class="tag">data science</span></div>
    <h3><a href="{{ '/portfolio/' | relative_url }}">DrivenData competitions</a></h3>
    <p>Flu Shot Learning, DengAI, and Pump It Up &mdash; applied ML projects built to sharpen Python and modeling skills.</p>
  </li>
</ul>

<h2>Latest from the blog</h2>
<ul class="list-plain">
  {% for post in site.posts limit:3 %}
  <li class="entry">
    <div class="meta">
      <span>{{ post.date | date: "%b %-d, %Y" }}</span>
      {% for tag in post.tags %}<span class="tag">{{ tag }}</span>{% endfor %}
    </div>
    <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    <p>{{ post.excerpt | strip_html | truncatewords: 28 }}</p>
  </li>
  {% else %}
  <li class="placeholder">No posts yet &mdash; check back soon.</li>
  {% endfor %}
</ul>
