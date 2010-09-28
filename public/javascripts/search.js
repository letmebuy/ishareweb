$(document).ready(function(){
	var enc = encodeURIComponent||escape;
	$("#q").suggest({country: country_code});
	
	this.searchComplete = function(searchControl, searcher) {
		html = '<div class="share">' +
				'<a class="sharing-button" onmouseout="addthis_close()">share</a>' +
				'</div>' +
				'<div class="clear"/>';

		$(".gsc-results .gs-result").not(".gs-no-results-result").each(function(){
			$(this).append(html);
			share = $(this).find(".share a:first")[0];
			tag = $(".gs-title a:first", $(this));
			u = tag.attr('href');
			u = 'http://ishareweb.com/' + $.base64.encode(u);
			t = tag.text();
			addthis.button(share, {ui_click:true}, {url: u + '?src=share', title: t, description: 'www.ishareweb.com : ' + t});
			preview_html = '<a title="Search and Share: ' + tag.text() + '" href="' + u + '?src=preview" style="margin-right:10px"><img src="/images/binocular.png" style="border:0;vertical-align:middle"></a>';
			$('.gs-visibleUrl', $(this)).prepend(preview_html);
		});
	};
	
	var showLoading = function(){$.fn.fancybox.showLoading();};
	var hideLoading = function(){
		$(".fancy_loading").hide();
		$("#fancy_content").empty();
	};
	
	if(google.search.b) {
		google.search.b.Ka["http://www.google.com/cse/style/look/espresso.css"].colorBackground = "#FFFFFF";
		google.search.b.Ka["http://www.google.com/cse/style/look/espresso.css"].colorDomainLink = "#0E774A";
		google.search.b.Ka["http://www.google.com/cse/style/look/espresso.css"].colorText = "#444444";
		google.search.b.Ka["http://www.google.com/cse/style/look/espresso.css"].colorTitleLink = "#0033CC";
		google.search.b.Ka["http://www.google.com/cse/style/look/espresso.css"].fontFamily = "Verdana";
		google.search.b.Ka["http://www.google.com/cse/style/look/espresso.css"].fontSizeDescription = "13";
		google.search.b.Ka["http://www.google.com/cse/style/look/espresso.css"].fontSizeDomainLink = "12";
		google.search.b.Ka["http://www.google.com/cse/style/look/espresso.css"].fontSizeTitle = "14";
	}
	
	var customSearchControl = new google.search.CustomSearchControl('002561000277545296260:kfq1eeyulty');
	customSearchControl.setSearchCompleteCallback(this, this.searchComplete);
	wSearcher = customSearchControl.hb;
	
	customSearchControl.na = 4;
	customSearchControl.fa = 8;
	
	if(wSearcher && country_code) {
		wSearcher.setRestriction(google.search.Search.RESTRICT_EXTENDED_ARGS, {gl : country_code});
	}
	customSearchControl.setResultSetSize(google.search.Search.LARGE_RESULTSET);
	customSearchControl.setLinkTarget(google.search.Search.LINK_TARGET_PARENT);
	customSearchControl.draw('search_results');

	// console.log(customSearchControl);
	showLoading();
	window.setTimeout( function(){
		customSearchControl.execute($('#executed_query').val());
		hideLoading();
	}, 800);
	
	$("#help_text").fancybox();
	
	$('#search_form').submit(function(){
		query = $('#q').val();
		customSearchControl.execute(query);

		req_uri = ['q=' + enc(query)];
		if($('#req_uri').val() != '')
			req_uri.push($('#req_uri').val());
		
		addthis.button('#share_me', {ui_click:true}, {url: 'http://www.ishareweb.com/search?' + req_uri.join('&'), title: 'Search and Share: ' + query, description: 'search ' + query + ' and share with the world.'});
		pageTracker._trackPageview('/auto/search?' + req_uri.join('&'));

		$('#executed_query').val(query);
		$(".share").css("visibility", "hidden");
		return false;
	});
	
	$("#q").focus();
});