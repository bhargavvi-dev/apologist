class CreateMessageAssociations < ActiveRecord::Migration[6.0]
  def change
    create_table :message_associations do |t|
      t.integer :message_id, null: false
      t.integer :recipient_id, null: false
      t.boolean :read, default: false, null: false
      t.string  :recipient_type, :default => "User"
      t.integer :message_type, :default => 0, null: false

      t.timestamps null: false
    end

    add_index :message_associations, :message_id
    add_index :message_associations, :recipient_id
  end
end
