$(document).ready(function(){
	$("#q").suggest({country: country_code});

	var e = encodeURIComponent||escape;
	var query = $('#q').val();
	
	var showLoading = function(){$('#progress').show();};
	var hideLoading = function(){$('#progress').hide();$('body').css('visibility', 'visible');};
	
	var loadSuggestions = function() {
		url = "http://search.yahooapis.com/WebSearchService/V1/relatedSuggestion?appid=73Rm8nrV34HYmeZPleyu081x6u8QN9ey1wyk7wXEMtHzUDA6Vr_GcQ2CaucW20wKHA--&results=10&output=json&callback=?&query=" + e(query);
		resultContainer = $('#suggestions')
		$.getJSON(url, function(data){
							if(data.ResultSet && data.ResultSet.Result) {
								sugg = [];
								sugg = sugg.concat(data.ResultSet.Result);
								param = ["src=related"];
								if(q_string != '')
									param.push(q_string);
								html = '<ul>'
			          $.each(sugg, function(i,item){
									html += '<li><a href="http://ishareweb.com/' + type + '?q=' + e(item) + '&' + param.join('&') + '">' + item + '</a></li>'
			          });
								html += '</ul>'
								resultContainer.append(html);
							}
		});
	};
	
	var loadNews = function() {
		if($('#news').size() > 0) {
			var news_url = "http://ajax.googleapis.com/ajax/services/search/news?q=" + e($('#q').val()) + "&v=1.0&key=ABQIAAAAM2Rp1xybAA2YXKy8h70rqxQzZyRVKJ9p5sgsE9r4piU5MPxORBQUljITCdbcFHp9C3qMT6-PAbHNIQ&rsz=1&callback=?";
			$.getJSON(news_url, function(data) {
				var news = data['responseData']['results'][0];
				if(news) {
					html = '<h1><span style="color:green;margin-right:5px;font-size:14px">News result:</span><a href="' + news.unescapedUrl + '">' + news.title + '</a></h1>'
					if(news.image && news.image.tbUrl)
						html += '<div style="margin-right:10px;float:left;overflow:hidden;margin-top:5px"><img style="border:1px solid #999;padding:5px;max-width:80px" src="' + news.image.tbUrl + '"/></div>'
					html += '<div class="desc">' + news.content + '</div>'
					html += '<div class="info"><cite>' + news.publisher + '</cite><a class="addthis_button"><span>share</span></a></div><div class="clear"></div>'
					$('#news').html(html);
					addthis.button($('#news a.addthis_button')[0], {}, {url: news.unescapedUrl, title: news.title, description: 'www.ishareweb.com : ' + news.content});
				}
			})
		}
	};
	
	var searchComplete = function(searchControl, searcher) {
		loadNews();
		loadSuggestions();

		window.setTimeout(function(){
			hideLoading();
		}, 500)
	};
	
  if(google.search.b && google.search.b.Gb) {
   google.search.b.Gb["//www.google.com/cse/style/look/espresso.css"].colorBackground = "#FAFDFF";
   google.search.b.Gb["//www.google.com/cse/style/look/espresso.css"].colorDomainLink = "#0E774A";
   google.search.b.Gb["//www.google.com/cse/style/look/espresso.css"].colorText = "#444444";
   google.search.b.Gb["//www.google.com/cse/style/look/espresso.css"].colorTitleLink = "#0033CC";
   google.search.b.Gb["//www.google.com/cse/style/look/espresso.css"].fontFamily = "Verdana";
   google.search.b.Gb["//www.google.com/cse/style/look/espresso.css"].fontSizeDescription = "13";
   google.search.b.Gb["//www.google.com/cse/style/look/espresso.css"].fontSizeDomainLink = "12";
   google.search.b.Gb["//www.google.com/cse/style/look/espresso.css"].fontSizeTitle = "14";
  }
	
	var customSearchControl = new google.search.CustomSearchControl(mycse_id);
	customSearchControl.setSearchCompleteCallback(this, searchComplete);

	customSearchControl.setResultSetSize(google.search.Search.LARGE_RESULTSET);
	customSearchControl.setLinkTarget(google.search.Search.LINK_TARGET_PARENT);

	if($('#a_result').size() > 0) {
		customSearchControl.draw('a_result');
		customSearchControl.execute(query);
	} else {
		searchComplete();
	}

});