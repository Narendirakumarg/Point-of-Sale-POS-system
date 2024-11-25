const db = require('./db');

async function getOffers(product, quantity) {
    try {
        const query = `
            SELECT product_name, offer_type, offer_value, price 
            FROM products 
            WHERE product_name = ?;
        `;
        
        const [rows] = await db.execute(query, [product]);

        if (rows.length === 0) {
            throw new Error('Product not found');
        }

        const productData = rows[0];
        let offerDescription = '';
        let subtotal = productData.price * quantity;

        switch (productData.offer_type) {
            case 'flat':
                offerDescription = `Flat discount of $${productData.offer_value}`;
                subtotal -= productData.offer_value * quantity;
                break;
            case 'percentage':
                offerDescription = `${productData.offer_value}% off`;
                subtotal -= (productData.price * productData.offer_value / 100) * quantity;
                break;
            case 'free_product':
                offerDescription = `Buy ${quantity}, get ${Math.floor(quantity / productData.offer_value)} free`;
                break;
            default:
                offerDescription = 'No offer';
        }

        return {
            product: productData.product_name,
            quantity,
            offer: offerDescription,
            subtotal,
        };

    } catch (err) {
        console.error("Error while fetching offers:", err);
        throw new Error('Failed to fetch offers');
    }
}

module.exports = { getOffers };
