---
layout: post
title: "Clarification of Immutable and Mutable Objects in Scala"
permalink: /entry/clarification-of-immutable-and-mutable-objects-in-scala.html
comments: false
author: Vic Cherubini
---

I think I have my confusion between mutable/immutable `val`/`var` objects under control in Scala.

The examples below are going to be overly verbose for the sake of clarity, one would not normally write code like this.

    var varSetIm = scala.collection.immutable.Set("A", "B", "C")
    val valSetIm = scala.collection.immutable.Set("A", "B", "C")

    // Updating varSetIm is fine, but because it is immutable,
    // it does not change the value in place
    varSetIm += "D"
    println(varSetIm) // Set(A, B, C, D)

    varSetIm + "E"
    println(varSetIm) // Set(A, B, C, D)

    // Legal because the Array is defined with var
    varSetIm = scala.collection.immutable.Set("Z", "Y", "X")
    println(varSetIm)

    // Not legal because the initial Set was defined as a Set of Strings
    varSetIm = scala.collection.immutable.Set(1, 2, 3)
    // <console>:8: error: type mismatch;
    //  found   : Int(1)
    //  required: java.lang.String
    //     varSetIm = scala.collection.immutable.Set(1, 2, 3)

    // Not legal because Set is defined with val
    valSetIm += "D"
    // <console>:9: error: reassignment to val
    //     valSetIm += "D"

    // A legal statement, but doesn't update valSetIm
    valSetIm + "E"
    println(valSetIm) // Set(A, B, C)

    // Also not legal
    valSetIm = scala.collection.immutable.Set("Z", "Y", "X")
    // <console>:8: error: reassignment to val
    //     valSetIm = scala.collection.immutable.Set("Z", "Y", "X")

    // This is also legal
    val valSetIm2 = valSetIm

    // But this is not, it's re-defining an already referenced val definition
    valSetIm = valSetIm2
    // <console>:9: error: reassignment to val
    //     valSetIm = valSetIm2</pre>

Compare this when building a series of mutable Sets.

    var varSetM = scala.collection.mutable.Set("A", "B", "C")
    val valSetM = scala.collection.mutable.Set("A", "B", "C")

    // Can update varSetM and valSetM
    varSetM += "D"
    println(varSetM) // Set(A, B, D, C)

    valSetM += "D"
    println(varSetM) // Set(A, B, D, C)

    // Here's where it gets interesting

    // This is legal of course, it's defined with var
    varSetM = scala.collection.mutable.Set("Z", "Y", "X")
    println(varSetM) // Set(Z, Y, X)

    // Even though valSetM is mutable, it can't be redefined because
    // it was described with val, only its values can be changed.
    valSetM = scala.collection.mutable.Set("Z", "Y", "X")
    // <console>:8: error: reassignment to val
    //     valSetM = scala.collection.mutable.Set("Z", "Y", "X")

This helped clear up some things for me. I hope it helps you as well. The best way to test this out is to open up the Scala REPL and start playing around with the different `val` and `var` definitions.

To sum things up, Scala does not care what type the object is (if it was defined as `mutable.Set` or `immutable.Set`), if the object is defined with `val`, it can not be redefined. However, if the object is mutable, it can be mutated with the overloaded operators (`+=`, for example), but if the object is immutatable, each mutation returns a whole new object. Also, the result of an immutable operation can not be reassigned to a `val` reference.
