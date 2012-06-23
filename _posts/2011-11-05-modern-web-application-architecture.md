---
layout: post
title: "Modern Web Application Architecture"
permalink: /entry/modern-web-application-architecture.html
comments: false
author: Vic Cherubini
---

I received a lot of great responses from my post on ditching your [ORM and using straight PDO](http://leftnode.com/entry/the-last-php-pdo-library-you-will-ever-need). The product [we are](http://brightmarch.com) building lets you review all of your Google AdWords and Bing AdCenter ads in one central location. This project was given to us by a group of marketers who do this manually each month, and they wanted it done automatically. Since both platforms have extensive API's, it made perfect sense that a computer do this and not a human. We have since dubbed this project "Metrics".

This blog post is about building your application in two distinct layers: a HTTP RESTful API and a web frontend. This technique is not new and I am not the first developer to build a web application with this model. However, this is the first time I have built an application this way, and I want to share my experience.

I started building this application as a single Git repository. There was still an API component of it, but it was by no means RESTful and I did not feel comfortable with it. I ripped it out completely and started with two distinct repositories: metrics-api and metrics-web.

The metrics-api repository is a RESTful API coded in PHP. I say somewhat RESTful because it does not follow every component of HTTP. However, it does follow what I consider the most essential components:

  * It is stateless and uses no sessions or cookies.
  * It responds to a correct Accept header (or issues a 406 response code if it finds that accept type not acceptable).
  * It issues the correct Content-Type based on the Accept header.
  * It issues a proper response code based on what action was requested. The most common request codes I use are: 200, 201, 301, 302, 400, 403, 404, 405, 406, 409, 500, and 501.
  * It responds appropriately to `GET`, `POST`, `PUT`, and `DELETE` requests (no `HEAD` requests). I follow the Rails model and consider POST for creation and PUT for updating.
  * GET requests are idempotent and do not alter the state of the system drastically (other than basic logging).
  * Generally a single URL returns a specific resource, but sometimes this model is broken (for example: `GET /calls/metrics?token=XYZ123&start_date=2011-10-20&end_date=2011-10-27` will return basic metrics for all calls made between those start dates for a specific client)

Overall, I am comfortable saying it is somewhat RESTful. I hope Roy Fielding would somewhat agree.

The metrics-web repository is a very dumb front end. It literally has no database connection, only an API endpoint. It is also written in PHP, but uses a lot of Javascript, Mustache templates, and AJAX to render the pages. Requests are made from it to the API through cURL. Yes, I literally cURL my own API.

The first and biggest disadvantage of this is that it is slow. To generate a report, for example, the frontend makes an AJAX request (HTTP request #1) to itself, which then makes a request through cURL (HTTP request #2) to the API. The API gathers the data from the database, formats it, and returns it (as JSON). It is returned to the AJAX request (HTTP response #1) which then returns it to the browser (HTTP response #2). The number of HTTP requests and responses made has doubled. Fortunately, the API server and the web server are either the same machine or on the same fast network, so the HTTP latency is as minimal as it can be. There is some additional latency here, but it is not noticeable (yet). This is one of the main driving reasons I decided to ditch any type of ORM and move to straight SQL with PDO. I wanted the API to be as fast as possible.

The next disadvantage is the API can also be more difficult to debug. I have doubled the places where a bug could be introduced: the request from web to itself, or the request from the web to the API, and the successive responses. Good logging can usually overcome this and you can pinpoint where the error is.

The last large disadvantage is your web frontend has no database access. Thus, if you want it to save *anything* to the database, it must do this through the API. This can become overly verbose at times, however, it does force you to think about the data you are storing and the best way to store it.

With the disadvantages out of the way, I want to discuss why I love this architecture.

**This architecture is very scalable.** The frontend web code is very fast because it does not touch a database. Any heavy lifting is done through the API or on the client side. The site would sit on metrics.com and the API on api-internal.metrics.com, for example. When the site needs to be scaled, api-internal.metrics.com can be scaled horizontally out to many servers (or scaled vertically if you are using virtualized servers) while keeping the frontend web on as few as possible.

**This architecture is very versatile.** Because the API is built on HTTP, the language between the API and the frontend is very easy to understand. If the API, for whatever reason, has reached its scalability limits with the language I went with first, the PHP could be replaced by a faster language that responds in the same exact way that the PHP did with *literally* no change to the frontend. I believe Facebook did something similar by keeping their frontend in PHP and their backend API as a mix of Java, Erlang, and C++.

**This architecture is monetizable.** If your service becomes popular, you already have a real somewhat-RESTful API that you can expose publicly and charge people to use. Add basic authentication through HTTP Authentication (or OAuth2, or your own scheme) and you are good to go. Google has done this with their AdWords API (you must pay to use it).

**This architecture works well with teams.** As I said earlier, the frontend webcode simply has an API endpoint in its configuration file. This means if you setup servers like api-dev.metrics.com, api-qa.metrics.com, and api-stage.metrics.com, you can have your frontend application interact with any of those endpoints by simply updating the configuration API endpoint. Furthermore, it allows non-developers to work on it. If you have a designer who does not want to go through setting up the entire API on their computer, yet still wants to work on the design, they can point their configuration to api-dev.metrics.com and only require a very basic Apache and PHP setup to work. No needing to install the API or Postgres or Redis or anything else it uses. Additionally, developers *can* set up the API on their own local machines, say as api.metrics.*dev*, and point their frontend configurations to that endpoint.

I really believe this is one of the next big phases of web application development. Most large scale web application I have read about use a similar architecture. It is as if web application development has come full circle now. Originally, only programmers, scientists, colleges, and governments used the Internet to communicate through APIs. Then came build web applications with a mix of RESTful and non-RESTful architectures. We are now returning to our roots, and it is a very exciting time.
