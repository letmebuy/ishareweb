class YahooResult
  
  attr_reader :title, :keyterms, :content, :display_url, :target_url
  
  def initialize(args)
    @title = args["title"]
    @content = args["abstract"]
    @display_url = args["url"]
    @target_url = args["clickurl"]
    terms = args["keyterms"]["terms"]
    terms = [terms].flatten if terms
    @keyterms = (terms || []).join(',')
  end
  
end