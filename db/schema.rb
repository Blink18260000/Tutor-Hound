# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160223225151) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "jobs", force: :cascade do |t|
    t.integer  "client_id",                  null: false
    t.integer  "tutor_id"
    t.integer  "date",                       null: false
    t.integer  "test_id",                    null: false
    t.boolean  "completed",  default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "jobs", ["client_id"], name: "index_jobs_on_client_id", using: :btree
  add_index "jobs", ["test_id"], name: "index_jobs_on_test_id", using: :btree
  add_index "jobs", ["tutor_id"], name: "index_jobs_on_tutor_id", using: :btree

  create_table "quals", force: :cascade do |t|
    t.integer  "test_id",    null: false
    t.integer  "tutor_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "quals", ["test_id"], name: "index_quals_on_test_id", using: :btree
  add_index "quals", ["tutor_id"], name: "index_quals_on_tutor_id", using: :btree

  create_table "regions", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "regions", ["name"], name: "index_regions_on_name", unique: true, using: :btree

  create_table "tests", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "tests", ["name"], name: "index_tests_on_name", unique: true, using: :btree

  create_table "tutors", force: :cascade do |t|
    t.string   "f_name",     null: false
    t.string   "l_name",     null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "tutors", ["user_id"], name: "index_tutors_on_user_id", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "user_name",       null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "region_id"
    t.string   "address"
    t.string   "phone_number"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["user_name"], name: "index_users_on_user_name", unique: true, using: :btree

end
