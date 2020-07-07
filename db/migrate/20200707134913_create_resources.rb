class CreateResources < ActiveRecord::Migration[6.0]
  def change
    create_table :resources do |t|
      t.integer :resource_holder_id, null: false
      t.string :resource_holder_type, null: false
      t.integer :resource_spec_id, null: false
      t.integer :resource_type_id, null: false
      t.string :media_attachment_name, null: true
      t.boolean :limited, default: false, null: false
      t.boolean :confirmed, default: true, null: false
      t.boolean :is_active, null: false,  default: true
      t.boolean :is_deleted, null: false, default: false
      t.string :media_file_name
      t.string :media_content_type
      t.integer :media_file_size
      t.datetime :media_updated_at
      t.string :associate_type
      t.integer :associate_id
      t.string :ancestry
      t.integer :creator_id
      t.integer :updater_id
      t.datetime :signing_date

      t.timestamps null: false
    end
  end
end
