---
layout: post
title: "Accthub Very Alpha Beta Just Launched"
permalink: /entry/accthub-very-alpha-beta-just-launched.html
comments: false
author: Vic Cherubini
---

[Bright March](http://brightmarch.com) just launched the Very Alpha Beta&trade; version of [Accthub](http://accthub.com)! If you would like access to it, please email me <vmc@leftnode.com>.

We build a lot of custom software at Bright March (in fact, that is what we specialize in) and because the software is client specific, they often need a way to handle accounts. We found ourselves re-inventing the wheel a lot of the time (even if we re-used code and database schema) for account management. So, we built Accthub.

Because the software we write is highly customized and not public facing, we can not (and never want to) use something like Facebook or Twitter OAuth. While a lot of public sites are supporting this capability, there are still a tremendous amount of private sites, eCommerce sites, and highly customized sites that can not or will not.

**Accthub is a very simple RESTful service to store all of your website accounts, addresses, and meta information, and to provide easy authentication.**

That's it, and that is all Accthub will ever be. Accthub has several API endpoints:

* `/accounts` &mdash; The endpoint to create, read, update, and delete your specific accounts.
* `/accounts/:accountId/addresses` &mdash; The endpoint to create, read, update, and delete an address for a specific account.
* `/authenticate` &mdash; The endpoint to authenticate a specific account's credentials.

I will be adding endpoints to store arbitrary key/value pairs of data with each account (to allow you to store data that we don't account for in the database schema), and an endpoint for doing password resets (which will still require some work on the part of the client).

After you request access, you will be provide an API key which is essentially your password to Accthub. You will use this along with HTTP Basic Authentication to access your specific accounts. You will always use HTTP Basic Authentication when accessing all account information.

## Creating an account
`POST http://api.accthub.com/accounts`

### Parameters
account.email, password

### Optional Parameters
account.fullname, account.complete, account.lang, account.timezone, account.gender, account.company, account.websiteUrl, account.twitterId, account.facebookName, account.googlePlusId, account.githubId

### Sample Request
    curl -X POST -u "user@example.com:api_key" 
      -d "account.email=account1@example.com" 
      -d "account.fullname=Account Example" 
      -d "account.lang=en-US" 
      -d "account.gender=M" 
      -d "account.websiteUrl=http://leftnode.com" 
      -d "account.githubId=leftnode" 
      -d "password=accthub_password" 
    http://api.accthub.com/accounts

The `password` parameter is not part of the `account` structure. This is because the `Account` model in the Accthub source does not have a `password` field, only a `passwordHash` field.

### Sample Response
    {
      "id":2,
      "client_id":1,
      "email":"ACCOUNT1@EXAMPLE.COM",
      "username":"account1@example.com",
      "password_hash":"$2a$10$vTOqCv/CJiJXhYM4N72CwO9CrxcvXPg0Cs76yMH0cQjg7tXdFPTUG",
      "fullname":"Account Example",
      "complete":0,
      "lang":"en-US",
      "timezone":0,
      "gender":"M",
      "website_url":"http://leftnode.com",
      "github_id":"leftnode",
      "_link":{
        "rel":"self",
        "href":"http://api.accthub.com/accounts/2"
      },
      "created":"Feb 18, 2012 6:34:05 AM",
      "updated":"Feb 18, 2012 6:34:05 AM",
      "status":1
    }

This returns a JSON response with the newly created account information. The password is hashed with bcrypt and a work factor of 10. Additionally, in keeping with REST principles, the `_link` parameter provides a link directly to this account.

## Creating an Account Address
`POST http://api.accthub.com/accounts/:accountId/addresses`

Where `:accountId` is the ID of the account you want to create the address for.

### Parameters
address.addressType, address.line1, address.fullname, address.city, address.state, address.country

### Optional Parameters
address.line2, address.line3, address.county, address.postal, address.homePhone, address.mobilePhone, address.workPhone

### Sample Request
    curl -X POST -u "user@example.com:api_key" 
      -d "address.addressType=shipping" 
      -d "address.line1=1000 Place Ave." 
      -d "address.fullname=Account Example" 
      -d "address.city=Dallas" 
      -d "address.state=TX" 
      -d "address.country=UNITED STATES" 
      -d "address.postal=90210" 
    http://api.accthub.com/accounts/2/addresses

### Sample Response
    {
      "id":1,
      "client_id":1,
      "account_id":2,
      "address_type":"shipping",
      "line1":"1000 Place Ave.",
      "fullname":"Account Example",
      "city":"Dallas",
      "state":"TX",
      "country":"UNITED STATES",
      "country_iso2":"US",
      "country_iso3":"USA",
      "postal":"90210",
      "_link":{
        "rel":"self",
        "href":"http://api.accthub.com/account-addresses/1"
      },
      "created":"Feb 18, 2012 7:08:39 AM",
      "updated":"Feb 18, 2012 7:08:39 AM",
      "status":1
    }

By providing an official country name, the system automatically finds the ISO2 and ISO3 initializations. The official Accthub documentation will have a list of all of the countries loaded in our database.

## Authenticating an Account
`POST http://api.accthub.com/authenticate`

### Parameters
email, password

### Sample Request
    curl -X POST -u "vmc@leftnode.com:h9rnpfsiusijfap1i0fuofvm4d" 
      -d "email=account1@example.com" 
      -d "password=accthub_password" 
    http://api.accthub.com/authenticate

### Sample Response
    {
      "id":2,
      "client_id":1,
      "account_id":2,
      "email":"ACCOUNT1@EXAMPLE.COM",
      "token":"KTMK66M1LEBMR6B2POBRSD8AC3KGJS9N76O7EBVMN858DSE88HS",
      "ip_address":"127.0.0.1",
      "referer":"",
      "_link":{
        "rel":"self",
        "href":"http://api.accthub.com/authenticate/2"
      },
      "created":"Feb 18, 2012 7:13:09 AM",
      "updated":"Feb 18, 2012 7:13:09 AM",
      "status":1
    }

The `token` field is a randomly generated string that your client can use to easily perform authentications quickly without having to hit the Accthub API each time. For example, keep it private, hash it with a public random value you generate, and a private salt. On each request, submit the public value through a form, and do the same hash. If they equal, the authentication is still valid.

## Final Thoughts
This is by no means our extensive documentation. Building out our [public facing Accthub](http://accthub.com) website will take a while.

There will also be some bugs you find. Please report them if you do. One glaring omission in all of the above is none of this is sent over SSL. That is something I am looking to fix immediately.

Why should you trust Accthub with your crucial website account information? First, you can retrieve all of your data at any time. We have no plans of going anywhere. We are a small, bootstrapped consultancy now and never have the intention of taking outside investment. We are building this because we love being entrepreneurs, so you will avoid a situation where we are acquired and the service is shut down. If Accthub is making money, we will never shut it down.

Finally, Accthub is inexpensive. Our plan is to charge 1 cent per account with your first 100 accounts free. You can store as many addresses per account and as much meta information as you want. Each account record cost 1 penny.

This is a huge experiment on our part, and we hope you will partake in it with us.
