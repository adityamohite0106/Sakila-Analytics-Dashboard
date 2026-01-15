import { useQuery } from '@apollo/client';
import { GET_RECENT_TRANSACTIONS } from '../graphql/queries';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export default function RecentTransactions({ filters }) {
  const { loading, error, data } = useQuery(GET_RECENT_TRANSACTIONS, {
    variables: { ...filters, limit: 20 }
  });

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error.message}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Recent Transactions</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {data.getRecentTransactions.map((transaction) => (
          <div 
            key={transaction.paymentId} 
            className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                <span className="font-semibold">{transaction.customerName}</span> rented{' '}
                <span className="font-semibold">{transaction.filmTitle}</span> for{' '}
                <span className="font-bold text-green-600">${transaction.amount.toFixed(2)}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(transaction.paymentDate)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


