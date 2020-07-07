module ResourceSpecModel
  extend ActiveSupport::Concern

  included do

    self.table_name = 'resource_specs'

    validates :name, :presence => true, uniqueness: true, :length => {:maximum => 100}

  end

end