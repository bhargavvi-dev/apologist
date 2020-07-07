module ResourceTypeModel
  extend ActiveSupport::Concern

  included do

    self.table_name = 'resource_types'

    validates :name, :presence => true, uniqueness: true, :length => {:maximum => 200}

  end

end