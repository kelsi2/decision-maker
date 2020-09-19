-- Drop and recreate options table

DROP TABLE IF EXISTS options CASCADE;
CREATE TABLE options (
  id SERIAL PRIMARY KEY NOT NULL,
  data TEXT NOT NULL,
  poll_id INTEGER REFERENCES polls(id) NOT NULL
);
