# README.md File

Create a file named `README.md` in your root project directory and copy the content below:

```markdown
# ☕ Coffee R Us - E-Commerce Administrator Portal

[![React](https://img.shields.io/badge/React-19.2.6-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0.12-purple.svg)](https://vitejs.dev/)
[![JSON Server](https://img.shields.io/badge/JSON_Server-1.0.0-green.svg)](https://github.com/typicode/json-server)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, full-featured administrator portal for managing an e-commerce coffee store. Built with React 19, Vite, and JSON Server, this Single Page Application (SPA) demonstrates advanced React concepts including custom hooks, context API, client-side routing, and CRUD operations.

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage Guide](#usage-guide)
- [Component Architecture](#component-architecture)
- [Custom Hooks](#custom-hooks)
- [State Management](#state-management)
- [Responsive Design](#responsive-design)
- [Troubleshooting](#troubleshooting)
- [Development Notes](#development-notes)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality
- **Product Management**: Full CRUD operations for products (Create, Read, Update, Delete)
- **Dynamic Search**: Real-time product filtering with keyboard shortcut (⌘K / Ctrl+K)
- **Form Validation**: Comprehensive client-side form validation
- **Responsive Design**: Mobile-first approach working on all devices
- **RESTful API Integration**: Complete backend simulation with JSON Server

### Advanced React Features
- **Custom Hooks**: `useFetch`, `usePost`, `usePatch`, `useSearch` for reusable logic
- **Context API**: Global state management with StoreContext
- **React Router v7**: Client-side routing with nested routes and breadcrumbs
- **Modern Hooks**: useState, useEffect, useId, useRef, useCallback, useMemo
- **Accessibility**: ARIA labels, keyboard navigation, focus management

### Admin Capabilities
- ✅ View all products in responsive grid layout
- ✅ Add new products with comprehensive form
- ✅ Edit existing products (price, stock, description, etc.)
- ✅ Real-time product search across multiple fields
- ✅ Stock status indicators and low stock warnings
- ✅ Persistent data storage with JSON Server
- ✅ Loading states and error handling

## 🛠 Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.6 | Frontend library |
| React Router DOM | 7.15.1 | Client-side routing |
| Vite | 8.0.12 | Build tool and dev server |
| JSON Server | 1.0.0-beta.15 | Mock REST API |
| Axios | 1.16.1 | HTTP client |
| ESLint | 10.3.0 | Code linting |

## 📁 Project Structure

```
ecommerce-admin-portal/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── Layout/        # Layout components
│   │   │   ├── Layout.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── *.css
│   │   ├── Landing/       # Landing page
│   │   │   └── LandingPage.jsx
│   │   ├── Products/      # Product management
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   └── ProductEdit.jsx
│   │   ├── Form/          # Add product form
│   │   │   └── AddProductForm.jsx
│   │   ├── Search/        # Search component
│   │   │   └── SearchBar.jsx
│   │   └── Common/        # Reusable components
│   │       ├── LoadingSpinner.jsx
│   │       └── ErrorMessage.jsx
│   ├── contexts/          # React Context
│   │   └── StoreContext.jsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useFetch.js
│   │   └── useSearch.js
│   ├── styles/            # Global styles
│   │   └── App.css
│   ├── utils/             # Utility functions
│   │   └── api.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global CSS
├── db.json                # Mock database
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
└── README.md              # Documentation
```

## 💻 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher) or yarn
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/ecommerce-admin-portal.git
cd ecommerce-admin-portal
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up the Database

Create `db.json` in the root directory:

```json
{
  "store_info": [
    {
      "id": 1,
      "name": "Coffee R Us",
      "description": "The go to store for premium coffee beans",
      "phone_number": "555-1234",
      "email": "contact@coffeerus.com",
      "address": "123 Coffee Lane, Brewtown, CA 94123"
    }
  ],
  "products": [
    {
      "id": 1,
      "name": "Vanilla Bean",
      "description": "Medium Roast with sweet vanilla undertones",
      "origin": "Colombia",
      "price": 10.00,
      "category": "Medium Roast",
      "stock": 45,
      "image_url": "https://via.placeholder.com/300x200?text=Coffee",
      "roast_level": "Medium",
      "inStock": true
    }
  ]
}
```

## 🚀 Running the Application

### Development Mode

You need **two terminals** running simultaneously:

#### Terminal 1: Start JSON Server (Backend)
```bash
npm run server
```

Expected output:
```
JSON Server started on http://localhost:5000
Press CTRL-C to stop
Watching db.json...
```

#### Terminal 2: Start React App (Frontend)
```bash
npm run dev
```

Expected output:
```
VITE v8.0.12 ready in xxx ms
➜ Local: http://localhost:3000/
```

### Access the Application
- **Frontend**: http://localhost:3000
- **API Base**: http://localhost:5000
- **Products API**: http://localhost:5000/products
- **Store Info API**: http://localhost:5000/store_info

### Build for Production

```bash
npm run build
```

The build artifacts will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🔌 API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/products` | Get all products | - |
| GET | `/products/:id` | Get single product | - |
| POST | `/products` | Create new product | `{ name, description, price, ... }` |
| PATCH | `/products/:id` | Update product | `{ field: newValue }` |
| DELETE | `/products/:id` | Delete product | - |
| GET | `/store_info/1` | Get store information | - |
| PATCH | `/store_info/1` | Update store info | `{ field: newValue }` |

### Example API Calls

```bash
# Get all products
curl http://localhost:5000/products

# Add new product
curl -X POST http://localhost:5000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"New Coffee","price":15.99,"description":"Great taste"}'

# Update product price
curl -X PATCH http://localhost:5000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":18.99}'
```

## 📖 Usage Guide

### 1. Viewing Products
- Navigate to **Products** page from the navigation menu
- Products display in a responsive grid layout
- Each card shows: image, name, description, origin, price, stock level

### 2. Searching Products
- Use the search bar at the top of the Products page
- Search across: product name, description, origin, category
- Press **⌘K** (Mac) or **Ctrl+K** (Windows) to focus search
- Click **✕** to clear search results

### 3. Adding a New Product

1. Click **"Add Product"** button (Home or Products page)
2. Fill out the form:
   - **Product Name** (required)
   - **Description** (required)
   - **Origin** (required)
   - **Price** (required)
   - Stock quantity
   - Roast level
   - Category
3. Click **"Add Product"** to save
4. New product automatically receives next sequential ID

### 4. Editing a Product

1. Click **"View Details & Edit"** on any product card
2. On detail page, click **"Edit Product"**
3. Modify any fields in the edit form
4. Click **"Save Changes"** to update
5. Changes persist to JSON Server immediately

### 5. Navigation
- **Home**: Store information and feature overview
- **Products**: View, search, and manage all products
- **Add Product**: Form to add new inventory items
- **Breadcrumb**: Shows current location and allows navigation

## 🏗 Component Architecture

### Component Hierarchy

```
App
└── Layout
    ├── Header
    │   └── Navigation
    ├── Main Content (Outlet)
    │   ├── LandingPage
    │   ├── ProductList
    │   │   ├── SearchBar
    │   │   └── ProductCard (multiple)
    │   ├── ProductDetail
    │   │   └── ProductEdit
    │   └── AddProductForm
    └── Footer
```

### State Management

**Global State (StoreContext):**
- `products`: Array of all products
- `storeInfo`: Store configuration data
- `loading`: Loading state indicator
- `error`: Error message state
- `refreshTrigger`: Triggers data refresh

**Local State (Component-level):**
- Form data in AddProductForm
- Search term in SearchBar
- Edit mode toggle in ProductDetail

## 🪝 Custom Hooks

### useFetch
Handles GET requests with loading and error states.

```javascript
const { data, loading, error, refetch } = useFetch('/api/products');
```

### usePost
Handles POST requests for creating resources.

```javascript
const { postData, loading, error } = usePost();
await postData('/api/products', newProduct);
```

### usePatch
Handles PATCH requests for updating resources.

```javascript
const { patchData, loading, error } = usePatch();
await patchData('/api/products/1', { price: 19.99 });
```

### useSearch
Provides real-time search functionality.

```javascript
const { searchTerm, setSearchTerm, filteredItems, resultCount } = useSearch(
  products,
  ['name', 'description', 'origin']
);
```

## 🎨 Responsive Design

| Breakpoint | Layout | Features |
|------------|--------|----------|
| Desktop (>1024px) | 3-4 column grid | Full navigation, expanded layouts |
| Tablet (768px-1024px) | 2-3 column grid | Collapsed spacing, readable fonts |
| Mobile (<768px) | 1 column grid | Stacked navigation, touch-friendly buttons |

### Mobile Features
- Hamburger-style navigation (collapsible)
- Larger touch targets for buttons
- Optimized form layouts
- Readable font sizes

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue: "ECONNREFUSED 127.0.0.1:5000"
**Solution:** JSON Server isn't running. Start it with:
```bash
npm run server
```

#### Issue: Products not displaying
**Solution:** Check if db.json exists and has products array:
```bash
ls db.json  # Should exist
cat db.json | grep products  # Should show products
```

#### Issue: New products get random IDs
**Solution:** Remove `id: Date.now()` from AddProductForm.jsx. Let JSON Server auto-generate IDs.

#### Issue: "Missing script: server"
**Solution:** Add to package.json scripts:
```json
"server": "json-server --watch db.json --port 5000"
```

#### Issue: Port already in use
**Solution:** Change port in package.json:
```json
"server": "json-server --watch db.json --port 5001"
```
Then update vite.config.js proxy to match.

### Debugging Tips

1. **Check Network Tab**: Open DevTools → Network tab to see API requests
2. **Console Logging**: Check browser console for errors
3. **Verify JSON Server**: Visit http://localhost:5000/products in browser
4. **Check db.json**: Ensure it's valid JSON format

## 📝 Development Notes

### Code Quality
- ESLint configured for consistent code style
- Component-based architecture for reusability
- Custom hooks for logic separation
- CSS modules for scoped styling

### Performance Optimizations
- useMemo for expensive calculations (search filtering)
- useCallback for function memoization
- Lazy loading for route components (optional)
- Image placeholders to prevent layout shift

### Accessibility
- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management with useRef
- useId for unique form labels

## 🚧 Future Enhancements

- [ ] User authentication and authorization
- [ ] Shopping cart functionality
- [ ] Order management system
- [ ] Image upload capability
- [ ] Pagination for product list
- [ ] Sorting and filtering options
- [ ] Export data to CSV/PDF
- [ ] Dashboard with analytics
- [ ] Email notifications
- [ ] Bulk product editing
- [ ] Category management
- [ ] Discount and coupon system
- [ ] Customer reviews management
- [ ] Inventory alerts
- [ ] Activity logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Test changes thoroughly
- Update documentation as needed
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Enrique Pim** - *E-commerce showcase app* - [YourGithub](https://github.com/Riq32)

## 🙏 Acknowledgments

- React team for amazing framework
- JSON Server for easy backend mocking
- Vite for fast development experience
- All contributors and testers

## 📞 Support

For issues, questions, or contributions:
- **GitHub Issues**: [Create an issue](https://github.com/yourusername/ecommerce-admin-portal/issues)
- **Email**: your.email@example.com

---

## 🎯 Quick Start Commands Summary

```bash
# Clone and install
git clone <repository-url>
cd ecommerce-admin-portal
npm install

# Start development (need 2 terminals)
npm run server  # Terminal 1
npm run dev     # Terminal 2

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

**Built with ☕ and React**
```

## How to Create the README.md File

### Option 1: Using Command Line (Mac/Linux)
```bash
# Create the file
touch README.md

# Open with text editor
nano README.md
# or
vim README.md
# or
code README.md
```

Then copy and paste the content above.

### Option 2: Using Command Line with Echo (Quick Method)
```bash
cat > README.md << 'EOF'
[Paste the entire README content here]
EOF
```

### Option 3: Using VS Code
1. Right-click in your project root folder
2. Select "New File"
3. Name it `README.md`
4. Copy and paste the content

### Option 4: Using Windows
```batch
echo. > README.md
notepad README.md
```

Then copy and paste the content.

## Customize Your README

Before committing, update these placeholders:

1. **GitHub URL**: `https://github.com/yourusername/ecommerce-admin-portal.git`
2. **Your Name**: Replace "Your Name" with your actual name
3. **GitHub Username**: `yourusername` → your actual GitHub username
4. **Email**: `your.email@example.com` → your contact email
5. **License**: Create a LICENSE file if using MIT license

