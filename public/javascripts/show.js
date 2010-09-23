$(document).ready(function(){
	$("#q").suggest({country: country_code});
	var showLoading = function(){$.fn.fancybox.showLoading();};
	var hideLoading = function(){
		$(".fancy_loading").hide();
		$("#fancy_content").empty();
	};
	showLoading();
	$('iframe#show_site_control').load(function(){
		$(this).css('display', 'block');
		hideLoading();
	});
});