class OfficeOwner < ApplicationRecord

  belongs_to :office, inverse_of: :office_owners

  enum owner_type: ['OWNER', 'MEMBER', 'CEO']
  enum owner_role: ['NA', 'PRINCIPAL', 'BROKER_OWNER', 'PARTNER', 'SILENT_PARTNER']

  validates :office, :presence => true
  validates :first_name, :length => {:maximum => 50, :allow_blank => true}, :format => {:with => CustomValidation.name_regex, :message => CustomValidation.bad_name_message}
  validates :last_name, :length => {:maximum => 50, :allow_blank => true}, :format => {:with => CustomValidation.name_regex, :message => CustomValidation.bad_name_message, :allow_blank => true}
  validates :ssn, :length => {:maximum => 50, :allow_blank => true}

end
