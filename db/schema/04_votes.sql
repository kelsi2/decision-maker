-- Drop and recreate votes table

DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR(255),
  option_id INTEGER REFERENCES options(id),
  rank INTEGER
);
