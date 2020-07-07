class OfficeBank < ApplicationRecord
  belongs_to :office, inverse_of: :office_banks
  
  enum account_type: ['REWARD', 'CUSTOMER_FUND']

  validates :office, :presence => true
  validates :bank_name, :length => {:maximum => 255, :allow_blank => true}, :format => {:with => CustomValidation.name_regex, :message => CustomValidation.bad_name_message}
  validates :account_number, :length => {:maximum => 255, :allow_blank => true}, :format => {:with => CustomValidation.name_regex, :message => CustomValidation.bad_name_message}

  validates_uniqueness_of :account_number, :scope => [:office_id, :bank_name, :account_type], :message => 'already exists'
end
