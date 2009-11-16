class Google
  
  # LET ME BUY Account
  API_KEY = "ABQIAAAAM2Rp1xybAA2YXKy8h70rqxQkyrUjGc-hZsdlyhMhE6gjwkxpthQdMeuzgeBclWJCAqIBJgDshTXWQg"
  # Neo Shalani Account
  ANOTHER_API_KEY = "ABQIAAAAOacokrfwGFIpMxs8Z89axBQkyrUjGc-hZsdlyhMhE6gjwkxpthQpeBoByo80WgDLXTPZGzvtysQrUA"

  def self.results(query)
    result_str = open(url(query), "User-Agent" => "Ruby/#{RUBY_VERSION}", "Referer" => "http://www.ishareweb.com/").read
    results = JSON.parse(result_str)["responseData"]["results"]
    results.collect { |result_args| Result.new(result_args) }
  end
  
  def self.url(query)
    "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=#{CGI.escape(query)}&key=#{ANOTHER_API_KEY}&rsz=large&gl=gb"
  end
  
end