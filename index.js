const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'server connected successfully'
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on http://localhost:${port}`);
});
