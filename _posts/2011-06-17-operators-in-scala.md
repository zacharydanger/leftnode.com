---
layout: post
title: "Operators in Scala"
permalink: /entry/operators-in-scala.html
comments: false
author: Vic Cherubini
---

Because everything is an object in Scala, operators behave a bit differently than they do in other languages. In Scala, operators are methods defined on classes.

    1 + 2
    // res0: Int = 3

Scala internally translate this to calling the method `+()` on the `Int` class. Scala translates the above statement to:

    (1).+(2)

This looks like odd syntax, but if you replace the Integer literals with variables and replace the method `+()` with `add()`, you can more easily see how operators work.

    val a: Int = 1
    val b: Int = 2

    // Pretend the method add() exists on the scala.Int class
    a.add(b)

In this parlance, it looks like one object calling a method on itself and passing in the other object as the argument. Scala lets you bypass the `.+()` awkwardness by just calling `+`.

The first question I had when Scala introduced this concept to me was operator precedence. How does Scala know to follow generally accepted mathematical concepts if everything is a method on an object? Scala knows that `1 + 2 * 3` evaluates as `7` and not `9`. Scala determines operator precedence based on the *first* character of the operator. The operators starting with `*`, `/`, and `%` have higher precedence than those starting with `+` or `-`.

The one exception to operator precedence are *assignment operators*. Assignment operators are `*=`, `/=`, `+=`, etc. If an assignment operator is not a comparison operator (`<=`, `>=`, `==`, `!=`), then it has the same precedence as the `=` operator. This allows statements like `a *= b + c` to work like you think they would. `b` and `c` are added together first, and then multiplied by the value in `a` and ultimately storing the result in `a`.

As always, parentheses have the highest precedence, so if you are concerned about an expression not evaluating correctly, use the appropriately nested parentheses.

Most of the operators used are infix operators: they are in-between both arguments. In `a + b`, `+` is an infix operator because it operates on two objects. Scala supports prefix and postfix operators as well. They operate on a single operand. In the expression `-9`, the `-` is a prefix operator because it operates only on the value `9` and it comes before the value. Because operators are methods, a method like `toString` on an object of type `scala.Int` is a postfix operator because it comes after the object.

    val a: Int = 10
    a.toString
    // res0: java.lang.String = 10

The above statement is identical to `a.toString()`, `a toString`, and `a toString()`. If there are no side effects of the method and no parameters passed into it, Scala generally prefers you leave off the parentheses. I will generally follow this rule. Additionally, I will always use the `.` when working with named methods because it is more expressive to me. It is more expressive that `toString` is a method operating on `a` in `a.toString` than `a toString`.

### Operator Associativity
The last unique thing about Scala operators are their associativity which is determined by the *last* character of the operator. If the last character is a ':', they are **right** associative, otherwise they are **left** associative.

In the code snippet below, a temporary List is created with the List building operator `::`.
    
    val a = 10
    val b = 12

    a :: b :: Nil
    // res0: List[Int] = List(10, 2)

The list building operator (I do not know its actual name) ends in a ':' so it is right associative meaning the statement is read from right to left. This can be a bit confusing at first. Again, the operator `::` is just a method on an object. In this case, the object is `Nil`. The statement above is identical to calling:

    Nil.::(b).::(a)

If you try to build the list without it ending in `Nil`, you will get an error about `::` not being a member of class `Int`. Of course, the statement `a * b` is left associative, so it is read from left to right like you would expect.

As a final example of the syntactical sugar that Scala allows, the following two statements are identical.

    val list1 = a*b :: b/a :: b+a :: Nil
    val list2 = Nil.::(b.+(a)).::(b./(a)).::(a.*(b))

    list1 == list2
    // res0: Boolean = true

### Conclusion
It took me a moment to grasp the different operators in Scala and how they work. I really think the way operator precedence and associativity works makes sense after reviewing the chapters a bit. Perhaps many languages work this way, but having it explicitly spelled out in *Programming in Scala* was particularly helpful.
