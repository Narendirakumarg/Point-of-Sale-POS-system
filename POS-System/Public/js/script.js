const form = document.getElementById('productForm');
const orderSummary = document.getElementById('orderSummary');
const totalEl = document.getElementById('total');

let total = 0;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const product = document.getElementById('product').value;
  const quantity = parseInt(document.getElementById('quantity').value);

  const response = await fetch('/api/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product, quantity }),
  });

  const result = await response.json();

  if (result.error) {
    alert(result.error);
    return;
  }

  total += result.subtotal;
  orderSummary.innerHTML += `
    <tr>
      <td>${result.product}</td>
      <td>${result.quantity}</td>
      <td>${result.offer}</td>
      <td>$${result.subtotal.toFixed(2)}</td>
    </tr>
  `;
  totalEl.textContent = `Total: $${total.toFixed(2)}`;
});
