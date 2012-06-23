---
layout: post
title: "The Kwolla 2.0 API Architecture"
permalink: /entry/the-kwolla-2-0-api-architecture.html
comments: false
author: Vic Cherubini
---

With the announcement of the Kwolla 1.x series being free, we've decided to rename Kwolla 1.2.0 to Kwolla 2.0. Kwolla 2.0 will present many new features, the largest being an API driven architecture. This post will cover what the architecture looks like and the impetus for building Kwolla 2.0 this way.

The Internet is quickly [becoming programmable](http://www.programmableweb.com/). There are thousands of HTTP based API's being used all the time, and it's really enabled a lot of creative development. When building a new product or service now it's silly not to build an API for it.

The natural choice is to build the API alongside the development of the actual product. It's obvious when a service or product built the API as an afterthought. By building the API with the development of the product, it ensures the API is clear and easy to use because it is used at every point in the code. This essentially creates a two tier system with the front facing product sitting on top of the API. Kwolla 2.0 is built this way.

Kwolla 2.0 has two levels of controllers: front end controllers and API controllers. The front end controllers are ones you interact with. When you click a button or a link, that request is routed to a front end controller. If the controller manipulates data from the datastore in any way, it most likely calls an API controller. API controllers can be called in two ways: through an HTTP RESTful interface or directly within the Kwolla codebase. When a front end controller calls an API controller it does it through a method within the Kwolla codebase. When calling an API controller externally (not from within Kwolla), an HTTP POST method and API key is required.

Because the API controllers can be called through an HTTP POST request, building your own modules on top of Kwolla is simple.

### Analysis of an API Call
All of the API calls are routed through a URL starting with `/api/`. For example, to grab information about a user, the URL might look like:

    https://social.kwolla.com/api/user/10

This would return a JSON formatted object with all of the information about a user. Getting a list of their photos, activity updates, or friends would be a separate call.

Internally, the call looks slightly different, but the format is returned as JSON as well. The front end controller takes this JSON and then decides what to do with it. For example, a front end controller to view the user's public profile might look like this:

    declare(encoding='UTF-8');
    namespace kwolla;

    class profile_controller extends kwollaroot_controller {

      public function view($username) {
        // Find the user, the /api/user/by_username/$username
        // returns a user model if found, or an error if not found.

        $response = kwollakwolla::api('/api/user/by_username/'.$username);
        if ($response->has_errors()) {
          $this->messages = $response->messages;
          $this->render('profile/not-found');
        } else {
          $this->user = $response->get_model();
          $this->render('profile/view');
        }
      }
    }

This basic example shows that an internal call to `kwollakwolla::api()` performs the actual call. It returns a `kwollaresponse` object that has the following structure:

    $response = new kwollaresponse(array(
      'model' => array(),
      'object' => NULL,
      'name' => '',
      'content' => '',
      'messages' => array(),
      'errors' => array(),
      'redirect' => ''
    ));

A full response for the call to `/api/user/by_username/leftnode` would look like:

    {
      "model": ["id": 1, "created": "2011-03-09 12:59:21", "username": "leftnode", 
        "content_directory": "v/m/1-vmc-leftnode-com"],
      "object": {},
      "name": "kwollauser",
      "content": "",
      "messages": [],
      "errors": [],
      "redirect": ""
    };

After the response is returned from the API call, it is up to the client (the front end controller) to convert it back to a PHP object and then display it to the user properly. This allows any application that can call the API to build a module on top of Kwolla easily.

### Authentication
Internal API calls do not require authentication (and are actually not routed through HTTP at all). Internal API calls are made through the `kwollakwolla::api()` method. External API calls are authenticated through an API key. Keys are stored in the database and can be throttled. API Keys can also be managed through the new Kwolla 2.0 administration interface. The initial version of Kwolla will not have API key segmentation: if a person has a valid key, they can perform all of the API actions (including destructive ones) so be careful who you assign keys to.

When Kwolla 2.0 is released, full API documentation will be released too. We're hoping that by making it so simple to add your own mashups that you'll take Kwolla and extend it beyond our imaginations.
