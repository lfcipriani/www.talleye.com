---
title: 'Project: Tweet Jukebox'
description: A music jukebox powered by tweets built with a Twitter bot, a Raspberry Pi, nodejs and Mopidy music server.
datePublished: '2014-11-14T00:00:00Z'
author: Luis Cipriani
tags: code, IoT, twitter, rapsberry pi, nodejs, music
image: /img-posts/ptj-tweetjukebox.png
---

At Twitter, every Friday we have Tea Time, which is a team event in the office to wrap up the week and hangout with colleagues. Usually we have music playing in the background and this gave me the idea to build a Jukebox powered by tweets, but it had to be something that I just plug in the power outlet and work out of the box.

This is the result after a few weeks of work:

![](/img-posts/ptj-tweetjukebox.png)

## Architecture

Under the hood this is what's happening:

```js
                +---------------------------------+
                |                                 |
Tweet           | Raspberry Pi                    |
(music request) |                                 |
   +            | +-----------+      +----------+ |       Music powered by
   |            | | Twitter   | +--> | Mopidy   | |             Spotify
   +--------------> Streaming |      | Server   +------------>  Youtube
     network    | | API       | <--+ |          | |  audio      Soundcloud
                | +-----------+      +----------+ |
                |                                 |
                +---------------------------------+
```

This is what's running on the Raspberry Pi:

- [Mopidy](https://www.mopidy.com/) python open source music server
- Mopidy [Spotify](https://github.com/mopidy/mopidy-spotify), [Youtube](https://github.com/dz0ny/mopidy-youtube), [Soundcloud](https://github.com/mopidy/mopidy-soundcloud) plugins that sources audio from these services.
- Written in Node.js
- UsesTwitter [REST](https://dev.twitter.com/rest/public) and [Streaming](https://dev.twitter.com/streaming/overview) API to monitor mentions to the bot username requesting music.

## Twitter Bot syntax

![](/img-posts/ptj-tweet.png)

The syntax is based on a simple rule:

```
@jukebox_user song name [by artist] [#spotify|#youtube|#soundcloud]
```

or

```
@jukebox_user [link to a spotify, youtube or soundcloud music]
```

- bot will play the first result found for the query sent to Mopidy
- artist is optional, but can help to search the right song
- you can restrict the search to a specific source by using the hashtag with source name
- if no music #source is specified, it will play the first result found on Spotify, then Youtube, then Soundcloud

A pre-configured admin user can send DM messages to jukebos user to #play, #pause, #next (skip song).

## Hardware

To be able to run out of the box, I improvised a case with a display and some buttons to control the music, the skip button is especially important to avoid some unwanted songs 😁.

The schematic below shows the connections from raspberry PI GPIO and the buttons and displays.

![](/img-posts/ptj-schematic.png)

## Source Code

You can find the [source code in Github](https://github.com/lfcipriani/tweet-jukebox). Hope you have as much fun as I did running this jukebox in the office.
