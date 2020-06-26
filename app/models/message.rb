class Message < ApplicationRecord
  enum message_type: ['PUSH', 'EMAIL', 'LEAD', 'MARKETING_MATERIAL_APPROVAL', 'PUSH_EMAIL', 'HINT_APPROVAL', 'PUSH_REPORT_REMINDER', 'PUSH_INVOICE', 'REQUEST_APPROVAL']

  enum hint_status: ['PENDING_APPROVAL', 'NO_REPLY', 'REFUSED', 'ACCEPTED', 'REJECTED']

  belongs_to :brand, inverse_of: :messages
  belongs_to :sender, class_name: "User", foreign_key: "sender_id", inverse_of: :sent_messages

  belongs_to :object, polymorphic: true

  belongs_to :customer_reassigner, foreign_key: "object_id"

  belongs_to :office, class_name: "Office", foreign_key: "office_id"

  has_many :message_associations, inverse_of: :message, dependent: :destroy
  accepts_nested_attributes_for :message_associations, allow_destroy: true
  validates_associated :message_associations
  has_many :recipients, through: :message_associations, :source => :recipient, :source_type => "User"

  validates :brand, :presence => true
  #validates :sender, :presence => true
  validates :subject, :length => {:maximum => 255, :allow_blank => true}
  validates :body, :length => {:maximum => 65535, :allow_blank => true}
  validates :receiver_ids, :length => {:maximum => 65535, :allow_blank => true}

  scope :unread, -> { where('message_associations.read = ?', false) }

  def sender_name
    user_sender = self.sender
    if user_sender.present?
      user_sender.name
    else
      self.brand.name
    end
  end
end
