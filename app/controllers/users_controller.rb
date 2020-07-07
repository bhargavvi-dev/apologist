class UsersController < ApplicationController

  before_action :authenticate_executive!

  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    @nav_header_menus = [
                          {:href => desktop_users_path, :label => t("nav_header.desktop"), :arrowBack => false},
                          {:href => resource_variable_users_path, :label => t("nav_header.resource_and_variable") , :arrowBack => false},
                          {:href => user_register_users_path, :label => t("nav_header.user_register"), :arrowBack => true}
                        ]
    @back_to_top = true
    @users = fetch_users.page(page).per(first_limit)
  end

  def user_filter
    @users = fetch_users.page(page).per(first_limit)
  end

  def next_users
    @users = fetch_users.page(page).per(limit)
    render layout: false
  end  

  # GET /users/1
  # GET /users/1.json
  def show
    common_nav_header_menu
  end

  # GET /users/new
  def new
    common_nav_header_menu
    @step = 1
    @user = User.new
    @secure_pass = SecureRandom.hex(6)
  end

  # POST /users
  # POST /users.json
  def create
    common_nav_header_menu
    @user = User.new(user_params)
    @secure_pass = SecureRandom.hex(6)
    @step = 1
    if @user.save
      step = params[:proceed_next] ? 2 : 1
      redirect_to edit_user_path(@user, :step => step)
    else
      render 'new'
    end
  end

  # GET /users/1/edit
  def edit
    common_nav_header_menu
    @step = params[:step] || 1
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    common_nav_header_menu
    flash.keep[:notice] = t("general.information_saved") if params[:open_card] == "true"
    if !params[:user].present?
      @user.update_attributes(:registered => true) unless @user.registered
      flash.keep[:notice] = t("executive.executive_updated")
      redirect_to users_path
    elsif @user.update(user_params.merge(updater: current_user))
      step = params[:proceed_next] ? (params[:step].to_i + 1) : (params[:step].to_i)
      redirect_to edit_user_path(@user, :step => step, :open_card => open_card_param)
    else
      @step = params[:step]
      render 'edit'
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: t("executive.executive_destroyed") }
      format.json { head :no_content }
    end
  end

  def desktop
  end

  def resource_variable
    @nav_header_menus = [
                          {:href => desktop_users_path, :label => t("nav_header.desktop"), :arrowBack => true},
                        ]
  end

  def office_register
    common_nav_header_for_other_actions
  end

  def user_register
    common_nav_header_for_other_actions
  end

  private

  def common_nav_header_for_other_actions
    @nav_header_menus = [
                          {:href => desktop_users_path, :label => t("nav_header.desktop"), :arrowBack => false},
                          {:href => resource_variable_users_path, :label => t("nav_header.resource_and_variable"), :arrowBack => true},
                        ]
  end

  def fetch_users
    users = @current_brand.users
    
    if params[:search].present?      
      search = session[:user_search] = params[:search]
    else
      if params[:role].present?
        search = session[:user_search] = nil
      else
        search = session[:user_search] if session[:user_search].present?
      end
    end
    if search.present?
      session[:user_search] = search
      users = users.where("first_name LIKE ? or last_name LIKE ? or city LIKE ? or CONCAT_WS(' ',first_name,last_name) LIKE ? or CONCAT_WS(' ',last_name,first_name) LIKE ? ", "#{search}%", "#{search}%", "#{search}%", "#{search}%","#{search}%")
    end
    users.order('id DESC').distinct
  end

  def common_nav_header_menu
    @nav_header_menus = [
                          {:href => desktop_users_path, :label => t("nav_header.desktop"), :arrowBack => false},
                          {:href => resource_variable_users_path, :label => t("nav_header.resource_and_variable") , :arrowBack => false},
                          {:href => user_register_users_path, :label => t("nav_header.user_register"), :arrowBack => false},
                          {:href => users_path, :label => t("nav_header.executives"), :arrowBack => true}
                        ]      
  end    

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = @current_brand.users.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.require(:user).permit(:brand_provided_id, :brand_id, :email, :password, :password_confirmation, :role, :first_name, :last_name, :birthdate, :ssn, :address, :phone_number, :post_number, :city, :personal_email, :gender, :contract_start_date, :contract_end_date, :contract_type, :contract_probation, :creator_id, :updater_id,
                                 :job_role, :other_business_degrees, :introduction, :linkedin_url, :facebook_url, :youtube_url, :twitter_url, :whatsapp_number, :skype_id, 
                                 resources_attributes: [ :id, :media, :resource_type_id, :resource_spec_id, :_destroy ], working_areas:[], languages:[], avatar:[])
  end
end