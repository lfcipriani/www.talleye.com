---
title: Goal! Detecting the most important World Cup moments
description: A simple strategy to detect spikes in Tweets and how to create a bell that rings at each goal using Raspberry Pi.
datePublished: '2014-06-23T00:00:00Z'
author: Luis Cipriani
tags: code, talk, IoT, twitter, ruby, python
image: /img-posts/gdmiwcm-schematic.png
---

_This article was originally published in [Twitter Developer Blog](https://blog.twitter.com/developer/en_us/a/2014/goal-detecting-the-most-important-world-cup-moments.html) during my time there as Developer Advocate._

Billions of fans around the world are tuned in to the World Cup matches, and many use Twitter to support their teams and join in the global public conversation about the games.

At the end of May, we held a World Cup-themed hackathon in São Paulo, Brazil. Between helping to organize the event and mentoring some of the teams, I played a little bit with [Raspberry Pi](http://www.raspberrypi.org/) and the [Twitter Streaming API](https://dev.twitter.com/docs/api/streaming). My idea was to build a goal bell that would ring when the volume of Tweets around a specific goal grew very quickly. In order to do this, I had to connect to the Streaming API so as to calculate the frequency of Tweets mentioning “goal”, and create a device that would ring a bell when a spike in that frequency was detected.

Spoiler alert: if you are curious about how I built the bell before hearing the specifics, take a look at this video:

<div class="media">
<video controls loop playsinline preload="auto" class="media-asset">
    <source src="/img-posts/gdmiwcm-tilingol.m4v"
            type="video/mp4">
    <p>Your browser doesn't support HTML5 video. Here is
     a <a href="/img-posts/gdmiwcm-tilingol.m4v">link to the video</a> instead.</p>
</video>
</div>

## Detecting spikes in Tweet volume

Detecting relevant events in time-series data is not exactly rocket science, and there are [plenty of research articles on that topic](http://scholar.google.com.br/scholar?hl=en&q=event+detection+twitter&btnG=&as_sdt=1%2C5&as_sdtp=). But sometimes the implementation of these techniques is too complex to be applied in short period of time. I decided to build a simpler, less-precise solution that would work well enough for my needs. I started with the hypothesis that during any given game, lots of fans would Tweet when a goal was scored.

Thankfully, some simulations I did demonstrated that this pulse can be easily detected. Take a look at this data from the second half of the first World Cup match between Brazil and Croatia:

![](/img-posts/gdmiwcm-tps01.png)
_Image 1: Tweets per second mentioning “gol copa, gool copa, goool, golaço” during the match June 12th, 2014._

To get this data, I simply connected to the [POST status/filter](https://dev.twitter.com/docs/api/1.1/post/statuses/filter) endpoint of the [Streaming API](https://dev.twitter.com/docs/api/streaming). There I monitored for mentions of the Brazilian Portuguese words for “goal”, “world cup” and their variations, and then calculated their frequency in Tweets per second (TPS). Looking at the resulting graph above it is easy to identify when the goals occured.

The next step was to convert this noisy data into a baseline value that could serve as a trigger for the bell when that threshold was reached. To achieve this, I used a simple statistical tool: [exponential moving average (EMA)](http://en.wikipedia.org/wiki/Exponential_smoothing). Rather than showing you all the formulas, let’s instead visualize what EMA does:

![](/img-posts/gdmiwcm-tps02.png)
_Image 2: EMA calculated based on Tweets per second around the first goal during the second half of Brazil vs. Croatia._

As you can see, EMA smoothed the noisy Tweets-per-second data and gave us a cleaner time-series data set. To detect the goal spike, I then calculated a simple growth value relative to 10 seconds prior: **(EMA now - EMA 10 sec ago) / EMA 10 sec ago**. Let’s again use a visualization to see how this formula helped to determine the baseline trigger:

![](/img-posts/gdmiwcm-tps03.png)
_Image 3: Spike detection using relative growth around the first goal during the second half of Brazil vs. Croatia._

When the growth calculation results were greater than 1.5 (which meant that we saw a 150% growth rate in Tweets per second between present and the previous 10 seconds) the algorithm fired the trigger that happily rang the goal bell. Let’s zoom out and see the whole second half, removing the EMA curve:

![](/img-posts/gdmiwcm-tps04.png)
_Image 4: Spike detection using relative growth during the second half of Brazil vs. Croatia. Yes, we had two goals scored during this period._

It was interesting to see that the first goal had stronger growth. In my opinion, Twitter users were ready to tweet as soon as the goal was scored (because it was a penalty kick by [Neymar](https://twitter.com/neymarjr)), which resulted in more people tweeting over a shorter period of time. As you can also see on the last graph, the way growth was calculated helped to identify only when the Tweets-per-second frequency varied more quickly and in a larger amplitude (i.e., when a very exciting event happened during a game).

There are implementations of these calculations in [Python](https://github.com/lfcipriani/tilingol/blob/master/python/peak_detection.py) and [Ruby](https://github.com/lfcipriani/tilingol/blob/master/peak_detection.rb) if you want to try them out yourself. The code for connecting to the Streaming API is relatively short and simple:

```ruby
@client = TweetStream::Client.new

@client.on_error do |message|
  puts "ERROR: #{message}"
end
@client.on_enhance_your_calm do
  puts "Calm down"
end
@client.on_limit do |skip_count|
  puts "You lost #{skip_count} tweets"
end

puts "Starting to track: #{@keywords}...\nLanguages: #{@languages}"
@client.filter(:track => @keywords, :language => @languages) do |status|
  @peak_detector.collect_frequency

  @bell.ring! if @peak_detector.is_this_a_peak? || status.text.index(@magic_word)
end
```

[https://github.com/lfcipriani/tilingol/blob/master/tilingol.rb#L40](https://github.com/lfcipriani/tilingol/blob/master/tilingol.rb#L40)

You can also [download the data](https://github.com/lfcipriani/tilingol/blob/master/data/TweetsPerSecond_BrazilvsCroatia.csv) captured during the game if you want to try plotting it in other ways.

## Ringing the bell

Once you have the implemented goal-detection algorithm, your device should then ring the goal bell. I decided to use a [Raspberry Pi](http://www.raspberrypi.org/) for this. This was the first time I played with it, and I found its potential to be amazing. I built the bell using materials I had at home and borrowed some other items from friends. Here’s the parts list with a brief explanation on how each piece was used:

- Raspberry Pi rev 2: The computer unit that ran the Streaming API connection, detected the spikes and controlled ringing of the bell;
- [Servo motor](http://en.wikipedia.org/wiki/Servomotor): A tiny motor that allowed precise control of position, velocity and acceleration. It was used to shake the bells;
- [Jumper wires](http://en.wikipedia.org/wiki/Jump_wire): These were used to connect the Raspberry Pi and the servo motor;
- [Christmas jingle bells](https://www.google.com/search?q=jingle%20bells&gws_rd=ssl&tbm=isch): An appropriately exciting sound for goal notifications;
- Plastic coffee mixer: This was used to increase the movement amplitude of the servo motor;
- Paper clips: These held the bells;
- Lego blocks: These were used to build the structure that held the motor and the Raspberry Pi… not to mention making the project look cool and nerdy.

Here’s a graphic representation of the connections, all fairly simple:

![](/img-posts/gdmiwcm-schematic.png)
_Image 5: Schematic of the hardware project. Use at your own risk!_

The code that activates the pin and does the shaking is below:

```python
import RPi.GPIO as GPIO
import time
import sys

class JingleBells:

    def __init__(self, pin):
        self.pin = pin
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.pin, GPIO.OUT)

    def shake(self, iterations, speed):
        self.pwm = GPIO.PWM(self.pin, 100)
        self.pwm.start(19)
        time.sleep(speed)
        for n in range(iterations):
            self.pwm.ChangeDutyCycle(16)
            time.sleep(speed)
            self.pwm.ChangeDutyCycle(19)
            time.sleep(speed)
        self.pwm.stop()

    #def __del__(self):
    #    GPIO.cleanup()

if __name__ == '__main__':
    jb = JingleBells(18)
    jb.shake(int(sys.argv[1]), float(sys.argv[2]))
    GPIO.cleanup()
    exit()
```

[https://github.com/lfcipriani/tilingol/blob/master/jinglebells.py](https://github.com/lfcipriani/tilingol/blob/master/jinglebells.py)

You just need to execute the Python file and decide how many times the bell will shake (iterations parameter) and at what speed. Then we just call this program from the goal detection algorithm we previously implemented. The only important thing is to call it asynchronously, because we don’t want to enqueue the flow of Tweets coming through the Streaming connection (see [https://github.com/lfcipriani/tilingol/blob/master/jingle_bell.rb](https://github.com/lfcipriani/tilingol/blob/master/jingle_bell.rb)).

It’s out of scope of this article to explain what [PWM](http://en.wikipedia.org/wiki/Pulse-width_modulation) is and how to use [GPIO library](https://pypi.python.org/pypi/RPi.GPIO), but know that there are many good resources about that on [Raspberry Pi’s website](http://www.raspberrypi.org/).

## Wrapping up

I just showed you how easily you can detect goals using the volume of Tweets coming from the Streaming API. After identifying these goals, you can decide the best way to notify someone that it happened… but I must say, using a Raspberry Pi is a really fun way to do it. When talking about the Twitter platform, we always say that the API is a great way to connect to the pulse of the planet and here we’ve proven that it can be tapped and interpreted in fun, interesting ways!

All the code built to make this happen is available at [GitHub](https://github.com/lfcipriani/tilingol). Also I want to thank [@luisleao](https://twitter.com/intent/user?screen_name=luisleao) for helping with the hardware part during the hackathon.

## One more thing

This blog post was later turned into a tech talk where I detailed a bit more the hardware part and some challenges I faced when building this project. The slides are embedded below:

[![](/img-posts/gdmiwcm-slides.jpg)](https://www.slideshare.net/lfcipriani/adventures-with-raspberry-pi-and-twitter-api 'Open Slideshare')
