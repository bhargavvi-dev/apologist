# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'seedbank'
require 'ffaker'

puts "\n> -- BRAND SEED DATA IMPORT --------------------------------------------------------"

puts "\n> -- Seeds::Development::Brand --------------------------"

brand = Brand.create_with(prefix: 'adv', phone_number: '99999999', email: 'contact@advocate.in', slug: 'advo').find_or_create_by!(name: 'advocate')
brand.logo.attach(io: File.open("#{Rails.root}/db/manipulator/assets/images/default/logo.png"), filename: 'logo.png')
brand.save!

puts "\n> -- Seeds::Development::Brand::User --------------------------"
for i in 1..5
  executive = User.create_with(password: 'password', password_confirmation: 'password', first_name: FFaker::Name.first_name, last_name: FFaker::Name.last_name, :role => 0, :brand => brand, :city => FFaker::Address.city, :phone_number => FFaker::PhoneNumber.short_phone_number, :job_role => 'Owner', :registered => true).find_or_create_by!(email: "executive#{i}@sheltersoft.in")
  director = User.create_with(password: 'password', password_confirmation: 'password', first_name: FFaker::Name.first_name, last_name: FFaker::Name.last_name, :role => 1, :brand => brand, :city => FFaker::Address.city, :phone_number => FFaker::PhoneNumber.short_phone_number, :registered => true).find_or_create_by!(email: "director#{i}@sheltersoft.in")
  office_manager = User.create_with(password: 'password', password_confirmation: 'password', first_name: FFaker::Name.first_name, last_name: FFaker::Name.last_name, :role => 2, :brand => brand, :city => FFaker::Address.city, :phone_number => FFaker::PhoneNumber.short_phone_number, :registered => true).find_or_create_by!(email: "office_manager#{i}@sheltersoft.in")
  agent = User.create_with(password: 'password', password_confirmation: 'password', first_name: FFaker::Name.first_name, last_name: FFaker::Name.last_name, :role => 3, :brand => brand, :city => FFaker::Address.city, :phone_number => FFaker::PhoneNumber.short_phone_number, :registered => true).find_or_create_by!(email: "agent#{i}@sheltersoft.in")
  external_responsible_person = User.create_with(password: 'password', password_confirmation: 'password', first_name: FFaker::Name.first_name, last_name: FFaker::Name.last_name, :address => "#{FFaker::Address.street_address}, #{FFaker::Address.city}", :role => 4, :brand => brand, :phone_number => FFaker::PhoneNumber.short_phone_number, :registered => true).find_or_create_by!(email: "external#{i}@sheltersoft.in")
  internal_responsible_person = User.create_with(password: 'password', password_confirmation: 'password'	, first_name: FFaker::Name.first_name, last_name: FFaker::Name.last_name, :address => "#{FFaker::Address.street_address}, #{FFaker::Address.city}", :role => 5, :brand => brand, :phone_number => FFaker::PhoneNumber.short_phone_number, :registered => true).find_or_create_by!(email: "internal#{i}@sheltersoft.in")
  network_partners = User.create_with(password: 'password', password_confirmation: 'password', company_name: FFaker::Company.name, first_name: FFaker::Name.first_name, last_name: FFaker::Name.last_name, :role => 6, :brand => brand, :city => FFaker::Address.city, :phone_number => FFaker::PhoneNumber.short_phone_number, address: "#{FFaker::Address.street_address}, #{FFaker::Address.city}", creator_id: executive.id, updater_id: executive.id).find_or_create_by!(email: "network_partner#{i}@sheltersoft.in")
end