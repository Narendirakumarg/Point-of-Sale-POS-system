const express = require('express');
const bodyParser = require('body-parser');
const { getOffers } = require('./server/api');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));  

// API endpoint for calculating offers
app.post('/api/calculate', async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const result = await getOffers(product, quantity);
        res.json(result);
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});