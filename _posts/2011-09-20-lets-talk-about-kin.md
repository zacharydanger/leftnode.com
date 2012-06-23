---
layout: post
title: "Lets Talk About Kin"
permalink: /entry/lets-talk-about-kin.html
comments: false
author: Vic Cherubini
---

I wanted to stop programming in PHP, I truly did, but side projects and work kept pulling me back. That is why I forked Jolt and rewrote it nearly entirely as Kin. Kin is a new framework specifically built for building RESTful webservices. It has no official website or documentation yet. You can get it from [Kin's Github Page](https://github.com/leftnode/kin).

Kin is very fast. It has very few compontents, and often you will find yourself building things that you might otherwise think a framework should handle. For example, Kin has only two small classes for database interaction. Writing a controller to select all rows in a table means you have to write that query yourself. This design decision was made because often queries become sufficiently complex that an ORM can not handle them, and because ORM's tend to be inefficient and memory intensive. By forcing developers to hand code a SQL query, Kin (ideally) ensures they are writing efficient queries. Kin does handle INSERT, UPDATE, and DELETE queries for you since they are very easy to build dynamically and are not complex.

Kin does controllers very well. Each controller is its own independent class that can be completely unit tested. This was an important design decision. I wanted to make sure that applications were tested, and since the controllers are where a lot of the action takes place, it is important that they can be tested. The `kincontroller` object allows for mock objects to be attached via dependency injection.

Kin is not great at templating or views. Kin will render your view just fine, but it expects it to be an executable .php file. Kin has no native support for a template library. Kin has no knowledge of a layout system either. You're responsible for including common headers and footers or other repeated page elements yourself.

However, Kin is *awesome at building a RESTful web-service*. Here's how:

### Sample Application
To begin, clone Kin into one of your PHP include paths. Open a new file in a web routable directory, say, `/var/www/kin/index.php`, and add the following contents.

    <?php namespace kinapp;
    use kinapp as app,
      kinapproute as route,
      kinapprouter as router,
      kinappsettings as settings;

    require_once('kin/framework.php');

    $settings = new settings(__DIR__.'/application/');

    $application_routes = array(
      new route(route::get, '/', 'index_controller.php',
        'kinappindex_controller', 'action_get_index')
    );

    $exception_routes = array(
      router::route_404 => new route(route::get, '/', 'error_controller.php',
        'kinapperror_controller', 'action_error404')
    );

    $app = new app;
    $app->attach_all_routes($application_routes, $exception_routes)
      ->attach_settings($settings);

    echo($app->run());
    exit(0);

This file is where your Kin application will run from. The first five lines define a namespace and some useful aliases. Next, the majority of Kin is loaded with the `require_once` statement. You must specifically include any database classes or the `kinsession` class.

A `kinappsettings` object is then created. It takes a single parameter to the constructor: the location of the application. The `kinappsettings` class has some other settings you can change, but for now we will stick with the defaults.

Kin is very explicit about its routing. It does not try to guess anything about your controllers based on your routes. Thus, Kin's routes can be quite verbose, but expressive. The `kinapproute` object takes five parameters to the constructor: request method, the route itself, the controller filename, the full controller class name (including namespace), and the controller action to call. Two routes are defined: a GET route for handling normal requests and a GET route for handling 404 errors. Kin requires at least one application route and one error route.

Finally, a new `kinapp` object is built. The routes and settings are attached to it. The object calls the `run()` method which handles all requests.


Next, create your first controller. From within the `/var/www/kin/` directory, create the `application`, `controllers` and `views` directories.

    cd /var/www/kin
    mkdir application/{controllers,views} -p

Kin likes it when you the conventions it defines. 



### What is RESTful
The acronym REST and RESTful has been used a lot recently. Unfortunately, it's mostly been used incorrectly. One of the causes of that is the acronym definition itself: Representational State Transfer. Representational State Transfer is vague, it is hard to pin down its exact meaning, so programmers have built what they consider to be a RESTful web-service and thats what is has become. The idea REST is complex, and it would be difficult to build a system that adheres to the true definition of REST completely. Thus, I've taken REST over HTTP to mean building a web-service that respects HTTP request and response headers (Accept, Accept-Encoding, Accept-Language, Content-Type, etc) and HTTP response codes (200, 201, 404, 409, 500, etc). Calls to the service are done over HTTP through several different methods: GET, POST, PUT, DELETE (and others such as OPTIONS, HEAD, and TRACE, but I will not discuss those). A RESTful web-service should also do its best to respect HTTP's stateless definition.

GET requests are idempotent &mdash; they leave the system state (relatively) unchanged. Successive GET calls for a specific resource should return the same resource unless that resource has been modified by a POST, PUT, or DELETE request.
POST requests are not strictly defined. They are defined in that they should not be considered idempotent &mdash; they can significantly change a system's state. POST requests are most commonly used to create a new resource.
