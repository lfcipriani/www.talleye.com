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

<div class="media">
<iframe class="media-asset" src="//www.slideshare.net/slideshow/embed_code/key/CRtkqgvfs2wdCd" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/lfcipriani/case-abril-tracking-real-time-user-behavior-in-websites-homes-with-ruby-sinatra-heroku-redis" title="Case Abril: Tracking real time user behavior in websites Homes with Ruby, Sinatra, Heroku, Redis" target="_blank">Case Abril: Tracking real time user behavior in websites Homes with Ruby, Sinatra, Heroku, Redis</a> </strong> from <strong><a href="https://www.slideshare.net/lfcipriani" target="_blank">Luis Cipriani</a></strong> </div>
</div>
