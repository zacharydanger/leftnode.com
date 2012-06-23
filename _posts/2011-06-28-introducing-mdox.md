---
layout: post
title: "Introducing mdox"
permalink: /entry/introducing-mdox.html
comments: false
author: Vic Cherubini
---

This early morning I wrote a short program that converts your Markdown documents into nicely formatted HTML documentation. I named it `mdox` and want to go over it briefly for you.

I'm hosting the [mdox project on Github](https://github.com/leftnode/mdox). It includes a brief README file and some sample documentation on how to get up and running.

Essentially, you write your documentation files in the order you want them to be rendered by pre-pending a numeral before the filename.

+  01-intro.md
+  02-how-to-install.md
+  03-beginning-development.md
+  04-how-to-test.md

Becomes documentation with the title of each page being "01. Intro" through "04. How To Test" and with the table of contents using the same names. You can navigate through the documentation by opening the first file.

### Upcoming Changes

+  Generate an `index.html` file from which all documentation files can visited.
+  Run in the background to automatically regenerate your documentation when the Markdown files change (compass style).
+  Easier way to change the default layout.
+  Add footer/header navigation to previous and next articles.

The point behind `mdox` is that you'll be able to generate very nice and readable documentation very quickly while still using Markdown.

Give it a shot and let me know what you think.

> Any code of your own that you haven’t looked at for six or more months might as well have been written by someone else. &mdash; **Eagleson's Law**
