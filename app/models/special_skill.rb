class SpecialSkill < ApplicationRecord
	belongs_to :brand, inverse_of: :special_skills

	validates :brand, presence: true
end
