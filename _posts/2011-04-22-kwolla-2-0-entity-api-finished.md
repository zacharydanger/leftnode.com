---
layout: post
title: "Kwolla 2.0 Entity API Finished"
permalink: /entry/kwolla-2-0-entity-api-finished.html
comments: false
author: Vic Cherubini
---

Kwolla 2.0 development is continuing at a great pace. Recently one of the largest pieces of code landed into the main master branch in the Kwolla Git repository. The Entity API is a core piece of Kwolla 2.0 and I want to take a moment to describe how it works and why it is so important.

One of the nice parts of Kwolla 1.x is the ability to upload images and videos. With Kwolla 2.0, we wanted to extend this further to allow uploading of many different types of data. We call these "entities" in Kwolla 2.0. There are five entities that Kwolla 2.0 initially allows you to save: status updates, images, videos, audio files, and links.

### Basic API
Like the rest of Kwolla 2.0, the Entity API is a RESTful HTTP API that has associated GET, POST, PUT, and DELETE methods. The API endpoint is `http://kwolla.com/api/entity`.

All entities require three pieces of information before they will be saved in the database: user_id, description, and type. When creating a new entity, these must be passed in through an associative array called `entity`. Different entities require additional pieces of information.

### Status Updates
A status update is simply a piece of text that describes what you are up to. It can also be a comment on another entity. To create an status entity, a POST request would look like this:

    curl -F "entity[type]=status" 
      -F "entity[user_id]=1" 
      -F "entity[description]=I just bought a house!" 
      http://kwolla.com/api/entity

Upon successful entity creation, the entity object will be returned in a standard Kwolla Response JSON.

### Links
A link is a URL you want to share with your friends. In addition to the three required entity fields, a Link entity requires a `url` parameter that contains a valid URL. When adding a link, the API will fetch the contents of the website to determine what the `title` of the entity should read. This is parsed from the `<title>` tag in the website content. Creating a new link is as simple as calling:

    curl -F "entity[type]=link" 
      -F "entity[user_id]=1" 
      -F "entity[description]=Cool social network" 
      -F "entity[link]=http://kwolla.com" 
      http://kwolla.com/api/entity

### Images
With the initial release of Kwolla 2.0, images can only be added to Kwolla through an upload mechanism (i.e., not from another website). The only additional parameter necessary is `entity` upload data. Uploading an image on your computer is as simple as calling:

    curl -F "entity[type]=image" 
      -F "entity[user_id]=1" 
      -F "entity[title]=Funny picture!" 
      -F "entity[description]=This is a funny picture" 
      -F "entity=@/home/vmc/images/funny-picture.png" 
      http://kwolla.com/api/entity

When an image is uploaded, Kwolla 2.0 resizes it into six different sizes: original, large, medium, small, thumbnail, and micro.
These different sizes are configurable through the administration panel. The default sizes for each are:

+  **original** &mdash; Nothing is performed, this is the original size of the image.
+  **large** &mdash; 800x800
+  **medium** &mdash; 400x400
+  **small** &mdash; 120x120
+  **thumbnail** &mdash; 64x64
+  **micro** &mdash; 32x32

The aspect ratio is maintained when resizing an image. An image that is originally 1024x600 would be resized to 32x18 for the `micro` size.

### Audio
Any audio file you uploaded through Kwolla will be converted to an OGG file so it can be played through an HTML5 `<audio>` tag. Audio file conversion will require both a separate Zencoder and Amazon AWS S3 account. Kwolla 2.0 will offload any conversion to the Zencoder service. This is a faster and more scalable solution to encoding audio. Uploading an `audio` entity is nearly identical to uploading an image:

    curl -F "entity[type]=audio" 
      -F "entity[user_id]=1" 
      -F "entity[title]=Me singing" 
      -F "entity[description]=Singing a song" 
      -F "entity=@/home/vmc/music/me-singing.mp3" 
      http://kwolla.com/api/entity

### Video
The final entity you can create with the initial release of Kwolla 2.0 is a video file. The `video` entity type creation is very similar to both the `image` and `audio` entities. Additionally, a Zencoder and Amazon AWS S3 account are required to convert videos. When configuring Kwolla 2.0, you will be able to enter your API credentials for each service. Uploading a new video is nearly identical to uploading audio:

    curl -F "entity[type]=video" 
      -F "entity[user_id]=1" 
      -F "entity[title]=Funny video!" 
      -F "entity[description]=Very funny video!" 
      -F "entity=@/home/vmc/videos/video-01.mp4" 
      http://kwolla.com/api/entity

I'm very happy with the progress of Kwolla 2.0 so far. I've made a list of the final things that need to be completed before the initial launch. I highly recommend taking part of the Kwolla 2.0 pre-sale to take advantage of a great deal on Kwolla 2.0. If you have any further questions about Kwolla 2.0, please contact us.
