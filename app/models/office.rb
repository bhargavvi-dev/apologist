class Office < ApplicationRecord

  belongs_to :brand, inverse_of: :offices

  default_scope {where(is_deleted: false)}

  validates :brand, :presence => true
  validates :office_name, :presence => true, :length => {:maximum => 50}
  validates :company_name, :presence => true, :length => {:maximum => 50}
  validates :company_id, :presence => true, :length => {:maximum => 50, :allow_blank => true}
  validates :address, :length => {:maximum => 500, :allow_blank => true}
  validates :city, :length => {:maximum => 50, :allow_blank => true}
  validates :phone_number, :length => {:maximum => 50, :allow_blank => true}
  validates :email, :length => {:maximum => 50, :allow_blank => true}, :format=>{:with => CustomValidation.email_regex, :message => CustomValidation.bad_email_message, :allow_blank => true}
  validates :brand_provided_id, :length => {:maximum => 50, :allow_blank => true}
  validates :visiting_address, :length => {:maximum => 500, :allow_blank => true}
  validates :visiting_city, :length => {:maximum => 50, :allow_blank => true}
  validates :billing_address, :length => {:maximum => 500, :allow_blank => true}
  validates :billing_city, :length => {:maximum => 50, :allow_blank => true}
  validates :profile_brand_types, :length => {:maximum => 255, :allow_blank => true}
  validates :office_hours, :length => {:maximum => 65535, :allow_blank => true}
  validates :logo_text, :length => {:maximum => 100, :allow_blank => true}
  validates :introduction, :length => {:maximum => 65535, :allow_blank => true}
  validates :linkedin_url, :length => {:maximum => 255, :allow_blank => true}
  validates :facebook_url, :length => {:maximum => 255, :allow_blank => true}
  validates :twitter_url, :length => {:maximum => 255, :allow_blank => true}
  validates :whatsapp_number, :length => {:maximum => 50, :allow_blank => true}
  validates :skype_id, :length => {:maximum => 50, :allow_blank => true}
  validates :working_areas, :length => {:maximum => 65535, :allow_blank => true}

  validates_uniqueness_of :office_name, :scope => [:brand_id]

  def name
    self.office_name.to_s
  end

  def persons
    self.users.where(:role => [User.roles["EXTERNAL"], User.roles["EXECUTIVE"], User.roles["DIRECTOR"], User.roles["AGENT"], User.roles["OFFICE_MANAGER"]])
  end

  def responsible_persons
    self.users.where(:role => User.roles["EXTERNAL"])
  end

  def internal_responsible_persons
    self.users.where(:role => [User.roles["EXECUTIVE"], User.roles["DIRECTOR"], User.roles["AGENT"], User.roles["OFFICE_MANAGER"]])
  end

  def inspectors
    self.users.where(:role => User.roles["INSPECTOR"])
  end

  def self.profile_brand_types
    ["BASIC",'COLLECTION','COMMERCIAL']
  end

  def search_property_address
    [self.address, self.post_number, self.city].select{|s| s.present?}.join(',')
  end

  def property_search_post_city_address
    [self.post_number, self.city].select{|s| s.present?}.join(',')
  end

  def property_search_default_address
    "00100, Helsinki"
  end

end