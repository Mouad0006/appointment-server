// server.js

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'Mouad2006';

app.use(cors());
app.use(express.json()); // Body parser JSON

app.post('/submit', (req, res) => {
    const { selectedDate, slotId, status, secretKey } = req.body;

    if (secretKey !== SECRET_KEY) {
        return res.status(403).send('Forbidden: Invalid Secret Key');
    }

    if (!selectedDate || !slotId || !status) {
        return res.status(400).send('Bad Request: Missing Fields');
    }

    console.log('✅ Appointment Attempt:', {
        selectedDate,
        slotId,
        status
    });

    res.status(200).send('Logged Successfully');
});

app.get('/', (req, res) => {
    res.send('Server Working ✅');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
