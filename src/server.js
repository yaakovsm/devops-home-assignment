const express = require('express');
const app = express();
const port = 3000;

// Define a route for GET requests to the root URL
app.get('/status', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'devops-home-assignment',
    timestamp: new Date().toISOString(),
  });
});

// Start the server
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});