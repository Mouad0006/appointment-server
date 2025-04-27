CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  selected_date VARCHAR(255) NOT NULL,
  slot_id VARCHAR(255) NOT NULL,
  token TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
