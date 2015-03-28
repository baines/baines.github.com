/*
puzzlescript-embed.js from https://github.com/raggy/puzzlescript-embed

The MIT License (MIT)

Copyright (c) 2014 Benjamin Davis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function()
{
	window.PuzzleScript = window.PuzzleScript || { };

	window.PuzzleScript.embed = function(element, id, config)
	{
		var canvas,
			settings =
			{
				engine: "http://www.puzzlescript.net/js/scripts_play_compiled.js"
			};

		extend(settings, config);
		clear_children(element);
		canvas = create_game_canvas(element, settings);

		return load_engine(element, id, settings, function()
		{
			window.canSetHTMLColors = false;

			if (document.documentElement && document.documentElement.ontouchstart !== undefined)
			{
				canvas.onmousedown = function()
				{
					canvas.onmousedown = null;

					var gestureHandler = Mobile.enable(true);

					gestureHandler.setFocusElement(canvas);
				}

				load_game(element, id, settings);
			}
			else
			{
				load_game(element, id, settings);
			}
		});
	};

	function clear_children(element)
	{
		while (element.lastChild)
		{
			element.removeChild(element.lastChild);
		}
	}

	function create_game_canvas(element, id, settings)
	{
		var canvas = document.createElement("canvas");
		canvas.id = "gameCanvas";
		element.appendChild(canvas);
		return canvas;
	}

	function load_engine(element, id, settings, onload)
	{
		var script = document.createElement("script");
		script.setAttribute("src", settings.engine);
		script.addEventListener('load', onload, false);
		document.body.appendChild(script);
		return script;
	}

	function load_game(element, id, settings, callback)
	{
		var githubURL = 'https://api.github.com/gists/' + id;

		var githubHTTPClient = new XMLHttpRequest();
		githubHTTPClient.open('GET', githubURL);
		githubHTTPClient.onreadystatechange = function () {
			if (githubHTTPClient.readyState != 4) {
				return;
			}
			var result = JSON.parse(githubHTTPClient.responseText);
			if (githubHTTPClient.status === 403) {
				displayError(result.message);
			} else if (githubHTTPClient.status !== 200 && githubHTTPClient.status !== 201) {
				displayError("HTTP Error " + githubHTTPClient.status + ' - ' + githubHTTPClient.statusText);
			}
			var result = JSON.parse(githubHTTPClient.responseText);
			var code = result["files"]["script.txt"]["content"];
			compile(["restart"], code);
		}
		githubHTTPClient.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		githubHTTPClient.send();
	}

	function extend(target, object)
	{
		if (typeof object !== 'undefined')
		{
			for (var key in object)
			{
				target[key] = object[key];
			}
		}

		return target;
	}

})();
