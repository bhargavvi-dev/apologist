class OfficesController < ApplicationController

  before_action :authenticate_executive!

  before_action :set_office, only: [:show, :edit, :update, :destroy, :register_responsible_person, :add_responsible_persons, :responsible_person_filter, :next_responsible_persons, :add_internal_responsible_persons, :internal_responsible_person_filter, :next_internal_responsible_persons, :register_inspector, :add_inspector, :inspector_filter, :next_inspectors]

  # GET /offices
  # GET /offices.json
  def index
    @nav_header_menus = [
                          {:href => desktop_executives_path, :label => t("nav_header.desktop"), :arrowBack => false},
                          {:href => resource_variable_executives_path, :label => t("nav_header.resource_and_variable") , :arrowBack => true}
                        ]
    @back_to_top = true
    @offices = fetch_offices.page(page).per(limit)
  end

  # Use callbacks to share common setup or constraints between actions.
  def filter
    @offices = fetch_offices.page(page).per(first_limit)
  end

  # responsible persons filter
  def responsible_person_filter
    @responsible_persons = fetch_responsible_persons.page(page).per(limit)
    @assigned_responsible_persons = @office.responsible_persons
  end

  #next responsible persons
  def next_responsible_persons
    @responsible_persons = fetch_responsible_persons.page(page).per(limit)
    @assigned_responsible_persons = @office.responsible_persons
    render layout: false
  end 

  def internal_responsible_person_filter
    @internal_responsible_persons = fetch_internal_responsible_persons.page(page).per(limit)
    @assigned_internal_responsible_persons = @office.internal_responsible_persons
  end

  #next internal responsible persons
  def next_internal_responsible_persons
    @internal_responsible_persons = fetch_internal_responsible_persons.page(page).per(limit)
    @assigned_internal_responsible_persons = @office.internal_responsible_persons 
    render layout: false
  end 

  def inspector_filter
    @inspectors = fetch_inspectors.page(page).per(limit)
    @assigned_inspectors = @office.inspectors
  end

  def next_inspectors
    @inspectors = fetch_inspectors.page(page).per(limit)
    @assigned_inspectors = @office.inspectors
    render layout: false
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
      @responsible_persons = fetch_responsible_persons.page(page).per(limit)
      @assigned_responsible_persons = @office.responsible_persons
      @internal_responsible_persons = fetch_internal_responsible_persons.page(page).per(limit)
      @assigned_internal_responsible_persons = @office.internal_responsible_persons
      @inspectors = fetch_inspectors.page(page).per(limit)
      @assigned_inspectors = @office.inspectors
    end
    if @step.to_i == 4
      unless @office.reward_bank_accounts.present?
        @office.reward_bank_accounts.create
      end
      unless @office.customer_fund_bank_accounts.present?
        @office.customer_fund_bank_accounts.create
      end
      unless @office.share_owners.present?
        @office.share_owners.create
      end
      unless @office.directors.present?
        @office.directors.create
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
      @responsible_persons = fetch_responsible_persons.page(page).per(limit)
      @assigned_responsible_persons = @office.responsible_persons
      @internal_responsible_persons = fetch_internal_responsible_persons.page(page).per(limit)
      @assigned_internal_responsible_persons = @office.internal_responsible_persons
      @inspectors = fetch_inspectors.page(page).per(limit)
      @assigned_inspectors = @office.inspectors
    end
    
    if params[:step].to_i == 4
      set_contract_details @office
      remove_blank_resources
    end

    if !params[:office].present?
      if params[:step].to_i == 3
        step = params[:proceed_next] ? (params[:step].to_i + 1) : (params[:step].to_i)
        redirect_to edit_office_path(@office, :step => step, :open_card => open_card_param)
      else
        @office.update_attributes(:registered => true) unless @office.registered
        flash.keep[:notice] = t("office.office_updated")
        redirect_to offices_path
      end
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

  def add_responsible_persons
    begin
      @success = true
      if @office.present?
        assigned_responsible_persons = @office.responsible_persons.pluck(:id)
        if params[:responsible_persons].present?
            responsible_persons = params[:responsible_persons].map{|p| p.to_i}
            to_be_created = responsible_persons - assigned_responsible_persons
            to_be_destroyed = assigned_responsible_persons - responsible_persons
            to_be_created.each do |user_id|
              @office.office_users.create(:user_id => user_id)
            end
            @office.office_users.where(:user_id => to_be_destroyed).destroy_all if to_be_destroyed.any?
        else
          @office.office_users.where(:user_id => assigned_responsible_persons).destroy_all
        end
        @assigned_responsible_person = @office.responsible_persons.last
      end
    rescue
      @success = false
    end
    respond_to do |format|
      format.js {render :partial => "add_responsible_persons"}
    end
  end

  def add_internal_responsible_persons
    begin
      @success = true
      if @office.present?
        assigned_internal_responsible_persons = @office.internal_responsible_persons.pluck(:id)
        if params[:internal_responsible_persons].present?
            internal_responsible_persons = params[:internal_responsible_persons].map{|p| p.to_i}
            to_be_created = internal_responsible_persons - assigned_internal_responsible_persons
            to_be_destroyed = assigned_internal_responsible_persons - internal_responsible_persons
            to_be_created.each do |user_id|
              @office.office_users.create(:user_id => user_id)
            end
            @office.office_users.where(:user_id => to_be_destroyed).destroy_all if to_be_destroyed.any?
        else
          @office.office_users.where(:user_id => assigned_internal_responsible_persons).destroy_all
        end
        @assigned_internal_responsible_person = @office.internal_responsible_persons.last
      end
    rescue
      @success = false
    end
    respond_to do |format|
      format.js {render :partial => "add_internal_responsible_persons"}
    end
  end

  def add_inspector
    begin
      @success = true
      if @office.present?
        assigned_inspector = @office.inspectors.pluck(:id)
        if params[:selected_inspectors].present?
            inspectors = params[:selected_inspectors].split(',').map{|p| p.to_i}
            to_be_created = inspectors - assigned_inspector
            to_be_destroyed = assigned_inspector - inspectors
            to_be_created.each do |user_id|
              @office.office_users.create(:user_id => user_id)
            end
            @office.office_users.where(:user_id => to_be_destroyed).destroy_all if to_be_destroyed.any?
        else
          @office.office_users.where(:user_id => assigned_inspector).destroy_all
        end
        @assigned_inspectors = @office.inspectors
      end
    rescue
      @success = false
    end
    respond_to do |format|
      format.js {render :partial => "add_inspector"}
    end
  end

  def register_responsible_person
    remove_user_blank_resources
    @success = false
    @responsible_person = User.new(responsible_person_params)
    if @responsible_person.save
      #to support only one responsible person at a time
      @office.office_users.destroy_all
      @office.office_users.create(:user => @responsible_person)
      flash.keep[:notice] = t("office.responsible_person.create")
      @success = true
    else
      @success = false
      flash.keep[:notice] = t("office.responsible_person.error")
    end
    render "register_responsible_person.js.erb"
    #redirect_to edit_office_path(@office, :step => 3)
  end

  def register_inspector
    inspector = User.new(inspector_params)
    if inspector.save
      @office.office_users.create!(:user => inspector)
      flash.keep[:notice] = t("office.inspector.create")
    else
      flash.keep[:notice] = t("office.inspector.error")
    end
    redirect_to edit_office_path(@office, :step => 3)
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

  def fetch_responsible_persons
    users = @current_brand.responsible_persons
    if params[:search].present?
      search = session[:responsible_person_search] = params[:search]
    else
      if params[:role].present?
        search = session[:responsible_person_search] = nil
      else
        search = session[:responsible_person_search] if session[:responsible_person_search].present?
      end
    end
    if search.present?
      session[:responsible_person_search] = search
      users = users.where("first_name LIKE ? or last_name LIKE ? or city LIKE ? or CONCAT_WS(' ',first_name,last_name) LIKE ? or CONCAT_WS(' ',last_name,first_name) LIKE ? ", "#{search}%", "#{search}%", "#{search}%", "#{search}%","#{search}%")
    end

    if params[:order].present?
      order = params[:order]
      if order == "Ascending"
        users = users.order('first_name').distinct
      else
        users = users.order('first_name DESC').distinct
      end
    else
      users = users.order('id DESC').distinct
    end
  end
  
  def fetch_internal_responsible_persons
    users = @current_brand.persons
    if params[:search].present?
      search = session[:internal_responsible_person_search] = params[:search]
    else
      if params[:role].present?
        search = session[:internal_responsible_person_search] = nil
      else
        search = session[:internal_responsible_person_search] if session[:internal_responsible_person_search].present?
      end
    end
    if search.present?
      session[:internal_responsible_person_search] = search
      users = users.where("first_name LIKE ? or last_name LIKE ? or city LIKE ? or CONCAT_WS(' ',first_name,last_name) LIKE ? or CONCAT_WS(' ',last_name,first_name) LIKE ? ", "#{search}%", "#{search}%", "#{search}%", "#{search}%","#{search}%")
    end

    if params[:register_type].present?
      register_type = session[:internal_responsible_person_register_type] = params[:register_type]
    else
      if params[:role].present?
        register_type = session[:internal_responsible_person_register_type] = nil
      else
        register_type = session[:internal_responsible_person_register_type] if session[:internal_responsible_person_register_type].present?
      end
    end
    if register_type.present?
      session[:internal_responsible_person_register_type] = register_type
      users = users.where('users.role = ?', User.roles[register_type])
    end

    conditions = []
    values = []
    
    conditions << "(user_skills.skill_id = ? AND user_skills.skill_type = 'BusinessDegree')"
    values << "1"
      
    users = users.joins(:user_skills)
                .where("(#{conditions.join(' OR ')})", *values) if conditions.present?

    if params[:order].present?
      order = params[:order]
      if order == "Ascending"
        users = users.order('first_name').distinct
      else
        users = users.order('first_name DESC').distinct
      end
    else
      users = users.order('id DESC').distinct
    end
  end

  def fetch_inspectors
    users = @current_brand.users.with_role(:INSPECTOR)
    if params[:search].present?      
      search = session[:inspector_search] = params[:search]
    else
      search = session[:inspector_search] = nil
    end
    if search.present?
      session[:inspector_search] = search
      users = users.where("first_name LIKE ? or last_name LIKE ? or city LIKE ? or CONCAT_WS(' ',first_name,last_name) LIKE ? or CONCAT_WS(' ',last_name,first_name) LIKE ? ", "#{search}%", "#{search}%", "#{search}%", "#{search}%","#{search}%")
    end

    if params[:order].present?
      order = params[:order]
      if order == "Ascending"
        users = users.order('first_name').distinct
      else
        users = users.order('first_name DESC').distinct
      end
    else
      users.order('id DESC').distinct
    end
  end

  def common_nav_header_menu
    @nav_header_menus = [
                          {:href => desktop_executives_path, :label => t("nav_header.desktop"), :arrowBack => false},
                          {:href => resource_variable_executives_path, :label => t("nav_header.resource_and_variable") , :arrowBack => false},
                          {:href => offices_path, :label => t("nav_header.offices") , :arrowBack => true}
                        ]
  end

  def set_office
    @office = @current_brand.offices.find(params[:id])
  end  

  # Never trust parameters from the scary internet, only allow the white list through.
  def office_params
    params.require(:office).permit(:brand_id, :office_name, :company_name, :company_id, :address, :address_specification, :post_number, :city, :phone_number, :email, :website, :brand_provided_id, :visiting_address, :visiting_post_number, :visiting_city, :billing_address, :billing_post_number, :billing_city,
                                    :logo_text, :linkedin_url, :facebook_url, :youtube_url, :twitter_url, :whatsapp_number, :skype_id, :working_areas, :immediate_customer_reward_payment, :customer_reward_payment_days, :agreement_signing_date, :agreement_start_date, :agreement_end_date,
                                    :introduction, :joining_fee, :fixed_fee, :royalty, :sales_area,
                                    office_teams_attributes: [:id, :name, :_destroy],
                                    office_users_attributes: [:id, :user_id, :_destroy],
                                    reward_bank_accounts_attributes: [:id, :bank_name, :account_number, :_destroy],
                                    customer_fund_bank_accounts_attributes: [:id, :bank_name, :account_number, :_destroy],
                                    share_owners_attributes: [:id, :first_name, :share, :owner_role, :_destroy],
                                    directors_attributes: [:id, :first_name, :last_name, :birthdate, :ssn, :_destroy],
                                    ceo_attributes: [:id, :first_name, :last_name, :birthdate, :ssn, :_destroy],
                                    resources_attributes: [:id, :media, :resource_type_id, :resource_spec_id])
  end

  def responsible_person_params
    params.require(:user).permit(:brand_id, :email, :password, :password_confirmation, :role, :first_name, :last_name, :birthdate, :ssn, :address, :phone_number, :creator_id,
                                  resources_attributes: [:id, :media, :resource_type_id, :resource_spec_id]
                                )
  end  

  def inspector_params
    params.require(:user).permit(:brand_id, :email, :password, :password_confirmation, :role, :first_name, :last_name, :birthdate, :ssn, :address, :phone_number, :creator_id, :personal_email, :post_number, :city, :gender)
  end

end
