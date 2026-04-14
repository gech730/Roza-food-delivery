# 🍛 Roza Fast Food — Food Delivery Web App

A full-stack Ethiopian food delivery application with a customer-facing frontend, an admin panel, and a Node.js/Express backend.

---

## Project Structure

```
foodDelivery/
├── backend/        # Node.js + Express REST API
├── frontend/       # React customer app (Vite)
└── admin/          # React admin panel (Vite)
```

---

## Tech Stack

| Layer    | Technology |
|----------|-----------|
| Frontend | React 19, React Router, Axios, React Toastify |
| Admin    | React 19, React Router, Axios |
| Backend  | Node.js, Express 5, MongoDB (Mongoose) |
| Auth     | JWT (jsonwebtoken) |
| Payment  | Chapa (Ethiopian payment gateway) |
| Security | Helmet, CORS, express-rate-limit, bcrypt |
| Upload   | Multer (local disk → migrate to Cloudinary for production) |

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- A Chapa test account

### 1. Clone the repo
```bash
git clone https://github.com/your-username/foodDelivery.git
cd foodDelivery
```

### 2. Backend setup
```bash
cd backend
cp .env.example .env      # fill in your values
npm install
npm run seed-admin        # creates default admin account
npm run server            # starts on http://localhost:4000
```

### 3. Frontend setup
```bash
cd frontend
cp .env.example .env      # set VITE_API_URL=http://localhost:4000
npm install
npm run dev               # starts on http://localhost:5173
```

### 4. Admin panel setup
```bash
cd admin
cp .env.example .env      # set VITE_API_URL=http://localhost:4000
npm install
npm run dev               # starts on http://localhost:5174
```

---

## Environment Variables

### Backend (`backend/.env`)
```env
NODE_ENV=development
PORT=4000
JWT_SECRET=your_strong_secret_here
MONGO_URI=mongodb://localhost:27017/FOOD_DELIVERY
CHAPA_SECRET_KEY=CHASECK_TEST-your_key
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
BASE_URL=http://localhost:4000
```

### Frontend & Admin (`.env`)
```env
VITE_API_URL=http://localhost:4000
```

---

## Default Admin Credentials
```
Email:    admin@fooddelivery.com
Password: admin123
```
**Change the password immediately after first login.**

---

## API Endpoints

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/user/register` | Register user |
| POST | `/api/user/login` | Login user |
| POST | `/api/admin/login` | Login admin |

### Food
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/food/get` | Get all food items |
| POST | `/api/food/add` | Add food item (admin) |
| POST | `/api/food/update` | Update food item (admin) |
| DELETE | `/api/food/remove` | Delete food item (admin) |

### Cart
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/cart/add` | Add to cart |
| DELETE | `/api/cart/remove` | Remove from cart |
| GET | `/api/cart/get` | Get cart |

### Orders
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/order/initialize` | Initialize Chapa payment |
| GET | `/api/order/verify/:tx_ref` | Verify payment |
| POST | `/api/order/userorders` | Get user's orders |
| POST | `/api/order/list` | List all orders (admin) |
| POST | `/api/order/status` | Update order status (admin) |

### Admin
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/dashboard` | Dashboard stats |
| GET | `/api/admin/profile` | Admin profile |
| POST | `/api/admin/update` | Update admin profile |
| GET | `/api/user/admin/list` | List all users |
| POST | `/api/user/admin/block` | Block/unblock user |

---

## Deployment

See the full deployment guide in the project. Summary:

| Service | Platform |
|---------|----------|
| Backend | [Render](https://render.com) — Root: `backend`, Start: `npm start` |
| Frontend | [Vercel](https://vercel.com) — Root: `frontend` |
| Admin | [Vercel](https://vercel.com) — Root: `admin` |
| Database | [MongoDB Atlas](https://cloud.mongodb.com) |

---

## Features

**Customer App**
- Browse Ethiopian food menu with category filters
- User registration and login
- Add to cart, update quantities
- Checkout with Chapa payment
- Real-time order tracking with status updates
- User profile management

**Admin Panel**
- Dashboard with revenue, order, and user stats
- Order management with status updates
- User management (view, block, delete)
- Product management (add, edit, delete)
- Payment transaction history
- Dark/light mode

---

## License

MIT
