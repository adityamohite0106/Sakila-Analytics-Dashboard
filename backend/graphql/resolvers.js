import pool from '../db.js';

// Mock data for demo purposes
const mockFilms = [
  { filmId: 1, title: 'ACADEMY DINOSAUR', rentalCount: 23 },
  { filmId: 2, title: 'ACE GOLDFINGER', rentalCount: 20 },
  { filmId: 3, title: 'ADAPTATION HOLES', rentalCount: 18 },
  { filmId: 4, title: 'AFFAIR PREJUDICE', rentalCount: 17 },
  { filmId: 5, title: 'AFRICAN EGG', rentalCount: 16 },
];

const mockCategories = [
  { categoryName: 'Action', revenue: 5814.48, percentage: 15.2 },
  { categoryName: 'Animation', revenue: 4656.39, percentage: 12.1 },
  { categoryName: 'Classics', revenue: 3827.39, percentage: 10.0 },
  { categoryName: 'Comedy', revenue: 4131.98, percentage: 10.8 },
  { categoryName: 'Documentary', revenue: 2032.42, percentage: 5.3 },
];

const mockCustomers = [
  { customerId: 1, firstName: 'MARY', lastName: 'SMITH', totalRentals: 32, totalSpent: 144.62 },
  { customerId: 2, firstName: 'PATRICIA', lastName: 'JOHNSON', totalRentals: 27, totalSpent: 118.68 },
  { customerId: 3, firstName: 'LINDA', lastName: 'WILLIAMS', totalRentals: 26, totalSpent: 121.45 },
  { customerId: 4, firstName: 'BARBARA', lastName: 'JONES', totalRentals: 24, totalSpent: 105.78 },
  { customerId: 5, firstName: 'ELIZABETH', lastName: 'BROWN', totalRentals: 23, totalSpent: 99.50 },
];

const mockTransactions = [
  { paymentId: 1, customerName: 'MARY SMITH', filmTitle: 'ACADEMY DINOSAUR', amount: 4.99, paymentDate: '2024-01-15T10:30:00Z' },
  { paymentId: 2, customerName: 'PATRICIA JOHNSON', filmTitle: 'ACE GOLDFINGER', amount: 5.99, paymentDate: '2024-01-15T11:00:00Z' },
  { paymentId: 3, customerName: 'LINDA WILLIAMS', filmTitle: 'ADAPTATION HOLES', amount: 6.99, paymentDate: '2024-01-15T11:30:00Z' },
  { paymentId: 4, customerName: 'BARBARA JONES', filmTitle: 'AFFAIR PREJUDICE', amount: 4.99, paymentDate: '2024-01-15T12:00:00Z' },
  { paymentId: 5, customerName: 'ELIZABETH BROWN', filmTitle: 'AFRICAN EGG', amount: 5.99, paymentDate: '2024-01-15T12:30:00Z' },
];

const resolvers = {
  getTopRentedFilms: async ({ storeId, startDate, endDate }) => {
    try {
      try {
        const connection = await pool.getConnection();
        
        let query = `
          SELECT 
            f.film_id as filmId,
            f.title,
            COUNT(r.rental_id) as rentalCount
          FROM film f
          LEFT JOIN inventory i ON f.film_id = i.film_id
          LEFT JOIN rental r ON i.inventory_id = r.inventory_id
          WHERE 1=1
        `;
        const params = [];

        if (storeId) {
          query += ` AND i.store_id = ?`;
          params.push(storeId);
        }

        if (startDate && endDate) {
          query += ` AND r.rental_date BETWEEN ? AND ?`;
          params.push(startDate, endDate);
        }

        query += ` GROUP BY f.film_id, f.title ORDER BY rentalCount DESC LIMIT 10`;

        const [rows] = await connection.execute(query, params);
        connection.release();
        
        return rows;
      } catch (dbError) {
        console.warn('Database error, using mock data:', dbError.message);
        return mockFilms;
      }
    } catch (error) {
      console.error('Error fetching top rented films:', error);
      return mockFilms;
    }
  },

  getRevenueByCategory: async ({ storeId, startDate, endDate }) => {
    try {
      try {
        const connection = await pool.getConnection();
        
        let query = `
          SELECT 
            c.name as categoryName,
            SUM(p.amount) as revenue,
            ROUND((SUM(p.amount) / (SELECT SUM(p2.amount) FROM payment p2 WHERE 1=1` 
            + (storeId ? ` AND p2.staff_id IN (SELECT staff_id FROM staff WHERE store_id = ?)` : '') +
            (startDate && endDate ? ` AND p2.payment_date BETWEEN ? AND ?` : '') + 
            `) * 100), 2) as percentage
          FROM category c
          LEFT JOIN film_category fc ON c.category_id = fc.category_id
          LEFT JOIN film f ON fc.film_id = f.film_id
          LEFT JOIN inventory i ON f.film_id = i.film_id
          LEFT JOIN rental r ON i.inventory_id = r.inventory_id
          LEFT JOIN payment p ON r.rental_id = p.rental_id
          WHERE 1=1
        `;
        const params = [];

        if (storeId) {
          query += ` AND i.store_id = ?`;
          params.push(storeId);
        }

        if (startDate && endDate) {
          query += ` AND p.payment_date BETWEEN ? AND ?`;
          params.push(startDate, endDate);
        }

        query += ` GROUP BY c.category_id, c.name ORDER BY revenue DESC`;

        const [rows] = await connection.execute(query, params);
        connection.release();
        
        return rows;
      } catch (dbError) {
        console.warn('Database error, using mock data:', dbError.message);
        return mockCategories;
      }
    } catch (error) {
      console.error('Error fetching revenue by category:', error);
      return mockCategories;
    }
  },

  getTopCustomers: async ({ storeId, startDate, endDate }) => {
    try {
      try {
        const connection = await pool.getConnection();
        
        let query = `
          SELECT 
            c.customer_id as customerId,
            c.first_name as firstName,
            c.last_name as lastName,
            COUNT(r.rental_id) as totalRentals,
            SUM(p.amount) as totalSpent
          FROM customer c
          LEFT JOIN rental r ON c.customer_id = r.customer_id
          LEFT JOIN payment p ON r.rental_id = p.rental_id
          WHERE 1=1
        `;
        const params = [];

        if (storeId) {
          query += ` AND c.store_id = ?`;
          params.push(storeId);
        }

        if (startDate && endDate) {
          query += ` AND r.rental_date BETWEEN ? AND ?`;
          params.push(startDate, endDate);
        }

        query += ` GROUP BY c.customer_id, c.first_name, c.last_name ORDER BY totalSpent DESC LIMIT 10`;

        const [rows] = await connection.execute(query, params);
        connection.release();
        
        return rows;
      } catch (dbError) {
        console.warn('Database error, using mock data:', dbError.message);
        return mockCustomers;
      }
    } catch (error) {
      console.error('Error fetching top customers:', error);
      return mockCustomers;
    }
  },

  getKeyMetrics: async ({ storeId, startDate, endDate }) => {
    try {
      try {
        const connection = await pool.getConnection();
        
        let query = `
          SELECT 
            SUM(p.amount) as totalRevenue,
            COUNT(DISTINCT CASE WHEN r.return_date IS NULL THEN r.rental_id END) as activeRentals
          FROM payment p
          LEFT JOIN rental r ON p.rental_id = r.rental_id
          LEFT JOIN inventory i ON r.inventory_id = i.inventory_id
          WHERE 1=1
        `;
        const params = [];

        if (storeId) {
          query += ` AND i.store_id = ?`;
          params.push(storeId);
        }

        if (startDate && endDate) {
          query += ` AND p.payment_date BETWEEN ? AND ?`;
          params.push(startDate, endDate);
        }

        const [rows] = await connection.execute(query, params);
        connection.release();
        
        return {
          totalRevenue: rows[0].totalRevenue || 0,
          activeRentals: rows[0].activeRentals || 0
        };
      } catch (dbError) {
        console.warn('Database error, using mock data:', dbError.message);
        return {
          totalRevenue: 67406.13,
          activeRentals: 183
        };
      }
    } catch (error) {
      console.error('Error fetching key metrics:', error);
      return {
        totalRevenue: 67406.13,
        activeRentals: 183
      };
    }
  },

  getRecentTransactions: async ({ storeId, startDate, endDate, limit = 20 }) => {
    try {
      try {
        const connection = await pool.getConnection();
        
        let query = `
          SELECT 
            p.payment_id as paymentId,
            CONCAT(c.first_name, ' ', c.last_name) as customerName,
            f.title as filmTitle,
            p.amount,
            p.payment_date as paymentDate
          FROM payment p
          LEFT JOIN rental r ON p.rental_id = r.rental_id
          LEFT JOIN customer c ON r.customer_id = c.customer_id
          LEFT JOIN inventory i ON r.inventory_id = i.inventory_id
          LEFT JOIN film f ON i.film_id = f.film_id
          WHERE 1=1
        `;
        const params = [];

        if (storeId) {
          query += ` AND i.store_id = ?`;
          params.push(storeId);
        }

        if (startDate && endDate) {
          query += ` AND p.payment_date BETWEEN ? AND ?`;
          params.push(startDate, endDate);
        }

        query += ` ORDER BY p.payment_date DESC LIMIT ?`;
        params.push(limit);

        const [rows] = await connection.execute(query, params);
        connection.release();
        
        return rows;
      } catch (dbError) {
        console.warn('Database error, using mock data:', dbError.message);
        return mockTransactions;
      }
    } catch (error) {
      console.error('Error fetching recent transactions:', error);
      return mockTransactions;
    }
  }
};

export default resolvers;
