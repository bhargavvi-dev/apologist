class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.integer :brand_id, null: false
      t.string :subject, limit: 255
      t.text :body, limit: 65535
      t.integer :message_type, :default => 0, null: false
      t.integer :sender_id, null: false
      t.text :receiver_ids, limit: 65535
      t.integer :object_id
      t.string :object_type, limit: 255
      t.integer :office_id
      t.datetime :sent_at

      t.timestamps null: false
    end

    add_index :messages, :sender_id
    add_index :messages, :brand_id
  end
end
