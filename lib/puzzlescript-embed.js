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
			load_game(element, id, settings);
			init_touch(element);
			install_resize_hook(element);
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
	
/* All the stuff below here are modifications added by me --Alex */
	
	function do_resize(element)
	{
		var limits = is_fullscreen() ? [
			element.parentNode.offsetHeight - 50
		] : [
			element.offsetWidth * 0.625,
			screen.height * 0.8
		];

		var height = Math.max(88, Math.min.apply(Math, limits));

		element.style.height = height + 'px';
		canvasResize();
	}
	
	function install_resize_hook(element)
	{
		window.removeEventListener('resize', canvasResize);
		
		var resize_elem_fn = function(){
			do_resize(element);
		};
		
		['resize', 'webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange']
		.map(function(f){ window.addEventListener(f, resize_elem_fn); });

		do_resize(element);
	}
	
	function is_fullscreen()
	{
		var fs = false;
		['fullscreenElement', 'mozFullScreenElement',
		'webkitFullscreenElement', 'msFullscreenElement' ].map(function(s){
			fs |= !!document[s];
		});
		
		fs |= !!window.fakeFullscreenElement;
		
		return fs;
	}
	
	var keys = {
		left:   37,
		up:     38,
		right:  39,
		down:   40,
		reset:  82,
		undo:   85,
		action: 88
	};

	var touch_info = {
		active:  false, 
		id:      0,
		start_x: 0,
		start_y: 0
	};

	function send_key(key)
	{
		var canvas = document.getElementById('gameCanvas');
		var event = { keyCode: key };
		
		onMouseDown({ button: 0, target: canvas });
		onKeyDown(event);
		onKeyUp(event);
	}
	
	function create_button(element, label, click_fn)
	{
		var btn = document.createElement('button');
		btn.setAttribute('id', label.toLowerCase());
		btn.appendChild(document.createTextNode(label));
		btn.addEventListener('click', click_fn);
		
		element.parentNode.insertBefore(btn, element);
	}
	
	function init_touch(element)
	{		
		create_button(element, 'Reset', function(e){
			send_key(keys.reset);
		});
		
		create_button(element, 'Fullscreen', function(e){
			
			var fs = is_fullscreen();
			
			var funcs = fs ? [
				'exitFullscreen', 
				'msExitFullscreen', 
				'mozCancelFullScreen',
				'webkitExitFullscreen'
			] : [
				'requestFullscreen',
				'msRequestFullscreen',
				'mozRequestFullScreen',
				'webkitRequestFullscreen'
			];
			
			var elem = fs ? document : element.parentNode;
			var done = false;
			
			funcs.map(function(s){
				if(!done && elem[s]){
					elem[s]();
					done = true;
				}
			});
			
			// it didn't work, fake it.
			
			if(fs == is_fullscreen()){
				fs = !fs;
				
				window.fakeFullscreenElement = fs ? elem : null;
				
				if(fs){
					element.parentNode.style.position = 'absolute';
					element.parentNode.style.margin = '0 auto';
					element.parentNode.style.top = '0px';
					element.parentNode.style.left = '0px';
					element.parentNode.style.max_width = '10000px';
					element.parentNode.style.max_height = '10000px';
					element.parentNode.style.width = 'calc(100% - 12px)';
					element.parentNode.style.height = 'calc(100% - 12px)';
				} else {
					element.parentNode.setAttribute('style', '');
				}
				
				do_resize(element);
			}
			
		});
		
		create_button(element, 'Undo', function(e){
			send_key(keys.undo);
		});
		
		element.addEventListener('touchstart', function(e)
		{
			e.preventDefault();
			
			if(e.changedTouches.length < 1 || touch_info.active) return;
			
			touch_info = {
				active:  true, 
				id:      e.changedTouches[0].identifier,
				start_x: e.changedTouches[0].clientX,
				start_y: e.changedTouches[0].clientY
			};

		}, false);
		
		element.addEventListener('touchmove', function(e)
		{
			e.preventDefault();
		}, false);
		
		element.addEventListener('touchcancel', function(e)
		{
			e.preventDefault();
		}, false);
		
		element.addEventListener('touchleave', function(e)
		{
			e.preventDefault();
		}, false);

		element.addEventListener('touchend', function(e)
		{
			e.preventDefault();
			if(!touch_info.active) return;
				
			var t = null;
			for(var i = 0; i < e.changedTouches.length; i++){
				if(e.changedTouches[i].identifier == touch_info.id){
					t = e.changedTouches[i];
					break;
				}
			}
	
			if(t == null) return;

			var touch_diff = {
				x:     t.clientX - touch_info.start_x,
				y:     t.clientY - touch_info.start_y,
			};
	
			if(Math.abs(touch_diff.x) < 10 && Math.abs(touch_diff.y) < 10){
				send_key(keys.action);
			} else {
				if(Math.abs(touch_diff.x) > Math.abs(touch_diff.y)){
					if(touch_diff.x / Math.abs(touch_diff.x) > 0){
						send_key(keys.right);
					} else {
						send_key(keys.left);
					}
				} else {
					if(touch_diff.y / Math.abs(touch_diff.y) > 0){
						send_key(keys.down);
					} else {
						send_key(keys.up);
					}
				}
			}
	
			touch_info.active = false;
		
		}, false);
	}
})();
