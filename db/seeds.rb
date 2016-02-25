# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Guest User Account
User.new({user_name: "MRice", password: "starwars", region_id: 2, address: "160 Spear Street", phone_number: "4045550710"}).save!

User.new({user_name: "ELiu", password: "starwars", region_id: 2, address: "160 Spear Street", phone_number: "8446326532"}).save!
User.new({user_name: "CMcmahon", password: "starwars", region_id: 2, address: "160 Spear Street", phone_number: "8333594781"}).save!
User.new({user_name: "LOu", password: "starwars", region_id: 2, address: "160 Spear Street", phone_number: "8440486074"}).save!
User.new({user_name: "MHeller", password: "starwars", region_id: 2, address: "160 Spear Street", phone_number: "8552103987"}).save!
User.new({user_name: "SChristensen", password: "starwars", region_id: 2, address: "160 Spear Street", phone_number: "8331027343"}).save!
User.new({user_name: "RChong", password: "starwars", region_id: 2, address: "160 Spear Street", phone_number: "8339217121"}).save!
User.new({user_name: "SGerber", password: "starwars", region_id: 2, address: "160 Spear Street", phone_number: "8997078720"}).save!
User.new({user_name: "SKunche", password: "starwars", region_id: 2, address: "160 Spear Street", phone_number: "8993033918"}).save!
User.new({user_name: "VBudrovich", password: "starwars", region_id: 2, address: "160 Spear Street", phone_number: "8991184520"}).save!
User.new({user_name: "WLiang", password: "starwars", region_id: 2, address: "160 Spear Street", phone_number: "8335226547"}).save!

Tutor.new({f_name: "Eric", l_name: "Liu", user_id: 2}).save!
Tutor.new({f_name: "Laurie", l_name: "Ou", user_id: 4}).save!
Tutor.new({f_name: "Sam", l_name: "Gerber", user_id: 8}).save!
Tutor.new({f_name: "Vincent", l_name: "Budrovich", user_id: 10}).save!
Tutor.new({f_name: "Ryan", l_name: "Chong", user_id: 7}).save!

Job.new({client_id: 1, tutor_id: 1, date: ((Time.now) + (60 * 60 * 24 * 2)).to_i, test_id: 5}).save!
Job.new({client_id: 1, tutor_id: 2, date: ((Time.now) + (60 * 60 * 24 * 4)).to_i, test_id: 23}).save!
Job.new({client_id: 1, tutor_id: 5, date: ((Time.now) + (60 * 60 * 24 * 15)).to_i, test_id: 1}).save!
Job.new({client_id: 1, date: ((Time.now) + (60 * 60 * 24 * 15)).to_i, test_id: 1}).save!

Qual.new({tutor_id: 1, test_id: 1}).save!
Qual.new({tutor_id: 1, test_id: 2}).save!
Qual.new({tutor_id: 1, test_id: 3}).save!
Qual.new({tutor_id: 1, test_id: 4}).save!
Qual.new({tutor_id: 1, test_id: 5}).save!
Qual.new({tutor_id: 1, test_id: 6}).save!
Qual.new({tutor_id: 1, test_id: 7}).save!
Qual.new({tutor_id: 1, test_id: 8}).save!
Qual.new({tutor_id: 1, test_id: 9}).save!
Qual.new({tutor_id: 1, test_id: 10}).save!
Qual.new({tutor_id: 1, test_id: 11}).save!
Qual.new({tutor_id: 1, test_id: 12}).save!
Qual.new({tutor_id: 1, test_id: 13}).save!
Qual.new({tutor_id: 1, test_id: 14}).save!
Qual.new({tutor_id: 1, test_id: 15}).save!
Qual.new({tutor_id: 1, test_id: 16}).save!
Qual.new({tutor_id: 1, test_id: 17}).save!
Qual.new({tutor_id: 1, test_id: 18}).save!
Qual.new({tutor_id: 1, test_id: 19}).save!
Qual.new({tutor_id: 1, test_id: 20}).save!
Qual.new({tutor_id: 1, test_id: 21}).save!
Qual.new({tutor_id: 1, test_id: 22}).save!
Qual.new({tutor_id: 1, test_id: 23}).save!
Qual.new({tutor_id: 1, test_id: 24}).save!
Qual.new({tutor_id: 2, test_id: 1}).save!
Qual.new({tutor_id: 2, test_id: 2}).save!
Qual.new({tutor_id: 2, test_id: 3}).save!
Qual.new({tutor_id: 2, test_id: 23}).save!
Qual.new({tutor_id: 3, test_id: 1}).save!
Qual.new({tutor_id: 4, test_id: 1}).save!
Qual.new({tutor_id: 5, test_id: 1}).save!

Region.new({name: "Atlanta"}).save!
Region.new({name: "SF Bay Area"}).save!
Region.new({name: "New York City"}).save!
Region.new({name: "Seattle"}).save!
Region.new({name: "Austin"}).save!
Region.new({name: "Boston"}).save!
Region.new({name: "Chicago"}).save!
Region.new({name: "Dallas"}).save!
Region.new({name: "Denver"}).save!
Region.new({name: "Houston"}).save!
Region.new({name: "LA & OC"}).save!
Region.new({name: "London"}).save!
Region.new({name: "Miami"}).save!
Region.new({name: "Philadelphia"}).save!
Region.new({name: "Phoenix"}).save!
Region.new({name: "Portland"}).save!
Region.new({name: "San Antonio"}).save!
Region.new({name: "San Diego"}).save!
Region.new({name: "Washington DC"}).save!
Region.new({name: "Virtual (Anywhere)"}).save!

Test.new({name: "SAT"}).save! #1
Test.new({name: "SAT Subject Test - Math Level 1"}).save! #2
Test.new({name: "SAT Subject Test - Math Level 2"}).save! #3
Test.new({name: "SAT Subject Test - English"}).save! #4
Test.new({name: "SAT Subject Test - Physics"}).save! #5
Test.new({name: "SAT Subject Test - Chemistry"}).save! #6
Test.new({name: "SAT Subject Test - Biology Ecological"}).save! #7
Test.new({name: "SAT Subject Test - Biology Molecular"}).save! #8
Test.new({name: "SAT Subject Test - U.S. History"}).save! #9
Test.new({name: "SAT Subject Test - World History"}).save! #10
Test.new({name: "SAT Subject Test - Spanish"}).save! #11
Test.new({name: "SAT Subject Test - Spanish with Listening"}).save! #12
Test.new({name: "SAT Subject Test - German"}).save! #13
Test.new({name: "SAT Subject Test - German with Listening"}).save! #14
Test.new({name: "SAT Subject Test - French"}).save! #15
Test.new({name: "SAT Subject Test - French with Listening"}).save! #16
Test.new({name: "SAT Subject Test - Modern Hebrew"}).save! #17
Test.new({name: "SAT Subject Test - Latin"}).save! #18
Test.new({name: "SAT Subject Test - Italian"}).save! #19
Test.new({name: "SAT Subject Test - Chinese with Listening"}).save! #20
Test.new({name: "SAT Subject Test - Japanese with Listening"}).save! #21
Test.new({name: "SAT Subject Test - Korean with Listening"}).save! #22
Test.new({name: "ACT"}).save! #23
