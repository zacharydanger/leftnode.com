---
layout: post
title: "Kwolla 2.0 JavaScript Templates with jQuery"
permalink: /entry/kwolla-2-0-javascript-templates-with-jquery.html
comments: false
author: Vic Cherubini
---

One of the key features and central focus points of Kwolla 2.0 is the Activity Stream. As your friends post content to your Kwolla 2.0 Social Network, the Activity Stream will be updated. It is also updated as you post content for your friends to see. Because this is a real time stream, users expect data to be updated asynchronously which gets difficult with the way things are currently done.

### Main Request Loop
Most web software follows a basic Request Loop that has been around for years: user makes request, PHP software interprets that, grabs a template, renders it, and returns the content back to the client/browser. This is a pretty straightforward way of handling requests and works for a lot of the time. Rendering this blog post works exactly like that. While this method is straightforward, it can result in a lot of HTML being thrown back to client which slows down the network connection and page rendering times. Think of a large thread on Reddit or a forum you read - sometimes there is several hundred kilobytes of raw text being returned to the client. It can take several seconds to load, parse, and display.

Things get complicated when users are making asynchronous calls back to the server (through AJAX) and you need to update pieces of the DOM after the AJAX request is completed. Updating the DOM without a full page refresh is a necessity in web development today. It provides a more streamlined experience for the user.

This is complicated because there are many ways to manipulate the DOM after it has been initially loaded. Should the AJAX request return HTML? or JSON? or JSONP? or even XML? How do you re-insert the HTML back into the DOM? HTML is the most convenient, but makes the backend development harder to code because you have to be able to render large layouts and small snippets. It requires having more templates defined with more granularity. This can also result in also returning a lot of HTML, which is slower.

Returning XML is out of the question. Although the X in AJAX stands for XML, XML is just too verbose and not structured properly for doing these requests quickly.

The best way to return data is through JSON or JSONP (in Kwolla's case, JSON). This works great with the API which already returns JSON. Now that the data is returned, how should it be rendered?

We're all familiar with the horrible JavaScript we've written that appends content to HTML.

    var html = '<div id="username">'+json.username+'</div><strong>'+json.description+'</strong>';

That starts to get really ugly really fast. Fortunately, there is a nice elegant solution with the [jQuery Template library](http://api.jquery.com/tmpl). Originally written by jQuery's original author John Resig, the library has been expanded on by Microsoft.

Using the library is both elegant and intuitive. It handles a lot of the heavy lifting like looping for you, and from initial tests, it is very fast. Defining a template is simple: it is HTML within a `<script>` tag with a special `type` parameter.

### Rendering the Activity Stream
The Activity Stream with Kwolla 2.0 is now rendered much faster and easier with jQuery Templates. Each stream element is divided into three templates: the main Activity Stream entity (the initial status, image, video, link, or audio) posted, any comments (also entities) to that entity, and the small form to post a response to a parent entity or child entity.

#### Activity Template

    <script id="activity" type="text/x-jquery-tmpl">
      <div class="v-space20">
        <div class="author-avatar">
          <img src="http://placehold.it/64x64">
        </div>
        <div class="author-activity">
          <a href="#" class="author-name">${user}</a>
          <div class="activity">${description}</div>
          <div class="author-activity-date">${entity_date}</div>

          <div class="responses" id="response-test">
            {{each children}}
              {{tmpl($value) "#activity-response"}}
            {{/each}}
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </script>

#### Activity Response Template

    <script id="activity-response" type="text/x-jquery-tmpl">
      <div class="response">
        <div class="response-avatar">
          <img src="http://placehold.it/32x32">
        </div>
        <div class="response-content">
          <a href="#">${user}</a> ${description}
          <div class="response-date">${response_date}</div>
        </div>
        <div class="clear"></div>
      </div>
    </script>

#### Activity Respond Form Template

    <div class="responses">
      <div class="respond">
        <div>
          <textarea>Share your thoughts...</textarea>
        </div>
        <div class="a-right v-space5">
          <a href="#" class="status-update-button">
            <span>Comment</span>
          </a>
        </div>
      </div>
    </div>


Notice in the first template, *Activity Template*, jQuery Template can include other templates and pass data into them. This allows nice template granularity. I'm very excited about this new addition to Kwolla 2.0. This will make templates easier to manage, and make for a very nice presentation in the browser on top of the [Kwolla 2.0](/entry/the-kwolla-2-0-api-architecture.html) [API](/entry/kwolla-2-0-entity-api-finished.html).
