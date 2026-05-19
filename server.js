import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins (required for deployment)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// ========== PRODUCT DATA WITH NUMERIC IDs ==========
// Converted all string IDs to proper numbers
let products = [
  {
    id: 1,
    name: "Vanilla Bean",
    description: "Medium Roast with sweet vanilla undertones and nutty flavor profile",
    origin: "Colombia",
    price: 10,
    category: "Medium Roast",
    stock: 45,
    image_url: "https://plus.unsplash.com/premium_photo-1675237625845-ed58c887f3cf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    roast_level: "Medium",
    inStock: true
  },
  {
    id: 2,
    name: "House Blend",
    description: "Dark Roast with rich chocolate notes and smooth finish",
    origin: "Vietnam",
    price: 12,
    category: "Dark Roast",
    stock: 32,
    image_url: "https://images.unsplash.com/photo-1609595781571-eaf55401969c?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    roast_level: "Dark",
    inStock: true
  },
  {
    id: 3,
    name: "Espresso Royale",
    description: "Extra Dark Roast, intense flavor perfect for espresso drinks",
    origin: "Italy",
    price: 15,
    category: "Espresso",
    stock: 19,
    image_url: "https://plus.unsplash.com/premium_photo-1675435644687-562e8042b9db?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    roast_level: "Extra Dark",
    inStock: true
  },
  {
    id: 4,
    name: "Macha Cafe",
    description: "White drink with creamy matcha flavor and subtle sweetness",
    origin: "South Africa",
    price: 5,
    stock: 3,
    category: "Blend",
    roast_level: "Extra Dark",
    inStock: true,
    image_url: "https://plus.unsplash.com/premium_photo-1723759448747-1d174225e61f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 5,
    name: "Cappuccino",
    description: "A rich Italian coffee drink made with espresso, steamed milk, and a thick layer of milk foam. It has a smooth, creamy texture with a balanced coffee flavor",
    origin: "Italy",
    price: 30,
    stock: 45,
    category: "Hot Coffee",
    roast_level: "Medium",
    inStock: true,
    image_url: "https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 6,
    name: "Americano",
    description: "A strong yet smooth coffee prepared by diluting espresso with hot water. It delivers a bold flavor similar to brewed coffee but with a richer aroma.",
    origin: "United States",
    price: 60,
    stock: 30,
    category: "Hot Coffee",
    roast_level: "Dark",
    inStock: true,
    image_url: "https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 7,
    name: "Affogato",
    description: "A dessert-style coffee made with pouring hot espresso over vanilla ice cream or gelato, creating a sweet and creamy combination of hot and cold flavors.",
    origin: "Italy",
    price: 46,
    stock: 20,
    category: "Dessert Coffee",
    roast_level: "Medium",
    inStock: true,
    image_url: "https://images.unsplash.com/photo-1696522692156-7340b681c3bb?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 8,
    name: "Cold Brew",
    description: "Coffee slowly brewed in cold water for several hours producing a smooth, less acidic and refreshing drink often served chilled over ice.",
    origin: "United States",
    price: 34,
    stock: 15,
    category: "Iced coffee",
    roast_level: "Dark",
    inStock: true,
    image_url: "https://plus.unsplash.com/premium_photo-1671088575920-09f2a5970574?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 9,
    name: "Coconut Coffee",
    description: "A tropical-inspired coffee infused with coconut flavor offering a creamy slightly sweet taste with refreshing exotic aroma.",
    origin: "Tropical Blend",
    price: 42,
    stock: 25,
    category: "Flavored Coffee",
    roast_level: "Medium",
    inStock: true,
    image_url: "https://plus.unsplash.com/premium_photo-1695028377683-cc714ade8390?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 10,
    name: "Cinnamon Spice",
    description: "A warm and aromatic coffee blended with cinnamon spice delivering a comforting flavor with mild sweetness and spicy notes.",
    origin: "Mexico",
    price: 38,
    stock: 14,
    category: "Spiced Coffee",
    roast_level: "Medium",
    inStock: true,
    image_url: "https://media.istockphoto.com/id/1480359398/photo/warm-dirty-chai-latte.jpg?s=1024x1024&w=is&k=20&c=ux24WZYVGP0YEU8zlMSFLuOadCsVLGOYLCzYlAJkwOU="
  },
  {
    id: 11,
    name: "Chocolate Truffle",
    description: "A luxurious coffee blended with deep chocolate flavors inspired by chocolate truffles creating a rich creamy and indulgent experience.",
    origin: "Belgium",
    price: 47,
    stock: 22,
    category: "Flavored Coffee",
    roast_level: "Dark",
    inStock: true,
    image_url: "https://images.unsplash.com/photo-1523529733369-8c9cf7593bdc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 12,
    name: "French Vanilla",
    description: "A soft and creamy coffee infused with sweet vanilla flavor known for its smooth aroma and mild sweetness",
    origin: "France",
    price: 22.5,
    stock: 6,
    category: "Flavored Coffee",
    roast_level: "Light",
    inStock: true,
    image_url: "https://plus.unsplash.com/premium_photo-1677607236617-aecfe677388f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 13,
    name: "Pumpkin Spice",
    description: "A seasonal coffee flavored with pumpkin, cinnamon, nutmeg, and cloves giving it a warm, sweet and comforting autumn-inspired taste.",
    origin: "United States",
    price: 45,
    stock: 6,
    category: "Seasonal coffee",
    roast_level: "Medium",
    inStock: true,
    image_url: "https://images.unsplash.com/photo-1634221805920-3a216597f457?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

// Store info
let storeInfo = {
  id: 1,
  name: "Coffee R Us",
  description: "The go to store for premium coffee beans from around the world",
  phone_number: "555-1234",
  email: "contact@coffeerus.com",
  address: "123 Coffee Lane, Brewtown, CA 94123"
};

// Calculate next ID (max current ID + 1)
let nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 14;

console.log(`📊 Loaded ${products.length} products`);
console.log(`🔢 Next ID will be: ${nextId}`);

// ========== STORE INFO ROUTES ==========
app.get('/store_info/1', (req, res) => {
  console.log('GET /store_info/1');
  res.json(storeInfo);
});

app.patch('/store_info/1', (req, res) => {
  console.log('PATCH /store_info/1', req.body);
  storeInfo = { ...storeInfo, ...req.body };
  res.json(storeInfo);
});

// ========== PRODUCT ROUTES ==========
app.get('/products', (req, res) => {
  console.log(`GET /products - returning ${products.length} products`);
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  console.log(`GET /products/${id}`);
  
  // Validate ID
  if (!id || id === 'null' || id === 'undefined') {
    console.log('❌ Invalid ID provided');
    return res.status(400).json({ error: 'Invalid product ID' });
  }
  
  // Convert to number for comparison
  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    console.log('❌ Non-numeric ID provided:', id);
    return res.status(400).json({ error: 'Product ID must be a number' });
  }
  
  const product = products.find(p => p.id === numericId);
  if (product) {
    res.json(product);
  } else {
    console.log(`❌ Product with ID ${id} not found`);
    res.status(404).json({ error: 'Product not found' });
  }
});

app.post('/products', (req, res) => {
  console.log('POST /products - Received:', req.body);
  
  // Validate required fields
  if (!req.body.name) {
    return res.status(400).json({ error: 'Product name is required' });
  }
  
  if (!req.body.price) {
    return res.status(400).json({ error: 'Product price is required' });
  }
  
  const newProduct = {
    id: nextId++,
    name: req.body.name,
    description: req.body.description || '',
    origin: req.body.origin || '',
    price: parseFloat(req.body.price),
    stock: parseInt(req.body.stock) || 0,
    category: req.body.category || '',
    roast_level: req.body.roast_level || 'Medium',
    inStock: req.body.inStock !== undefined ? req.body.inStock : true,
    image_url: req.body.image_url || 'https://via.placeholder.com/300x200?text=New+Coffee'
  };
  
  products.push(newProduct);
  console.log(`✅ Product added with ID: ${newProduct.id}`);
  res.status(201).json(newProduct);
});

app.patch('/products/:id', (req, res) => {
  const id = req.params.id;
  console.log(`PATCH /products/${id}`, req.body);
  
  // Validate ID
  if (!id || id === 'null' || id === 'undefined') {
    return res.status(400).json({ error: 'Invalid product ID' });
  }
  
  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    return res.status(400).json({ error: 'Product ID must be a number' });
  }
  
  const index = products.findIndex(p => p.id === numericId);
  if (index !== -1) {
    products[index] = { 
      ...products[index], 
      ...req.body,
      id: numericId,
      price: req.body.price ? parseFloat(req.body.price) : products[index].price,
      stock: req.body.stock ? parseInt(req.body.stock) : products[index].stock
    };
    console.log(`✅ Product ${id} updated`);
    res.json(products[index]);
  } else {
    console.log(`❌ Product with ID ${id} not found for update`);
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/products/:id', (req, res) => {
  const id = req.params.id;
  console.log(`DELETE /products/${id}`);
  
  // Validate ID
  if (!id || id === 'null' || id === 'undefined') {
    return res.status(400).json({ error: 'Invalid product ID' });
  }
  
  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    return res.status(400).json({ error: 'Product ID must be a number' });
  }
  
  const index = products.findIndex(p => p.id === numericId);
  if (index !== -1) {
    const deleted = products.splice(index, 1);
    console.log(`✅ Product ${id} deleted: ${deleted[0].name}`);
    res.status(204).send();
  } else {
    console.log(`❌ Product with ID ${id} not found for deletion`);
    res.status(404).json({ error: 'Product not found' });
  }
});

// Handle OPTIONS requests for CORS preflight
app.options('*', cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    products: products.length, 
    nextId: nextId,
    timestamp: new Date().toISOString() 
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ Server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📦 Products: http://localhost:${PORT}/products`);
  console.log(`🏪 Store: http://localhost:${PORT}/store_info/1`);
  console.log(`💚 Health: http://localhost:${PORT}/health`);
  console.log(`📊 Products loaded: ${products.length}`);
  console.log(`🔢 Next ID available: ${nextId}\n`);
});