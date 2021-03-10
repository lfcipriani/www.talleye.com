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

<div class="media">
<iframe class="media-asset" src="//www.slideshare.net/slideshow/embed_code/key/GjYwa73kVtvkP6" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/lfcipriani/explaining-semantic-web" title="Explaining Semantic Web" target="_blank">Explaining Semantic Web</a> </strong> from <strong><a href="https://www.slideshare.net/lfcipriani" target="_blank">Luis Cipriani</a></strong> </div>
</div>
