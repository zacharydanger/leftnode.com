---
layout: post
title: "Kwolla 1.1.2 Released"
permalink: /entry/kwolla-1-1-2-released.html
comments: false
author: Vic Cherubini
---

Kwolla 1.1.2 was released on March 16, 2011. The release contains one very important bug fix and it is recommended you upgrade to Kwolla 1.1.2. You can upgrade by using the download link in your receipt email or making another order on [kwolla.com](http://kwolla.com).

If you've been using Kwolla at all, you might have noticed that from time to time you'll get an error that says:

  POST methods are not allowed without the correct token! Token given: 12345678

Reproducing this error is incredibly difficult, and I've only been able to reproduce it in IE and Chrome. Firefox is my primary browser, so I've never encountered the bug.

### Behind the Scenes
When you visit your Kwolla installation for the first time, three things are stored in the internal session: a public token, a private token, and a salt. When you make a POST request, the public token is passed into the software. The public token is then hashed with the salt, and their value must equal the private token. If they don't, the request is considered invalid and not allowed. If they do match, then the request is allowed.

This is a protection against a potential [CSRF attack](http://en.wikipedia.org/wiki/Cross-site_request_forgery). However, there's a much better, simpler, and more hardened way of preventing the attack.

Now, when you visit a Kwolla installation for the first time, a cookie is set with a 40 character hash in it. Every time you make a POST request, a special hash of that token is sent. The hash sent with the request is tested against the hash of the cookie token. If they match, the request is allowed, otherwise denied.

The only file that changed was `lib/Object/PV.php`. You can safely overwrite your existing `PV.php` file with that one.

Please report any additional bugs you encounter while using Kwolla. Thank you for your help.
