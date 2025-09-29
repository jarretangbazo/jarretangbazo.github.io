---
layout: default
title: "Blog"
permalink: /blog
---

<!-- =================================================================
     BLOG PAGE - MAIN LISTING
     Collection of blog posts on data science, energy, and infrastructure
     ================================================================= -->

# Data Science Blog

Thoughts on energy analytics, infrastructure finance, and African development.

<!-- =================================================================
     BLOG POST LISTING
     Jekyll loop to display all blog posts dynamically
     Uses Jekyll's Liquid templating to iterate through site.posts
     ================================================================= -->

<div class="blog-grid">
{% for post in site.posts %}
  <article class="blog-card">
    <!-- Post featured image (optional) -->
    {% if post.image %}
    <img src="{{ post.image }}" alt="{{ post.title }}">
    {% endif %}
    
    <div class="blog-card-content">
      <!-- Post title with link -->
      <h3>
        <a href="{{ post.url }}">{{ post.title }}</a>
      </h3>
      
      <!-- Post metadata: date and reading time -->
      <div class="blog-meta">
        <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
        {% if post.read_time %}
        <span class="read-time"> • {{ post.read_time }} min read</span>
        {% endif %}
      </div>
      
      <!-- Post excerpt/preview -->
      <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
      
      <!-- Read more link -->
      <a href="{{ post.url }}" class="project-link">Read More</a>
    </div>
  </article>
{% endfor %}
</div>

<!-- =================================================================
     NO POSTS MESSAGE
     Displayed when no blog posts exist yet
     ================================================================= -->

{% if site.posts.size == 0 %}
<div class="resume-download-section" style="text-align: center;">
  <h2>Blog Coming Soon</h2>
  <p>I'm currently working on articles about data science applications in African energy and infrastructure. Check back soon!</p>
  
  <div class="cta-buttons" style="justify-content: center;">
    <a href="portfolio.html" class="btn primary">View Portfolio</a>
    <a href="about.html" class="btn secondary">Learn More About Me</a>
  </div>
</div>
{% endif %}

<!-- =================================================================
     SUBSCRIBE SECTION (Optional)
     Newsletter signup or RSS feed link
     ================================================================= -->

<div class="mission-section" style="margin-top: 4rem; text-align: center;">

## Stay Updated

Subscribe to get notified about new posts on data science, energy analytics, and African development.

<!-- Add your email subscription form or RSS link here -->
<div class="cta-buttons" style="justify-content: center;">
  <a href="mailto:your.email@example.com?subject=Blog Subscription" class="btn primary">Subscribe via Email</a>
  <a href="/feed.xml" class="btn secondary">RSS Feed</a>
</div>

</div>