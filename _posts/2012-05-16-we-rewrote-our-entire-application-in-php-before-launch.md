---
layout: post
title: "We Rewrote Our Entire Application in PHP Before Launch"
permalink: /entry/we-rewrote-our-entire-application-in-php-before-launch.html
comments: false
author: Vic Cherubini
---

After almost five months of development, we finally launched [Accthub](https://accthub.com)! Accthub was born out of building the same tool many times for a lot of our clients and wanting to simplify (and centralize) that process.

If you have read my blog before, you might have remembered that [I retired from PHP](http://leftnode.com/entry/im-retiring-from-php). That did not exactly work out like I had planned. My side business does most of our code in PHP, and my job uses PHP almost exclusively. I obviously choose for all of [Bright March's](http://brightmarch.com) code to be done in PHP; I have little say in what is done at my job.

On top of that, **I made the decision to rewrite Accthub from Java to PHP which delayed the launch by several months.**

We all know PHP is not a great language. However, I think it can be argued that it is a good language. Regardless, a lot of people love it, even more people hate it, but even more people just shut up and use it and don't talk about it.

I decided to rewrite Accthub in PHP from Java because I felt if we were going to have a successful product, I needed to know the entire stack of software that we were running on. Accthub was originally built in Java with the Play! Framework. It was built before Play! 2.0 was released; I used Play! 1.2.4 and chose Java over Scala because PHP and Java have a lot of similarities.

The Play! Framework is amazing. I have not yet had a chance to work with 2.0, but 1.2.4 made web development with Java an absolute breeze. However, I never really felt like I had a firm grasp on the underlying framework. I was simply building models and controllers on top of it. Unfortunately, the documentation was a bit slim, so I continually found myself referring to the actual Play! source code to see what data type was returned or to see the signature of a method.

I got through it, and as a novice in Java, felt like I had a pretty decent product with Accthub. It was mostly done, and we even invited a few beta users to test it out.

Something did not feel right with Accthub being built in Java. I had a mix of insecurities about the software stack (a Java application sitting on top of the Play! server proxied through Apache), how deployments work with Play! apps, how to scale, and my lack of knowledge about best practices with Java development. I just did not feel comfortable releasing Accthub as a final product with these feelings.

I made the decision then to rebuild the entire product in PHP and delay launch by several months.

I have worked with PHP since 1999, so I know it inside and out. I know most of its silly quirks. I know how to scale it. I know PHP best practices. I know PHPUnit very well. I can keep my servers updated with the latest version of PHP because compiling it is simple. I can use CI-Joe for building my PHP apps and Capistrano for deployments (to be fair, both of these tools could be used with a Java application as well).

It was about that time that I started to work with the Symfony2 and Doctrine2 frameworks. Generally I had been adverse to using large frameworks and had written my own, but with my goal this year of [learning to love my non-perfect code](http://leftnode.com/entry/content-with-code), I decided to give it a try for a separate project.

I really enjoyed using it. It removed a lot of quirks from PHP, and made working with HTTP and the command line a breeze. The development teams behind Symfony2 and Doctrine2 clearly put a lot of time and effort into planning how these frameworks were going to work and it shows.

Accthub is a RESTful service, which Symfony2 lets you build easily. However, there is a lot of repetitious boiler-plate code in your controllers, so I quickly whipped up a Symfony2 Bundle called the [BrightmarchRestfulBundle](https://github.com/brightmarch/BrightmarchRestfulBundle) to handle a lot of that boiler-plate code.

I then got to work rebuilding Accthub with Symfony2. It took about two months to rebuild it entirely, but I felt it was worth the trouble in the long run. I now have a product that can be continuously deployed in a matter of seconds, is well tested, and can be scaled easily.

I really believe in Accthub. I think it has an opportunity to really be an amazing product that thousands of people build their applications on top of. Neil and I put a tremendous amount of work into it, and we are really happy with the results. I'm going to try really hard to make it successful, and I felt in order to do that, I needed to build it in a language I was most familiar with.

*[Accthub](https://accthub.com) is a new online service that alleviates the time, energy, and cost it takes to build account management into your new application. Whether you're building an eCommerce website, a mobile app, a custom CRM solution, or anything that requires user registration, let Accthub manage your users while you focus on building your app.* 
