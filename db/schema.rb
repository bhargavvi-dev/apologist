# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_06_112602) do

  create_table "active_storage_attachments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "brands", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "name", limit: 100, null: false
    t.string "slug", limit: 100
    t.string "custom_domain", limit: 100
    t.string "custom_domain_type", limit: 100
    t.string "redirect_domain", limit: 100
    t.string "prefix", limit: 10, null: false
    t.text "description"
    t.string "phone_number", limit: 50
    t.string "email", limit: 50
    t.string "site_description"
    t.string "site_keywords"
    t.string "site_title"
    t.boolean "is_active", default: true, null: false
    t.boolean "is_deleted", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_brands_on_name", unique: true
    t.index ["prefix"], name: "index_brands_on_prefix", unique: true
  end

  create_table "business_degrees", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.integer "brand_id", null: false
    t.boolean "is_active", default: true, null: false
    t.boolean "is_deleted", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "feedbacks", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.integer "brand_id", null: false
    t.integer "sender_id", null: false
    t.integer "subject", default: 0, null: false
    t.text "message"
    t.boolean "is_active", default: true, null: false
    t.boolean "is_deleted", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "language_skills", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.integer "brand_id", null: false
    t.boolean "is_active", default: true, null: false
    t.boolean "is_deleted", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "message_associations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.integer "message_id", null: false
    t.integer "recipient_id", null: false
    t.boolean "read", default: false, null: false
    t.string "recipient_type", default: "User"
    t.integer "message_type", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["message_id"], name: "index_message_associations_on_message_id"
    t.index ["recipient_id"], name: "index_message_associations_on_recipient_id"
  end

  create_table "messages", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.integer "brand_id", null: false
    t.string "subject"
    t.text "body"
    t.integer "message_type", default: 0, null: false
    t.integer "sender_id", null: false
    t.text "receiver_ids"
    t.integer "object_id"
    t.string "object_type"
    t.integer "office_id"
    t.datetime "sent_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["brand_id"], name: "index_messages_on_brand_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
  end

  create_table "offices", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.integer "brand_id", null: false
    t.string "office_name", limit: 50, null: false
    t.string "company_name", limit: 50, null: false
    t.string "company_id", limit: 50, null: false
    t.text "address"
    t.string "post_number"
    t.string "city", limit: 50
    t.string "phone_number", limit: 50
    t.string "email", limit: 50
    t.string "website", limit: 50
    t.string "brand_provided_id", limit: 50
    t.text "visiting_address"
    t.string "visiting_post_number"
    t.string "visiting_city", limit: 50
    t.text "billing_address"
    t.string "billing_post_number"
    t.string "billing_city", limit: 50
    t.string "profile_brand_types"
    t.text "office_hours"
    t.string "logo_text", limit: 100
    t.text "introduction"
    t.string "linkedin_url"
    t.string "facebook_url"
    t.string "twitter_url"
    t.string "youtube_url"
    t.string "whatsapp_number", limit: 50
    t.string "skype_id", limit: 50
    t.text "working_areas"
    t.boolean "immediate_customer_reward_payment", default: true, null: false
    t.integer "customer_reward_payment_days"
    t.date "agreement_signing_date"
    t.date "agreement_start_date"
    t.date "agreement_end_date"
    t.integer "joining_fee"
    t.integer "fixed_fee"
    t.integer "royalty"
    t.string "average_profit"
    t.boolean "registered", default: false, null: false
    t.boolean "is_active", default: true, null: false
    t.boolean "is_deleted", default: false, null: false
    t.text "gps_coordinates"
    t.integer "fixed_fee_promotion"
    t.string "sales_area"
    t.text "address_specification"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["brand_id", "office_name"], name: "index_offices_on_brand_id_and_office_name", unique: true
  end

  create_table "settings", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "special_skills", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.integer "brand_id", null: false
    t.boolean "is_active", default: true, null: false
    t.boolean "is_deleted", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_skills", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "skill_type", null: false
    t.integer "skill_id", null: false
    t.boolean "is_active", default: true, null: false
    t.boolean "is_deleted", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id", "skill_type", "skill_id"], name: "index_user_skills_on_user_id_and_skill_type_and_skill_id", unique: true
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "brand_id", null: false
    t.integer "role", default: 0, null: false
    t.integer "creator_id"
    t.integer "updater_id"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "first_name", limit: 50, null: false
    t.string "last_name", limit: 50, null: false
    t.date "birthdate"
    t.string "ssn", limit: 50
    t.text "address"
    t.string "post_number"
    t.string "city", limit: 50
    t.string "phone_number", limit: 50
    t.string "personal_email", limit: 50
    t.string "gender", limit: 1
    t.date "contract_start_date"
    t.date "contract_end_date"
    t.integer "contract_type", default: 0, null: false
    t.boolean "contract_probation", default: false, null: false
    t.text "job_role"
    t.text "other_business_degrees"
    t.text "introduction"
    t.text "working_areas"
    t.string "linkedin_url"
    t.string "facebook_url"
    t.string "twitter_url"
    t.string "youtube_url"
    t.string "whatsapp_number", limit: 50
    t.string "skype_id", limit: 50
    t.text "languages"
    t.boolean "perform_agent_work", default: true, null: false
    t.string "company_name"
    t.string "business_id"
    t.integer "industry_id"
    t.text "visiting_address"
    t.string "visiting_post_number"
    t.string "visiting_city", limit: 50
    t.string "website"
    t.string "visibility"
    t.boolean "registered", default: false, null: false
    t.boolean "intermediate", default: false, null: false
    t.boolean "is_active", default: true, null: false
    t.boolean "is_deleted", default: false, null: false
    t.boolean "visibel_to_agent", default: false, null: false
    t.string "average_profit"
    t.string "token"
    t.integer "language", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "brand_provided_id"
    t.boolean "is_kivi", default: false, null: false
    t.string "agency_code"
    t.index ["email", "brand_id"], name: "index_users_on_email_and_brand_id", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
