# Sakila Analytics Dashboard

A professional, full-stack Single Page Application (SPA) for visualizing DVD rental store business metrics using React, GraphQL, and the Sakila sample database.

<img width="1919" height="946" alt="image" src="https://github.com/user-attachments/assets/947db81a-c916-4c16-8b57-2baf3cb9bb0e" />

<img width="1919" height="933" alt="image" src="https://github.com/user-attachments/assets/ec5e29fa-50f8-42ba-a56a-2af3f59361a0" />

<img width="1906" height="913" alt="image" src="https://github.com/user-attachments/assets/987e205c-051d-4f87-9401-8203a3c415ac" />

## 🎯 Features

✅ **5 Interactive Dashboard Components**
- Top 5 Rented Films (Bar Chart)
- Revenue Distribution by Category (Pie Chart)
- Top 10 Customers (Data Table with Sorting)
- Business KPIs (Total Revenue & Active Rentals)
- Recent Transactions (Activity Feed)

✅ **Global Filter System**
- Store Selection (All Stores, Store 1, Store 2)
- Date Range Picker (Start & End Date)
- Real-time data refresh for all components

✅ **Professional UI**
- Responsive design (Mobile, Tablet, Desktop)
- Tailwind CSS styling
- Interactive charts with Recharts
- Loading and error states
- Demo mode indicator for mock data

✅ **Robust Backend**
- GraphQL API with 5 queries
- MySQL database integration (with mock data fallback)
- Filter support on all queries
- Error handling and logging

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- MySQL (optional - mock data works without it)

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend will run on: `http://localhost:4000/graphql`

#### Database Configuration (Optional)

Create/edit `.env` file in backend directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=sakila
SERVER_PORT=4000
```

> Note: If database is not configured, the app will automatically use mock data for demonstration.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on: `http://localhost:5174` (or next available port)

---

## 📊 Dashboard Components

### 1. Top 5 Rented Films
**Type:** Bar Chart
- **X-Axis:** Film Title
- **Y-Axis:** Total Rental Count
- **Interactive:** Tooltips on hover
- **Updates:** When filters change

### 2. Revenue Distribution
**Type:** Pie Chart
- **Legend:** Category Name
- **Slices:** Percentage of revenue
- **Interactive:** Hover shows dollar amounts
- **Updates:** When filters change

### 3. Top 10 Customers
**Type:** Data Table
- **Columns:** Customer ID, Full Name, Total Rentals, Total Spent
- **Sortable:** Click column headers to sort
- **Interactive:** Row highlighting on hover
- **Default Sort:** Total Spent (descending)
- **Updates:** When filters change

### 4. Business KPIs
**Type:** Scorecards
- **Metric 1:** Total Revenue (formatted as currency)
- **Metric 2:** Active Rentals (count)
- **Style:** Gradient backgrounds with icons
- **Updates:** When filters change

### 5. Recent Transactions
**Type:** Activity Feed
- **Format:** "[Customer Name] rented [Film Title] for $[Amount]"
- **Includes:** Timestamp of transaction
- **Interactive:** Card hover states
- **Updates:** When filters change

---

## 🔧 Tech Stack

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Charting:** Recharts
- **State Management:** React Hooks + Apollo Client
- **HTTP Client:** Apollo Client (GraphQL)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **API:** GraphQL (express-graphql)
- **Database:** MySQL
- **Packages:** 
  - `graphql`: 15.8.0
  - `express-graphql`: 0.12.0
  - `mysql2`: 3.6.5
  - `cors`: 2.8.5
  - `dotenv`: 16.3.1

### Database
- **Sample Data:** Sakila Database (DVD Rental Store)
- **Date Range:** 2005-05-01 to 2006-02-28
- **Fallback:** Mock data for demo mode

---

## 📁 Project Structure

```
Apollo/
├── backend/
│   ├── graphql/
│   │   ├── resolvers.js          # GraphQL resolver functions
│   │   └── schema.js             # GraphQL schema definition
│   ├── db.js                     # Database connection pool
│   ├── index.js                  # Express server setup
│   ├── package.json              # Dependencies
│   ├── .env                      # Database configuration (create this)
│   └── node_modules/             # Installed packages
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point with Apollo setup
│   │   ├── index.css             # Global styles
│   │   ├── components/
│   │   │   ├── GlobalFilters.jsx
│   │   │   ├── TopRentedFilms.jsx
│   │   │   ├── RevenueDistribution.jsx
│   │   │   ├── TopCustomers.jsx
│   │   │   ├── BusinessKPIs.jsx
│   │   │   └── RecentTransactions.jsx
│   │   ├── graphql/
│   │   │   └── queries.js        # GraphQL queries
│   │   └── assets/
│   ├── package.json              # Dependencies
│   ├── tailwind.config.js         # Tailwind configuration
│   ├── postcss.config.js          # PostCSS configuration
│   ├── vite.config.js            # Vite configuration
│   └── node_modules/             # Installed packages
│
└── REQUIREMENTS_VERIFICATION.md  # Detailed requirements checklist
```

---

## 🔄 How Filters Work

1. **User Changes Filter**
   - Selects a Store or changes Date Range in GlobalFilters
   - State updates in App.jsx

2. **Props Propagate**
   - Filter values passed to all 5 dashboard components

3. **Auto Refetch**
   - Apollo Client detects variable changes
   - Automatically fetches new data with new filter values

4. **Components Update**
   - All charts and tables update with new data
   - Loading states shown during fetch
   - Error states handled gracefully

---

## 📝 Default Values

When the app loads, default filters are:
- **Store:** All Stores (empty/null)
- **Start Date:** 2005-05-01 (Sakila era)
- **End Date:** 2006-02-28 (Sakila era)

These dates ensure data is available on first load.

---

## 🎓 Understanding Mock Data

When the database is not available:
1. A **yellow warning banner** appears at the top: "Demo Mode: Displaying mock data"
2. Backend resolvers return mock data instead of querying database
3. Console shows warnings about database connection
4. All dashboard functionality works normally

This allows the app to be demoed without a live database setup.

---

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Clear port 4000 (backend)
Get-NetTCPConnection -LocalPort 4000 | Stop-Process -Force

# Clear port 5174 (frontend)
Get-NetTCPConnection -LocalPort 5174 | Stop-Process -Force
```

### Database Connection Failed
- Edit `.env` with correct credentials
- Or use mock data in demo mode
- Check MySQL is running: `mysql -u root -p`

### Module Not Found
```bash
# Reinstall dependencies
rm -r node_modules
npm install
```

### Vite Cache Issues
```bash
# Clear Vite cache
rm -r node_modules/.vite
npm run dev
```

---

## 📊 Sample Data (Mock)

### Top Rented Films
- ACADEMY DINOSAUR (23 rentals)
- ACE GOLDFINGER (20 rentals)
- ADAPTATION HOLES (18 rentals)
- AFFAIR PREJUDICE (17 rentals)
- AFRICAN EGG (16 rentals)

### Revenue by Category
- Action: $5,814.48 (15.2%)
- Animation: $4,656.39 (12.1%)
- Classics: $3,827.39 (10.0%)
- Comedy: $4,131.98 (10.8%)
- Documentary: $2,032.42 (5.3%)

### Key Metrics
- Total Revenue: $67,406.13
- Active Rentals: 183

---

## 🛠️ Development

### Frontend Commands
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Commands
```bash
npm start        # Start server
npm run dev      # Start with nodemon (requires setup)
```

---

## 📈 Next Steps / Enhancements

- [ ] Add real-time WebSocket updates
- [ ] Implement authentication/authorization
- [ ] Add data export (CSV, PDF)
- [ ] Add more detailed analytics
- [ ] Implement pagination for large datasets
- [ ] Add caching layer
- [ ] Performance optimization
- [ ] Unit and integration tests

---

## 📄 License

This project is for educational purposes.

---

## 👤 Author

Created as a demonstration of full-stack web development with React, GraphQL, and Node.js.

---

## ❓ FAQ

**Q: Do I need a real database to run this?**
A: No! The app works perfectly with mock data. Real data from a MySQL database is used if configured.

**Q: How do I connect a real Sakila database?**
A: Download the Sakila schema from MySQL documentation, import it into your MySQL instance, and update the `.env` file with your credentials.

**Q: Can I change the default date range?**
A: Yes! Edit the default dates in `App.jsx`:
```javascript
const [filters, setFilters] = useState({
  storeId: null,
  startDate: '2005-05-01',  // Change this
  endDate: '2006-02-28'     // Change this
});
```

**Q: Why are dates limited to 2005-2006?**
A: The Sakila sample database contains historical data from that period. This is intentional for realistic sample data.

**Q: How do I modify a query?**
A: Edit the resolver in `backend/graphql/resolvers.js` and update the corresponding GraphQL query in `frontend/src/graphql/queries.js`.

---

## 📞 Support

Check the REQUIREMENTS_VERIFICATION.md file for a detailed checklist of all implemented features.
