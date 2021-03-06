---
layout: post
title: "I'm Retiring from PHP"
permalink: /entry/i-m-retiring-from-php.html
comments: false
---

I am retiring from PHP as my language of choice for personal side projects and new programming ventures. This was not an easy decision to come to, but one that I think is necessary for my love of programming to continue. You see, I'm not only a programmer because I love programming, but *because I can not do anything else*.

### History
It all started in 1999 when I was in 8th grade. The Internet was really starting to get interesting and I wanted to start programming. I had picked up basic HTML, so I could render a webpage but I really wanted to make it more interactive. The language of choice then was Perl through a CGI wrapper with Apache. This was something Perl was never designed to do, and for a young kid who knew nothing about Unix, Linux, Apache, or how HTTP worked, it was nearly impossible to get it configured and working.

Eventually I would just find a web host that could do it for me, and I was off and running. Well, sort of. I dabbled with Perl for a few months, but it really confused me. Who remembers that giant regular expression and block of code to parse the request variables to populate a `$POST` and `$GET` array? That was pure magic to me, and I copied and pasted it pretending I knew what I was doing (anyone remember Matt's Script Archive?).

    # From Matt's Script Archive
    if ($ENV{'REQUEST_METHOD'} eq 'GET') {
	    @pairs = split(/&/, $ENV{'QUERY_STRING'});
    } elsif ($ENV{'REQUEST_METHOD'} eq 'POST') {
	    read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});
	    @pairs = split(/&/, $buffer);
    }

    foreach $pair (@pairs) {
	    local($name, $value) = split(/=/, $pair);

    	$name =~ tr/+/ /;
	    $name =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
	    $name =~ tr/ //d;

	    $value =~ tr/+/ /;
	    $value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
	    $value =~ tr/ //d;

	    # Build a hash with $name and $value
    }

After a few months, I got wind of this hot new language called PHP. You just uploaded a .php file to your server and **everything just worked**. You had access to variables in form fields and ones submitted through the URL. No giant regular expression to parse environment variables. It was pretty amazing.

<p align="center"><img src="https://s3.amazonaws.com/images.leftnode/php-logo.jpg"></p>

Not only could you easily access `GET` and `POST` variables, but connecting to a database was dead simple. And all of this on Windows?! It was too good to be true. Developers soon wrote packages to install a WAMP server because installing Apache and MySQL was still frustrating. I was in heaven. Finally, I could start writing web applications that stored data in a database, retrieve that data, and manipulate it.

Of course, I did not know what SQL Injection attacks were, or XSS attacks, or CSRF attacks, or session injection attacks, or any of the popular security vulnerabilities I know about now (to be fair, I'm pretty sure the whole industry did not know about them as well).

But I soon started programming like mad. I made forum software, I wrote basic website builders and blogs, and content management systems. I loved it. Always something new to learn, always something new to build. All of this was facilitated by my father's company, epic software group. As a small web development company in Houston, I got a chance to work with several developers older than myself, and then move into a role of developing large websites on my own. I did this through most of college as well, and at one point built a system of 16862 lines of PHP code to run an entire non-profit organization (at that time I *was* aware of common website vulnerabilities and programmed around them).

Rails and Django didn't grab my fancy. I knew PHP well, had my own framework, and could work quickly to get something up and running.

I programmed like this throughout the MVC revolution. I got better and better jobs (read: better paying, better title) as a PHP developer, but all along the way realizing that the code I wrote on my own time was great, and the code I worked with at work was horrible. Like, worse than horrible. Atrocious. OS Commerce level bad. Having side projects kept me sane, because the code I worked with at work made me miserable.

### Exhaustion Sets In
This is why I'm retiring from PHP for my side projects and new programming ventures. I'm spent with PHP. Exhausted, if you will. I've reached a level where I think I'm at the top with it as a language and if I don't move on to a new language soon, I'll be done completely with programming and I do not want that.

I make great money as a PHP developer now, and I plan to continue that. But my side projects and personal business ventures will be done using other languages and frameworks.

Furthermore, PHP does not enforce good clean coding standards. There are many places it actively discourages good coding standards. As a result, theres a **massive** pile of horrible PHP code and working with it is just a nightmare. New developers can get started quickly by reading some horribly outdated W3Schools article and within a year they're making $65k a year writing shit code and pushing it into production. I've seen it happen. PHP's ease of use and ubiquity are also what makes it attract neophyte developers like flies.

A new developer thinks they format their code well and add some docblocks and all of a sudden they are clean coders. They're not, now they just have well formatted bad code. I deal with that all the time at work.

My days as a hobbyist PHP developer are over. So, what will be next?

### Scala
<p align="center"><img src="https://s3.amazonaws.com/images.leftnode/scala-logo.png"></p>

I heard about Scala a year ago when the JVM based languages (Clojure, Groovy, Scala, etc) started to become popular. It seemed interesting, but I was fearful of switching from PHP to something I didn't know. Over the last 12 years, I've learned all of PHP's quirks and nuances and I would not have that knowledge by moving to a new platform. Now, I don't care about that fear because I'm more interested in learning something new.

I was also fearful I would not be smart enough to learn it. Concurrency? Never had to worry about that in PHP, Apache handled any type of threading (I did write a command line PHP program using the pcntl library, however). Actors? Static Typing? Immutable values over variables? Actual imperative programming? All things I did not have to worry about with PHP.

I purchased a copy of *Programming in Scala* by the languages author, Martin Odersky, and Lex Spoon and Bill Venners. It is an amazing book so far, and I'm reading it with much enthusiasm. My love for programming is revived.

### Side Projects
So what will happen with my side projects? This is the unfortunate news for anyone who has invested in them either monetarily or with their time. They're being put on hold for the time being and I'll come back to them as I feel I do want to do some PHP programming. Right now I do not. I originally planned on finishing Kwolla 2 in June and launching it at the beginning of July. I can not hold myself to this timeline right now.

To show I'm not trying to rip anyone off, **anyone who purchased a pre-sale copy of Kwolla 2 can get a full refund of their entire purchase**. Send me an email and I'll refund your money immediately. You can optionally keep your pre-sale purchase and have all of the benefits of a Initial Adopter.

I have another side project that I'm going to use Scala for. I'm evaluating frameworks, but Thrift looks incredibly interesting. To enter this uncharted territory again is frightening, but exciting at the same time.

### Finishing Up
I'll be blogging as my work with Scala advances. I'm building MilqIt on Scala and hoping to be done with it by the end of the year. I hope you will join me for the ride and subscribe to my blog and I hope you'll share my enthusiasm for programming once again.