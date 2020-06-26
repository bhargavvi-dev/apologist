module ApplicationHelper
	def convert_params_to_h(p)
    p = {} unless p.present?
    p = p.to_unsafe_h unless p.is_a?(Hash)
    p.with_indifferent_access
  end

  def domain_url
    request_protocol = Rails.env.development? ? "//" : request.protocol
    if @current_brand.custom_domain.present?
      @domain_url = "#{request_protocol}#{@current_brand.custom_domain}/default/pdf/"
    else
      @domain_url = "#{request_protocol}#{@current_brand.slug}.#{Settings.system.domain}/default/pdf/"
    end
    @domain_url
  end

  def get_extention(resource_type, resource_spec)
    if resource_type == "DOCUMENT"
      "pdf"
    elsif resource_type == "IMAGE"
      "png"
    end
  end

  def ios?
    request.user_agent =~ /iPhone|iPad|iPhone/i
  end

  def android?
    request.user_agent =~ /Android/i
  end

  def pc?
    !ios? && !android?
  end

  def safari?
    begin
      user_agent = UserAgent.parse(request.user_agent)
      puts "Browser: -----------------> #{user_agent.browser}"
      user_agent.browser == "Safari"
    rescue Exception => e
      false
    end
  end

  def set_proper_name(name, max_length = nil)
    max_length = max_length || 15
    if name.to_s.length < max_length
      name
    else
      name[0..(max_length - 5)] + "..."
    end
  end

  def set_proper_email(email, max_length = 25)
    max_length = max_length || 15
    if email.to_s.length < max_length
      email
    else
      email[0..(max_length - 5)] + "..."
    end
  end

  def display_job_role job_role
    if job_role == "CEO" or job_role == "CFO"
      job_role
    else
      job_role.to_s.humanize.split.map(&:capitalize)*' '
    end
  end

  def sanitize_filename(filename)
    fn = filename.split /(?<=.)\.(?=[^.])(?!.*\.[^.])/m
    fn[0] = fn[0].parameterize
    return fn.join '.'
  end  

  def btn_height_class
    params[:open_card] == "true" ? "h50" : "h25"
  end

  def absolute_url(path, brand)
    if brand.custom_domain.present?
      url = "http://#{brand.custom_domain}#{path}"
    else
      url = "http://#{brand.slug}.#{Settings.system.domain}#{path}"
    end
    return url
  end

  def validate_remote_url?(file)
    begin
      uri = URI.parse(URI.escape(URI.unescape(file)))
      response = nil
       Net::HTTP.start(uri.host, uri.port) {|http|
         response = http.head(uri.path)
       }
       response.code == "200"
    rescue
      false
    end
  end


end
