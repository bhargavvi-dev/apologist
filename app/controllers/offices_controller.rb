class OfficesController < ApplicationController

  before_action :authenticate_executive!

  before_action :set_office, only: [:show, :edit, :update, :destroy]

  # GET /offices
  # GET /offices.json
  def index
    @nav_header_menus = [
                          {:href => desktop_users_path, :label => t("nav_header.desktop"), :arrowBack => false},
                          {:href => resource_variable_users_path, :label => t("nav_header.resource_and_variable") , :arrowBack => true}
                        ]
    @back_to_top = true
    @offices = fetch_offices.page(page).per(limit)
  end

  # Use callbacks to share common setup or constraints between actions.
  def filter
    @offices = fetch_offices.page(page).per(first_limit)
  end

  def show
    common_nav_header_menu
  end  

  # GET /offices/new
  def new
    common_nav_header_menu

    @step = 1
    @office = Office.new
  end

  def create
    common_nav_header_menu
    @office = Office.new(office_params)
    @step = 1
    if @office.save
      step = params[:proceed_next] ? 2 : 1
      redirect_to edit_office_path(@office, :step => step)
    else
      render 'new'
    end
  end

  # GET /offices/1/edit
  def edit
    common_nav_header_menu
    @step = params[:step] || 1
    if @step.to_i == 3
      unless @office.reward_bank_accounts.present?
        @office.reward_bank_accounts.create
      end
      unless @office.customer_fund_bank_accounts.present?
        @office.customer_fund_bank_accounts.create
      end
      unless @office.share_owners.present?
        @office.share_owners.create
      end
      unless @office.members.present?
        @office.members.create
      end
    end
  end

  def update
    common_nav_header_menu
    if params[:open_card] == "true"
      flash.keep[:notice] = t("general.information_saved")
    end

    if params[:step].to_i == 2
      set_profile_brand_types
      set_office_cordinates
      set_working_areas
      set_office_logo
    end
    
    if params[:step].to_i == 3
      set_contract_details @office
      remove_blank_resources
    end

    if !params[:office].present?
      @office.update_attributes(:registered => true) unless @office.registered
      flash.keep[:notice] = t("office.office_updated")
      redirect_to offices_path
    elsif @office.update(office_params)
      step = params[:proceed_next] ? (params[:step].to_i + 1) : (params[:step].to_i)
      redirect_to edit_office_path(@office, :step => step, :open_card => open_card_param)
    else
      @step = params[:step]
      render 'edit'
    end
  end

  def set_profile_brand_types
    @office.profile_brand_types = params[:profile_brand_types].present? ? params[:profile_brand_types].join(",") : ""
  end

  def set_office_cordinates
    if params[:temp_target_latitude].present? and params[:temp_target_longitude].present?
      coordinates_hash = {}
      coordinates_hash[:latitude] = params[:temp_target_latitude]
      coordinates_hash[:longitude] = params[:temp_target_longitude]
      @office.gps_coordinates = coordinates_hash
    end
  end

  def set_office_logo
    if params[:office][:logo_text].present? and @office.logo_text != params[:office][:logo_text]
      @office.update(:logo_text => params[:office][:logo_text])
      logo_resource = @office.resources["IMAGE::OFFICE_TEXT_LOGO"]
      if logo_resource.present?
        logo_resource.media = File.open("#{Rails.root}/app/assets/images/remax_office.png")
        logo_resource.save!
      else
        spec = ResourceSpec.find_or_create_by!(name: 'OFFICE_TEXT_LOGO')
        type = ResourceType.find_or_create_by!(name: 'IMAGE')
        logo_resource = Resource.create(:resource_holder => @office, :resource_type => type, :resource_spec => spec)
        logo_resource.media = File.open("#{Rails.root}/app/assets/images/remax_office.png")
        logo_resource.save!
      end
    end
  end

  def set_working_areas
    if params[:working_areas].present?
      working_areas = params[:working_areas]
      @office.working_areas = working_areas.join(",") if working_areas.kind_of?(Array)
    else
      @office.working_areas = nil
    end    
  end

  def set_contract_details office
    office.joining_fee = "" unless params[:office][:joining_fee].present?
    office.fixed_fee = "" unless params[:office][:fixed_fee].present?
    office.royalty = "" unless params[:office][:royalty].present?
  end

  def remove_blank_resources
    if params[:office][:resources_attributes].present?
      params[:office][:resources_attributes].each do |key, resource|
        unless resource["id"].present?
          unless resource["media"].present?
            params[:office][:resources_attributes].delete(key)
          end
        end
      end
    end
  end

  def next_offices
    @offices = fetch_offices.page(page).per(limit)
    render layout: false
  end

  def add_opening_hours
    @office = Office.find(params[:id])
    @success = false
    if @office
      office_hours = {}
      ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].each do |day|
        if params[day].present?
          office_hours[day] = {start_hour: params[day][:start_hour].to_s, start_minute: params[day][:start_minute].to_s,
                               end_hour: params[day][:end_hour].to_s, end_minute: params[day][:end_minute].to_s,
                               closed: (params[day][:closed] == "true")
                              }
        end
      end
      if office_hours.present?
        @office.office_hours = office_hours
        @office.save
        @success = true
      end
    end
    respond_to do |format|
      format.js {render :partial => "add_opening_hours"}
    end
  end

  private

  def remove_user_blank_resources
    if params[:user][:resources_attributes].present?
      params[:user][:resources_attributes].each do |key, resource|
        unless resource["id"].present?
          unless resource["media"].present?
            params[:user][:resources_attributes].delete(key)
          end
        end
      end
    end
  end

  def fetch_offices
    offices = @current_brand.offices

    if params[:search].present?
      search = params[:search]
      offices = offices.where('office_name LIKE ? or city LIKE ?', "%#{search}%", "%#{search}%")
    end

    if params[:profile_brand_type].present?
      profile_brand_type = params[:profile_brand_type]
      offices = offices.where('profile_brand_types LIKE ?', "%#{profile_brand_type}%")
    end

    if params[:order].present?
      order = params[:order]
      if order == "Ascending"
        offices = offices.order('office_name').distinct
      else
        offices = offices.order('office_name DESC').distinct
      end
    else
      offices = offices.order('id DESC').distinct
    end

    offices
  end

  def common_nav_header_menu
    @nav_header_menus = [
                          {:href => desktop_users_path, :label => t("nav_header.desktop"), :arrowBack => false},
                          {:href => resource_variable_users_path, :label => t("nav_header.resource_and_variable") , :arrowBack => false},
                          {:href => offices_path, :label => t("nav_header.offices") , :arrowBack => true}
                        ]
  end

  def set_office
    @office = @current_brand.offices.find(params[:id])
  end  

  # Never trust parameters from the scary internet, only allow the white list through.
  def office_params
    params.require(:office).permit(:brand_id, :office_name, :company_name, :company_id, :address, :post_number, :city, :phone_number, :email, :website, :brand_provided_id, :visiting_address, :visiting_post_number, :visiting_city, :billing_address, :billing_post_number, :billing_city,
                                    :logo_text, :linkedin_url, :facebook_url, :youtube_url, :twitter_url, :whatsapp_number, :skype_id, :presentation_text,
                                    reward_bank_accounts_attributes: [:id, :bank_name, :account_number, :_destroy],
                                    customer_fund_bank_accounts_attributes: [:id, :bank_name, :account_number, :_destroy],
                                    share_owners_attributes: [:id, :first_name, :share, :owner_role, :_destroy],
                                    members_attributes: [:id, :first_name, :last_name, :birthdate, :ssn, :_destroy],
                                    ceo_attributes: [:id, :first_name, :last_name, :birthdate, :ssn, :_destroy],
                                    resources_attributes: [:id, :media, :resource_type_id, :resource_spec_id])
  end
end
