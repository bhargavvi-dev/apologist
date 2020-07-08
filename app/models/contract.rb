class Contract < ApplicationRecord

  belongs_to :contract_group, inverse_of: :contracts

  belongs_to :creator, class_name: "User", foreign_key: "creator_id"
  belongs_to :updater, class_name: "User", foreign_key: "updater_id"

  validates :contract_group, :presence => true
  validates :contract_name, :presence => true, :length => {:maximum => 255}

  validates_uniqueness_of :contract_name, :scope => [:contract_group_id]

end
