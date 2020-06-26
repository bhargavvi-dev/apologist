class EmailController < ApplicationController
	before_action :authenticate_user!

	def send_feedback_email
    begin
      @error = true
      if params[:subject].present? and params[:message].present? and current_user.present?
        if params[:feedback_phase] == "YES"
          temp_folder = ''
          message_body = params[:message] + params[:current_page_location].to_s
        else
          temp_folder = "/tmp/feedback/#{current_user.id}-#{@current_brand.id}"
          message_body = params[:message]
        end
        browser_name = params[:browser_name].present? ? params[:browser_name] : ''
        browser_version = params[:browser_version].present? ? params[:browser_version] : ''
        os_name = params[:os_name].present? ? params[:os_name] : ''
        os_version = params[:os_version].present? ? params[:os_version] : ''
        screen_size = params[:screen_size].present? ? params[:screen_size] : ''
        device_type = params[:device_type].present? ? params[:device_type] : ''
        browser_details_msg = t('message.user_browser_details', :browser_name => browser_name, browser_version: browser_version, os_name: os_name, os_version: os_version, screen_size: screen_size, device_type: device_type).html_safe
        message_body = message_body + browser_details_msg
        @feedback = @current_brand.feedbacks.new(:sender => current_user, :subject => params[:subject], :message => message_body)
        if @feedback.save
          options = {
                      :sender_email => @feedback.sender.email,
                      :message => @feedback.message,
                      :subject => @feedback.subject.humanize,
                      :temp_folder => temp_folder,
                      :recipient_emails => Settings.feedback.recipient_emails
                    }
          ApplicationMailer.send_feedback_email(options).deliver_later
          @error = false
        end
      end
    rescue Exception => e
      @error = true
    end
  end
end
