---
layout: templated
template: default.htm
title: Basic SDL/OpenGL Game Engine
links: [ {text: "Available on GitHub here",
          url:  "https://github.com/baines/engine" }]
---

This is a game engine that I've been creating recently using SDL2 and modern
OpenGL 3+ techniques.    
(I'm also trying to keep it compatible with OpenGL 2.1 as long as you have the 
right extensions.)

I know everyone seems to say that you shouldn't make your own engine, but I find
making the engines and systems just as fun, if not more so, than actually making
the games that they're made for. I'm also doing it to learn about new-school
OpenGL and the various things that go into making a game from scratch.

Some of its current features:

* Configuration variables + functions.
* In-game console / command-line interface to access them.
* **Fully** rebindable controls (including all the CLI text-input related keys).
* Unicode text handling / rendering (Not complete, combining characters will break it).
* Can reload all OpenGL state at any time.
* Uses VBOs, VAOs and ARB_vertex_attrib_binding for vertex specification.
* Custom macro-based automatic GL extension loading.

Maybe one day I'll actually make a game with it...

