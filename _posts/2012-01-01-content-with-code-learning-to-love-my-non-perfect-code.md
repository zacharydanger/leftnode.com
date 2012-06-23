---
layout: post
title: "Content With Code: Learning to Love My Non-Perfect Code"
permalink: /entry/content-with-code-learning-to-love-my-non-perfect-code.html
comments: false
author: Vic Cherubini
---

My biggest goal regarding programming and engineering for 2012 is not to learn a new language or two, or a new framework, or to become a famous hacker, but rather, to be more content with the code I produce.

This is a serious problem I have; it delays projects and adds more stress to my programming. I spend hours obsessing over the smallest memory savings, or shaving milliseconds off large queries mostly for naught.

When I first started playing with Perl in 1998, I was obsessed with making long programs. I was fascinated by creating a collection of code with thousands of lines. I envied developers who could write tomes of code and publish it on their website for neophytes like me to consume. It was only later that I learned the less code you have to maintain, the better off you will be.

I frequently have that same feeling now, but in reverse: if this software is not perfect, it is not good. My biggest goal (and challenge) this year is to change that mentality. I can still produce high quality, efficient, and problem-solving code without it being entirely academically correct.

This realization really hit me with a project I am working on now. Dubbed *Metrics*, it is a piece of software that allows you to create detailed reports on your Google AdWords and Bing AdCenter marketing campaigns. I started the software in May 2011, and it is finally getting wrapped up in the first week of 2012.

I built this software radically different than I have before. It is divided into two components: a backend RESTful API and a frontend web interface that communicates with the API over HTTP, of course. Being that this was a radically new development practice for me, I had a lot to learn.

The book [RESTful Web Services Cookbook](http://shop.oreilly.com/product/9780596801694.do) was a great reference to learn what a RESTful service actually was. To this, I started obsessing over the semantic correctness of my API. It listened to the right request verbs, responded with the correct HTTP status codes, and handles content negotiation properly.

However, in all of that obsession, my API still misses some key RESTful components. For example, it does not allow automatic resource discovery by providing URL's to additional resources. That is a key component of REST, and I completely missed it.

It shows me even with how long I obsessed over the correct [URN's](http://en.wikipedia.org/wiki/Uniform_Resource_Name), I will still probably miss key pieces of a technology.

The same is true with learning the [Play Framework](http://playframework.org). I am going through their ["blog in 15 minutes"](http://www.playframework.org/documentation/1.2.4/guide1) example, and I was thrown for a loop when they introduced tests to the example.

At first, I was ecstatic that a tutorial provided unit tests with the actual code. I was a little put off at first looking at the [test examples](http://www.playframework.org/documentation/1.2.4/guide2#aclasstestWritingthefirsttesta).

"These tests were not unit tests!" I exclaimed. They had multiple depended-on-components, and they could interact with an in-memory database object (or an actual database, if you would like). Those need to be mocked!

*Settle down, Vic.* This is the lesson I'm learning in 2012. Yes, these are not pure unit tests. However, they are still valid tests, test my data model perfectly fine, and give me multiple ways to test my database. Furthermore, because I know I am a competent developer, I will still be able to write high quality, efficient, re-usable, and maintainable code.

I know this about myself: often things are black and white. That is not the case with software development, and it is going to be the hardest, but most beneficial, practice I'll pick up in the new year.
