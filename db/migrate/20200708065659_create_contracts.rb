class CreateContracts < ActiveRecord::Migration[6.0]
  def change
    create_table :contracts do |t|
      t.integer :contract_group_id, null: false
      t.string :contract_name, null: false
      t.date :validity_start
      t.date :validity_end
      t.date :alarm_date
      t.boolean :is_active, null: false,  default: true
      t.boolean :is_deleted, null: false, default: false
      t.integer :creator_id
      t.integer :updater_id

      t.timestamps null: false
    end
  end
end
