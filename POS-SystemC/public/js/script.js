document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(products => {
      console.log(products);
      const productSelect = document.getElementById('product');
      products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} ($${product.price})`;
        productSelect.appendChild(option);
        
      })
      .catch(error => {
        console.error('Error fetching products:', error);
    });
    });
});

const order = [];
let total = 0;

document.getElementById('add-product').addEventListener('click', () => {
  const productId = document.getElementById('product').value;
  const quantity = parseInt(document.getElementById('quantity').value);

  if (!quantity) {
    alert('Please enter a valid quantity.');
    return;
  }

  fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(products => {
      const product = products.find(p => p.id == productId);
      const offer = calculateOffer(product, quantity);
      const itemTotal = quantity * product.price - offer;
      total += itemTotal;

      console.log('Total amount being sent to API:', total);
      order.push({ name: product.name, quantity, offer, itemTotal });

      updateOrderSummary();
      

    });
});


document.getElementById('submit-transaction').addEventListener('click', (event) => {
  event.preventDefault(); // Prevent form submission
  console.log('Submit button clicked');
  const products = [
    { name: 'Laptop', quantity: 1, price: 1000 },
    { name: 'Phone', quantity: 2, price: 500 }
  ];
  const total = products.reduce((sum, product) => sum + product.quantity * product.price, 0);

  fetch('/api/transaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ products, total }),
  })
  .then(response => {
    console.log('Response status:', response.status);
    return response.json();
  })
    .then(data => {
      if (data.success) {
        alert(`Transaction saved! Transaction ID: ${data.transactionId}`);
      } else {
        alert('Failed to save transaction.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while saving the transaction.');
    });
});



function calculateOffer(product, quantity) {
  if (product.offer_type === 'Flat') {
    return product.offer_value * quantity;
  } else if (product.offer_type === 'Percentage') {
    return (product.price * product.offer_value) / 100 * quantity;
  } else if (product.offer_type === 'BOGO') {
    return Math.floor(quantity / 2) * product.price;
  }
  return 0;
}

function updateOrderSummary() {
  const orderDetails = document.getElementById('order-details');
  const orderTotal = document.getElementById('order-total');

  orderDetails.innerHTML = order.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.offer}</td>
      <td>${item.itemTotal}</td>
    </tr>
  `).join('');

  orderTotal.textContent = `Total: $${total.toFixed(2)}`;
}



