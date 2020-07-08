class Office < ApplicationRecord

  include HasResources

  belongs_to :brand, inverse_of: :offices

  has_many :contract_groups, :class_name => "ContractGroup", :foreign_key => "office_id", inverse_of: :office

  has_many :office_owners, inverse_of: :office, dependent: :destroy
  accepts_nested_attributes_for :office_owners, allow_destroy: true

  has_many :share_owners, -> { where(:owner_type => OfficeOwner.owner_types["OWNER"]) }, :class_name => "OfficeOwner", inverse_of: :office
  accepts_nested_attributes_for :share_owners, allow_destroy: true
  validates_associated :share_owners

  has_many :members, -> { where(:owner_type => OfficeOwner.owner_types['MEMBER']) }, :class_name => "OfficeOwner", inverse_of: :office
  accepts_nested_attributes_for :members, allow_destroy: true
  validates_associated :members

  has_one :ceo, -> { where(:owner_type => OfficeOwner.owner_types['CEO']) }, :class_name => "OfficeOwner", inverse_of: :office
  accepts_nested_attributes_for :ceo, allow_destroy: true
  validates_associated :ceo

  has_many :office_banks, inverse_of: :office, dependent: :destroy
  accepts_nested_attributes_for :office_banks, allow_destroy: true

  has_many :reward_bank_accounts, -> { where(:account_type => OfficeBank.account_types['REWARD']) }, :class_name => "OfficeBank", inverse_of: :office
  accepts_nested_attributes_for :reward_bank_accounts, allow_destroy: true
  validates_associated :reward_bank_accounts

  has_many :customer_fund_bank_accounts, -> { where(:account_type => OfficeBank.account_types['CUSTOMER_FUND']) }, :class_name => "OfficeBank", inverse_of: :office
  accepts_nested_attributes_for :customer_fund_bank_accounts, allow_destroy: true

  validates_associated :customer_fund_bank_accounts

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
  validates :office_hours, :length => {:maximum => 65535, :allow_blank => true}
  validates :logo_text, :length => {:maximum => 100, :allow_blank => true}
  validates :presentation_text, :length => {:maximum => 65535, :allow_blank => true}
  validates :linkedin_url, :length => {:maximum => 255, :allow_blank => true}
  validates :facebook_url, :length => {:maximum => 255, :allow_blank => true}
  validates :twitter_url, :length => {:maximum => 255, :allow_blank => true}
  validates :whatsapp_number, :length => {:maximum => 50, :allow_blank => true}
  validates :skype_id, :length => {:maximum => 50, :allow_blank => true}

  validates_uniqueness_of :office_name, :scope => [:brand_id]

  def name
    self.office_name.to_s
  end

  def self.profile_brand_types
    ["BASIC",'COLLECTION','COMMERCIAL']
  end

  def search_office_address
    [self.address, self.post_number, self.city].select{|s| s.present?}.join(',')
  end

  def office_search_post_city_address
    [self.post_number, self.city].select{|s| s.present?}.join(',')
  end

  def office_search_default_address
    "00100, Helsinki"
  end

end
