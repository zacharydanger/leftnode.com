---
layout: post
title: "Thems the Breaks"
permalink: /entry/thems-the-breaks.html
comments: false
author: Vic Cherubini
---

I am writing this blog as a way to flesh out learning Scala. It is my hope that you're either learning the language yourself and can learn with me, or you already "know" it and can help me along when I have questions. In either regard, I'm glad you are reading. Essentially, I'm saying I'm by no means a Scala expert, and I certainly hope this post does not come off as me claiming to be one.

Scala does not have a `break` keyword. `match` (Scala's version of `switch`/`case`) statements do not fall through, so no `break` is required. Because a functional approach is desired in many situations, the Scala authors felt that a `break` keyword was not necessary. It's an interesting approach, and one that will take getting used to after coming from an imperative background.

For programmers who absolutely must have a `break` keyword, a class named `Breaks` and a `break` method are available to use. This entry is not so much how to use the `Breaks` library, but how it works behind the scenes. It's an interesting concept in Scala and one that looks like it can be quite useful in the future.

The basic idea behind the `Breaks` library is that code is wrapped in a `breakable` block and when a breakable condition occurs, the `break` method is called. I say method because `break` is defined as a method in Scala.

    import scala.util.control.Breaks._
    import java.io._

    val in = new BufferedReader(new InputStreamReader(System.in))

    breakable {
      while (true) {
        println("? ")
        if (in.readLine() == "") break
      }
    }

This short snippet (taken directly from *Programming in Scala*) will ask for input until an empty string is entered. It breaks immediately after that.

When I first encountered this, I wondered how the call to `breakable` worked. Reading on, *Programming in Scala* explains that it is actually a method call. From there, I was off trying to reconstruct the way it worked.

I started off with a method `breakable` that threw an Exception when an argument was a specific value.

    def breakable(i: Int) = {
      if (10 == i)
        throw new Exception("break occurred")
    }

    breakable {
        10
    }

Methods in Scala with only a single argument do not require the parentheses. Additionally, Scala allows you to place braces around blocks of code (to create different scopes, similar to how Perl works). Thus, Scala can make an ordinary method call look like a language construct.

The above call to `breakable` is identical to calling either `breakable({10})` or `breakable(10)`.

Next, I wanted to print something if the argument was not 10.

    breakable {
        9
        println("No break occurred")
    }

When this is executed, Scala complains of a type mismatch error. The `breakable` method is expecting an `Int`, but received a type `Unit`. The method `println` returns an object of type `Unit` (essentially a `void` in Scala), and because `println` was the last statement executed in the block, the `Unit` value returned from `println` is passed into `breakable`.

Changing the signature of `breakable` to `breakable(i: Unit)` does not help much. Scala does not allow you to compare objects of type `Int` and `Unit`; their comparison always yields false.

*Programming in Scala* also mentioned something about the `break` method throwing an `Exception`. With that line of thinking, I updated `breakable` and added a method `break`.

    import java.io._

    val in = new BufferedReader(new InputStreamReader(System.in))

    def breakable(ex: Unit) = {
      try {
        op
      } catch {
        case ex: Exception => throw ex
      }
    }

    def break = {
      throw new Exception("break occurred")
    }

    breakable {
      while (true) {
        println("? ")
        if (in.readLine() == "") break
      }
    }

Now we're getting somewhere! The `break` method throws a new `Exception` if it is called. `breakable` is sent this `Exception` as its argument. Unfortunately, Scala displays the full stack trace with the `break` call which is not desirable. To get around this, the [official Scala source](https://github.com/scala/scala/blob/master/src/library/scala/util/control/Breaks.scala) throws an `Exception` that suppresses the stack trace.

I was really impressed with how easy building this construct is. This is really how I enjoy learning a language (especially when I can see how parts are actually implemented). I think building some constructs like this would be a great way to "extend" the language and to make your software a lot more expressive.
