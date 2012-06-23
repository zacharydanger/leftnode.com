---
layout: post
title: "Kwolla 1.2.0 GUI Installation Process"
permalink: /entry/kwolla-1-2-0-gui-installation-process.html
comments: false
author: Vic Cherubini
---

One of the most requested (and exciting) features of Kwolla 1.2.0 is the new GUI installer. Now that it's been finalized, I'll walk through the different steps.

We're confident the new installer is simple and straightforward and we would like to demo it today.

### Step 1
[![Kwolla Installation Step 1](http://images.leftnode.s3.amazonaws.com/kwolla_install_step1_small.png)](http://images.leftnode.s3.amazonaws.com/kwolla_install_step1.png)

The first step asks for some crucial database connection settings. Kwolla can not operate without these. At this step, the configure.php file should not exist. After filling this information out, the Kwolla installer will attempt to connect to the database. If the connection fails, the installation will not continue. If the connection is successful and the proper directories are writeable, the new configure.php file will be constructed with the database connection settings.

As you work your way through the installation process each step you complete is crossed out. Kwolla will not operate properly without the entire installation process being completed, so even if you were to leave this page, your Kwolla site would not be operational. Of course, it's not recommended to leave your site partially installed.

### Step 2
[![Kwolla Installation Step 2](http://images.leftnode.s3.amazonaws.com/kwolla_install_step2_small.png)](http://images.leftnode.s3.amazonaws.com/kwolla_install_step2.png)

After the database settings are configured, you'll need to create the administrative user. The administrator is a normal member of your social network as well, but has administrative privileges like banning users, enabling modules, and changing Kwolla configuration settings. The installer asks for as minimal information as possible when creating the administrator. You can further configure your administrative user after installation.

### Step 3
[![Kwolla Installation Step 1](http://images.leftnode.s3.amazonaws.com/kwolla_install_step3_small.png)](http://images.leftnode.s3.amazonaws.com/kwolla_install_step3.png)

The last step in the installation process that requires your input asks for basic configuration information. By default, the Cookie Domain, Site URL, and Secure Site URL are pre-determined for you. You can change them, of course. Kwolla supports integration with Google Analytics and Google Translate, so you can add your Google Analytics account number and Google Translate API Key as well.

### Step 4
[![Kwolla Installation Step 1](http://images.leftnode.s3.amazonaws.com/kwolla_install_step4_small.png)](http://images.leftnode.s3.amazonaws.com/kwolla_install_step4.png)

Kwolla is not considered installed until you click the "Go To My Kwolla" button on Step 4. This finalizes the installation process so Kwolla can not be re-installed. If you navigate away from this page without clicking the button, Kwolla will not operate properly. After the button is clicked, a final bit of information is written to the configure.php file to ensure installation can not happen again.

That's it! Installation literally takes less than three minutes. After you're finished with the installation, we recommend you log in and immediately start to customize your community.

The GUI Installer is slated to be released with Kwolla 1.2.0 at the end of February.
