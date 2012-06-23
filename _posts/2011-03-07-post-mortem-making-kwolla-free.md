---
layout: post
title: "Post-mortem: Making Kwolla Free"
permalink: /entry/post-mortem-making-kwolla-free.html
comments: false
author: Vic Cherubini
---

On March 04, 2011, I decided to make the Version 1.0 series of my software, the [Kwolla Social Network](http://kwolla.com), free to download. The response since then has been amazing, and I'll cover the impetus for doing this, the results, and the future of Kwolla.

### Kwolla History
I launched Kwolla on January 15, 2011. Kwolla started not as an original project, but as one that came from a failed social network. Back in January 2009, I started to build a social network named ProspectVista with two friends, Jonathan and Kevin. ProspectVista let businesses advertise for free with video commercials. It launched in September 2009 and failed to gain any traction.

After about a year of noticing the site wasn't picking up, I wanted to do something else with the software behind ProspectVista since I felt it was good quality software. I talked with my ProspectVista co-founders and they were fine with finding something else to do with ProspectVista. Kwolla was born from the ashes of ProspectVista.

I added a new theme, ripped out several of the modules that were specific to ProspectVista, added some new features, and packaged it as a "build your own social network" piece of software. If you grep around the software and see methods named `vista_*()` or `PV::`, they are vestiges from when the software was named for ProspectVista.

My [first month of sales](/entry/leftnode-sales-report-1-february-2011.html) were strong and promising. Having customers pay me was awesome! **If you don't get a rush or high out of each new paying customer, you're not cut out to be an entreprenuer.**

### Sales Dropped Off
After the first month of great sales, they started to drop off quickly. I put money into advertising on BuySellAds.com and other script archives. Nothing seemed to help. A sale would trickle in every few days, and it was definitely a defeating feeling.

I played with my prices and found out Kwolla sold the best at a higher price. That was a rewarding feeling, but still, sales were dropping. I relaunched [kwolla.com](http://kwolla.com) with an incredible design from my friend Neil and a totally rewritten shopping cart. That failed to improve sales, unfortunately.

### Wanting to Get My Software Used
I have a strong desire for my software to be used. Nothing is used more than free software, so I decided to make Kwolla free of charge to use. I intentionally didn't attach an Open Source license to it, I just wanted it to be free to download. I will eventually attach an Open Source license, but for now, it's just free to download and use.

I announced I was making it free on [Reddit's /r/PHP community](http://www.reddit.com/r/PHP/comments/fxih8/ive_decided_to_make_my_software_free_until_i/) and on [Hacker News](http://news.ycombinator.com/item?id=2291312). The announcement failed to gain much traction on Hacker News, but /r/PHP picked up on it immediately. I could not have imagined a better response.

### Current Results
Since making it free, Kwolla has been **ordered 225 times** and **downloaded 404 times**. There were **1738 unique** hits and **3670 pageviews**.

### Launching Version 1.1.1
Shortly after making Kwolla free to download, I finished Version 1.1.1. Through the ecommerce software behind [kwolla.com](http://kwolla.com) (also available to download soon), I was able to contact all of the downloaders to let them know of the upgrade.

### Future Development
Aside from some bug fixes and possibly adding a new feature or two, this will be the end of the Version 1.0 series. I'm currently working on Kwolla 2.0 which will include all the things Kwolla 1.0 did not. Some Kwolla 2.0 features include:

+  Graphical installation through a browser
+  Full administration panel
+  Photo albums
+  Groups
+  Better public/private settings
+  Video encoding through Zencoder rather than having to do it yourself
+  PHP5.3
+  API for developing modules much easier
+  Better module development system

To help fund future development, I offer Premium Support for Kwolla at **$50.00 an hour** and installation services for **$30.00**. Premium Support can be used for custom module development, custom themes, or any other ideas you may have.

Kwolla 2.0 will be available as a downloadable application and a hosted <acronym title="Software as a Service">SaaS</acronym> application. Everyone who downloads Kwolla 1.1.1 will be notified by email when Kwolla 2.0 is available.

### Upsetting Paid Customers
I was frequently asked if this will upset customers who initially paid for Kwolla. Sure, it could. So far no customers have complained, and if they do, I'll refund their money or work out some free Premium Support. Paid customers will also get all future versions of Kwolla for free.

I'm very happy with the results so far. Kwolla will continue to be free until Version 2.0 is released. Kwolla 2.0 is being co-developed for our new social network: MilqIt. You should [pick up a copy of Kwolla](http://kwolla.com) today.
