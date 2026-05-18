import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins (required for deployment)
app.use(cors());
app.use(express.json());

// Load data from db.json
let db = {
  store_info: [],
  products: []
};

try {
  const data = fs.readFileSync('db.json', 'utf8');
  db = JSON.parse(data);
  console.log(`✅ Loaded database with ${db.products?.length || 0} products`);
} catch (err) {
  console.log('⚠️ No db.json found, using empty database');
  db = {
    store_info: [{ id: 1, name: "Coffee R Us", description: "Premium coffee store", phone_number: "555-1234" }],
    products: []
  };
}

// In-memory storage (for updates)
let storeInfo = db.store_info?.[0] || null;
let products = db.products || [];
let nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

// ========== STORE INFO ROUTES ==========
app.get('/store_info/1', (req, res) => {
  res.json(storeInfo);
});

app.patch('/store_info/1', (req, res) => {
  storeInfo = { ...storeInfo, ...req.body };
  res.json(storeInfo);
});

// ========== PRODUCT ROUTES ==========
app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.post('/products', (req, res) => {
  const newProduct = {
    id: nextId++,
    ...req.body,
    price: parseFloat(req.body.price),
    stock: parseInt(req.body.stock) || 0
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.patch('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    products.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ Server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📦 Products: http://localhost:${PORT}/products`);
  console.log(`🏪 Store: http://localhost:${PORT}/store_info/1\n`);
});