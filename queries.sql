
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name varchar NOT NULL,
  last_name varchar NOT NULL,
  email varchar NOT NULL,
  address1 varchar NOT NULL,
  address2 varchar,
  city varchar NOT NULL,
  state varchar NOT NULL,
  zip varchar NOT NULL,
  country varchar NOT NULL,
  phone_no varchar NOT NULL
);

CREATE TABLE user_appointments(
    id SERIAL PRIMARY KEY,
    appointment_time timestamp NOT NULL,
    user_id int references users("id")
);

CREATE TABLE user_identification(
    id SERIAL PRIMARY KEY,
    image bytea NOT NULL,
    user_id int references users("id")
);