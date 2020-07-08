class ResourcesController < ApplicationController

  include ApplicationHelper

  def download
    if current_user
      # get resource
      
      resource = Resource.find resource_params[:id]

      # return error if no resource
      return render_error ActiveRecord::RecordNotFound.new unless (resource.present?)      

      return render_error :unauthorized, t('resources.download.no_authorizations') unless is_valid_authorization?(resource)
      
      file_path = resource.media.path
      media_file_name = resource.media_attachment_name.present? ? resource.media_attachment_name : resource.media_file_name
      if params[:unknown_extention] == "true"
        media_file_name = media_file_name + "." + MIME::Types[resource.media.content_type].first.extensions.first
      end
      media_file_name_arr = media_file_name.to_s.split('.')
      extension = media_file_name_arr.last if media_file_name_arr.length >= 2
      unless extension.present?
        media_file_name_arr = resource.media_file_name.to_s.split('.')
        extension = media_file_name_arr.last if media_file_name_arr.length >= 2
        extension = MIME::Types[resource.media.content_type].first.extensions.first unless extension.present?
        media_file_name = media_file_name + "." + extension
      end
      send_file(file_path,
                :filename => media_file_name,
                :type => resource.media.content_type, 
                :disposition => 'attachment')

    else
      # if not logged in
      return redirect_to root_path
    end
  end

  def save_signature
    begin
      class_name = params[:object_type].classify.constantize
      object = class_name.find(params[:id])

      resource_type = ResourceType.find_by(name: params[:resource_type])
      resource_spec = ResourceSpec.find_by(name: params[:resource_spec])

      encoded_image = params["dataURL"].to_s.split(",")[1]
      decoded_image = Base64.decode64(encoded_image)
      decoded_image = StringIO.new(decoded_image)
      @signature = object.resources.with_associate("#{params[:resource_type]}-#{params[:resource_spec]}-#{params[:associate_type]}-#{params[:associate_id]}")
      if @signature
        @signature.update(:media => decoded_image)
      else
        @signature = object.resources.build(media: decoded_image, resource_type: resource_type, resource_spec: resource_spec)
        if params[:associate_type].present? and params[:associate_id].present?
          @signature.associate_type = params[:associate_type]
          @signature.associate_id = params[:associate_id]
        end
        @signature.save
      end
    rescue
      @error = true
    end
    respond_to do |format|
      format.js {render :template => "/resources/save_signature.js.erb"}
    end
  end

  def get_signature
    class_name = params[:object_type].classify.constantize
    object = class_name.find(params[:id])

    @signature = object.resources.with_associate("#{params[:resource_type]}-#{params[:resource_spec]}-#{params[:associate_type]}-#{params[:associate_id]}")
    if @signature.present?
      @signature_dataUrl = Base64.encode64(open(@signature.media.path).read).gsub("\n", '')
    else
      @signature_dataUrl = ""
    end
  end

  def get_resource_holders
    resource_holders = []
    if params[:resource_holder_type].present?
      begin
        resource_holder_type = params[:resource_holder_type].classify.constantize
        if resource_holder_type.is_a?(Class)
          resource_holders = resource_holder_type.all.map{|h| {id: h.id, name: h.name}}
        end
      rescue
      end
    end
    respond_to do |format|
      format.json { render json: {"resource_holders": resource_holders} }
    end
  end

  def save_media
    begin
      object = nil
      if params[:type] == 'User'
        object = @current_brand.users.find(params[:id])
      elsif params[:type] == 'Office'
        object = @current_brand.offices.find(params[:id])
      elsif params[:type] == 'Message'
        object = @current_brand.messages.find(params[:id])
      elsif params[:type] == 'OfficeUser'
        object = OfficeUser.find(params[:id])
      elsif params[:type] == 'Customer'
        object = Customer.find(params[:id])
      elsif params[:type] == 'HousingCompany'
        object = HousingCompany.find(params[:id])
      end
      if object and params[:media].present?
        if params[:agent_office_resource] == "true"
          resource_type = ResourceType.find_by(name: params[:resource_type])
          resource_spec = ResourceSpec.find_by(name: params[:resource_spec])
        end
        if resource_type and resource_spec
          k = 0
          params[:media].each do |media|
            if media.present?
              coordinate = params[:coordinate].present? ? params[:coordinate][k] : ''
              object.resources.create!(resource_type: resource_type, resource_spec: resource_spec, media_attachment_name: coordinate, media: media, :associate_type => params[:associate_type], :creator_id => params[:creator_id])
              k = k + 1
            end
          end
        end
        success = true
      else
        success = false
      end
    rescue Exception => e
      success = false
    end
    respond_to do |format|
      format.json { render json: {"success": success, presentUploadFileEleId: params[:presentUploadFileEleId]} }
    end
  end

  def delete_media
    begin
      object = nil
      if params[:type] == 'User'
        object = @current_brand.users.find(params[:id])
      elsif params[:type] == 'Office'
        object = @current_brand.offices.find(params[:id])
      elsif params[:type] == 'Message'
        object = @current_brand.messages.find(params[:id])
      elsif params[:type] == 'Customer'
        object = Customer.find(params[:id])
      end
      if object.present?
        media = object.resources.find(params[:media_id])
        if media.present?
          media.destroy
          success = true
        else
          success = false
        end
      else
        success = false
      end
    rescue Exception => e
      success = false
    end
    respond_to do |format|
      format.json { render json: {"success": success} }
    end
  end
 
  private

  def is_valid_authorization?(resource)
    true
  end

  def render_error code,message
    render template: 'errors/error_500.html.haml', status: code, content_type: 'text/html'
  end

  def user_account_authorized? resource
    resource.user == current_user
  end

  def resource_params
    params.permit(:id)
  end

  def create_object_pdf template, pdf_name
    file_string = render_to_string(:layout => "pdf.html", :template => "#{template}")
    pdf_file = WickedPdf.new.pdf_from_string(
                              file_string,
                              :pdf => (pdf_name),
                              :margin => { :top => 10, :bottom => 3, :left => 10, :right => 0},
                              :viewport_size => '1280x1024'
    )
  end

end