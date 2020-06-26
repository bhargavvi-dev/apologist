class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  before_action :current_brand

  before_action :set_locale

  helper_method :current_brand_custom_domain_or_subdomain, :current_brand_custom_domain_or_slug

  LOCALE_LANG = ["en", "fi"]

  def page
    params[:page] || 1
  end

  def limit
    params[:per] || Settings.system.per_page
  end  

  def first_limit
    params[:per] || Settings.system.per_page_first
  end

  def paginate_limit
    params[:per] || Settings.system.per_peginate_page
  end

  def current_brand
    begin
      # @current_brand ||= Brand.find_by_slug(session[:current_brand_slug]) || Brand.find_by_custom_domain(request.host) || Brand.find_by_slug(current_subdomain)
      @current_brand ||= Brand.find_by_slug(session[:current_brand_slug]) || Brand.find_by_custom_domain(request.host) || Brand.find_by_slug('advo')
    rescue ActiveRecord::RecordNotFound => e
      raise BrandNotFound
    end
  end

  def set_lang_cookie
    # set language cookie using query string parameter 'lang'
    session[:lang] = params[:locale] if params[:locale] and LOCALE_LANG.include?(params[:locale])
  end

  def authenticate_executive!
    redirect_to root_path if authenticate_user! and !current_user.executive?
  end

  def authenticate_director!
    redirect_to root_path if authenticate_user! and !current_user.director?
  end

  def authenticate_office_manager!
    redirect_to root_path if authenticate_user! and !current_user.office_manager?
  end

  def authenticate_agent!
    redirect_to root_path if authenticate_user! and !current_user.agent?
  end

  def authenticate_agent_dir_inspector!
    redirect_to root_path if authenticate_user! and !(current_user.director? or current_user.agent? or current_user.inspector?)
  end

  def authenticate_exe_dir!
    redirect_to root_path if authenticate_user! and !( current_user.executive? or current_user.director? )
  end

  def authenticate_dir_agent!
    redirect_to root_path if authenticate_user! and !( current_user.director? or current_user.agent? )
  end

  def authenticate_exe_dir_agent!
    redirect_to root_path if authenticate_user! and !( current_user.executive? or current_user.director? or current_user.agent?)
  end

  def authenticate_exe_dir_agent_inspector_office_manager!
    redirect_to root_path if authenticate_user! and !( current_user.executive? or current_user.director? or current_user.agent? or current_user.inspector? or current_user.office_manager?)
  end

  def authenticate_exe_dir_agent_office_manager!
    redirect_to root_path if authenticate_user! and !( current_user.executive? or current_user.director? or current_user.agent? or current_user.office_manager?)
  end

  def authenticate_exe_dir_office_manager!
    redirect_to root_path if authenticate_user! and !( current_user.executive? or current_user.director? or current_user.office_manager?)
  end

  def authenticate_dir_agent_office_manager!
    redirect_to root_path if authenticate_user! and !( current_user.director? or current_user.agent? or current_user.office_manager? )
  end

  def authenticate_dir_agent_office_manager_customer!
    redirect_to root_path if authenticate_user! and !( current_user.director? or current_user.agent? or current_user.office_manager? or current_user.customer? )
  end

  def authenticate_agent_dir_inspector_office_manager!
    redirect_to root_path if authenticate_user! and !(current_user.director? or current_user.agent? or current_user.inspector? or current_user.office_manager?)
  end

  def authenticate_exe_dir_agent_inspector_office_manager_customer!
    redirect_to root_path if authenticate_user! and !(current_user.executive? or current_user.director? or current_user.agent? or current_user.inspector? or current_user.office_manager? or current_user.customer?)
  end

  def authenticate_exe_dir_agent_office_manager_customer!
    redirect_to root_path if authenticate_user! and !(current_user.executive? or current_user.director? or current_user.agent? or current_user.office_manager? or current_user.customer?)
  end

  def authenticate_exe_agent_dir_inspector!
    redirect_to root_path if authenticate_user! and !(current_user.executive? or current_user.director? or current_user.agent? or current_user.inspector?)
  end

  def set_locale
    set_lang_cookie
    begin
      #I18n.locale = session[:lang] || params[:locale] || extract_locale_from_accept_language_header || I18n.default_locale
      I18n.locale = session[:lang] || params[:locale] || I18n.default_locale
    rescue
      I18n.locale = I18n.default_locale
    end
    unless LOCALE_LANG.include?(I18n.locale.to_s)
      I18n.locale = I18n.default_locale
    end
  end

  def current_brand_custom_domain_or_subdomain
    @current_brand.custom_domain ? @current_brand.custom_domain : request.subdomain
  end

  def current_brand_custom_domain_or_slug
    @current_brand.custom_domain ? @current_brand.custom_domain : @current_brand.slug
  end

  def open_card_param
    params[:open_card].present? ? params[:open_card] : false
  end

end