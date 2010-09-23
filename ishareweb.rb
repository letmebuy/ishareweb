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

configure :development do
  require 'sinatra/reloader'
  Sinatra::Application.register Sinatra::Reloader
  Sinatra::Application.also_reload "lib/**/*.rb"
end

get '/' do
  erb :index
end

get '/search' do
  @query = params.delete('q')
  @req_uri = params.collect{|key, val| "#{key}=#{CGI.escape(val)}"}.join('&')
  return erb(:index) if(@query.nil? || @query.empty?)
  @results = Yahoo.results(@query)
  @country = params[:country]
  erb(:search)
end

get '/privacy' do
  erb :privacy
end

get '/:page' do
  page = params[:page]
  redirect '/' if page.nil? || page.empty?
  @site = Base64.decode64(page)
  erb(:show)
end

error do
  send_file './public/500.html'
end

not_found do
  send_file './public/404.html'
end