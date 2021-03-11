---
title: Twitter Realtime Voting
description: A real time voting engine that allow conference attendants to review a talk via Twitter.
datePublished: '2014-05-09T00:00:00Z'
author: Luis Cipriani
tags: code, ruby, web, architecture, twitter, voting, realtime
image: /img-posts/trv-thumb.jpg
---

<div class="float-right">
    <img src="/img-posts/trv-thumb.jpg" width="400" height="308" loading="lazy" alt="Screenshot" />
</div>

In 2014 I was asked to do a Workshop at QCon in São Paulo about Twitter Streaming APIs and I decided to build a website that would allow people to evaluate the talks just like QCon usually do for their events (green, yellow, red cards) but with tweets instead.

I built it using Twitter Streaming API and monitoring specific hashtags to increment the counter and a ruby stack: Sinatra and faye-websocket as backend, Redis as storage and jQuery and Bootstrap for the frontend.

If you interested on how to implement real time counting, how to monitor hashtags in Twitter or how to update web user interfaces using websockets you can check the [source code](https://github.com/lfcipriani/twitter-realtime-voting).

## Technologies used

- Twitter Streaming API and tweetstream gem
- ruby 2.x
- Sinatra (web dashboard)
- faye-websocket (Websocket middleware)
- redis (storage)
- jQuery and Bootstrap (frontend)

## Installing and running

1.  Clone [the repo](https://github.com/lfcipriani/twitter-realtime-voting)
2.  Set up your Twitter credentials in `config/credentials.yml` with your app tokens obtained at apps.twitter.com (see `config/credentials.yml.sample`)
3.  Set up your `config/agenda.yml` file with all talks, the hashtag that will trigger a vote for each one and also their attributes (see `config/agenda.yml.sample`)
4.  Open `config/initializer.rb` and define:
    - Your Event hashtag (used by Twitter tracker)
    - Which words represent each level of quality (see `EVENT_REVIEW_GRADES`)
    - If you will be accepting only one vote per user (see `ACCEPT_ONLY_UNIQUE_VOTES`)
5.  Install and start redis
6.  Run `bundle install` to set up environment
7.  Run `foreman start`
8.  Access `http://localhost:3000` in your browser
9.  Vote! ex.: _"#qconsp #twitterapi #good awesome talk"_

Try to vote to a talk while having it's permalink page open to see the page updating the count

Have fun!
