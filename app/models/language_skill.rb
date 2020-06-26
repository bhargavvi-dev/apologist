class LanguageSkill < ApplicationRecord
	belongs_to :brand, inverse_of: :language_skills

	validates :brand, presence: true
end
