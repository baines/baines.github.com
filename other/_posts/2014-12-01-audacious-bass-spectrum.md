---
layout: templated
template: default_inc
title: Audacious bass spectrum
links: [ {text: "Available on GitHub here",
          url:  "https://github.com/baines/audacious-bass-spectrum" }]
---

{:.center}
![Audacious bass spectrum screenshot](/img/spectrum.gif)

This is a modification of the Cairo spectrum vizualisation plugin for the 
[Audacious media player](http://www.audacious-media-player.org/).

It focuses on only the bass frequencies and creates a smooth line graph
reminiscent of the old style of Monstercat videos.

The code uses the [FFTW3 library](http://www.fftw.org), along with example code 
provided [here](http://www.fftw.org/pruned.html) on their website.
