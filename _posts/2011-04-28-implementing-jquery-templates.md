---
layout: post
title: "Implementing jQuery Templates"
permalink: /entry/implementing-jquery-templates.html
comments: false
author: Vic Cherubini
---

Now that Kwolla 2.0 is using [jQuery Templates](/entry/kwolla-2.0-javascript-templates), I wanted to show how the code worked that actually populates those templates. Before discussing the JavaScript behind jQuery Templates, you need to understand the standard Kwolla response object. This is an object returns by **every** API response.

Because Kwolla 2.0 is based on an actual RESTful API, each response from the API is a standard JSON object with the following members:

    {
      "model": [],
      "object"; NULL,
      "name": "",
      "content": "",
      "messages": [],
      "errors": {},
      "redirect": ""
    };

+  **`model`** &mdash; The `model` field returns a key-value array of data from the primary model that was operated on. For example, when making a GET request against `/api/user/1` would return the `user` model in this field.
+  **`object`** &mdash; This field is used when the JSON object is loaded in PHP. If the `model` is non-empty and the `name` field has a valid model name (a PHP object) in it, the `object` field is populated with a PHP object with the data in the `model` field.
+  **`name`** &mdash; The name of the model in the `model` field.
+  **`content`** &mdash; Any miscellaneous content that needs to be returned with the request.
+  **`messages`** &mdash; An array of messages to display to the user. An example array looks like: `[{"type":"error","message":"An error ocurred when creating a user."}]`
    
+  **`errors`** &mdash; A key/value object of fields that failed during the request. An example object looks like: `{"email_address":"The Email Address provided is not a valid email address."}`

+  **`redirect`** &mdash; A URL the client should redirect to after a successful request. For example, after making a successful POST request to `/api/signin` this field might contain a URL like `http://kwolla.com/account`.

There are cases where the `model` field will return an array of objects. This will primarily happen with the Activity Feed where many objects need to be returned; each object is an entity that makes up the Activity Feed. When an array of objects is returned, several views will use jQuery Templates to render those objects.

As described in the <a href="http://blog.leftnode.com/entry/kwolla-2.0-javascript-templates">previous jQuery Templates article</a>, the jQuery Templates are defined as actual `<script>` tags. The data for these tags are then searched and replaced by jQuery Templates. In the code snippet below, a GET request is made to a URL which returns a JSON response. The response's `model` field is then passed directly into jQuery Templates which literally handles the rest.

    // Make a GET request against the url /stream.
    $.get('/stream', {}, function(response) {
      var response_data = response.model;
      $('#activity').tmpl(response_data).prependTo('#activity-stream');
    }, 'json');

This call will return a standard JSON response object defined above. The `model` field will contain an array of objects that might look like the JSON snippet below:

    {
      "id":"5",
      "created":"2011-04-26 04:52:49",
      "entity_id":"0",
      "user_id":"1",
      "type":"status",
      "title":"My treadmill just broke",
      "description":"My treadmill just broke, damn piece of shit schwinn.",
      "status":"1",
      "fullname":"Vic Cherubini",
      "username":"leftnode",
      "content_directory":"v/m/1-vmc-leftnode-com",
      "children":[
      {
        "id":"6",
        "created":"2011-04-26 04:54:14",
        "entity_id":"5",
        "user_id":"2",
        "type":"status",
        "title":"sucks dude",
        "description":"that sucks, have you called the customer service place yet?",
        "status":"1",
        "fullname":"joe bob",
        "username":"joe_leftnode",
        "content_directory":"j/o/2-joe-leftnode-com",
        "children":[]
      },
      {
        "id":"7",
        "created":"2011-04-26 04:55:27",
        "entity_id":"5",
        "user_id":"1",
        "type":"status",
        "title":"not yet",
        "description":"not yet, just noticed it this morning",
        "status":"1",
        "fullname":"Vic Cherubini",
        "username":"leftnode",
        "content_directory":"v/m/1-vmc-leftnode-com",
        "children":[]
      }
      ]
    }

As you can see, this is a parent entity complaining their treadmill just broke with two children responses.

Populating the jQuery Templates is literally that simple. Each template contains variables that correspond to each field name in the JavaScript objects above. I wish I could say it was more complicated than that, but it really isn't. As development continues, some additional conditionals may be put in place, but aside from that, the code is largely complete.

The beautiful thing about using the jQuery Templates library is when a new entity is created through a browser. In the case of a successful creation, the `model` field of the response object would contain the new entity created. That entity could then be inserted directly into the DOM at the right position with jQuery Templates. The days of returning HTML or HTML as JSON are over. Simply return a standard JSON object and then let the client handle the response.

The only concern I have is speed. Returning pure JSON is obviously lighter than HTML, but I do worry about how jQuery Templates will perform with large JSON objects. I will be performing speed tests soon and reporting on how jQuery Templates performs with large datasets.
