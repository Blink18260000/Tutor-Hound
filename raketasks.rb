task :resetDB do
  pg:reset
  rake db:migrate
  rake db:seed
end
