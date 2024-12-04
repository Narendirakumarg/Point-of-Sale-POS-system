const express = require('express');
const router = express.Router();
const db = require('../db/db-connection');

// Fetch all products
router.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Save transaction
// API to handle transactions
app.post('/submit-order', (req, res) => {
  const { products, total } = req.body;

  // Debugging
  console.log('Received products:', products);
  console.log('Total:', total);

  if (!products || products.length === 0) {
    console.error('No products provided!');
    return res.status(400).json({ error: 'No products provided!' });
  }

  // Insert transaction into database
  const totalAmount = parseFloat(total).toFixed(2);

  const sql = `INSERT INTO transactions (products, total, created_at) VALUES (?, ?, NOW())`;
  const values = [JSON.stringify(products), total];

  
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database insertion error:', err.message);
      return res.status(500).json({ error: 'Failed to save transaction' });
    }
    console.log('Transaction saved successfully!');
    res.status(201).json({ message: 'Order submitted successfully!' });
  });
});

module.exports = router;
