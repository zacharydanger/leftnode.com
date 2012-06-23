---
layout: post
title: "Kwolla 1.2.0 Architecture"
permalink: /entry/kwolla-1-2-0-architecture.html
comments: false
author: Vic Cherubini
---

The upcoming Kwolla 1.2.0 release introduces a difference in the core social engine. This difference adds an external and internal API to Kwolla so you can develop your own modules and addons on top of it. I'd like to outline some new features of Kwolla 1.2.0 and go into a high level overview of the architecture.

Kwolla 1.2.0 is built upon a RESTful API that can be called internally by the software itself, and externally through an HTTP POST request. All external HTTP POST requests require an API key. As a Kwolla admin, you can hand them out to other developers who would like to build upon your social network.

Kwolla makes use of the popular and common Model-View Controller pattern. Models are your objects that handle your core data, Views are your templates, and Controllers handle some logic and integrate the Models and Views together.

Kwolla's core is divided into two layers of Controllers: the API Controllers and the Display Controllers. The API Controllers handle the internal and external API calls. All calls are purely stateless, and return a JSON object with their results after execution.

The Display Controllers access the API Controllers to manipulate the Models. The API Controllers return a JSON object to the Display Controllers, which go on to format the View(s) accordingly.

It's our hope that with this new architecture developing modules and addons for Kwolla will be a simple and fun experience. We'll be releasing developer docs with Kwolla 1.2.0.

### External API Calls

Calling the RESTful API through an HTTP POST request is straighforward. If your Kwolla installation is located at kwolla.net, a sample request to create a new user could easily be called through cURL.


<pre><strong>curl</strong> -X POST -F "user[username]=kwolla_user" 
  -F "user[password]=sample_password" 
  [-F ....] 
  -F "api_key=secure_api_key" 
  http://kwolla.net/user/create</pre>

Doing the same with PHP and the curl library is equally as simple.

<pre>&lt;?php

$parameters = array(
  'api_key' => 'secure_api_key',
  'user[username]' => 'kwolla_user',
  <em>/*...*/</em>
);

$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://kwolla.net/user/create',
  CURLOPT_POST => true,
  CURLOPT_HEADER => false,
  CURLOPT_USERAGENT => 'Kwolla Social Network 1.2.0',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POSTFIELDS => $parameters
));

$response = curl_exec($curl);</pre>

### Format of JSON Response

All API requests return a commonly formatted JSON object.

<pre>{
  "model": {
    "id": "1",
    "username": "kwolla_user",
    "password": "$P$ADE/4ffRdke"
  },
  "name": "user",
  "content": "miscellaneous content or data",
  "messages": [{
    "type": "error",
    "message": "Some very important error has occurred!"
  }],
  "errors": [
    {"field1": "Error 1"},
    {"field2": "Error 2"}
  ],
  "redirect": "http://kwolla.net/account/control-panel"
}</pre>

The `model` key contains the Model that was manipulated, created, or deleted in the API call. It contains all of the keys in the Model. It can be NULL. To accompany this, the **name** field is the name of the Model object within Kwolla so it can be reconstructed easily.

The `content` key is populated with any miscellaneous data that the Display Controller may need. It is empty by default.

The `messages` key contains an array of messages to echo to the user. There are three message types: error, success, and general. Multiple different message types can be returned at once. For example, one success and two general messages could be returned. It's generally not a good idea to do this, but the Kwolla API fully supports it.

If any invalid POST parameters were submitted with the request they are returned in the `errors` key. It is an array of objects, with each object having a field name as the key and an error string as the error. These errors can be displayed to the user so they know what fields are invalid.

The `redirect` field contains a URL to redirect to upon a successful request. This is useful if you want to perform an action and then immediately redirect the user. An example of this would be a successful sign on to Kwolla.

Furthermore, additional fields can be added to the JSON response should an API Controller send them. The fields outlined above will appear in all responses, however.

It's my hope that Kwolla 1.2.0 will bring forth an extensible platform for which to build your social network on.
