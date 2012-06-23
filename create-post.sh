#!/bin/sh

DATE=`date +"%Y-%m-%d"`
FILENAME="_posts/$DATE-FIXME.html"

echo '---
layout: post
title: "FIXME"
permalink: entry/FIXME
comments: false
---
' > $FILENAME

echo $FILENAME
