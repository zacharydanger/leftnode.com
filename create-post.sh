#!/bin/sh

DATE=`date +"%Y-%m-%d"`
FILENAME="_posts/$DATE-$1.md"

echo "---
layout: post
title: "ADD TITLE"
permalink: /entry/$1.html
comments: false
author: Vic Cherubini
---
" > $FILENAME

echo $FILENAME
