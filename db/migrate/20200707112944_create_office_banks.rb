class CreateOfficeBanks < ActiveRecord::Migration[6.0]
  def change
    create_table :office_banks do |t|
      t.integer :office_id, null: false
      t.string :bank_name, limit: 255
      t.string :account_number, limit: 255
      t.integer :account_type, default: 0, null: false
      t.boolean :is_active, null: false,  default: true
      t.boolean :is_deleted, null: false, default: false

      t.timestamps  null: false
    end
    add_index :office_banks, [:office_id, :bank_name, :account_number, :account_type], unique: true, name: "idx_office_banks_office_account_details"
  end
end
