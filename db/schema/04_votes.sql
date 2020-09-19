-- Drop and recreate options table

DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  option_id INTEGER REFERENCES options(id),
  rank INTEGER
);
