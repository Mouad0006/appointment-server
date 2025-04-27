// server.js
import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/submit', async (req, res) => {
  const { selectedDate, slotId, token, secretKey } = req.body;

  if (!selectedDate || !slotId || !token || !secretKey) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  if (secretKey !== process.env.SECRET_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    await pool.query(
      'INSERT INTO appointments (selected_date, slot_id, token, created_at) VALUES ($1, $2, $3, NOW())',
      [selectedDate, slotId, token]
    );
    res.json({ status: 'OK' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database insertion failed' });
  }
});

app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
