$(document).ready(function(){
	$("#q").suggest({country: country_code});
	var showLoading = function(){$('#progress').show();};
	var hideLoading = function(){$('#progress').hide();};
	showLoading();
	$('iframe#show_site_control').load(function(){
		$(this).css('display', 'block');
		hideLoading();
	});
});