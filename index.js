const express = require('express');
require('dotenv').config();
const db = require('./db');
const cors = require('cors');
const fs = require('fs');
const YAML = require('yaml');
const swaggerUI = require('swagger-ui-express');
const docsYAML = fs.readFileSync('./api-docs.yaml', 'utf8');
const docsJSON = YAML.parse(docsYAML);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(docsJSON));

app.get('/tasks', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM tasks');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM tasks WHERE id=$1', [id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const { title, description, dueDate, isCompleted } = req.body;
    await db.query(
      'INSERT INTO tasks (title, description, due_date, is_completed) VALUES ($1, $2, $3, $4)',
      [title, description, dueDate, isCompleted]
    );
    res.status(201).json({
      status: 'success',
      data: req.body
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, isCompleted } = req.body;
    await db.query(
      'UPDATE tasks SET title=$1, description=$2, due_date=$3, is_completed=$4 WHERE id=$5',
      [title, description, dueDate, isCompleted, id]
    );
    res.status(200).json({
      status: 'success',
      data: req.body
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM tasks WHERE id=$1', [id]);
    res.status(200).json({ status: 'success' });
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
