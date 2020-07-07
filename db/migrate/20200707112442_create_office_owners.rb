class CreateOfficeOwners < ActiveRecord::Migration[6.0]
  def change
    create_table :office_owners do |t|
      t.integer :office_id, null: false
      t.integer :owner_type, default: 0, null: false
      t.integer :owner_role, default: 0, null: false
      t.integer :share
      t.string :first_name, limit: 50
      t.string :last_name, limit: 50
      t.date :birthdate
      t.string :ssn, limit: 50
      t.boolean :is_active, null: false,  default: true
      t.boolean :is_deleted, null: false, default: false

      t.timestamps null: false
    end
  end
end
