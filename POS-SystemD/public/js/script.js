document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(products => {
      displayProducts(products);
    })
    .catch(error => console.error('Error fetching products:', error));
});

let cart = [];

function displayProducts(products) {
  const productContainer = document.getElementById('product-container');

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');

    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <label for="offer-${product.id}">Select Offer:</label>
      <select id="offer-${product.id}">
        <option value="none">No Offer</option>
        <option value="flat">Flat Discount ($50)</option>
        <option value="percentage">Percentage Discount (10%)</option>
        <option value="bundle">Bundle Offer: Free Headphones</option>
      </select>
      
      <label>Enter Quantity: </label>
      <input type="number" id="quantity-${product.id}" placeholder="Quantity" min="1" value="">
      <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
    `;

    productContainer.appendChild(productElement);
  });
}

function addToCart(productId, productName, productPrice) {
  const offerSelect = document.getElementById(`offer-${productId}`);
  const quantityInput = document.getElementById(`quantity-${productId}`);
  const selectedOffer = offerSelect.value;
  const quantity = parseInt(quantityInput.value) || 1;

  let finalPrice = productPrice;
  let offerText = 'No Offer';

  if (selectedOffer === 'flat') {
    finalPrice -= 50;
    offerText = 'Flat Discount';
  } else if (selectedOffer === 'percentage') {
    finalPrice *= 0.9;
    offerText = '10% Discount';
  } else if (selectedOffer === 'bundle') {
    offerText = 'Bundle Offer (Free Headphones)';
  }

  const totalPrice = finalPrice * quantity;

  const cartItem = { id: productId, name: productName, quantity, offer: offerText, price: totalPrice };
  cart.push(cartItem);

  updateSummary();
}

function updateSummary() {
  const summaryBody = document.getElementById('summary-body');
  const summaryTotal = document.getElementById('summary-total');
  summaryBody.innerHTML = '';
  let totalAmount = 0;

  cart.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.offer}</td>
      <td>$${item.price.toFixed(2)}</td>
    `;
    summaryBody.appendChild(row);
    totalAmount += item.price;
  });

  summaryTotal.innerText = totalAmount.toFixed(2);
}

function submitOrder() {
  if (cart.length === 0) {
    alert('Cart is empty!');
    return;
  }

  fetch('/api/submit-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cart }),
  })
    .then(response => response.json())
    .then(data => {
      alert('Order submitted successfully!');
      cart = [];
      updateSummary();
    })
    .catch(error => console.error('Error submitting order:', error));
}
