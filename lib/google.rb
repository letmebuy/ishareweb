class Google
  
  # LET ME BUY Account
  API_KEY = "ABQIAAAAM2Rp1xybAA2YXKy8h70rqxQzZyRVKJ9p5sgsE9r4piU5MPxORBQUljITCdbcFHp9C3qMT6-PAbHNIQ"
  CUSTOM_SEARCH_ENGINE_ALL_WEB = "002561000277545296260:kfq1eeyulty"
  CUSTOM_SEARCH_ENGINE_LATEST = "002561000277545296260:5donezpvekw"
  
  YAHOO_APP_ID = "73Rm8nrV34HYmeZPleyu081x6u8QN9ey1wyk7wXEMtHzUDA6Vr_GcQ2CaucW20wKHA--" # NEOSHALANI ACCOUNT
  

  def self.results(query, page, ip, country)
    return [0, []] if query.nil? || query.empty?
    result_str = open(url(query, page, ip, country, CUSTOM_SEARCH_ENGINE_ALL_WEB), "User-Agent" => "Ruby/#{RUBY_VERSION}", "Referer" => "http://www.ishareweb.com/").read
    json = JSON.parse(result_str)
    total_results = json["responseData"]['cursor']['estimatedResultCount'].to_i
    results = json["responseData"]["results"] || []
    
    [total_results, results.collect { |result_args| Result.new(result_args) }]
  end
  
  def self.latest(query, page, ip, country)
    return [0, []] if query.nil? || query.empty?
    result_str = open(url(query, page, ip, country, CUSTOM_SEARCH_ENGINE_LATEST), "User-Agent" => "Ruby/#{RUBY_VERSION}", "Referer" => "http://www.ishareweb.com/").read
    json = JSON.parse(result_str)
    total_results = json["responseData"]['cursor']['estimatedResultCount'].to_i
    results = json["responseData"]["results"] || []
    
    [total_results, results.collect { |result_args| Result.new(result_args) }]
  end
  
  def self.url(query, page, ip, country, cseid)
    "http://ajax.googleapis.com/ajax/services/search/web?q=#{CGI.escape(query)}&v=1.0&key=#{API_KEY}&userip=#{ip}&start=#{(page - 1) * 8}&rsz=8&gl=#{country}&cx=#{cseid}"
  end
  
end