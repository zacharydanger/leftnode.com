---
layout: post
title: "Immutable and Mutable Objects in Scala"
permalink: /entry/immutable-and-mutable-objects-in-scala.html
comments: false
author: Vic Cherubini
---

Everything in Scala is an object. Scala has mutable and immutable objects. A mutable object is one that changes in place and an immutable object alters the data on an operation and returns the modified object into a new one.

An immutable object is defined with `val` and a mutable object is defined with `var`.

The `val` and `var` definitions seem to change when the type of object changes, which can lead to some confusion. For example, the defalt type of Set and Map in Scala are immutable. The code below creates two objects, `varSetIm` and `valSetIm`. `varSetIm` is an immutable object but defined with `var` and `valSetIm` is an immutable object defined with `val`.

    var varSetIm = Set("A", "B")
    val valSetIm = Set("A", "B")

    varSetIm += "C"
    println(varSetIm) // Set(A, B, C)

    valSetIm += "C"
    // <console>:9: error: reassignment to val

That makes sense, `val` defined objects are immutable and `var` defined objects are not. However, things start to get hazy when the Sets are of type scala.collection.mutable.Set.

    var varSetM = scala.collection.mutable.Set("A", B")
    val valSetM = scala.collection.mutable.Set("A", "B")

Now that both `varSetM` and `valSetM` are defined as mutable objects, the `val` and `var` definitions do not seem to matter. I can push values onto `valSetM` without Scala complainig.

My question: why is this? Why have both `var` and `val` definitions when they can be overridden by the library used to create the object?

Even more confusing is that when a mutable object is made and another object is appended to it, it doesn't go to the tail of the object. Continuing with the Set example:

    varSetM + "D" // Set(A, B, D, C)
    valSetM + "D" // Set(A, B, D, C)

Why is the String "D" inserted before "C"?

I'm still incredibly new to Scala, so I'm sure these will be answered as I read more *Programming in Scala*, but initially they are a source of confusion. Any help in clearing this up would be appreciated.
