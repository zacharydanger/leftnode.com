---
layout: post
title: "Algorithmically Estimating Developer Time"
permalink: /entry/algorithmically-estimating-developer-time.html
comments: false
author: Vic Cherubini
---

Any developer who has worked on an hourly basis knows how difficult and frustrating it is to accurately determine the number of hours a project will take. It's downright impossible to accurately estimate anything over eight hours of work. By the time that threshold hits, too many other factors come into play that alter the hourly estimate.

Your clients, however, want as accurate of an estimate as possible. They are paying hourly for your services, so it's a justifiable concern. As the developer, you're stuck: too few hours and you'll either be underpaid or have to ask for additional hours, too many and you risk losing the client or having a reputation for being too expensive.

Experience doesn't help either. Even with a decade or more of experience, I can still be wildly off with my estimates, and I know it is true of other developers with an even longer career. The difference in the estimated hours and actual hours worked is even exacerbated when working with new technologies that are previously foreign. For example, I'm currently building an application on top of the Google AdWords API which has confusing documentation. Simply getting the sandbox up and working has consumed the total number of hours I expected to work on my local library. They are hours I'll have to eat because I did not properly estimate how long it would take to complete that portion of the project.

Hubris was the primary reason I neglected to more accurately determine how many hours it would take for me to complete that portion of the overall project. "I've worked with countless SOAP API's before, how different could this one be?", was my justification when writing the project spec. I neglected to do any in depth investigation before I submitted by bid, and it ended up biting me in the end. That lead me to ask this questions: is there a way to algorithmically track and estimate hours that improves over time? I began working on a system that I think has the potential to solve this problem.

### Step 1. Set up an issue tracker
To start, you'll need a way to track issues (which can range from tasks, to bugs, to features; anything). If it can have a time attached to it, put it in the issue tracker. You'll need to do this even if you are a single developer working alone (especially so because you're responsible for coming up with as accurate estimates as possible). I treat my issues as stories (as in stories in an agile development methodology). Even if you don't follow "Agile", and are the hardest-core of "waterfallists", you can still use this methodology because when it comes down to it, you're tracking issues over a period of time. How you decide to complete those issues is up to you.

### Step 2. Give points to issues
After you have described several issues, assign points to them based on how hard they appear to you. Points should be integers greater than 0. The point system is entirely arbitrary, but points should be relative to how hard the issue is to the other issues in the project. For example, the simplest of issues you can have (updating static text, changing an email address, something that might take literally minutes) would have a point value of 1. An issue in the same project that you know will require a database schema, API integration, a complete test suite, and documentation might get a point value of 32. It is important to note that points are not hourly estimates. A point value of 16 in one project may be totally different in difficulty than the same point value in another project.

### Step 3. Estimate number of hours to complete each issue
At some point, you'll have to provide estimates for the number of hours you think it will take to complete an issue. This is not only for this system, but because clients will ask for it. Because you're new to this system, you'll have no previous numbers to fall back on, so use your experience to come up with as best an estimate as possible.

### Step 4. Complete each issue
As you work on and complete each issue, keep accurate track as to how long it takes you to finish. I use [Slimtimer](http://slimtimer.com) for my tracking. It is an awesome way to easily track your time, and has a pay-what-you-value payment scheme.

### Step 5. Reflection
Now that you have completed each issue and have the actual number of hours it took, you'll need to calculate your efficiency ratio, or ER. The ER is the ratio of the number of hours estimated to the actual number of hours taken. This needs to be calculated for each issue. Next, multiply the ER by the point value of the issue. I call this the developer effectiveness, or DE. Ideally, your ER will be close to 1 and the two values will be approximately equal.

### Step 6. Summary
At the end of the project, developers who are good at estimating their time have a sum(DE) >= sum(possible_points). Note: The possible_points variable is only the sum of the points for issues that developer worked on. Developers who are not as good at estimating their time would have a ER less than 1, and a sum(DE) < sum(possible_points).

### Short Example
As a developer, I have 4 issues. Issue 1 has a point value of 16, and a time estimation of 12 hours. Issue 2: 8 points, 6 hours. Issue 3: 1 point, 1 hour. Issue 4: 5 points, 3 hours.

Over the course of development, I complete Task 1 in 14 hours, Task 2 in 5 hours, Task 3 in 1 hour, and Task 4 in 4 hours. This gives an ER of 0.857, 1.2, 1, and .75 for each task respectively. Multiplying each of those ER's by the tasks points and summing them up gives: 28.062. The actual sum of each issue is 30. Thus, I was fairly accurate in determining how long I thought it should take me to complete each issue.

### Final Thoughts
One common complaint when I originally presented this to some of my peers is that a lot of their time spent on an issue is waiting around for the client, or sitting in meetings, or doing other necessary administrative work. They wanted to know if those hours should be included in the estimates? The answer is NO. This is simply an algorithm for when you're actually coding, architecting, or otherwise engineering what the issue specifically asks for. You can't control those outside forces, so don't try. Just try to determine with as much accuracy as possible your time estimations.

Over time, you will be able to track your effectiveness at estimating time. Thus, if your ER approaches 0.5, you might think about doubling your time estimates for future tasks. Alternatively, if it approaches 2.0, perhaps shave some time off the estimates.

As a final note: this system should never be used to punish developers! This system simply spits out a number, it can **in no way** determine the quality of a developer. No algorithm can.

I will be using this system in several upcoming projects and reporting how well it works. If you try it yourself, please let me know.

> Hofstadter's Law: It always takes longer than you expect, even when you take into account Hofstadter's Law. &mdash; **Douglas Hofstadter**
