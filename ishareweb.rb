require 'rubygems'
require 'sinatra'
require 'open-uri'
require 'cgi'
require 'json'
require "base64"
require 'lib/google'
require 'lib/result'
require 'lib/yahoo'
require 'lib/yahoo_result'

get '/' do
  erb :index
end

get '/search' do
  @query = params[:q]
  return erb(:index) if(@query.nil? || @query.empty?)
  @results = Yahoo.results(@query)
  @country = params[:country]
  erb(:search)
end

get '/:page' do
  page = params[:page]
  redirect '/' if page.nil? || page.empty?
  redirect Base64.decode64(page)
end

error do
  send_file './public/500.html'
end

not_found do
  send_file './public/404.html'
end