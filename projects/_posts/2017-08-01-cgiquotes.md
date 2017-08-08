---
layout: templated
template: default.htm
title: "CGIQuotes — C WebApp for storing & viewing quotes"
links: [{text: "Live version",
          url: "https://dev.abaines.me.uk/quotes"},
		{text: "GitHub source code",
          url: "https://github.com/baines/cgiquotes" }]
---
This is a C program using [CGI](https://en.wikipedia.org/wiki/Common_Gateway_Interface)
to serve a quote database website. It was written to replace the gist storage
that was previously being used by [insobot](/projects/insobot) and provide a
nicer viewing experience.

Quotes are stored in flat files with a simple format, which can be edited via
authenticated POST requests. CGIQuotes then makes each file, and each line within,
available via http in several different formats: raw, html, csv and json to
facilitate easy integration with other people's projects.
