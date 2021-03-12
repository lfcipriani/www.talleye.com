---
title: Tracking real time clicks on website home pages
description: Project slideshow for a real time analytics tool we built for Abril web properties to track user clicks on home pages of their websites.
datePublished: '2012-01-28T00:00:00Z'
author: Luis Cipriani
tags: architecture, web, ruby, performance, tool, javascript
image: /img-posts/trtcwhp-thumb.jpg
---

During my time at Abril, the second largest media company in Brazil, we worked in a project to track the user clicks in home pages so the editors could change the home page of the website properties to more popular news articles and consequently, make the landing pages more attractive content-wise.

We built a simple Sinatra ruby web app, with Redis as persistent storage, to track these user clicks and in 1 month we served around 1 million hits per day for 17 different websites from Abril.

Later I did a presentation about the project in a Ruby User Group Meetup in Brazil, the slides are available in Slideshare:

[![](/img-posts/trtcwhp-slides.png)](https://www.slideshare.net/lfcipriani/case-abril-tracking-real-time-user-behavior-in-websites-homes-with-ruby-sinatra-heroku-redis 'Open Slideshare')
