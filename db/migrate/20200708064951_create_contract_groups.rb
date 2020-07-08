class CreateContractGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :contract_groups do |t|
      t.integer :office_id, null: false
      t.string :name, null: false
      t.boolean :is_active, null: false,  default: true
      t.boolean :is_deleted, null: false, default: false
      t.integer :creator_id
      t.integer :updater_id

      t.timestamps null: false
    end
    add_index :contract_groups, [:office_id, :name], unique: true
  end
end
