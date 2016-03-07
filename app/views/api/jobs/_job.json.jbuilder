json.id job.id
if job.tutor
  json.tutor_id job.tutor.id
  json.tutor_f_name job.tutor.f_name
  json.tutor_l_name job.tutor.l_name
  json.tutor_phone job.tutor.user.phone_number
  json.tutor_url job.tutor.user.url
else
  json.tutor_id job.tutor
  json.tutor_f_name job.tutor
  json.tutor_l_name job.tutor
  json.tutor_phone job.tutor
  json.tutor_url job.tutor
end
json.date job.date
json.test job.test.name
json.completed job.completed
json.client job.client.user_name
json.client_phone job.client.phone_number
json.address job.client.address
json.client_url job.client.url
