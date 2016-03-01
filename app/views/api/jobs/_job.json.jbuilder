if job.tutor
  json.tutor_f_name job.tutor.f_name
  json.tutor_l_name job.tutor.l_name
else
  json.tutor_f_name job.tutor
  json.tutor_l_name job.tutor
end
json.date job.date
json.test_id job.test_id
json.completed job.completed
