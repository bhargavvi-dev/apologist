require 'resque/server'
Rails.application.routes.draw do
  mount Resque::Server.new, at: "/resque"

  devise_for :users
  get '/users/sign_out' => 'devise/sessions#destroy'

  # users
  resources :users do
    collection do
      get 'desktop'
      get 'brand_materials'
      get 'business_management'
      get 'resource_variable'
      get 'office_register'
      get 'user_register'
      get 'network_partners'
      get 'product_pairs'
      get 'brand_resources'
      get 'new_brand_resource'
      get 'brand_messages'
      post 'save_brand_resources' => "users#save_brand_resources"
      post 'save_brand_messages' => "users#save_brand_messages"
      post 'choose_offices_filter' => "users#choose_offices_filter"
      put 'update_brand_resources/:resource_id' => "users#update_brand_resources", :as => 'update_brand_resources'
      get 'get_brand_resource/:resource_id' => "users#get_brand_resource", :as => 'get_brand_resource'
      delete 'delete_brand_resource/:resource_id' => "users#delete_brand_resource", :as => 'delete_brand_resource'
      post "/search/user_filter" => "users#user_filter", :as => :user_filter
      get 'next_users/:page', to: 'users#next_users', as: 'next_users'
    end
  end

  #settings - resource_variables, notification_values
  resources :settings, only: [] do
    collection do
      get ":type" => "settings#index", :as => :default
      put ":type" => "settings#update", :as => :update
      post "/soft/:action_type/:object_type/:object_id" => "settings#soft_delete", as: :soft_delete
      get '/more_options/:object_type/:object_id' => "settings#more_options", :as => :more_options
      get '/more_options/:object_type/:object_id/remove' => "settings#remove_user_data", :as => :remove_user_data
      match "/personal/edit" => "settings#my_settings", :as => :personal, via: [:get, :patch]
    end
  end

  # messages
  resources :messages do
    collection do
      post "/search/filter" => "messages#filter", :as => :filter
      post "/search/user_filter" => "messages#user_filter", :as => :user_filter
      get 'next_users/:page', to: 'messages#next_users', as: 'next_users'
      post "/search/customer_filter" => "messages#customer_filter", :as => :customer_filter
      get 'next_customers/:page', to: 'messages#next_customers', as: 'next_customers'
      get 'next_messages/:page', to: 'messages#next_messages', as: 'next'
      post '/message_associations/:message_association_id/update_read_status', to: "messages#update_read_status", :as => :update_read_status
      get 'center', to: 'messages#message_center', as: 'center'
      post 'select_your_agent' => "messages#select_your_agent", :as => "select_your_agent"
    end
  end

  resources :emails do
    collection do
      post '/order_remax_email', to: 'emails#order_remax_email', as: 'order_remax_email'
      post '/:id/send_login_info_email', to: 'emails#send_login_info_email', as: 'send_login_info_email'
      post '/send_feedback_email', to: 'emails#send_feedback_email', as: 'send_feedback_email'
    end
  end

  # offices
  resources :offices do
    collection do
      post "/search/filter" => "offices#filter", :as => :filter
      get 'next/:page', to: 'offices#next_offices', as: 'next'
    end
    member do
      post 'add_opening_hours', to: 'offices#add_opening_hours'
    end
  end

  # contract_groups
  resources :contract_groups do
    member do
      get 'contracts/new', to: 'contract_groups#new_contract', :as => :new_contract
      post 'contracts', to: 'contract_groups#create_contract', :as => :create_contract
      put 'contracts/:contract_id', to: 'contract_groups#update_contract', :as => :update_contract
      delete 'contracts/:contract_id', to: 'contract_groups#destroy_contract', :as => :delete_contract
      get 'contracts/:contract_id', to: 'contract_groups#get_contract', :as => :get_contract
    end

    collection do
      get 'next/:page', to: 'contract_groups#next_contract_groups', as: 'next'
    end
  end

  post 'send_feedback_developers_form', to: 'home#send_feedback_developers', as: 'send_feedback_developers_form'

  root 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
