class AddPrimaryTables < ActiveRecord::Migration
  def change
    add_column :users, :region_id, :integer
    add_column :users, :address, :string
    add_column :users, :phone_number, :string

    create_table :tutors do |t|
      t.string :f_name, null: false
      t.string :l_name, null: false
      t.integer :user_id, null: false
      t.timestamps null: false
    end

    add_index :tutors, :user_id, unique: true

    create_table :jobs do |t|
      t.integer :client_id, null: false
      t.integer :tutor_id
      t.integer :date, null: false
      t.integer :test_id, null: false
      t.boolean :completed, default: false
      t.timestamps null: false
    end

    add_index :jobs, :client_id
    add_index :jobs, :tutor_id
    add_index :jobs, :test_id

    create_table :tests do |t|
      t.string :name, null: false
      t.timestamps null: false
    end

    add_index :tests, :name, unique: true

    create_table :regions do |t|
      t.string :name, null: false
      t.timestamps null: false
    end

    add_index :regions, :name, unique: true

    create_table :quals do |t|
      t.integer :test_id, null: false
      t.integer :tutor_id, null: false
      t.timestamps null: false
    end

    add_index :quals, :test_id
    add_index :quals, :tutor_id

  end
end
