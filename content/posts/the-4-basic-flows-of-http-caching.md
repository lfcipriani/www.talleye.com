---
title: The 4 basic flows of HTTP Caching
description: An illustrated introduction to HTTP and API Caching in general.
datePublished: '2013-11-03T00:00:00Z'
author: Luis Cipriani
tags: architecture, web, api, performance, caching
image: /img-posts/t4bfhc-thumb.png
---

Every web developer probably had used cache one day in their web apps or APIs to avoid redundant data traffic, network bottlenecks, protect your server from load spikes or simply long network latencies. The concept of caching is usually well understood and easily applicable in practice thanks to [open source tools](https://href.li/?http://en.wikipedia.org/wiki/Web_cache#Comparison_of_web_caches 'comparison of web caches'). However, to build a good cache strategy, i.e. a strategy that defines what can be cached, how long can you cache something and what policy you’ll follow after some resource is staled, is a hard and incremental process that need:

1.  knowledge of how your resources are consumed by users;
2.  understanding of how [HTTP caching protocol works](https://href.li/?http://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html 'HTTP caching RFC') (HTTP headers everywhere);
3.  patience to solve problems when tools don’t honor the protocol (believe me, this is very common)

The first one is up to you. The third one is an inherently issue of every computer system and you should be used to that too. Time and experience will help you to deal with this burden, but there’s always mailing lists and web search to save the day.

This post is an illustrative contribution to item 2 and presents the four basic flows of HTTP caching that can be implicitly extracted from the RFC. These flows shows how clients, server and caching software will behave depending on the status of the resource being requested and its location in the topology. And by “basic” I mean that they could vary depending on the cache strategy, so use them as a starting point. Let’s go!

## Cache Miss

<div class="media">
<video controls loop playsinline preload="auto" class="media-asset">
    <source src="/img-posts/t4bfhc-cache01-miss.m4v"
            type="video/mp4">
    <p>Your browser doesn't support HTML5 video. Here is
     a <a href="/img-posts/t4bfhc-cache01-miss.m4v">link to the video</a> instead.</p>
</video>
</div>

## Cache Hit

<div class="media">
<video controls loop playsinline preload="auto" class="media-asset">
    <source src="/img-posts/t4bfhc-cache02-hit.m4v"
            type="video/mp4">
    <p>Your browser doesn't support HTML5 video. Here is
     a <a href="/img-posts/t4bfhc-cache02-hit.m4v">link to the video</a> instead.</p>
</video>
</div>

**Curious fact**: this animation length is half of the “Cache miss” length. 😉

## Cache Revalidation (Condition False)

<div class="media">
<video controls loop playsinline preload="auto" class="media-asset">
    <source src="/img-posts/t4bfhc-cache03-revfalse.m4v"
            type="video/mp4">
    <p>Your browser doesn't support HTML5 video. Here is
     a <a href="/img-posts/t4bfhc-cache03-revfalse.m4v">link to the video</a> instead.</p>
</video>
</div>

## Cache Revalidation (Condition True)

<div class="media">
<video controls loop playsinline preload="auto" class="media-asset">
    <source src="/img-posts/t4bfhc-cache04-revtrue.m4v"
            type="video/mp4">
    <p>Your browser doesn't support HTML5 video. Here is
     a <a href="/img-posts/t4bfhc-cache04-revtrue.m4v">link to the video</a> instead.</p>
</video>
</div>

If you want to dig deeper on the subject, this content above was included in a talk I [presented at Rubyconf Brazil 2013](https://www.eventials.com/locaweb/caching-de-apis-na-pratica-porque-seu-servidor-merece-um-descanso/) about HTTP Caching (intro and good practices). The slides are embedded below:

[![](/img-posts/t4bfhc-slides.png)](https://www.slideshare.net/lfcipriani/api-caching-why-your-server 'Open Slideshare')

You might also like to explore the **[HTTP headers RFC](https://href.li/?http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14 'Headers in HTTP RFC')**.
