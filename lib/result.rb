class Result
  
  attr_reader :title, :title_no_formatting, :content, :display_url, :target_url
  
  def initialize(args)
    @title = args["title"]
    @title_no_formatting = args["titleNoFormatting"]
    @content = args["content"]
    @display_url = args["visibleUrl"]
    @target_url = args["unescapedUrl"]
  end
  
  
end