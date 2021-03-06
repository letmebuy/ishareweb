(function($) {

	$.suggest = function(input, options) {

		var $input = $(input).attr("autocomplete", "off");
		var $results = $(document.createElement("ul"));

		var timeout = false;		// hold timeout ID for suggestion results to appear	
		var prevLength = 0;			// last recorded length of $input.val()
		
		$results.addClass(options.resultsClass).appendTo('body');
			

		resetPosition();
		$(window)
			.load(resetPosition)		// just in case user is changing size of page while loading
			.resize(resetPosition);

		$input.blur(function() {
			setTimeout(function() { $results.hide() }, 200);
		});
		
		
		// help IE users if possible
		try {
			$results.bgiframe();
		} catch(e) { }
		
		// I really hate browser detection, but I don't see any other way
		if ($.browser.mozilla)
			$input.keypress(processKey);	// onkeypress repeats arrow keys in Mozilla/Opera
		else
			$input.keydown(processKey);		// onkeydown repeats arrow keys in IE/Safari
		
		function resetPosition() {
			// requires jquery.dimension plugin
			var offset = $input.offset();
			$results.css({
				top: (offset.top + input.offsetHeight) + 'px',
				left: offset.left + 'px'
			});
		}
		
		function processKey(e) {
			
			// handling up/down/escape requires results to be visible
			// handling enter/tab requires that AND a result to be selected
			if ((/27$|38$|40$/.test(e.keyCode) && $results.is(':visible')) ||
				(/^13$|^9$/.test(e.keyCode) && getCurrentResult())) {
	            if (e.preventDefault)
	                e.preventDefault();
				if (e.stopPropagation)
	                e.stopPropagation();

				e.cancelBubble = true;
				e.returnValue = false;
			
				switch(e.keyCode) {

					case 38: // up
						prevResult();
						break;
			
					case 40: // down
						nextResult();
						break;

					case 9:  // tab
					case 13: // return
						selectCurrentResult();
						break;
						
					case 27: //	escape
						$results.hide();
						break;

				}
				
			} else if ($input.val().length != prevLength) {
				prevLength = $input.val().length;
				if (e.keyCode == 13) {
					$results.hide();
					return;
				}
				if (timeout) 
					clearTimeout(timeout);
				timeout = setTimeout(suggest, options.delay);
			} else if ($input.val().length == prevLength) {
				prevLength = $input.val().length;
				if (e.keyCode == 40) {
					if (timeout) 
						clearTimeout(timeout);
					timeout = setTimeout(suggest, options.delay);
				}
				$results.hide();
			}			
		}
		
		
		function suggest() {
			var q = $.trim($input.val());
			if (q.length >= options.minchars) {
				
				jQuery.getJSON(options.google_base_url, {q: q, gl: options.country_code}, function(data) {
					$results.hide();
					var items = parseSuggestions(data, q);
					displayItems(items);
				});
				
			} else {
				$results.hide();
			}
		}
		
		function displayItems(items) {
			
			if (!items)
				return;
			if (!items.length) {
				$results.hide();
				return;
			}
			var html = '';
			for (var i = 0; i < items.length; i++)
				html += '<li>' + items[i] + '</li>';

			$results.html(html).show();
			
			$results
				.children('li')
				.mouseover(function() {
					$results.children('li').removeClass(options.selectClass);
					$(this).addClass(options.selectClass);
				})
				.click(function(e) {
					e.preventDefault(); 
					e.stopPropagation();
					selectCurrentResult();
				});
						
		}
		
		function parseSuggestions(data, q) {
			var items = [];
			suggestions = data[1]
			if(suggestions.length == 0) {
				return items
			}
			
			$.each(suggestions, function(index, suggestion){
				token = suggestion[0]
				items[index] = token;
			})
			
			return items
		}
		
		function getCurrentResult() {
		
			if (!$results.is(':visible'))
				return false;
		
			var $currentResult = $results.children('li.' + options.selectClass);
			
			if (!$currentResult.length)
				$currentResult = false;
				
			return $currentResult;
		}
		
		function selectCurrentResult() {
		
			$currentResult = getCurrentResult();
		
			if ($currentResult) {
				$input.val($currentResult.text());
				$results.hide();
				
				if (options.onSelect)
					options.onSelect.apply($input[0]);
			}
		}
		
		function nextResult() {
		
			$currentResult = getCurrentResult();
		
			if ($currentResult)
				$currentResult
					.removeClass(options.selectClass)
					.next()
						.addClass(options.selectClass);
			else
				$results.children('li:first-child').addClass(options.selectClass);
		
		}
		
		function prevResult() {
			$currentResult = getCurrentResult();
			if ($currentResult)
				$currentResult
					.removeClass(options.selectClass)
						.prev()
							.addClass(options.selectClass);
			else
				$results.children('li:last-child').addClass(options.selectClass);
		}
	}
	
	$.fn.suggest = function(options) {
	
		options = options || {};
		options.delay = options.delay || 100;
		options.resultsClass = options.resultsClass || 'ac_results';
		options.selectClass = options.selectClass || 'ac_over';
		options.minchars = options.minchars || 2;
		options.country_code = options.country || 'us';
		options.google_base_url = "http://www.google.com/complete/search?callback=?";

		this.each(function() {
			new $.suggest(this, options);
		});
		return this;
	};
	
})(jQuery);

