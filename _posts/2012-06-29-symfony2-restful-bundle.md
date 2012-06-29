---
layout: post
title: "Symfony2 RESTful Bundle"
permalink: /entry/symfony2-restful-bundle.html
comments: false
author: Vic Cherubini
---

I began using the [Symfony2](http://www.symfony.com) PHP framework at the beginning of 2012 because I did not feel comfortable using Scala for client projects.
I wanted to use a language I was familiar with, PHP, and wanted to use an existing framework rather than having to write my own. Symfony2 was my choice. I went
with Symfony2 because it only works with PHP5.3+ and because of its bundling system.

Symfony2 has turned out to be a great choice. It is very well built, geared towards testing your software, and has a great userbase. With the way I am
[building web applications](/entry/modern-web-application-architecture.html) now, I have two Symfony2 setups for a single application: one for the RESTful API
and one for the frontend web layer.

Symfony2 is really geared out of the box for building frontend web applications and not RESTful APIs. I started searching for a bundle that could help me
and found the [Friends of Symfony RESTful Bundle](https://github.com/FriendsOfSymfony/FOSRestBundle/). It is very thorough but seemed a bit too much for my needs.

This was one case when I wanted to write my own bundle. It would teach me the bundle system and I would have a nice bundle to build RESTful applications on top of.

### BrightmarchRestfulBundle

I wrote and released the [BrightmarchRestfulBundle](https://github.com/brightmarch/BrightmarchRestfulBundle) several months ago and it has worked out very well.

The three most important pieces of it are the `RestfulController` class, the `Entity` class, and the `HttpException` classes.
