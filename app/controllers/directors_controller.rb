class DirectorsController < ApplicationController

  before_action :authenticate_executive!, :except => [:desktop, :user_register, :document_registers, :network_partners]

  before_action :authenticate_director!, :only => [:desktop, :user_register, :document_registers]

  before_action :set_director, only: [:show, :edit, :update, :destroy]

  # GET /directors
  # GET /directors.json
  def index
    if current_user.director?
      @nav_header_menus = [
                            {:href => desktop_directors_path, :label => t("nav_header.desktop"), :arrowBack => false},
                            {:href => document_registers_directors_path, :label => t("nav_header.document_registers"), :arrowBack => true}
                          ]
    elsif current_user.executive?
      @nav_header_menus = [
                            {:href => desktop_executives_path, :label => t("nav_header.desktop"), :arrowBack => false},
                            {:href => resource_variable_executives_path, :label => t("nav_header.resource_and_variable") , :arrowBack => false},
                            {:href => user_register_executives_path, :label => t("nav_header.user_register"), :arrowBack => true}
                          ]
    end

    @back_to_top = true
    @directors = fetch_users.page(page).per(first_limit)
  end

  def user_filter
    @directors = fetch_users.page(page).per(first_limit)
  end

  def next_users
    @directors = fetch_users.page(page).per(limit)
    render layout: false
  end  

  # GET /directors/1
  # GET /directors/1.json
  def show
    common_nav_header_menu
  end

  # GET /directors/new
  def new
    common_nav_header_menu
    @step = 1
    @director = @current_brand.users.with_role('DIRECTOR').new
    @secure_pass = SecureRandom.hex(10)
  end

  # POST /directors
  # POST /directors.json
  def create
    common_nav_header_menu
    @director = User.new(director_params)
    @secure_pass = SecureRandom.hex(6)
    @step = 1
    if @director.save
      step = params[:proceed_next] ? 2 : 1
      redirect_to edit_director_path(@director, :step => step)
    else
      render 'new'
    end
  end

  # GET /directors/1/edit
  def edit
    common_nav_header_menu
    @step = params[:step] || 1
    if @step.to_i == 5
      @office_user = OfficeUser.where(:user_id => @director.id).first
      select_rewards_director
      @responsible_persons = @current_brand.responsible_persons.page(page).per(limit).order('id DESC')
      go_to_final_step = true
      @director.office_users.each do |office_user|
        if ['AGENT_ENTREPRENEUR', 'PARTNER', 'KAHISEVA_LTD', 'SALARY_BASED', 'OFFICE_MODEL'].include? office_user.relationship_type
          go_to_final_step = false
          break
        end
      end
      redirect_to edit_director_path(@director, :step => 6, :open_card => open_card_param) if go_to_final_step
    end
  end

  # PATCH/PUT /directors/1
  # PATCH/PUT /directors/1.json
  def update
    common_nav_header_menu
    if params[:open_card] == "true"
      flash.keep[:notice] = t("general.information_saved")
    end
    
    if params[:step].to_i == 2
      check_user_skills @director 
      set_other_languages @director 
    end  
    set_user_working_areas @director if params[:step].to_i == 3
    remove_blank_resources if params[:step].to_i == 4
    if params[:step].to_i == 5
      if params[:user][:office_users_attributes] != nil
        if (params[:reward_share_date].present? or params[:reward_share_date_blank].present?)
            current_date = params[:reward_share_date]
            if params[:save_new] == ""
              params[:reward_share_sell] = params[:reward_share_sell_blank]
              params[:reward_share_buy] = params[:reward_share_buy_blank]
              params[:reward_share_rent_lessor] = params[:reward_share_rent_lessor_blank]
              params[:reward_share_rent_tenant] = params[:reward_share_rent_tenant_blank]
              params[:reward_share_estimation] = params[:reward_share_estimation_blank]
              current_date = params[:reward_share_date_blank]
            end
          if  Date.parse(current_date) <  Date.parse(DateTime.now.strftime("%d/%m/%Y").gsub("/","."))
            flash.keep[:notice] = "Please Select Greater than or equal to current date"
          else
            reward_share_main_hash = {}
            reward_shares = {}
            if params[:visibility] == "true"
              reward_share_main_hash[:visibility] = params[:reward_share_date_blank]
            else
              office_user_old = OfficeUser.where(:user_id => @director.id).first
              reward_share_list_old = (eval (office_user_old.try(:reward_share).to_s))
              unless reward_share_list_old.present?
                reward_share_main_hash[:visibility] = current_date
              end
            end
            reward_share_main_hash[current_date] = reward_shares
            if params[:reward_share_common].present?
              params[:reward_share_sell] = params[:reward_share_buy] = params[:reward_share_rent_lessor] = params[:reward_share_rent_tenant] = params[:reward_share_estimation] = params[:reward_share_common]
            end
            reward_shares[:reward_share_sell] = params[:reward_share_sell] if params[:reward_share_sell].present?
            reward_shares[:reward_share_buy] = params[:reward_share_buy] if params[:reward_share_buy].present?
            reward_shares[:reward_share_rent_lessor] = params[:reward_share_rent_lessor] if params[:reward_share_rent_lessor].present?
            reward_shares[:reward_share_rent_tenant] = params[:reward_share_rent_tenant] if params[:reward_share_rent_tenant].present?
            reward_shares[:reward_share_estimation] = params[:reward_share_estimation] if params[:reward_share_estimation].present?
            reward_shares[:reward_share_common] = params[:reward_share_common] if params[:reward_share_common].present?
            params[:user][:office_users_attributes]["0"][:reward_share] = reward_share_main_hash
            office_user = OfficeUser.where(:user_id => @director.id).first
            reward_share_list = (eval (office_user.try(:reward_share).to_s))
            if reward_share_list.present?
              params[:user][:office_users_attributes]["0"][:reward_share] = reward_share_list.merge(reward_share_main_hash)
            elsif reward_share_list == nil
              params[:user][:office_users_attributes]["0"][:reward_share] = reward_share_main_hash
            end
          end
        end
      end
    end
    if !params[:user].present?
      @director.update_attributes(:registered => true) unless @director.registered
      flash.keep[:notice] = t("director.director_updated")
      redirect_to directors_path
    elsif @director.update(director_params.merge(updater: current_user))
      step = params[:proceed_next] ? (params[:step].to_i + 1) : (params[:step].to_i)
      redirect_to edit_director_path(@director, :step => step, :open_card => open_card_param)
    else
      @step = params[:step]
      render 'edit'
    end
  end

  # DELETE /directors/1
  # DELETE /directors/1.json
  def destroy
    @director.destroy
    respond_to do |format|
      format.html { redirect_to directors_url, notice: t("director.director_destroyed") }
      format.json { head :no_content }
    end
  end

  def desktop
    #session[:current_office_id] = nil
    #session[:current_office_user_id] = nil
    #session[:office_database_name] = nil
    # set_office_db_connection
  end

  def document_registers
    @nav_header_menus = [
                          {:href => desktop_directors_path, :label => t("nav_header.desktop"), :arrowBack => true}
                        ]
  end

  def network_partners
    @nav_header_menus = [
                          {:href => desktop_directors_path, :label => t("nav_header.desktop"), :arrowBack => false},
                          {:href => document_registers_directors_path, :label => t("nav_header.document_registers"), :arrowBack => true}
                        ]
  end

  def select_rewards_director
    @step = params[:step]
    @open_card = params[:open_card]
    reward_share_key_list_all = @reward_share_key_list_all = (eval (@office_user.try(:reward_share).to_s))
    if reward_share_key_list_all.present?
      reward_share_key_list = reward_share_key_list_all.keys
      @reward_share_key_list_all_without_visibilty = @reward_share_key_list_all.keys
      reward_share_key_list.delete("visibility")
      @reward_share_key_list_all_without_visibilty.delete("visibility")
      @reward_share_key_list_all_without_visibilty = @reward_share_key_list_all_without_visibilty.sort_by {|elt| Date.parse(elt) }
      @actual_current_date = DateTime.now.strftime("%d/%m/%Y").gsub("/",".")
      @current_date_month = DateTime.now.strftime("%d/%m/%Y").gsub("/",".")
      if reward_share_key_list_all["visibility"].present?
        @current_month_date = reward_share_key_list_all["visibility"]
        if Date.parse(@current_date_month) < Date.parse(@current_month_date)
          @current_date_month = @current_month_date
        end
      end
    end
    if reward_share_key_list.present?
      @array_keys = []
      @array_keys_less = []
      @array_keys_convert_list = []
      new_key = ""
      @reward_share_key = ""
      @array_keys_less_date = ""
      reward_share_key_list.each do |key|
        if key == @current_date_month
          @reward_share_key = key
        else
          if Date.parse(@current_date_month) < Date.parse(key)
            @array_keys.push(Date.parse(key).to_s)
          end
          if Date.parse(@current_date_month) > Date.parse(key)
            @array_keys_less.push(Date.parse(key).to_s)
          end
        end
      end
      if @array_keys.present?
        @array_keys_convert_list = @array_keys.map{ |x| x.to_datetime.to_s(:default_date) }
        @array_keys_convert_list = @array_keys_convert_list.sort_by {|elt| Date.parse(elt) }
        @reward_share_key_current = (@array_keys.min).to_datetime.to_s(:default_date)
        unless @reward_share_key.present?
          @reward_share_key = (@array_keys.min).to_datetime.to_s(:default_date)
        end
      end
      if @array_keys_less.present?
        @array_keys_convert_list_less = @array_keys_less.map{ |x| x.to_datetime.to_s(:default_date) }
        @array_keys_convert_list_less = @array_keys_convert_list_less.sort_by {|elt| Date.parse(elt) }
        @array_keys_less_date = (@array_keys_less.max).to_datetime.to_s(:default_date)
      end
    end
  end

  private

  def fetch_users
    users = @current_brand.users.with_role(:DIRECTOR)
    if params[:search].present?      
      search = session[:director_search] = params[:search]
    else
      if params[:role].present?
        search = session[:director_search] = nil
      else
        search = session[:director_search] if session[:director_search].present?
      end
    end
    if search.present?
      session[:director_search] = search
      users = users.where("first_name LIKE ? or last_name LIKE ? or city LIKE ? or CONCAT_WS(' ',first_name,last_name) LIKE ? or CONCAT_WS(' ',last_name,first_name) LIKE ? ", "#{search}%", "#{search}%", "#{search}%", "#{search}%","#{search}%")
      #users = users.where('users.first_name LIKE ? or users.last_name LIKE ? or users.city LIKE ?', "%#{search}%", "%#{search}%", "%#{search}%")
    end

    if params[:office].present?
      office = session[:director_office] = params[:office]
    else
      if params[:role].present?
        office = session[:director_office] = nil
      else
        office = session[:director_office] if session[:director_office].present?
      end
    end
    if office.present?
      session[:director_office] = office
      users = users.joins(:offices)
                 .where("office_users.office_id = ?",office)
    end

    if params[:special_skill].present?      
      special_skill = session[:director_special_skill] = params[:special_skill]
    else
      if params[:role].present?
        special_skill = session[:director_special_skill] = nil
      else
        special_skill = session[:director_special_skill] if session[:director_special_skill].present?
      end
    end    
    if params[:language_skill].present?      
      language_skill = session[:director_language_skill] = params[:language_skill]
    else
      if params[:role].present?
        language_skill = session[:director_language_skill] = nil
      else
        language_skill = session[:director_language_skill] if session[:director_language_skill].present?
      end
    end      
    if params[:business_degree].present?      
      business_degree = session[:director_business_degree] = params[:business_degree]
    else
      if params[:role].present?
        business_degree = session[:director_business_degree] = nil
      else
        business_degree = session[:director_business_degree] if session[:director_business_degree].present?
      end
    end    
    conditions = []
    values = []
    if language_skill.present?
      session[:director_language_skill] = language_skill
      conditions << "(user_skills.skill_id = ? AND user_skills.skill_type = 'LanguageSkill')"
      values << language_skill
    end

    if business_degree.present?
      session[:director_business_degree] = business_degree
      conditions << "(user_skills.skill_id = ? AND user_skills.skill_type = 'BusinessDegree')"
      values << business_degree
    end

    if special_skill.present?
      session[:director_special_skill] = special_skill
      conditions << "(user_skills.skill_id = ? AND user_skills.skill_type = 'SpecialSkill')"
      values << special_skill
    end    
    users = users.joins(:user_skills)
                .where("(#{conditions.join(' OR ')})", *values) if conditions.present?
    users.order('id DESC').distinct
  end 

  def common_nav_header_menu
    if current_user.director?
      @nav_header_menus = [
                            {:href => desktop_directors_path, :label => t("nav_header.desktop"), :arrowBack => false},
                            {:href => document_registers_directors_path, :label => t("nav_header.document_registers"), :arrowBack => false},
                            {:href => directors_path, :label => t("nav_header.directors"), :arrowBack => true }
                          ]
    elsif current_user.executive?
      @nav_header_menus = [
                            {:href => desktop_executives_path, :label => t("nav_header.desktop"), :arrowBack => false},
                            {:href => resource_variable_executives_path, :label => t("nav_header.resource_and_variable") , :arrowBack => false},
                            {:href => user_register_executives_path, :label => t("nav_header.user_register"), :arrowBack => false},
                            {:href => directors_path, :label => t("nav_header.directors"), :arrowBack => true }
                          ]
    end     
  end   

  # Use callbacks to share common setup or constraints between actions.
  def set_director
    @director = @current_brand.users.find(params[:id])
  end


  # Never trust parameters from the scary internet, only allow the white list through.
  def director_params
    if params[:step].to_i == 5
      params.require(:user).permit!
    else
      params.require(:user).permit(:brand_provided_id, :brand_id, :email, :password, :password_confirmation, :role, :first_name, :last_name, :birthdate, :ssn, :address, :phone_number, :post_number, :city,
                                 :personal_email, :creator_id, :updater_id, :gender, :other_business_degrees, :introduction, :linkedin_url, :facebook_url, :youtube_url, :twitter_url, :whatsapp_number, :skype_id,
                                  office_users_attributes: [ :id, :office_id, :relationship_type, :job_role, :position, :profile_brand_type, :team_id,  :contract_start_date, :contract_end_date,
                                                             :contract_type, :contract_probation, :reward_type, :reward_share, :fixed_fee, :chain_fee_share, :billing_place_number, :bank_name,
                                                             :bank_account_number, :administration_pct, :administration_payment, :charge_permit, :charge_permission, :charge_days, :company_name, :company_address,
                                                             :company_post_number, :company_city, :visiting_company_name, :visiting_address, :visiting_post_number, :visiting_city, :business_id,
                                                             :reference_number, :agent_name, :reward_billing_pct, :billing_name, :billing_address, :billing_post_number, :billing_city, :billing_email, :salary_day, :_destroy,
                                                             resources_attributes: [:id, :media, :resource_type_id, :resource_spec_id]], 
                                  working_areas:[], languages:[])
    end
  end

  def responsible_person_params
    params.require(:user).permit(:brand_id, :email, :password, :password_confirmation, :role, :first_name, :last_name, :birthdate, :ssn, :address, :phone_number)
  end
end