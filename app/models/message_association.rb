class MessageAssociation < ApplicationRecord

  enum message_type: ['PUSH', 'EMAIL', 'PUSH_EMAIL']

  belongs_to :message, inverse_of: :message_associations
  belongs_to :recipient, polymorphic: true

  validates :message, :presence => true
  validates :recipient, :presence => true
end
