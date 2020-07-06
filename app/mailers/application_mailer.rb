class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'

  def send_feedback_email(options={})
    @options = options
    send_common_message_body true
  end

  private

  def send_common_message_body(temp_folder=false)
    if temp_folder
      set_temp_folder
    end
    message_body
    #delete folder after message sent
    if temp_folder
      remove_temp_folder
    end
  end

  def set_temp_folder
    temp_folder = @options[:temp_folder]
    if temp_folder.present?
      Dir["#{temp_folder}/*"].each do |sourcefile|
        next if File.directory? sourcefile
        original_filename = sourcefile.split("/").last
        attachments[original_filename] = File.read(sourcefile)
      end
    end
  end

  def message_body
    @message = @options[:message]
    I18n.with_locale(I18n.locale) do
      mail(:to => @options[:recipient_emails], :subject => @options[:subject])
    end
  end

  def remove_temp_folder
    sleep(1)
    temp_folder = @options[:temp_folder]
    if temp_folder.present?
      FileUtils.rm_rf(temp_folder) if File.exists?(temp_folder)
    end
  end

  def create_attachment_pdf template, pdf_name
    file_name = render_to_string(:layout => "pdf.html", :template => template)
    attachments[pdf_name.to_s + ".pdf"] = WickedPdf.new.pdf_from_string(
                              file_name,
                              :pdf => pdf_name,
                              :margin => { :top => 10, :bottom => 3, :left => 10, :right => 0},
                              :viewport_size => '1280x1024'
    )
  end

end
