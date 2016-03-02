if job.tutor
  json.tutor_id job.tutor.id
  json.tutor_f_name job.tutor.f_name
  json.tutor_l_name job.tutor.l_name
else
  json.tutor_id job.tutor
  json.tutor_f_name job.tutor
  json.tutor_l_name job.tutor
end
json.date job.date
json.test job.test.name
json.completed job.completed
