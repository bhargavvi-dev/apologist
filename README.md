# Max

## Instructions

### Rails environment -- Production

    ## PRE REQUIRE
        rvm use 2.6.5
        bundle install
        npm install

1. Precompile assets

		RAILS_ENV=production bundle exec rake assets:precompile

2. Stop and start unicorn

		kill pid - vi /tmp/unicorn_advocate.pid

		bundle exec unicorn_rails -c config/unicorn_advocate.rb -E production -D

3. Start sidekiq

		kill pid - ps ux
	
		bundle exec sidekiq -d -L log/sidekiq_advocate.log -C config/sidekiq.yml -e production

4. Reset database

		rake db:drop db:create db:migrate db:seed RAILS_ENV=production

5. Translation tool

		rake tolk:sync RAILS_ENV=production

		rake tolk:import RAILS_ENV=production

		http://advocat.fenux.fi/translation_tool (admin/password)        