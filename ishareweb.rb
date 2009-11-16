require 'rubygems'
require 'sinatra'
require 'open-uri'
require 'cgi'
require 'json'
require 'lib/result'
require 'lib/google'

get '/' do
  erb :index
end

get '/search' do
  @query = params[:q]
  return erb(:index) if(@query.nil? || @query.empty?)
  @results = Google.results(@query)
  erb(:friends_search)
end

error do
  send_file './public/500.html'
end

not_found do
  send_file './public/404.html'
end