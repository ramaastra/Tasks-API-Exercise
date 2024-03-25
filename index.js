const express = require('express');
require('dotenv').config();
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/tasks', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM tasks');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'server connected successfully'
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on http://localhost:${port}`);
});
