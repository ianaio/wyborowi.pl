const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://www.wyborowi.pl:3000' }));

app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, title: 'GROM Gear' },
    { id: 2, title: 'Training Kit' },
  ]);
});

app.listen(3001, '0.0.0.0', () => {
  console.log('Backend running on http://www.wyborowi.pl:3001');
});
