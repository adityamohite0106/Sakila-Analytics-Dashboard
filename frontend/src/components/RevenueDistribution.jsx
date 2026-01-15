import { useQuery } from '@apollo/client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { GET_REVENUE_BY_CATEGORY } from '../graphql/queries';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

export default function RevenueDistribution({ filters }) {
  const { loading, error, data } = useQuery(GET_REVENUE_BY_CATEGORY, {
    variables: filters
  });

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error.message}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Revenue Distribution by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data.getRevenueByCategory}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ categoryName, percentage }) => `${categoryName} (${percentage.toFixed(1)}%)`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="revenue"
          >
            {data.getRevenueByCategory.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}