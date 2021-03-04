---
title: 'Project: Pinboogle'
description: A search playground with Pinboard web scraping and Solr search engine deployed on docker containers.
datePublished: '2016-11-12T00:00:00Z'
author: Luis Cipriani
tags: code, architecture, python, web, tool
image: /img-posts/pp-thumb.jpg
---

When bootstrapping [Nestpick](https://www.nestpick.com/) in 2016, I decided to work on a web scraping and search playground so I could learn and prototype the features that we would be adding to the product later. Nestpick is an apartment mid-term rental aggregator that allow users to search on several providers at once. The technical solution relies on scraping these partners via API or web and indexing this data on a search engine component.

I partnered again with [Luiz Rocha](https://twitter.com/lsdr), a long time friend, to build this playground using [Scrapy](https://scrapy.org/) and [Solr](https://solr.apache.org/).

> [The code is available at Github](https://github.com/spare-time/pinboogle#pinboogle)

The project is structured in X parts:

- Web scraper that fetches the content of all bookmarked links in [Pinboard.in](https://pinboard.in/), using Scrapy.
- Index that is stored in Solr search engine
- A search frontend built in python Flask framework that work as a Solr client.

The project README shows you how to setup it yourself so feel free to use it in case you need to play around search engines and web scraping.
