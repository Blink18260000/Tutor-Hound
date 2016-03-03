json.username @user.user_name
json.region_id @user.region_id
json.address @user.address
json.phone_number @user.phone_number
if @user.tutor
  json.tutor_id @user.tutor.id
else
  json.tutor_id nil
end
