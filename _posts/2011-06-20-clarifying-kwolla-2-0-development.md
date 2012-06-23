---
layout: post
title: "Clarifying Kwolla 2.0 Development"
permalink: /entry/clarifying-kwolla-2-0-development.html
comments: false
author: Vic Cherubini
---

After I declared that I'm retiring from PHP and that Kwolla 2.0's release was being delayed, I got several emails asking why I was canceling the project. To be clear, I am not canceling Kwolla 2.0. I love hacking on Kwolla and believe it will be a great product one day. 

Kwolla 2.0 will not be written in PHP. I'm going to scrap the PHP code written so far and use the ideas to rebuild Kwolla 2.0 in Scala (most likely using the Thrift framework). The current PHP behind Kwolla 2.0 is some of the best code I've ever written, but I'm not interested in continuing to build Kwolla 2.0 in PHP nor do I have any interest whatsoever in supporting it in PHP.

With the release of Kwolla, I've learned the PHP ecosystem is still very poor. While I never released any official Kwolla documentation, working with people with little to no software development experience (much less the expertise to operate a website) is frustrating to say the least. With the ubiquity of PHP, it's very easy to find a cheap $4.95/mo host that supports PHP, but that's not a viable environment for a social network. Moving to Scala means developers wishing to use Kwolla will come with a set of skills not often found in greater PHP community.

If I'm going to build something, I'm going to enjoy doing it. I wake each morning at 4am to work on my side projects, and getting up that early to hack on PHP code did not bring the same joy it did years ago. I was not learning anything new and it became tedious. Deciding to learn Scala has had the opposite effect. The alarm clock still goes off at the same time, but I wake eager to read another chapter in *Programming in Scala*. 

That is the skinny on Kwolla 2.0: it's not going anywhere, I still plan on building it, but it will be with Scala. If you would still like a refund, I will issue one.
