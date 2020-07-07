class Brand < ApplicationRecord

  has_one_attached :logo
	has_many :users, inverse_of: :brand do
    def with_role(role)
      where({ :'users.role' => User.roles[role] }) if role.present?
    end

    def with_roles(roles)
      where({ :'users.role' => roles.map{|role| User.roles[role]} }) if roles.present?
    end
  end

  has_many :messages, inverse_of: :brand

  has_many :offices, inverse_of: :brand

  has_many :message_associations, :through => :messages
  has_many :feedbacks, inverse_of: :brand
  has_many :settings, :class_name => "Setting", :foreign_key => "brand_id" do
    def [](setting_key)
      conditions = {:setting_key =>  setting_key}
      where(conditions).first
    end

    def with_names(names = [])
      conditions = {:setting_key =>  names}
      where(conditions)
    end
  end
  accepts_nested_attributes_for :settings, allow_destroy: true

  has_many :business_degrees, inverse_of: :brand
  has_many :special_skills, inverse_of: :brand
  has_many :language_skills, inverse_of: :brand

  validates :name, :presence => true, uniqueness: true, :length => {:maximum => 100}
  validates :prefix, :presence => true, uniqueness: true, :length => {:maximum => 4}, :format => {:with => CustomValidation.name_regex, :message => CustomValidation.bad_name_message}
  validates :description, :length => {:maximum => 2000, :allow_blank => true}
  validates :phone_number, :length => {:maximum => 50, :allow_blank => true}
  validates :email, :length => {:maximum => 50, :allow_blank => true}

  def setting(setting_key = nil)
    if setting_key.present?
      @settings = @settings || self.settings
      @settings.where(:setting_key => setting_key).first || @settings.new(:setting_key => setting_key)
    else
      self
    end
  end

  @@settings = nil

  Setting.setting_keys.each do |setting_key|
    define_method :"#{setting_key.downcase}" do
      @@settings = @@settings || self.settings
      val = @@settings.where(:setting_key => setting_key).first.try(:setting_value)
      val
    end
  end


end
