---
title: "Building a Podcast Search Engine for My University"
date: "2026-5-13"
summary: "How my team built a podcast search engine that indexes and surfaces episodes from our university’s podcast platform in seconds."
tags: ["Python", "Docker", "Audio", "Video"]
draft: false
---

Back in 2019, I was taking a computer science course at UCSD that required us to create an entire product from scratch by the end of the quarter. A couple of friends and I decided to tackle a problem we had with our school’s podcast system—and here’s how it turned out.

## The problem

UCSD runs its own podcast system where *most* campus lectures are recorded and uploaded to a central platform that students can access. At the time, however, the system lacked transcription support, so students had to sift through multiple videos—sometimes spanning hours—just to find specific topics.

## The solution

We decided that building a podcast search engine with transcription and text search support would be the best solution to this problem. We weren’t exactly sure how we were going to pull it off, but after countless sessions and meetups after class, we landed on an approach that we believed was feasible.

We used a Python script to scrape the podcasts from the UCSD platform, then ran them through Google Cloud’s Speech‑to‑Text API and indexed the transcriptions into Elasticsearch. This was then exposed to the frontend via a Python REST API.

## The stumbles along the way

During development, we ran into several issues, both technical and conceptual. On the technical side, most of the team used Macs, while I used Windows; I would often struggle to run our code, only to discover it was an EOL–character issue caused by Mac‑specific line endings being pushed to Git. Time was another constraint: we simply didn’t have enough time to implement everything we wanted to the quality we had hoped for, while juggling this project with other courses and coursework.

On the conceptual side, the idea sounded good in theory, but UCSD restricts podcast access to students enrolled in a given class. That made it hard to gather a wide range of podcasts. We also had to re‑transcribe each episode every time, so realistically we couldn’t scale to every podcast UCSD had at the time. Legally, I’m also not sure whether UCSD would have been comfortable with us building such a system on top of their content.

## What it taught me

Scheduling is hard: start early and start often. Managing a team of 11 people is hard. I learned a lot about how to scrape websites, work with Python, handle transcription, play with Elasticsearch, and design databases. A big chunk of my software engineering intuition was born during this project, working on something real.

<iframe 
  width="100%" 
  height="315" 
  src="https://www.youtube.com/embed/wJXGAqXLZew" 
  frameborder="0" 
  allowfullscreen>
</iframe>


