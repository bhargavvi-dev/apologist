class SettingsController < ApplicationController

  before_action :authenticate_exe_dir_agent_inspector_office_manager_customer!

  before_action :set_setting, only: [:index, :update]

  # GET settings/:type
  def index
    @nav_header_menus = [
                          {:href => desktop_users_path, :label => t("nav_header.desktop"), :arrowBack => false},
                          {:href => resource_variable_users_path, :label => t("nav_header.resource_and_variable") , :arrowBack => true}
                        ]
    unless params[:type] == "background_variables" or params[:type] == "notification_values"
      redirect_to resource_variable_users_path
    end
  end

  # PUT settings/:type
  def update
    if params[:setting]
      convert_params_hash = convert_params_to_h(params[:setting])
      bank_details_hash = {}

      convert_params_hash.each do |key, value|
        if key.start_with?('bank_details')
          bank_details_hash[key] = value
        end
      end

      bank_details_hash.each do |key, value|
        value.each do |k1,v1|
          bank_details_hash.delete(key) if v1.empty?
        end
      end
      setting = @current_brand.setting('BRAND_BANK_DETAILS')
      if setting.present?
        setting.update(:setting_value => bank_details_hash)
      else
        setting.save(:setting_value => bank_details_hash)
      end  
    end
    # params[:setting][:common_tax_base] = convert_to_number(params[:setting][:common_tax_base])
    # params[:setting][:reduced_tax_base_1] = convert_to_number(params[:setting][:reduced_tax_base_1])
    # params[:setting][:reduced_tax_base_2] = convert_to_number(params[:setting][:reduced_tax_base_2])
    # params[:setting][:tax_free_service] = convert_to_number(params[:setting][:tax_free_service])
    # params[:setting][:co_operative_deal_tax] = convert_to_number(params[:setting][:co_operative_deal_tax])
    # params[:setting][:transaction_deal_tax] = convert_to_number(params[:setting][:transaction_deal_tax])
    # params[:setting][:commission_deal_maker] = convert_to_number(params[:setting][:commission_deal_maker])
    # params[:setting][:commission_property_seller] = convert_to_number(params[:setting][:commission_property_seller])
    # params[:setting][:transmission_hint_maker] = convert_to_number(params[:setting][:transmission_hint_maker])
    # params[:setting][:transmission_property_seller] = convert_to_number(params[:setting][:transmission_property_seller])
    # params[:setting][:commission_reward] = convert_to_number(params[:setting][:commission_reward])

    if @current_brand.update(brand_params)
      redirect_url = params[:customer] ? brand_messages_users_path : resource_variable_users_path#default_settings_path(:type => params[:type])
      redirect_to redirect_url
    else
      render 'index'
    end
  end

  def my_settings
    if current_user.executive?
      @nav_header_menus = [
                            {:href => desktop_users_path, :label => t("nav_header.desktop"), :arrowBack => true}
                          ]
    end
    if params[:user].present?
      set_user_working_areas current_user
      if current_user.update_attributes(user_params)
        set_user_working_areas current_user
        I18n.locale = session[:lang] = params[:user][:language].downcase.to_sym if params[:user][:language].present?
        flash[:notice] = I18n.t("general.profile_updated_successfully")
        redirect_to root_path
      else
        flash[:notice] = I18n.t("general.email_has_been_taken")
        render 'my_settings'
      end
    end
  end

  def more_options
    if params[:object_type] == "Office"
      @office = @current_brand.offices.find(params[:object_id])
      @back_path = office_path(@office)
      @nav_header_menus = [
                            {:href => desktop_users_path, :label => t("nav_header.desktop"), :arrowBack => false},
                            {:href => resource_variable_users_path, :label => t("nav_header.resource_and_variable"), :arrowBack => false},
                            {:href => offices_path, :label => t("nav_header.offices") , :arrowBack => true}
                          ]
    elsif params[:object_type] == "Customer"
      @customer = @current_brand.customers.find(params[:object_id])
      @back_path = customer_path(@customer)
      if current_user.executive?
        @nav_header_menus = [
                              {:href => desktop_userss_path, :label => t("nav_header.desktop"), :arrowBack => false},
                              {:href => resource_variable_userss_path, :label => t("nav_header.resource_and_variable"), :arrowBack => true}
                            ]
      end
    else
      @user = @current_brand.users.find(params[:object_id])
      common_user_back_path(@user)
      if current_user.executive?
        @nav_header_menus = [
                              {:href => desktop_users_path, :label => t("nav_header.desktop"), :arrowBack => false},
                              {:href => resource_variable_users_path, :label => t("nav_header.resource_and_variable"), :arrowBack => false},
                              {:href => user_register_users_path, :label => t("nav_header.user_register"), :arrowBack => true}
                            ]
      end
    end
  end

  def soft_delete
    if params[:action_type] == "delete"
      if params[:object_type] == "Office"
        object = @current_brand.offices.find(params[:object_id])
      elsif params[:object_type] == "Customer"
        object = @current_brand.customers.find(params[:object_id])
      else
        object = @current_brand.users.find(params[:object_id])
      end

      if object.present?
        object.update_attributes!(is_deleted: true)
        if params[:object_type] == "Office"
          object.office_users.update_all(is_deleted: true)
        end

        if params[:object_type] == "Customer"
          object = @current_brand.users.find_by_email(object.email)
          if object.present?
            object.update_attributes!(is_deleted: true)
          end
        end

        flash.keep[:notice] = t('general.successfully_deleted')
        if params[:object_type] == "Office"
          redirect_to offices_path
        elsif params[:object_type] == "Customer"
          redirect_to customers_path
        else
          if object.role == "EXECUTIVE"
            redirect_to users_path
          else  
            redirect_to root_path
          end
        end
      else
        redirect_to root_path
      end
    else
      redirect_to root_path
    end
  end

  def remove_user_data
    @nav_header_menus = [
                          {:href => desktop_users_path, :label => t("nav_header.desktop"), :arrowBack => true}
                        ]
    if params[:object_id].present?
      @user = @current_brand.users.find(params[:object_id])
      @back_path = more_options_settings_path("User",@user, :open_card => true)
    end 
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_setting
    @settings = @current_brand.settings
  end

  def common_user_back_path(user)
    @user = user
    if @user.role == "EXECUTIVE"
      @back_path = user_path(@user)
    end
  end

  def set_header
    @setting_header = true
  end  

  # Never trust parameters from the scary internet, only allow the white list through.
  def setting_params
    params.require(:setting).permit(:superintendent_document_valid_time, :superintendent_document_valid_months, :common_tax_base, :reduced_tax_base_1, :reduced_tax_base_2, :tax_free_service, :co_operative_deal_tax, :transaction_deal_tax,
                                    :commission_deal_maker, :commission_property_seller, :transmission_hint_maker, :transmission_property_seller, :commission_reward, :claims_period, :late_payment_interest,
                                    :service_years_1, :service_days_1, :service_years_2, :service_days_2, :service_years_3, :service_days_3, :service_years_4, :service_days_4,
                                    :temporary_contract_end_days, :probation_contract_end_days, :commission_end_days, :employee_birthday_days, :customer_birthday_days, :lead_delivere_start_time, :lead_delivere_end_time, :penalty_interest, :apartment_limit, :rate_per_kilometer,
                                    :lead_delivery_start_day, :lead_delivery_end_day)
  end
  def user_params
    params.require(:user).permit(:email, :language, :password, :linkedin_url, :facebook_url, :twitter_url, :youtube_url, :whatsapp_number, :skype_id, :address, :post_number, :city, :phone_number, working_areas:[])
  end

  def brand_params
    params.require(:brand).permit!
  end
end