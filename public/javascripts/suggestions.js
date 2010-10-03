(function($) {
	$.suggestions = function(input, options) {
	};
	
	$.fn.suggestions = function(options) {
		options = options || {};
		options.resultContainer = options.resultContainer;
		options.yahoo_suggestions_base_url = "http://search.yahooapis.com/WebSearchService/V1/relatedSuggestion";

		this.each(function() {
			new $.suggest(this, options);
		});
		return this;
	};
})(jQuery);
