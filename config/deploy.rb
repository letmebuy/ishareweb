set :application,         "ishareweb"

set :deploy_to,           "/var/www/#{application}"
set :domain,              "li152-25.members.linode.com"
set :repository_cache,    "#{application}_cache"
set :environment,         "production"
  
role :web, domain
role :app, domain
role :db,  domain, :primary => true

set :local_shared_dirs,   %w(public/uploads)

set :repository,          "git@github.com:letmebuy/ishareweb.git"
set :keep_releases,       5
set :user,                "jeero"
set :scm_user,            "deployer"
set :deploy_via,          :remote_cache
set :scm,                 :git
set :runner,              "deploy"
ssh_options[:forward_agent] = true
set :use_sudo,               true

# comment out if it gives you trouble. newest net/ssh needs this set.
ssh_options[:paranoid] = false

after "deploy", "deploy:cleanup"

namespace :deploy do
  desc "Restart Application"
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "touch  #{current_path}/tmp/restart.txt"
  end
end