# Main options
role :web, 'web1.brightmarch.com'

# Repo options
set :application, 'leftnode.com'
set :repository, 'git@github.com:leftnode/leftnode.com.git'
set :scm, :git

# Github stuff
default_run_options[:pty] = true
ssh_options[:forward_agent] = true

# Deployment options
set :branch, 'master'
set :deploy_env, 'staging'
set :use_sudo, false
set :user, 'deploy'
set :deploy_to, '/var/www/vhosts/leftnode.com'

namespace :deploy do
  task :build, :roles => :web do
    run "cd #{latest_release} && jekyll && cp .htaccess _site/.htaccess"
  end
end
