---
layout: post
title: "Symfony2 RESTful Bundle"
permalink: /entry/symfony2-restful-bundle.html
comments: false
author: Vic Cherubini
---

I began using the [Symfony2](http://www.symfony.com/) PHP framework at the beginning of 2012 because I did not feel comfortable using Scala for client projects.
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

The bundle exists under the namespace `Brightmarch\Bundle\RestfulBundle`. The three most important pieces of it are the `RestfulController` class, the `Entity`
class, and the `HttpException` classes.

#### `HttpException` Classes

HTTP has many different [status codes](http://httpstatus.es/) for the client to determine what happened with its request to the server. Included with this bundle
are some helper `Exception` classes that can be thrown to generate an error to the client. The classes are named for the type of code they represent, and
automatically contain a status code so you do not have to memorize them. The classes are:

* [400 HttpBadSyntaxException](http://httpstatus.es/400)
* [401 HttpUnauthorizedException](http://httpstatus.es/401)
* [404 HttpNotFoundException](http://httpstatus.es/404)
* [405 HttpMethodNotAllowedException](http://httpstatus.es/405)
* [406 HttpNotAcceptableException](http://httpstatus.es/400)
* [409 HttpConflictException](http://httpstatus.es/409)
* [510 HttpNotExtendedException](http://httpstatus.es/510) &#8224;

&#8224; The BrightmarchRestfulBundle will automatically throw this error if it can not render a content type a controller claims it can. For example,
if the server says it can support `application/json` but the view does not exist to render that content type, a 510 Not Extended exception is thrown.

You can simply include one of these classes into your controller with the `use` keyword.

    use Brightmarch\Bundle\RestfulBundle\Exception\HttpNotFoundException;

    // ...
    $user = $this->getEntityManager()
        ->getRepository('CompanyDemoBundle:User')
        ->findById(1);

    if (!$user) {
        throw new HttpNotFoundException("The User with ID 1 could not be found.");
    }

adadfasdfa
