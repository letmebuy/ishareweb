require 'appengine-rack'
require 'ishareweb'

AppEngine::Rack.configure_app(:application => "i-share-web", :version => 3)

run Sinatra::Application