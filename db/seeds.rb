# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.new({user_name: "MRice", password: "starwars", region_id: 2, address: "160 Spear Street", phone_number: "4045550710"}).save!

Region.new({name: "Atlanta"}).save!
Region.new({name: "San Francisco"}).save!
Region.new({name: "New York"}).save!
Region.new({name: "Seattle"}).save!
