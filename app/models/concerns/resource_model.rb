module ResourceModel
  extend ActiveSupport::Concern

  included do

    self.table_name = 'resources'

    belongs_to :resource_holder, polymorphic: true, inverse_of: :resources

    belongs_to :associate, polymorphic: true
  
    has_attached_file :media,
                    styles:  lambda { |a| a.instance.styles_convert_options },
                    convert_options: { all: '-auto-orient' },
                    path: :media_path,
                    url: :media_url,
                    default_url: :media_default_url,
                    processors: [:dispatcher]

    validates_attachment_content_type :media, 
                                      :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif", "application/pdf", "application/vnd.ms-excel",
                                                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/msword", 
                                                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain", 'application/vnd.ms-powerpoint', /\Avideo\/.*\Z/, /\Aimage\/.*\Z/]

    #validates_attachment_size :media, :less_than => lambda { |a| eval(a.current_media_size_limit) }

    validates :resource_holder_type, :presence => true
    validates :resource_spec_id, :presence => true
    validates :resource_type_id, :presence => true

    def current_media_size_limit
      case resource_type.name
      when "IMAGE"
        Settings.paperclip.media_size_limit.image
      when "DOCUMENT"
        Settings.paperclip.media_size_limit.document
      else
        Settings.paperclip.media_size_limit.default
      end
    end

    def styles_convert_options
      options = {}
      if media_content_type =~ %r(image)
        r_spec = self.resource_spec
        options[:small] = {:geometry => get_geometry("small")} if small_size_specs.include? r_spec.try(:name)# and dimensions.present?
        options[:medium] = {:geometry => get_geometry("medium")} if medium_size_specs.include? r_spec.try(:name)# and dimensions.present?
      end
      options
    end

    def get_geometry option
      case option
      when "small"
        geometry = "100x100"
      when "medium"
        geometry = "560x420"
      else
        geometry = "100x100"
      end
      geometry
    end

    def small_size_specs
      ["USER_PHOTO", "LOGO"] #'PARTNER_PHOTOGRAPH_HIGH_RES', 'PARTNER_PHOTOGRAPH_LOW_RES', 'PARTNER_AERIAL_PICTURE_HIGH_RES', 'PARTNER_AERIAL_PICTURE_LOW_RES', 'PARTNER_VIRTUAL_PICTURE_LOW_RES', 'PARTNER_2D_GF_HIGH_RES', 'PARTNER_2D_GF_LOW_RES', 'PARTNER_3D_GF_HIGH_RES', 'PARTNER_3D_GF_LOW_RES', 'PARTNER_VIRTUAL_GF_LOW_RES', 'SERVICE_SUBWAY_STEP'
    end

    def medium_size_specs
      ["USER_PHOTO", "LOGO", "PROPERTY_DEMONSTRATION", "OUTSTANDING_LOGO", 'PARTNER_PHOTOGRAPH_HIGH_RES', 'PARTNER_PHOTOGRAPH_LOW_RES', 'PARTNER_AERIAL_PICTURE_HIGH_RES', 'PARTNER_AERIAL_PICTURE_LOW_RES', 'PARTNER_VIRTUAL_PICTURE_LOW_RES', 'PARTNER_2D_GF_HIGH_RES', 'PARTNER_2D_GF_LOW_RES', 'PARTNER_3D_GF_HIGH_RES', 'PARTNER_3D_GF_LOW_RES', 'PARTNER_VIRTUAL_GF_LOW_RES', 'SERVICE_SUBWAY_LOGO', 'BRAND_BROCHURE', 'COLLECTION_LOGO', 'PROPERTY_DEMONSTRATION', 'CUSTOMER_COMMUNICATION', 'OFFICE_TEXT_LOGO', 'BRAND_PICTURES', 'LIFESTYLE_PICTURES']
    end

    def low_resolution_specs
      ['PARTNER_PHOTOGRAPH_LOW_RES', 'PARTNER_AERIAL_PICTURE_LOW_RES', 'PARTNER_VIRTUAL_PICTURE_LOW_RES', 'PARTNER_2D_GF_LOW_RES', 'PARTNER_3D_GF_LOW_RES', 'PARTNER_VIRTUAL_GF_LOW_RES']
    end

    private

    def media_path
      resource_spec.limited ? Settings.content.resource.media_path_limited : Settings.content.resource.media_path
    end

    def media_url
      resource_spec.limited ? Settings.content.resource.media_url_limited : Settings.content.resource.media_url
    end

    def media_default_url
      Settings.content.resource.media_default_url
    end
  end

end