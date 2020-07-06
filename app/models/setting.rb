class Setting < ApplicationRecord
	belongs_to :brand, inverse_of: :settings
  belongs_to :creator, class_name: "User", foreign_key: "creator_id"
  belongs_to :updater, class_name: "User", foreign_key: "updater_id"

  enum lead_delivery_start_day: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]

  enum lead_delivery_end_day: ["END_MONDAY", "END_TUESDAY", "END_WEDNESDAY", "END_THURSDAY", "END_FRIDAY", "END_SATURDAY", "END_SUNDAY"]

  validates :brand, :presence => true

  def self.setting_keys
    keys = ["COMMON_TAX_BASE", "REDUCED_TAX_BASE_1", "REDUCED_TAX_BASE_2", "TAX_FREE_SERVICE", "PAYMENT_TERM", "CLAIMS_PERIOD", "LATE_PAYMENT_INTEREST", "FACEBOOK", "LINKEDIN", "TWITTER", "MESSAGE_EMAIL"]
    keys
  end
end
