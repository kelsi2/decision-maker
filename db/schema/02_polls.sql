-- Drop and recreate polls table

DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  user_id INTEGER REFERENCES users(id) NOT NULL,
  option_id INTEGER REFERENCES options(id) NOT NULL
);
