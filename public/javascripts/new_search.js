$(document).ready(function(){
	$("#q").suggest({country: country_code});

	var e = encodeURIComponent||escape;
	var query = $('#q').val();
	var url = "http://search.yahooapis.com/WebSearchService/V1/relatedSuggestion?appid=73Rm8nrV34HYmeZPleyu081x6u8QN9ey1wyk7wXEMtHzUDA6Vr_GcQ2CaucW20wKHA--&results=10&output=json&callback=?&query=" + e(query);
	var resultContainer = $('#suggestions')
	$.getJSON(url, function(data){
						if(data.ResultSet.Result) {
							html = '<ul>'
		          $.each(data.ResultSet.Result, function(i,item){
								html += '<li><a href="http://localhost:4567/search?q=' + item + '">' + item + '</a></li>'
		          });
							html += '</ul>'
							resultContainer.append(html);
						}
	});
	
	
	if($('#news').size() > 0) {
		var news_url = "http://ajax.googleapis.com/ajax/services/search/news?q=" + e($('#q').val()) + "&v=1.0&key=ABQIAAAAM2Rp1xybAA2YXKy8h70rqxQzZyRVKJ9p5sgsE9r4piU5MPxORBQUljITCdbcFHp9C3qMT6-PAbHNIQ&rsz=1&callback=?";
		$.getJSON(news_url, function(data) {
			var news = data['responseData']['results'][0];
			html = '<h1><span style="color:green;margin-right:5px;font-size:14px">News result:</span><a href="' + news.unescapedUrl + '">' + news.title + '</a></h1>'
			if(news.image && news.image.tbUrl)
				html += '<div style="margin-right:10px;float:left;overflow:hidden"><img style="border:1px solid #999;padding:5px" src="' + news.image.tbUrl + '"/></div>'
			html += '<div class="desc">' + news.content + '</div>'
			html += '<div class="info"><cite>' + news.publisher + '</cite></div><div class="clear"></div>'
			$('#news').html(html);
		})
	}
	
	
	var showLoading = function(){$('#progress').show();};
	var hideLoading = function(){$('#progress').hide();$('body').css('visibility', 'visible')};
	
	this.searchComplete = function(searchControl, searcher) {
		window.setTimeout(function(){
			hideLoading();
		}, 500)
	};
	
	if(google.search.b) {
		google.search.b.Ka["http://www.google.com/cse/style/look/espresso.css"].colorBackground = "#F7F6FF";
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
	wSearcher = customSearchControl.ob;
	
	customSearchControl.na = 4;
	customSearchControl.fa = 0;
	
	if(wSearcher && country_code) {
		wSearcher.setRestriction(google.search.Search.RESTRICT_EXTENDED_ARGS, {gl : country_code});
	}
	customSearchControl.setResultSetSize(google.search.Search.LARGE_RESULTSET);
	customSearchControl.setLinkTarget(google.search.Search.LINK_TARGET_PARENT);

	if($('#a_result').size() > 0) {
		customSearchControl.draw('a_result');
		customSearchControl.execute(query);
	} else {
		hideLoading();
	}

});