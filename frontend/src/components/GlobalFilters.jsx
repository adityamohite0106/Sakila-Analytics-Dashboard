export default function GlobalFilters({ filters, setFilters }) {
  const handleStoreChange = (e) => {
    setFilters({ ...filters, storeId: e.target.value ? parseInt(e.target.value) : null });
  };

  const handleStartDateChange = (e) => {
    setFilters({ ...filters, startDate: e.target.value });
  };

  const handleEndDateChange = (e) => {
    setFilters({ ...filters, endDate: e.target.value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Global Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Store</label>
          <select
            value={filters.storeId || ''}
            onChange={handleStoreChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Stores</option>
            <option value="1">Store 1</option>
            <option value="2">Store 2</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={handleStartDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={handleEndDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>📅 Current Date Range: <strong>{filters.startDate}</strong> to <strong>{filters.endDate}</strong></p>
        <p>🏪 Store: <strong>{filters.storeId ? `Store ${filters.storeId}` : 'All Stores'}</strong></p>
      </div>
    </div>
  );
}