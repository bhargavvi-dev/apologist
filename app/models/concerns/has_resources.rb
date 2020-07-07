module HasResources
  extend ActiveSupport::Concern

  included do
    has_many :resources, :as => :resource_holder, :dependent => :destroy do
    def [](type_spec)
      type, spec = type_spec.to_s.split '::'
      conditions = {:'resource_types.name' =>  type}
      conditions[:'resource_specs.name'] = spec if spec.present?
      includes(:resource_type, :resource_spec).where(conditions).last
    end

    def with_type_specs(type=nil, specs)
      conditions = {}
      conditions[:'resource_types.name'] = type if type.present?
      conditions[:'resource_specs.name'] = specs
      includes(:resource_type, :resource_spec).where(conditions)
    end

    def with_associate(type_spec)
      type, spec, associate_type, associate_id = type_spec.to_s.split '-'
      conditions = { :'resource_types.name' =>  type }
      conditions[:'resource_specs.name'] = spec if spec.present?
      if associate_type.present? and associate_id.present?
        conditions[:'resources.associate_type'] = associate_type
        conditions[:'resources.associate_id'] = associate_id
      end
      includes(:resource_type, :resource_spec).where(conditions).first
    end

    def with_type(type_spec)
      type, spec = type_spec.to_s.split '::'
      conditions = { :'resource_types.name' =>  type }
      conditions[:'resource_specs.name'] = spec if spec.present?
      includes(:resource_type, :resource_spec).where(conditions)
    end
  end
  accepts_nested_attributes_for :resources, :allow_destroy => true
  end
end
