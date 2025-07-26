const form = document.getElementById('itemForm');
const inventoryList = document.getElementById('inventoryList');
const search = document.getElementById('search');

let items = JSON.parse(localStorage.getItem('inventory')) || [];

function renderItems(data = items) {
  inventoryList.innerHTML = '';
  data.forEach((item, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.quantity}</td>
      <td><button onclick="deleteItem(${i})">X</button></td>
    `;
    inventoryList.appendChild(row);
  });
  localStorage.setItem('inventory', JSON.stringify(items));
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const newItem = {
    name: form.name.value,
    category: form.category.value,
    quantity: form.quantity.value,
  };
  items.push(newItem);
  renderItems();
  form.reset();
});

function deleteItem(index) {
  items.splice(index, 1);
  renderItems();
}

search.addEventListener('input', () => {
  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  );
  renderItems(filtered);
});

renderItems();
