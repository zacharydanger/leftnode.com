---
layout: post
title: "What PHP Needs to Change"
permalink: /entry/what-php-needs-to-change.html
comments: false
author: Vic Cherubini
---

***Note:*** *This is an entry I originally posted on March 01, 2010. I've recently decided to [move on to Scala](http://leftnode.com/entry/im-retiring-from-php), but I think my old article still holds value. There have been some recent discussions in the PHP community about how the language needs to evolve. This article is my opinion on the subject. I also no longer agree with all of my opinions below as I've matured as a developer.*

Programmers are (generally) defined by the language they know best or use most frequently. I'm a PHP programmer, John Resig is a JavaScript programmer, DHH is a Ruby programmer, and Randal Schwartz is a Perl programmer. Every programmer needs to know several languages to be successful, but programmers usually know one or two very well.

Right now, [PHP is not very respected](http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=380731). As a PHP developer, hearing language like that frankly hurts.

> We have to put up with php as a language for web apps, but it's a rotten language whose use should not be encouraged.  Or supported beyond what's necessary.

*Ouch.* Hearing that the language I use daily, make my living with, and the one I want to build a [really cool framework](http://joltcore.org) in is "rotten" sucks. One might respond that it shouldn't matter what other people think about your language of choice, and I suppose I really shouldn't, but also implied in that statement is that not only the language sucks, but the developers who use that language suck. And that does hurt.

The PHP namespace (of developers) is filled with a lot of cruft, but there is also some great PHP code written. While there's no concrete way to describe what is *rotten code*, I would venture to say most of the PHP released is rotten (I've personally worked with some of the worst PHP out there). This is mainly what gives us a bad name. Poor code can be written in any language, however. Many argue that PHP allows you to do that easier, but I don't think it's PHP that lets you do that. I believe it's the entire stack of applications: you can begin writing PHP programs in minutes on any system. Combine that with inexperience, and you have a strong force to be reckoned with. An inexperienced developer can write a very usable application in PHP very quickly, release it to the world, let it become popular, and then watch as its ripped apart by crackers; the same isn't true for C, C++, or Java for example.

So, what should PHP developers do about this? Can we make the language respected? Can we make PHP developers respected? Let's analyze some ways we can do this.

### Break Everything
PHP7 should break everything. PHP developers are used to things breaking between releases, but the PHP team should announce that PHP7 will most likely break everything. PHP7 will be a highly respected language, and in doing so, it will not allow a lot of backward compatibility. Here's how.

+  **Create a concrete, core language** &mdash; Remove all library methods, and keep centralized core methods on objects. You should be able to compile PHP7 without any external libraries or extensions and have a nice complete language for basic input/output, string manipulation, and math. Anything outside of that should come through approved extensions.
+  **Treat everything as an object** &mdash; Take from Ruby, Smalltalk, and (mostly) Java and treat everything as an object. Integers are objects, strings are objects, and each of them have methods that can operate on them. I don't believe PHP needs the ideas of Ruby and Smalltalk where objects pass messages between each other; calling methods on objects is fine.
+  **Consistent naming of methods and classes** &mdash; Because one of the biggest complaints of PHP is constantly having to check if its (needle, haystack) or (haystack, needle), or some_function(), or function_some(), or someFunction(), a consistent format needs to be chosen. I prefer camelCase, but will live with whatever decision is chosen.
+  **Make things strict** &mdash; Try to pass a string as a float to a method? That's a warning. Let me use strict/static typing if I want to. Let me define a method with a return type and throw an error if the value returned isn't that type.
+  **Everything is Unicode** &mdash; I believe in PHP6 all strings are Unicode, but if not PHP7 should ensure this.
+  **Central start point** &mdash; Create a Main or Init class where all code execution originates from.
+  **Clean up the C code** &mdash; I'm not a C expert, but if you compare the Ruby C code to the PHP C code, it's easy to understand the internals of Ruby over PHP. I would love that for PHP so I could begin writing my own extensions easier.
+  **Get rid of eval()** &mdash; eval() is evil. If you're using it, something is wrong. ***Note:*** *This would break PHPUnit, I disagree with this change now.*
+  **Support operator overloading** &mdash; Because everything are objects, operators are simply methods on objects. Thus, I could have the + operator do something entirely different on an object.
+  **Allow method signatures** &mdash; Allow true method signatures, so programmers can have methods of the same name with a different argument list or return type.
~~~
class A {
	public int function doSomething(int $a, float $b) {
		// Same as $a->*($b->to_int());
		int $c = $a * $b->to_int();
		return $c;
	}

	public float function doSomething(int $a, float $b, float $c) {
		// Same as calling $a->*($b->*($c)); since * is a method on each object $a and $b.
		float $d = $a * $b * $c;
		return $d;
	}
}
~~~

+  **Build a PHP Virtual Machine (PVM)** &mdash; I'm not entirely sure this is possible as I'm not a language designer, but it would be nice to have a PHP Virtual Machine. It could execute PHP bytecode, and allow an explicit heap and stack.
+  **Remove copy-on-write (COW)** &mdash; COW is a fairly foreign concept to newer developers, and can cause problems if you're not aware it exists. With a PVM, PHP could have an explicit stack and heap, allowing programmers to declare variables statically on the stack, and dynamically on the heap. The garbage collector would then collect variables on the heap.
+  **Publish an official PHP spec** &mdash; Similar to the W3C HTML5 spec, but much more concise and designed by a smaller committee, the PHP spec would allow developers to implement their own versions of PHP and would ensure there's concrete examples to compile against.

### Respect the Language
An effort should be made to get the language respected. We should try to recruit developers who can be very vocal about great features of PHP7. We should release great code that's secure, simple to read, and teach new developers the right way to do things. PEAR should be cleaned up, and a great set of core libraries written in PHP7 should be released.

If we can get higher profile developers to respect the language, we'll be in the right direction. They don't have to use the language, but just some mutual respect. I'm not crazy about Ruby, but I respect the language. I see it's power, and I see where Ruby on Rails is a very nice framework, it's just not my favorite. If we could get high profile developers (say, Martin Fowler) to endorse or respect the language, it would go far in a lot of people's eyes.

### Respected Developers
Continuing from above, we need a core team of very highly respected PHP developers. As they release code, give talks, and show people the "right way" to do things, this team will grow and soon many developers will be respected. Similar to what John Resig has done to JavaScript, these developers would do with PHP. Take the language to new heights and show how powerful it can be.

### Conclusion
I'm excited about the future of PHP. I highly doubt any of my ideas would be implemented, but I truly believe they'd help the community as a whole. I was very excited when PHP announced HipHop-PHP. Having the second largest website in the world announce they were helping the PHP community that much is great. PHP isn't going away, there's simply too much code written in it to go away for a long time. However, lets try to improve it at each release, and maybe one day, it will be a highly respected language.

Finally, I'm not a language designer. My ideas could be entirely horseshit, or valid. If I'm incorrect somewhere, please politely let me know and I'll be happy to talk about it. Let's work together to make PHP a well respected, powerful, fast, and efficient language.

Happy hacking.

> There are only two kinds of programming languages: those people always bitch about and those nobody uses. &mdash; **Bjarne Stroustrup**
