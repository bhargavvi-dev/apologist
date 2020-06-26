class MessagesController < ApplicationController

  before_action :authenticate_exe_dir_agent_inspector_office_manager_customer!

  before_action :set_message, only: [:edit, :update, :next_users, :user_filter, :next_customers, :customer_filter]

  # GET /executives
  # GET /executives.json
  def index
    common_nav_header_menus
    @back_to_top = true
    @message_associations = fetch_message_associations.page(page).per(limit)
  end

  def filter
    @message_associations = fetch_message_associations.page(page).per(limit)
  end

  def user_filter
    @recipients = fetch_users.page(page).per(limit)
  end

  def next_users
    @recipients = fetch_users.page(page).per(limit)
    render layout: false
  end

  def customer_filter
    @recipients = fetch_customers.page(page).per(limit)
  end

  def next_customers
    @recipients = fetch_customers.page(page).per(limit)
    render layout: false
  end

  def next_messages
    @message_associations = fetch_message_associations.page(page).per(limit)
    render layout: false
  end  

  # GET /messages/new
  def new
    common_nav_header_menus_for_other_actions
    @step = 1
    if params[:recipient_type].blank?
      flash[:notice] = t('general.do_not_have_permission_for_this_action')
      redirect_to root_url
    else
      session[:message_recipient_type] = params[:recipient_type]
      sent_messages = current_user.sent_messages
      @message = sent_messages.where('sent_at IS NULL').first
      if @message.present?
        @message.update_attributes(:receiver_ids => '', :subject => '', :body => '', :message_type => 0)
      else
        @message = sent_messages.create(:brand => @current_brand)
      end
      if current_user.customer?
        redirect_to edit_message_path(@message, :step => 2)
      else
        redirect_to edit_message_path(@message, :step => 1)
      end
    end
  end

  # GET /messages/1/edit
  def edit
    common_nav_header_menus_for_other_actions
    if params[:step].to_i == 1
      @recipients = fetch_users.page(page).per(limit)
    end
    if params[:step].to_i == 2
      @recipients = fetch_agents
    end
    if params[:step].to_i == 3
      recipient_ids = @message.receiver_ids.to_s.split(",").uniq
      if session[:message_recipient_type] == "customer"
        # @recipients = @current_brand.customers.where(:id => recipient_ids) if recipient_ids.present?
        @recipients = @current_brand.users.where(:id => recipient_ids) if recipient_ids.present?
      else
        @recipients = @current_brand.users.where(:id => recipient_ids) if recipient_ids.present?
      end
    end
    @step = params[:step] || 1
  end

  # PATCH/PUT /messages/1
  # PATCH/PUT /messages/1.json
  def update
    # return render text: params.inspect

    common_nav_header_menus
    if params[:step].to_i == 1
      if params[:final_recipients].present?
        @message.update_attributes(:receiver_ids => params[:final_recipients])
        redirect_to edit_message_path(@message, :step => 2)
      else
        @step = 1
        flash.keep[:notice] = t("message.recipients_can_not_blank")
        redirect_to edit_message_path(@message, :step => 1)
      end
    else
      if params[:step].to_i == 2
        if session[:message_recipient_type] == "agent"
          @message.receiver_ids = session[:receiver_ids].to_a.join(',')
        end
      end
      if params[:step].to_i == 3 and params[:receivers].present?
        @message.receiver_ids = params[:receivers].to_a.join(',')
        if session[:message_recipient_type] == "agent"
          @recipients = @current_brand.users.where('id in (?)',params[:receivers])
          @message.recipients << @recipients if @recipients.present?
          @message.office_id = session[:current_office_id]
          @message.object_type = "AgentOffice::Commission::Base"
          @message.object_id = session[:current_commission_id]
        end
      end
      if @message.update(message_params)
        step = params[:proceed_next] ? (params[:step].to_i + 1) : (params[:step].to_i)
        if params[:step].to_i == 3 and params[:receivers].present?
          recipient_ids = @message.receiver_ids.to_s.split(",").uniq
          if recipient_ids.present?
            if session[:message_recipient_type] == "customer"
              # recipients = @current_brand.customers.where(:id => recipient_ids)
              recipients = @current_brand.users.where(:id => recipient_ids)
            else
              recipients = @current_brand.users.where(:id => recipient_ids)
            end
            recipients.each do |recipient|
              @message.message_associations.build(:recipient => recipient, :message_type => @message.message_type)
            end
            @message.update(:sent_at => Time.now)
          end
          if @message.message_type == "EMAIL"
            send_message_as_email @message, recipients
          else
            # if session[:message_recipient_type] == "customer"
            #   customers = @current_brand.customers.where(:id => recipient_ids)
            #   recipients = @current_brand.users.where(:email => customers.pluck(:email))
            #   send_message_as_email @message, recipients
            # end
          end
          # @message.update_attributes(:sent_at => Time.now)
          session[:message_recipient_type] = nil
          redirect_to edit_message_path(@message, :step => step)
        else
          unless params[:step].to_i == 2
            flash.keep[:notice] = t("message.recipients_can_not_blank")
          end  
          redirect_to edit_message_path(@message, :step => 3)
        end
      else
        @step = params[:step]
        render 'edit'
      end
    end
  end

  #GET /messages/center
  def message_center
    common_nav_header_menus
  end

  def send_message_as_email message, recipients
    resources = message.resources.with_type('DOCUMENT::ATTACHMENT')
    @attachments = {}
    resources.each do |attachment|
      @attachments["#{attachment.id}"] = {"file_name" => attachment.media_file_name, "path" => attachment.media.path}
    end
    if recipients.present?
      options = {
                  :sender_email => message.sender.try(:email),
                  :message => message.body,
                  :subject => message.subject,
                  :recipient_emails => recipients.pluck(:email),
                  :attachments => @attachments
                }
      ApplicationMailer.send_message(options).deliver_later
    end
  end

  def update_read_status
    begin
      message_association = current_user.message_associations.find(params[:message_association_id])
      if message_association.present?
        message_association.update_attributes(:read => !message_association.read)
        @read_status = message_association.read
      else
        @error = true
      end
    rescue Exception => e
      @error = true
    end
  end

  def select_your_agent
    @message = @current_user.sent_messages.find(params[:id])
    if session[:message_recipient_type] == "agent"
      if params[:receivers].present?
        @recipients = @current_brand.users.where('id in (?)',params[:receivers])
        @recipients_emails = @recipients.pluck(:email).join(",")
      end
    end
    if params[:step].to_i == 2 and params[:receivers].present?
      session[:receiver_ids] = params[:receivers]
    end
  end

  def send_questions_regarding_invoice
    @commission = AgentOffice::Commission::Base.find_by(:id => params[:commission_id])
    @sales_team_member = @commission.sales_team_members.find_by(:id => params[:email])
    render 'messages/send_questions_regarding_invoice.js.erb'
  end

  def invoice_attachment
    @commission = AgentOffice::Commission::Base.find_by(:id => params[:commission_id])
    @sales_team_member = @commission.sales_team_members.find_by(:id => params[:email])
    render 'messages/invoice_attachment.js.erb'
  end

  private

  def fetch_message_associations
    if current_user.customer?
      message_associations = current_user.message_associations
                              .includes(:message => :sender)
                              .where('messages.office_id is NULL or messages.office_id = ? AND messages.object_id = ?', session[:current_office_id], session[:current_commission_id])
                              .order('messages.created_at DESC')
    else
      message_associations = current_user.message_associations
                              .includes(:message => :sender)
                              .where('messages.office_id is NULL or messages.office_id = ?', session[:current_office_id])
                              .order('messages.created_at DESC')
    end
    if params[:search]
      search = session[:message_search] = params[:search]
    else
      if params[:role].present?
        search = session[:message_search] = nil
      else
        search = session[:message_search]
      end
    end
    if search.present?
      session[:message_search] = search
      message_associations = message_associations.where("messages.subject LIKE ? or CONCAT_WS(' ',users.first_name,users.last_name) LIKE ? or CONCAT_WS(' ',users.last_name,users.first_name) LIKE ? ", "#{search}%", "#{search}%", "#{search}%")
    end
    message_associations.distinct
  end

  def fetch_users
    if session[:message_recipient_type] == "partner"
      recipients = fetch_partners
    elsif session[:message_recipient_type] == "customer"
      recipients = fetch_customers
    elsif session[:message_recipient_type] == "agent"
      recipients = fetch_agents
    else
      recipients = fetch_staff
    end
    recipients
  end

  def fetch_staff
    users = @current_brand.users.with_roles(['EXECUTIVE', 'AGENT', 'DIRECTOR', 'OFFICE_MANAGER'])
    if params[:search]      
      search = session[:recipient_staff_search] = params[:search]
    else
      if params[:role].present? and !params[:recipient_role]
        search = session[:recipient_staff_search] = nil
      else
        search = session[:recipient_staff_search] if session[:recipient_staff_search].present?
      end
    end
    if search.present?
      session[:recipient_staff_search] = search
      users = users.where("users.first_name LIKE ? or users.last_name LIKE ? or CONCAT_WS(' ',first_name,last_name) LIKE ? or CONCAT_WS(' ',last_name,first_name) LIKE ?", "#{search}%", "#{search}%", "#{search}%", "#{search}%")
    end

    if params[:recipient_role].present?
      recipient_role = session[:recipient_role] = params[:recipient_role]
    else
      if params[:role].present? and !params[:search].present?
        recipient_role = session[:recipient_role] = nil
      else
        recipient_role = session[:recipient_role] if session[:recipient_role].present?
      end
    end
    if recipient_role.present?
      session[:recipient_role] = recipient_role
      users = users.where('users.role = ?', User.roles[recipient_role])
    end
    case session[:recipient_role]
    when 'EXECUTIVE'
      @executive_filter_active = "btn-red"
    when 'AGENT'
      @agent_filter_active = "btn-red"
    when 'DIRECTOR'
      @director_filter_active = "btn-red"
    when 'OFFICE_MANAGER'
      @office_manager_filter_active = "btn-red"
    else
      @all_filter_active = 'btn-red'                  
    end
    users.order('id DESC').distinct
  end

  def fetch_partners
    if current_user.executive?
      network_partners = @current_brand.users.with_role(:NETWORK_PARTNER)
    elsif current_user.director?
      agent_ids = OfficeUser.joins(:user).where('office_id IN (?) and users.role = ?', current_user.offices.pluck(:id), User.roles['AGENT']).pluck(:user_id)
      network_partners = @current_brand.users
                               .joins(:creator)
                               .with_role(:NETWORK_PARTNER)
                               .where("creators_users.id = ? OR creators_users.id IN (?)", current_user.id, agent_ids)
    else
      network_partners = @current_brand.users
                               .joins(:creator)
                               .with_role(:NETWORK_PARTNER)
                               .where("creators_users.id = ?", current_user.id)
    end
    
    if params[:search]   
      search = session[:recipient_partner_search] = params[:search]
    else
      if params[:role].present?
        search = session[:recipient_partner_search] = nil
      else
        search = session[:recipient_partner_search] if session[:recipient_partner_search].present?
      end
    end
    if search.present?
      session[:recipient_partner_search] = search
      network_partners = network_partners.joins('LEFT OUTER JOIN industries ON users.industry_id = industries.id').where('users.company_name LIKE ? or industries.name LIKE ?', "#{search}%","#{search}%")
    end

    network_partners.order('id DESC').distinct
  end

  def fetch_agents
    set_office_db_connection
    commission = AgentOffice::Commission::Base.find_by_id(session[:current_commission_id]) if session[:current_commission_id]
    if commission.present?
      # Office.where("id in (?)", [session[:current_office_id]]).map{|x| x.users.agents}.flatten.uniq
      commission.sales_team_members.select{|s| s.member_type == "User"}.map{|m| m.member}
    else
      []
    end
  end

  def fetch_customers
    search = session[:recipient_customer_search] = nil
    if current_user.executive?
      # customers = @current_brand.customers
      customers = @current_brand.users.customers
    else
      # customers = @current_brand.customers
      customers = @current_brand.users.customers
    end

    if params[:search]
      search = session[:recipient_customer_search] = params[:search]
    else
      if params[:role].present?
        search = session[:recipient_customer_search] = nil
      else
        search = session[:recipient_customer_search] if session[:recipient_customer_search].present?
      end
    end
    if search.present?
      session[:recipient_customer_search] = search
      customers = customers.where("first_name LIKE ? or last_name LIKE ? or CONCAT_WS(' ',first_name,last_name) LIKE ? or CONCAT_WS(' ',last_name,first_name) LIKE ?", "#{search}%","#{search}%", "#{search}%","#{search}%")
    end

    customers.order('id DESC').distinct
  end

  def common_nav_header_menus
    if current_user.director?
      @nav_header_menus = [
                            {:href => desktop_directors_path, :label => t("nav_header.desktop"), :arrowBack => true}
                          ]
    elsif current_user.executive?
      @nav_header_menus = [
                            {:href => desktop_executives_path, :label => t("nav_header.desktop"), :arrowBack => true}
                          ]
    else
      @nav_header_menus = [
                            {:href => desktop_agents_path, :label => t("nav_header.desktop"), :arrowBack => true}
                          ]
    end    
  end

  def common_nav_header_menus_for_other_actions
    if current_user.director?
      @nav_header_menus = [
                            {:href => desktop_directors_path, :label => t("nav_header.desktop"), :arrowBack => false},
                            {:href => center_messages_path, :label => t("nav_header.message_center_choose_group"), :arrowBack => true }
                          ]
    elsif current_user.executive?
      @nav_header_menus = [
                            {:href => desktop_executives_path, :label => t("nav_header.desktop"), :arrowBack => false},
                            {:href => center_messages_path, :label => t("nav_header.message_center_choose_group"), :arrowBack => true }
                          ]
    elsif current_user.customer?
      @nav_header_menus = [
                            {:href => desktop_executives_path, :label => t("nav_header.desktop"), :arrowBack => true}
                          ]
    else
      @nav_header_menus = [
                            {:href => desktop_agents_path, :label => t("nav_header.desktop"), :arrowBack => false},
                            {:href => center_messages_path, :label => t("nav_header.message_center_choose_group"), :arrowBack => true }
                          ]
    end
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_message
    @message = @current_brand.messages.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def message_params
    params.require(:message).permit(:subject, :body, :message_type)
  end
end
