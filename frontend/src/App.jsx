import { useState, useEffect } from 'react';
import GlobalFilters from './components/GlobalFilters';
import TopRentedFilms from './components/TopRentedFilms';
import RevenueDistribution from './components/RevenueDistribution';
import TopCustomers from './components/TopCustomers';
import BusinessKPIs from './components/BusinessKPIs';
import RecentTransactions from './components/RecentTransactions';

export default function App() {
  const [filters, setFilters] = useState({
    storeId: null,
    startDate: '2005-05-01',
    endDate: '2006-02-28'
  });
  const [isMockData, setIsMockData] = useState(false);

  useEffect(() => {
    // Check if mock data is being used by looking for console warnings
    const originalWarn = console.warn;
    let hasMockDataWarning = false;

    console.warn = function(...args) {
      if (args[0]?.includes('Database error, using mock data')) {
        hasMockDataWarning = true;
        setIsMockData(true);
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {isMockData && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-0">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-800">
                ⚠️ Demo Mode: Displaying mock data. Database connection not available. Real data will appear once the database is configured.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Sakila Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">DVD Rental Store Business Metrics</p>
        </header>

        <GlobalFilters filters={filters} setFilters={setFilters} />
        
        <BusinessKPIs filters={filters} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TopRentedFilms filters={filters} />
          <RevenueDistribution filters={filters} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopCustomers filters={filters} />
          <RecentTransactions filters={filters} />
        </div>
      </div>
    </div>
  );
}