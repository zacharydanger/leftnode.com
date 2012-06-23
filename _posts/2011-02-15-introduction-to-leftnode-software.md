---
layout: post
title: "Introduction to Leftnode Software"
permalink: /entry/introduction-to-leftnode-software.html
comments: false
author: Vic Cherubini
---

Welcome to the blog of Leftnode Software, Inc. My name is Vic Cherubini and I'm the president of Leftnode Software.

For as long as I can remember, I knew my ultimate career would be an independent software vendor. My introduction to Internet software came in 1999 when I started to develop websites for my father's software company. I was immediately hooked and spent every waking hour in front of the computer learning web development.

Fast forward twelve years later and I'm finally starting my own company.

### What is Leftnode Building?
Our first product to market is named [Kwolla Social Network](http://kwolla.com). Kwolla lets you *Grow Your Own Social Network*. Launched in January 2011, sales are doing well. Development is moving at a fast pace as customers are requesting new features daily. The response has been phenomenal, to say the lease.

Ioncart is our second product, and is used to sell digital goods online. It's still in development, but the store behind kwolla.com operates on an initial internal release of Ioncart.

Our last product is not an actual product, but a web service named MilqIt. MilqIt lets you follow your favorite companies as they send out free and paid promotions. MilqIt is currently in development, and we're looking for a mid-Q2 launch.

### Our Open Source Software
Leftnode uses PHP almost exclusively for our backend coding so we've built several frameworks to speed up development. Our frameworks are Jolt, DataModeler, and Hoboken.

Jolt is a fully featured View-Controller framework. It handles all routing, controller processing, template rendering, form processing, and session management. It specifically does not include any support for creating models and has very minimal database support.

Alternatively, DataModeler exclusively handles models. Rather than using an ActiveRecord approach, DataModeler creates dumb, but fat, models that can be saved and queried against multiple datasources. Jolt and DataModeler work very well together, but neither are required for the other to run.

Hoboken is a small micro-framework inspired by Ruby's Sinatra (Frank Sinatra was born in Hoboken, NJ).

Our final piece of software we use religiously is dbmigrator. With tools like git, developers have a good handle on versioning code. However, database migrations and versions are a pain in the ass. dbmigrator aleviates that pain and makes versioning and snapshotting database schemas and data a breeze.

### Future Leftnode Goals
One of my goals with Leftnode and by extension this blog is to open my company up to make it as visible as possible. In the spirit of using and releasing Open Source software, Leftnode will open source it's internals, so to speak.

I'll keep this blog updated as Leftnode Software grows both in our product portfolio and people.

If you're interested, take a second to follow us on Twitter at [@leftnode](http://twitter.com/leftnode) or subscribe to our blog.
