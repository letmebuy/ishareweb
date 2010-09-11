$(document).ready(function(){
	$("#q").suggest({country: country_code});
	
	this.searchComplete = function(searchControl, searcher) {
		html = '<div class="share">' +
				'<a class="sharing-button" onmouseout="addthis_close()">share</a>' +
				'</div>' +
				'<div class="clear"/>'
		
		$(".gsc-results .gs-result").not(".gs-no-results-result").each(function(){
			$(this).append(html)
		});
		
		$(".gsc-results .gs-result").not(".gs-no-results-result").each(function(){
			url = $(this).find("a:first").attr('href')
			share = $(this).find(".share a:first")[0];
			tag = $(".gs-title a:first", $(this))
			u = tag.attr('href')
			t = tag.text() + ' (Visit www.IShareWeb.com to Share)';
			addthis.button(share, {ui_click:true}, {url: u, title: t, description: t});
		});
	};
	
	var showLoading = function(){$.fn.fancybox.showLoading();};
	var hideLoading = function(){
		$(".fancy_loading").hide();
		$("#fancy_content").empty();
	};
	
	var customSearchControl = new google.search.CustomSearchControl('002561000277545296260:kfq1eeyulty');
	customSearchControl.setSearchCompleteCallback(this, this.searchComplete);
	wSearcher = customSearchControl.hb;
	
	customSearchControl.na = 4;
	customSearchControl.ea = 8;
	console.log(customSearchControl);
	
	if(wSearcher && country_code) {
		wSearcher.setRestriction(google.search.Search.RESTRICT_EXTENDED_ARGS, {gl : country_code});
	}
	customSearchControl.setResultSetSize(google.search.Search.LARGE_RESULTSET);
	customSearchControl.setLinkTarget(google.search.Search.LINK_TARGET_PARENT);
    customSearchControl.draw('search_results');
	
	showLoading();
	window.setTimeout( function(){
		customSearchControl.execute($('#executed_query').val());
		hideLoading();
	}, 800);
	
	$("#help_text").fancybox();
	
	$('#search_form').submit(function(){
		query = $('#q').val();
		$('#executed_query').val(query);
		$(".share").css("visibility", "hidden");
		pageTracker._trackPageview('/second/search?q=' + query);
		customSearchControl.execute(query);
		return false;
	});
	
	$("#q").focus();
});