---
layout: default
title: Blog
permalink: /blog/
---

<p class="eyebrow">Blog</p>
<h1>Writing</h1>
<p>Notes on Nigerian development, data, and soccer &mdash; whatever I'm thinking about.</p>

<ul class="list-plain">
  {% for post in site.posts %}
  <li class="entry">
    <div class="meta">
      <span>{{ post.date | date: "%b %-d, %Y" }}</span>
      {% for tag in post.tags %}<span class="tag">{{ tag }}</span>{% endfor %}
    </div>
    <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    <p>{{ post.excerpt | strip_html | truncatewords: 32 }}</p>
  </li>
  {% else %}
  <li class="placeholder">No posts yet &mdash; check back soon.</li>
  {% endfor %}
</ul>
