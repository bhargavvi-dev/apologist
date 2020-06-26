class MessageAssociation < ApplicationRecord
  enum message_type: ['PUSH', 'EMAIL', 'LEAD', 'MARKETING_MATERIAL_APPROVAL', 'PUSH_EMAIL', 'HINT_APPROVAL', 'PUSH_REPORT_REMINDER', 'PUSH_INVOICE', 'REQUEST_APPROVAL']

  belongs_to :message, inverse_of: :message_associations
  belongs_to :recipient, polymorphic: true

  validates :message, :presence => true
  validates :recipient, :presence => true
end
