class Yahoo
  
  APP_ID = "uOPO98nV34HC.FuHqQBXUEzEPsYC9reL.AKOudtzah0okNZ6g3bc4JAMLomPMUN7QA--"
  ANOTHER_APP_ID = "73Rm8nrV34HYmeZPleyu081x6u8QN9ey1wyk7wXEMtHzUDA6Vr_GcQ2CaucW20wKHA--" # NEOSHALANI ACCOUNT

  def self.results(query)
    result_str = open(url(query), "User-Agent" => "Ruby/#{RUBY_VERSION}", "Referer" => "http://www.ishareweb.com/").read
    results = JSON.parse(result_str)["ysearchresponse"]["resultset_web"] || []
    results.collect { |result_args| YahooResult.new(result_args) }
  end

  def self.url(query)
    "http://boss.yahooapis.com/ysearch/web/v1/#{CGI.escape(query)}?appid=#{ANOTHER_APP_ID}&format=json&start=0&view=keyterms&abstract=long&count=20"
  end

end