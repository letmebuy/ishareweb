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


before do
  @ip_address = @env['REMOTE_ADDR']
end

helpers do
  def is_blank?(str)
    str.nil? || str.empty?
  end
  
  def q_string(parmas)
    parmas.collect {|key, val| "#{key}=#{CGI.escape(val)}"}.join("&")
  end
end


get '/' do
  erb :index
end

get '/search' do
  @type = "search"
  @query = params[:q]
  @page = (is_blank?(params[:page]) ? 1 : params[:page].to_i)
  @country = (is_blank?(params[:country]) ? nil : params[:country])
  @total, @results = Google.results(@query, @page, @ip_address, @country)
  erb :new_search
end

get '/latest' do
  @type="latest"
  @query = params[:q]
  @page = (is_blank?(params[:page]) ? 1 : params[:page].to_i)
  @country = (is_blank?(params[:country]) ? nil : params[:country])
  @total, @results = Google.latest(@query, @page, @ip_address, @country)
  erb :new_search
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