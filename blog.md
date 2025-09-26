---
layout: default
title: "Blog"
permalink: /blog
---

# Data Science Blog

Thoughts on energy analytics, infrastructure finance, and African development.

<ul class="post-list">
  {% for post in site.posts %}
    <li>
      <h3>
        <a href="{{ post.url }}">{{ post.title }}</a>
      </h3>
      <span class="post-meta">{{ post.date | date: "%B %d, %Y" }}</span>
      <p>{{ post.excerpt }}</p>
      <a href="{{ post.url }}" class="read-more">Read More →</a>
    </li>
  {% endfor %}
</ul>