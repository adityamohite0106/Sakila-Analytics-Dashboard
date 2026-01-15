import { useQuery } from '@apollo/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GET_TOP_RENTED_FILMS } from '../graphql/queries';

export default function TopRentedFilms({ filters }) {
  const { loading, error, data } = useQuery(GET_TOP_RENTED_FILMS, {
    variables: filters
  });

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error.message}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Top 5 Rented Films</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.getTopRentedFilms}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="title" 
            angle={-45} 
            textAnchor="end" 
            height={100}
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="rentalCount" fill="#3b82f6" name="Rental Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}