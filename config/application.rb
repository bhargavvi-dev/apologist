require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Advocate
  class Application < Rails::Application
    config.load_defaults 6.0

    config.autoload_paths += %W( #{config.root}/lib)

    config.active_record.belongs_to_required_by_default = false
    # Initialize configuration defaults for originally generated Rails version.

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Don't generate system test files.
    config.generators.system_tests = nil
    config.assets.paths << Rails.root.join("app", "assets", "fonts")

    config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '*.{rb,yml}').to_s]

    config.i18n.default_locale = :en
    # config.active_record.raise_in_transactional_callbacks = true

    config.assets.paths << "#{Rails.root}/app/assets/stylesheets/pdf/bootstrap/" 
    config.assets.paths << "#{Rails.root}/app/assets/fonts"
  end
end
