class CreateOffices < ActiveRecord::Migration[6.0]
  def change
    create_table :offices do |t|
      t.integer :brand_id, null: false
      t.string :office_name, limit: 50, null: false
      t.string :company_name, limit: 50, null: false
      t.string :company_id, limit: 50, null: false
      t.text :address, limit: 500
      t.string :post_number
      t.string :city, limit: 50
      t.string :phone_number, limit: 50
      t.string :email, limit: 50
      t.string :website, limit: 50
      t.string :brand_provided_id, limit: 50
      t.text :visiting_address, limit: 500
      t.string :visiting_post_number
      t.string :visiting_city, limit: 50
      t.text :billing_address, limit: 500
      t.string :billing_post_number
      t.string :billing_city, limit: 50
      t.string :profile_brand_types, limit: 255
      t.text :office_hours, limit: 65535
      t.string :logo_text, limit: 100
      t.text :introduction, limit: 65535
      t.string :linkedin_url, limit: 255
      t.string :facebook_url, limit: 255
      t.string :twitter_url, limit: 255
      t.string :youtube_url, limit: 255
      t.string :whatsapp_number, limit: 50
      t.string :skype_id, limit: 50
      t.text :working_areas, limit: 65535
      t.boolean :immediate_customer_reward_payment, default: true, null: false
      t.integer :customer_reward_payment_days
      t.date :agreement_signing_date
      t.date :agreement_start_date
      t.date :agreement_end_date
      t.integer :joining_fee
      t.integer :fixed_fee
      t.integer :royalty
      t.string :average_profit
      t.boolean :registered, null: false, default: false
      t.boolean :is_active, null: false,  default: true
      t.boolean :is_deleted, null: false, default: false
      t.text :gps_coordinates
      t.integer :fixed_fee_promotion
      t.string :sales_area
      t.text :address_specification
      
      t.timestamps null: false
    end
    add_index :offices, [:brand_id, :office_name], unique: true
  end
end
