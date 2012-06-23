---
layout: post
title: "Introducing Accthub"
permalink: /entry/introducing-accthub.html
comments: false
author: Vic Cherubini
---

I would like to take a moment to talk about a new product I'm building for Bright March. Because we do a lot of custom software for our clients, one piece of the puzzle we are continually rebuilding is account management. Web software often has a place to sign into the application, and thus some backend to store accounts, addresses, account meta-data, and perform authentication is necessary. It seems many web software duplicates this effort, but the same general principals apply: you want a place to store your user account information and a tool to perform account authentication.

I am officially announcing [Accthub](http://accthub.com).

![https://s3.amazonaws.com/images.leftnode/accthub-small-logo.png](https://s3.amazonaws.com/images.leftnode/accthub-small-logo.png)

Accthub aims to be the central place you store all of your customer and user account information. It is built as a RESTful API that your application communicates with.

When signing up with Accthub, you first create a client. Your client has an API key and your billing information associated with it. The central piece of Accthub are Accounts, of course. When someone registers on your website, you would create a new account for them. An Account record has some basic pieces of information:

* **email address**
* **password**
* status
* full name
* complete (for your definition of a complete account)
* language
* timezone
* gender
* company
* website
* Twitter name
* Facebook name
* Google+ ID
* Github name

Bolded points are the only ones that are required when creating an account.

Of course, an obvious usage of this is to tie it in with your ecommerce application. Natively, an Account record can have an unlimited number of Account Address records.

Furthermore, we know that the bullet points listed above are not all of the data you can collect about your applications accounts. Thus, you will have the ability to add arbitrary keys and values on a per account basis.

Accthub has a few basic tenets:

* We are secure. All passwords are hashed with BCrypt. All communication is done over HTTPS.
* We are fast. If we are not continually delivering sub 300ms response times, we need to take a look into our infrastructure and code.
* We are inexpensive. Our cost is 1 cent per account record. Unlimited addresses and unlimited key/value pairs per account. You are only charged by the number of account records you have. Accthub is entirely free to use if you have 100 accounts or less.

My hope is to get the initial bet launched this week. Anyone who expresses interest in using it will have a client set up for them. They can start to beta test it while I fix any bugs and add documentation.

**If you are interested in helping me beta test it, please email me <vmc@leftnode.com>.**

Other thoughts and ideas can be sent to that address as well. I really hope to make this a great product.
