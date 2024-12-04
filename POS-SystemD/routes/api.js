const express = require('express');
const router = express.Router();

const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
  { id: 3, name: "Tablet", price: 300 },
  { id: 4, name: "Headphones", price: 100 },
  { id: 5, name: "Smart Watch", price: 150 }
];

let orders = []; // Temporary in-memory storage for orders

router.get('/products', (req, res) => {
  res.json(products);
});

router.post('/submit-order', (req, res) => {
  const { cart } = req.body;
  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: 'Cart is empty!' });
  }

  orders.push(cart);
  res.json({ message: 'Order submitted successfully!', cart });
});

module.exports = router;
