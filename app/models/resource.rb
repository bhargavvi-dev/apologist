class Resource < ApplicationRecord

  include ResourceModel

  belongs_to :resource_type
  belongs_to :resource_spec

end
