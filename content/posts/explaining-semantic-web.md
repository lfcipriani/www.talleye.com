---
title: Explaining Semantic Web
description: Short intro and presentation about Semantic Web at Abril
datePublished: '2012-06-01T00:00:00Z'
author: Luis Cipriani
tags: semantic, web, abril, architecture, web
image: /img-posts/esw-thumb.jpg
---

<div class="float-right">
    <img src="/img-posts/esw-thumb.jpg" width="400" height="308" loading="lazy" alt="Linked data graph" />
</div>

Few weeks ago I gave an introduction to Semantic Web at the Sao Paulo Ruby User Group (GURU, in portuguese). Since Semantic Web is a very broader term that entail tons of technologies and tools, I decided to focus more on explaining the single main reason that make companies apply it in their projects:

## Data Integration

We, as software engineers and product managers, face a lot of problems, specially in big companies, when we need to integrate data coming from several sources. Anytime I needed to do this, I realize that I kept rumbling to myself: "Why we don’t have only one universal metadata for our data? How we let this happen?"

The big triumph provided by the Semantic Web set of technologies, specifications and tools is to enable you, as owner of highly variable data and metadata, to organize it in a way that you can find any information and derive knowledge as easily as a SQL-like query. This is possible because we start to represent the data in the simplest way possible: **a triple** (subject -> predicate -> object). For example:

- Abril_Engineering_blog > is_owned_by > Abril
- Abril_Engineering_blog > is_hosted_by > Tumblr
- Luis_Cipriani > work_at > Abril

By establishing relationships with all your data based on a controlled and known metadata (better known as ontology), you create the most flexible format for representing a data, and from this point, you can derive anything the quality of your data would allow.

At Abril we have a perfect environment to use this strategy for data integration, since we produce a lot of content that we are able to extract structure, such as, people, events, venues, articles, user comments, etc. Some projects are on their way and others are about to start. We hope to be talking about it sooner.

Meanwhile, check the presentation slides below, it has more detail about the technologies and cases (in Portuguese):

[![](/img-posts/esw-slides.jpg)](https://www.slideshare.net/lfcipriani/explaining-semantic-web 'Open Slideshare')
