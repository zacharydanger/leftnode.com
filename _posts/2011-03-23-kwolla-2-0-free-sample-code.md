---
layout: post
title: "Kwolla 2.0 Free Sample Code"
permalink: /entry/kwolla-2-0-free-sample-code.html
comments: false
author: Vic Cherubini
---

This morning I released some sample Kwolla 2.0 code and I wanted to spend a moment to review it with you and go into a more detailed explanation of what it does.

After downloading the code sample, you will find two directories with a single file in each.

    controllers/api_user_controller.php
    validators/user.php

### controllers/api_user_controller.php
As I've mentioned before, Kwolla 2.0 has a fully featured RESTful API. This controller is part of that API and handles all requests to manipulate user records. After opening it up, you will see it has four member methods (or actions).

#### `kwollaapi_user_controller::get()`
This method returns information about a single user by their user ID. If the user is not found, an error is returned. The user data is returned in a JSON object. The `get()` action is called through a HTTP GET request.

    curl -X GET http://kwolla-demo.com/api/user/1

#### `kwollaapi_user_controller::delete()`
The `delete()` action is called through a HTTP DELETE request and will delete a user and all of their associated data. If the user can not be found, an error is returned.

    curl -X DELETE http://kwolla-demo.com/api/user/1

#### `kwollaapi_user_controller::create()`
Called through a HTTP POST request, the `create()` action method creates a new user. Email addresses and usernames must be unique. This method also creates the user's content directory which is where all of their uploaded user information is stored.

    curl -X POST -F "user[email_address]=demo@kwolla.com" 
      -F "user[username]=kwolla_user" 
      -F "user[password]=kwolla_password" 
      -F "user[fullname]=Kwolla User" 
      http://kwolla-demo.com/api/user

#### `kwollaapi_user_controller::update()`
Finally, the `update()` action will update a user if that user exists. If they do not exist, an error is returned.

    curl -X PUT -F "user[email_address]=demo2@kwolla.com" 
      -F "user[username]=kwolla_user" 
      http://kwolla-demo.com/api/user/1

Looking into the `create()` action a little further, you will see it builds a form and then validates the data coming into the method. This is done mostly with the other file in the download: **validators/user.php**.

### validators/user.php
Opening that file and you will see a single method named `kwolla_user_validator()`. This method builds a `joltvalidator` object and then attaches several rulesets for each of the fields. For example, when creating a new user, they must have a fullname field, email_address, username, and password. The fullname field can not be empty, the email_address field must be a valid email address, and both the username and password fields have a min and maximum length. If any of the values of these fields do not pass the validator, the entire form fails and an exception is thrown preventing the user from being created.

Kwolla 2.0 is chock full of goodness like this. It makes it incredibly easy to build a new API endpoint (a controller with routes), validate all of the values coming into that API endpoint, and to allow one API endpoint to talk to another.

### Design Decisions
One thing you will notice in this code (specifically the controllers/api_user_controller.php file) is that `SELECT` queries are parametrized and written out rather than built through an ORM. While using an ORM is nice, it adds an additional level of complexity to your application. When it comes to raw speed, I'd rather have my `joltpdo` class be a dumb wrapper for the PHP PDO class.

Additionally, if a query goes haywire it's much easier to search for it if its plainly written opposed to built through a series of method calls. You will notice, however, that `INSERT`, `UPDATE`, and `DELETE` queries are constructed through the `joltpdo::save()` and `joltpdo::delete()` methods. Writing those queries by hand is tedious, prone to error, and repetitive. A computer can build them just fine.

I'd love to hear what you think about the code behind Kwolla 2.0 and the design decisions I've made.
