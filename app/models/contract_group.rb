class ContractGroup < ApplicationRecord

  default_scope { where(is_deleted: false) }

  belongs_to :office, inverse_of: :contract_groups

  belongs_to :creator, class_name: "User", foreign_key: "creator_id"
  belongs_to :updater, class_name: "User", foreign_key: "updater_id"  

  has_many :contracts, -> { includes(:resource_type, :resource_spec).where(:'resource_types.name' => 'CONTRACT', :'resource_specs.name' => 'ATTACHMENT') }, :class_name => 'Resource', :as => :resource_holder

  validates :office, :presence => true
  validates :name, :presence => true, :length => {:maximum => 255}

  validates_uniqueness_of :name, :scope => [:office_id]
end
