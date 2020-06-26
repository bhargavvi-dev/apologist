class BusinessDegree < ApplicationRecord
	belongs_to :brand, inverse_of: :business_degrees

	validates :brand, presence: true
end
