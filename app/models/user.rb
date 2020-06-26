class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: ["EXECUTIVE", "DIRECTOR", "OFFICE_MANAGER", "AGENT", "EXTERNAL", "INTERNAL", "NETWORK_PARTNER", "CUSTOMER", "INSPECTOR"]
  enum language: ["FI","EN"]
  belongs_to :brand, inverse_of: :users
  belongs_to :creator, class_name: "User", foreign_key: "creator_id"
  belongs_to :updater, class_name: "User", foreign_key: "updater_id"

  has_many :message_associations, -> { where("message_associations.message_type != ? ", MessageAssociation.message_types["EMAIL"]) }, :as => :recipient, dependent: :destroy
  accepts_nested_attributes_for :message_associations, :allow_destroy => true
  has_many :received_messages, through: :message_associations, source: 'message'

  has_many :sent_messages, class_name: "Message", foreign_key: 'sender_id', inverse_of: :sender

  has_many :business_degrees, :through => :user_skills, :source => :skill, :source_type => 'BusinessDegree'

  has_many :user_business_degrees, -> { where(:skill_type => 'BusinessDegree') }, :class_name => "UserSkill", dependent: :destroy
  accepts_nested_attributes_for :user_business_degrees, allow_destroy: true

  has_many :special_skills, :through => :user_skills, :source => :skill, :source_type => 'SpecialSkill'

  has_many :user_special_skills, -> { where(:skill_type => 'SpecialSkill') }, :class_name => "UserSkill", dependent: :destroy
  accepts_nested_attributes_for :user_special_skills, allow_destroy: true

  has_many :language_skills, :through => :user_skills, :source => :skill, :source_type => 'LanguageSkill'

  has_many :user_language_skills, -> { where(:skill_type => 'LanguageSkill') }, :class_name => "UserSkill", dependent: :destroy
  accepts_nested_attributes_for :user_language_skills, allow_destroy: true

  validates :brand, :presence => true
  validates :role, :presence => true
  validates :first_name, :presence => true, :length => {:maximum => 50}
  validates :last_name, :presence => true, :length => {:maximum => 50}
  validates :ssn, :length => {:maximum => 50, :allow_blank => true}
  validates :address, :length => {:maximum => 500, :allow_blank => true}
  validates :city, :length => {:maximum => 50, :allow_blank => true}
  validates :phone_number, :length => {:maximum => 50, :allow_blank => true}
  validates :personal_email, :length => {:maximum => 50, :allow_blank => true}
  validates :gender, :length => {:maximum => 1, :allow_blank => true}
  validates :job_role, :length => {:maximum => 65535, :allow_blank => true}
  validates :other_business_degrees, :length => {:maximum => 65535, :allow_blank => true}
  validates :introduction, :length => {:maximum => 65535, :allow_blank => true}
  validates :working_areas, :length => {:maximum => 65535, :allow_blank => true}
  validates :linkedin_url, :length => {:maximum => 255, :allow_blank => true}
  validates :facebook_url, :length => {:maximum => 255, :allow_blank => true}
  validates :twitter_url, :length => {:maximum => 255, :allow_blank => true}
  validates :youtube_url, :length => {:maximum => 255, :allow_blank => true}
  validates :whatsapp_number, :length => {:maximum => 50, :allow_blank => true}
  validates :skype_id, :length => {:maximum => 50, :allow_blank => true}

  scope :executives, -> { where('users.role = ?', User.roles['EXECUTIVE']) }
  scope :agents, -> { where('users.role = ?', User.roles['AGENT']) }
  scope :directors, -> { where('users.role = ?', User.roles['DIRECTOR']) }
  scope :office_managers, -> { where('users.role = ?', User.roles['OFFICE_MANAGER']) }
  scope :customers, -> { where('users.role = ?', User.roles['CUSTOMER']) }
  scope :inspectors, -> { where('users.role = ?', User.roles['INSPECTOR']) }

  default_scope {where(is_deleted: false)}

  validates_presence_of   :email, :length => {:maximum => 15, :allow_blank => true}, if: :email_required?
  validates_uniqueness_of :email, :scope => :brand_id, :if => :email_changed?
  validates_format_of     :email, :with => Devise.email_regexp, :allow_blank => true, :if => :email_changed?
  
  validates_presence_of     :password, if: :password_required?
  validates_confirmation_of :password, if: :password_required?
  validates_presence_of     :password_confirmation, if: :password_required?
  validates_length_of       :password, within: Devise.password_length, allow_blank: true

  has_one_attached :avatar

  def executive?
    role == 'EXECUTIVE'
  end

  def director?
    role == 'DIRECTOR'
  end

  def office_manager?
    role == 'OFFICE_MANAGER'
  end

  def agent?
    role == 'AGENT'
  end

  def external?
    role == 'EXTERNAL'
  end

  def internal?
    role == 'INTERNAL'
  end  

  def customer?
    role == 'CUSTOMER'
  end  

  def inspector?
    role == 'INSPECTOR'
  end 

  def full_address
    [address, post_number, city].select{|a| a.present?}.join(' ')
  end

  def name
    self.first_name.to_s + " " + self.last_name.to_s
  end

  def can_update_user? user
    if self.executive?
      true
    elsif self.director? or self.office_manager?
      user.executive? ? false : true
    else
      false
    end
  end

  def email_required?
    true
  end

  def password_required?
    !persisted? || !password.nil? || !password_confirmation.nil?
  end

end
