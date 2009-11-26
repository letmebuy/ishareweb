class Result
  
  attr_reader :title, :keyterms, :content, :display_url, :target_url
  
  def initialize(args)
    @title = args["title"]
    @keyterms = args["titleNoFormatting"]
    @content = args["content"]
    @display_url = args["visibleUrl"]
    @target_url = args["unescapedUrl"]
  end
  
  
end