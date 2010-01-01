$(document).ready(function(){
	$("#q").suggest({country: country_code});
	
	this.searchComplete = function(searchControl, searcher) {
		html = '<div class="share">' +
				'<a class="iframe"><img src="/images/binoculars.png" width="30" height="30" alt="View" title="View" style="border:0"/></a>' +
				'<a class="sharing-button" onmouseout="addthis_close()"><image src="/images/share.png" width="30" height="30" alt="Share" title="Share"></a>' +
				'</div>'
		
		$(".gsc-results .gs-result").not(".gs-no-results-result").each(function(){
			$(this).append(html)
		});
		
		$(".gsc-results .gs-result").not(".gs-no-results-result").mouseover(function(){
			$(this).css({"background-color":"#FFE8AA"});
			$(this).find(".share:first").css("visibility", "visible");
			
			rest_of_elems = $(".gsc-results .gs-result").not(this);
			rest_of_elems.css({"background-color":"#FFF8DD"});
			rest_of_elems.find(".share:first").css("visibility", "hidden");
		});

		$(".gsc-results .gs-result").not(".gs-no-results-result").each(function(){
			url = $(this).find("a:first").attr('href')
			buttons = $(this).find(".share a");
			preview = buttons[0];
			share = buttons[1];

			$(preview).attr("href", url);
			$(preview).fancybox({
				'frameWidth':900,
				'frameHeight':500,
				hideOnContentClick:false,
				callbackOnStart:function(){$.fn.fancybox.showLoading();}
			});
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
	customSearchControl.Ga = 5;
	customSearchControl.xa = 8;
	if(wSearcher && country_code) {
		wSearcher.setRestriction(google.search.Search.RESTRICT_EXTENDED_ARGS, {gl : country_code});
	}
	customSearchControl.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);
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