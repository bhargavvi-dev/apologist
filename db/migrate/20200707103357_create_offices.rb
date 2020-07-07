class CreateOffices < ActiveRecord::Migration[6.0]
  def change
    create_table :offices do |t|
      t.integer :brand_id, null: false
      t.string :office_name, limit: 50, null: false
      t.string :company_name, limit: 50, null: false
      t.text :address, limit: 500
      t.string :post_number
      t.string :city, limit: 50
      t.string :phone_number, limit: 50
      t.string :email, limit: 50
      t.string :website, limit: 50
      t.string :company_id, limit: 50, null: false
      t.string :cost_place_number, limit: 50
      t.string :brand_provided_id, limit: 50
      t.boolean :has_visiting_address, default: false
      t.text :visiting_address, limit: 500
      t.string :visiting_post_number
      t.string :visiting_city, limit: 50
      t.boolean :has_invoice_address, default: false
      t.string :invoice_address, limit: 500
      t.boolean :has_billing_address, default: false
      t.text :billing_address, limit: 500
      t.string :billing_post_number
      t.string :billing_city, limit: 50
      t.text :office_hours, limit: 65535
      t.string :logo_text, limit: 100
      t.text :presentation_text, limit: 65535
      t.string :linkedin_url, limit: 255
      t.string :facebook_url, limit: 255
      t.string :twitter_url, limit: 255
      t.string :youtube_url, limit: 255
      t.string :whatsapp_number, limit: 50
      t.string :skype_id, limit: 50
      t.text :gps_coordinates
      t.boolean :liability, default: false
      t.boolean :is_own_customer_billing, default: false
      t.boolean :is_own_fee_cal_process, default: false
      t.boolean :registered, null: false, default: false
      t.boolean :is_active, null: false,  default: true
      t.boolean :is_deleted, null: false, default: false
      t.timestamps null: false
    end
  end
end
