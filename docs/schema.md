# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
region_id       | integer   | not null, foreign key (references regions), indexed
address         | string    | not null
phone_number    | string    | not null

## tutors
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
f_name          | string    | not null
l_name          | string    | not null
user_id         | integer   | not null, foreign key (references users), indexed, unique

## jobs
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
client_id   | integer   | not null, foreign key (references users), indexed
tutor_id    | integer   | foreign key (references users), indexed
date        | integer   | not null
test_id     | integer   | not null, foreign key (references tests), indexed
completed   | boolean   | not null, default: false

## tests
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## regions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null


## qualifications
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
test_id     | string    | not null, foreign key (references tests), indexed
tutor_id    | integer   | not null, foreign key (references tutors), indexed
