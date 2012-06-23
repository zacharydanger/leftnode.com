---
layout: post
title: "Play Framework Thoughts"
permalink: /entry/play-framework-thoughts.html
comments: false
author: Vic Cherubini
---

I am in the process of learning Java and the [Play Framework](http://www.playframework.org), and I have released my first small website built on Play. I am incredibly excited to be learning Java and Play, and now that I have a very basic site under my belt, I want to reflect on how it went.

Admittedly, this post is geared to garner some reaction &mdash; mostly so more advanced developers can offer me advice on how to built better applications with Java and Play.

[strungg.com](http://strungg.com) is the very basic landing page I switched from PHP to Play. My first impression from launching this is that Play is a serious application server and not meant for small API's or landing pages. If you need to build something like that, stick with PHP or Sinatra.

Working with Play is an absolute delight, however. Coming from the world of PHP, I am not familiar with using a separate application server. With PHP, everything is done through Apache and mod_php. Play has its own built in server that runs on port 9000 by default. Play's server is meant for development and production usage. However, because I am serving several virtual hosts from the same server, I proxy all requests to Play through Apache and mod_proxy.

Because I am learning Java and Play at the same time, I am confident my code is not idiomatic Java. It is probably poorly written, but it works, and I'm happy with it. One aspect I love about Play is its emphasis on testing. After starting a new Play application, you can run `play test` and visit `http://localhost:9000/@tests` to run your unit, functional, and Selenium tests through your browser. It is a great web-based tool that lets you run your tests automatically. Of course, your tests can be run through the command line as well for use with continuous integration software.

Play really makes writing your Java simple. You easily define your routes in a `routes` file, and writing a controller is very similar to how you would write a controller in a PHP framework. For example, here is the entirety of the current Strungg `Application` controller:

    package controllers;

    import play.*;
    import play.mvc.*;
    import java.util.*;
    import models.*;

    public class Application extends Controller {

      public static void index() {
        render();
	    }

      public static void register(String emailAddress) {
        try {
          validation.email(emailAddress);
          if (validation.hasErrors() || 0 == emailAddress.length()) {
            throw new StrunggException("Please enter a properly formatted email address.", 400);
          }

          Registration registration = Registration.find("emailAddress", emailAddress).first();
          if (null != registration) {
            throw new StrunggException("This email address is already registered.", 409);
          }

          registration = new Registration(emailAddress);
          registration.save();

          response.status = 201;
          renderJSON(registration);
        } catch (StrunggException e) {
          if (!Http.Request.current().isAjax()) {
            response.status = e.getCode();
          }
          renderJSON(new HttpError(e.getCode(), e.getMessage()));
        }
      }
    }

Following that code should be pretty simple for just about any developer. The `index()` method corresponds to `GET /` requests, and `register()` corresponds to `POST /register` requests. The `register()` method accepts an `emailAddress` parameter of the person registering. If everything goes well, the registration object is returned with a 201 response code indicating Created. Otherwise, an `HttpError` object is returned.

This API always responds with JSON, regardless of what the Accept header is. This breaks REST principles, but for such a basic API, it works fine.

In the `catch` block, I test if the request is an AJAX request to determine if I should return the correct HTTP status code. Unfortunately, browsers do not respond properly to a lot of HTTP status codes. 200, 201, 403, 404, and 500 generally work okay, but if you send a 400, 406 or 409 response, for example, the browser will not respond further. Because the application calls /register directly through an AJAX request, if the request fails, I simply return a 200 OK and the actual error code in the JSON payload.

Play does a fantastic job of abstracting away a lot of the Java libraries I am using. For example, I do not know the intricacies of the JPA, but I am easily able to make my own models.

    package models;

    import play.db.jpa.*;
    import play.data.validation.*;
    import java.util.*;
    import javax.persistence.*;

    @Entity
    public class Registration extends Model {

      @Column(name="created_at")
      public Date createdAt;

      @Column(name="updated_at")
      public Date updatedAt;
      public int status = 0;

      @MaxSize(256)
      @Column(name="email_address")
      public String emailAddress;

      public Registration(String emailAddress) {
        this.createdAt = new Date();
        this.emailAddress = emailAddress;
        this.status = 1;
      }
    }

With that said, there are still a few oddities I do not like. 

First, while I understand having different application ID's (dev, prod, test, etc), I do not like having my database or 3rd party credentials stored in my repository. Play stores all application settings, including your database DSN's, in `conf/application.conf`. To counter this, I set up application.conf.template. This is a templated file that does not contain any credentials. I use placeholders that are replaced by a Phing build.xml file. Thus, I do not have separate dev and prod settings. Anything that would change between dev and prod is templated.

I wish the Play documentation was more thorough. There were several instances where the latest version, 1.2.4, was not consistent with the documentation. Usually the comments on the documentation would clear up any issues, but it was frustrating for a Java novice. I think this would not be as much of an issue if I knew Java better. While the javadoc is provided for reference, compared to the Ruby On Rails documentation, Play has a long way to go.

Finally, I am not crazy with how they do database migrations (which are called evolutions in Play). While I like each evolution file is just a plain .sql file, I do not like how the developer is responsible for naming them and that they are sequentially named. Ruby on Rails and dbmigrator both use a UTC timestamp (down to the second) to avoid conflicts, Play has you manually merge conflicted files. Conflicts are more likely to happen with a team if each file is sequentially named.

Overall, I'm incredibly impressed with Play. It is exactly what I feel I need to learn a new language, ecosystem, and framework. It is opinionated enough that I know the ways Play wants me to do things, yet gives me the flexibility to have some of my own opinions interjected in my code. My biggest hurdle is learning Java along with Play. Because Play definitely has some opinions on how code should be made, I fear I'll learn the Play way of doing things, and not the Java way of doing things. If I can overcome this hurdle and be comfortable with the way things are done even if they are not the way I would always do them, I think this will be a great experience.

