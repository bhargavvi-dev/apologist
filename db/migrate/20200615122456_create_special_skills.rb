class CreateSpecialSkills < ActiveRecord::Migration[6.0]
  def change
    create_table :special_skills do |t|
      t.integer :brand_id, null: false
      t.boolean :is_active, null: false,  default: true
      t.boolean :is_deleted, null: false, default: false

      t.timestamps null: false
    end
  end
end
