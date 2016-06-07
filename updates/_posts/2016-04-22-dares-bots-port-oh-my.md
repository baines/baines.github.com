---
layout: templated
template: default.htm
title: "Dares, Bots, and Ports, oh my!"
---

### Ludum Dare

Last week I took part in Ludum Dare 35, and created a game in 48 hours using C
and SDL2. I called it "VampShift: The Bloodening", and following from the
competition's theme of "shape-shift", you play as a vampire that has to progress
through rooms via shape-shifting into a bat.

{:.center}
[![VampShift: The Bloodening](/img/vstb.png)](/ld35/)

You can [play the web version here](/ld35/), or see its
[Ludum Dare entry page here](http://ludumdare.com/compo/ludum-dare-35/?action=preview&uid=64951),
which includes links to the downloadable version for Linux & Windows.

I also live-streamed the development of the game on Twitch. The VoDs are
available at [https://twitch.tv/insofaras/profile](https://twitch.tv/insofaras/profile/highlights).

You might be curious about the "insofaras" user name there. I originally picked
that (rather pretentious :/) name on twitch intending it to just be a random
anonymous account, but lately I've been doing some projects under that name
that I think are worth de-anonymizing it for.

The first of which is:

### Insobot

[Insobot](https://github.com/insofaras/insobot) is an IRC bot written in C99 
with a modular structure; it can load and reload modules in the form of shared 
libraries (.so) at runtime without disconnecting from the server.
Various modules exist for it including, at the time of writing, modules for 
storing quotes, expanding URLs, showing twitch uptime / new followers, and 
giving the schedule for Handmade Hero.

The reason that last module exists is because Insobot basically spawned out of
my involvement with the community around Handmade Hero (known as Handmade Dev or
Handmade Network), and my interest in creating a project that uses a more 
limited subset of C++ than I was used to.

The community seems to appreciate insobot, and have used my insobot code as the
basis for their hmd_bot, which is designed to replace their previous hmh_bot
that was written in python. Perhaps the main reason insobot is "appreciated"
though is due to one of its modules that I haven't mentioned yet - 
the Markov chain module.

It's a pretty standard [Markov chain](https://en.wikipedia.org/wiki/Markov_chain)
implementation that gets words — and connections between words — from the IRC
chat. When mentioned, or on a random chance, it will form a sentence of its own
and send that back for all to see.

For something that doesn't really amount to much more than a lot of rand(), it
has had some amusing results, several of which have been shared on twitter:

{% include figure.htm file="ibq1.jpg" alt="Insobot Quote" desc="Showing some understanding?" link="https://twitter.com/AllenWebster4th/status/708833510530883584" %}
{% include figure.htm file="ibq2.jpg" alt="Insobot Quote" desc="Strangely appropriate" link="https://twitter.com/JamesWidman/status/708840547453157376" %}
{% include figure.htm file="ibq3.png" alt="Insobot Quote" desc="Not a fan of new programming languages" link="https://twitter.com/cmuratori/status/710311130401341441" %}
{% include figure.htm file="ibq4.jpg" alt="Insobot Quote" desc="Insulting my people" link="https://twitter.com/d7samurai/status/716369247031730177" %}

The source code of Insobot is avialable at [github.com/insofaras/insobot](https://github.com/insofaras/insobot).
I'll probably be moving it to my main github account at some point.

### 4coder

The second major project that I took on under the name Insofaras is helping
to port the [4coder](http://4coder.net) code editor to Linux.

{:.center}
[![4coder](/img/4coder.png)](http://4coder.net)

[4coder](http://4coder.net) is a project by Allen Webster to create an improved
editor for C and C++ programmers. He's already implemented the standard text 
editor side of things, and is planning to add more advanced features that take
advantage of the editor itself having an understanding of the programming
languages in use.

One of its defining features is the customisation layer, implemented through
loading a user-created DLL / shared-library. In contrast to the scripting
languages often found in other editors, this approach allows extension of
the editor with native compiled code, appropriate for its target audience of
C programmers.

Mr Handmade Hero himself — Casey Muratori — has already found the current alpha
build good enough to replace Emacs; he recently switched to using 4coder
on his Twitch streams. That is, in the words of Allen Webster, awesome.

My involvement with 4coder has been mainly implementing the stubbed-out functions
that were present in the Linux platform layer. This boils down to looking at
how the windows side is doing things, and translating that into a POSIX and
Linux approach.

I've enjoyed doing this Linux porting work, if you have a project that you would
like a Linux version of, contact me: alex @ this site.


