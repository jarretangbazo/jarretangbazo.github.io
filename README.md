# jarretangbazo.github.io

Personal site: resume, portfolio, and blog. Built with Jekyll for GitHub Pages.

## Before you push this live

Search the repo for anything in brackets or marked `TODO` / placeholder — these
are spots I couldn't fill in honestly without real information from you:

- `_config.yml` — real email, real LinkedIn URL
- `resume.md` — employment dates, role titles, real bullet points, skills list
- `assets/documents/` — upload your actual resume PDF here
- `_posts/2026-08-07-example-post-replace-me.md` — delete or replace with a real post

## Local development

```
bundle install
bundle exec jekyll serve
```

Then visit `http://localhost:4000`.

## Deploying

Push to `main`. GitHub Pages rebuilds and deploys automatically — no manual
build step needed.

## Adding a blog post

Create a file in `_posts/` named `YYYY-MM-DD-title.md` with frontmatter:

```
---
title: "Your title"
date: 2026-08-07
tags: [nigeria-development]
---

Post content in Markdown.
```
