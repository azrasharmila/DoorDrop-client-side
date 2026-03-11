import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Tooltip, Legend,Cell} from 'recharts';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Contexts/AuthContext';

const RiderDashboardHome = () => {

  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const riderEmail = user?.email;

  const COLORS = ["#FFBB28", "#FF8042", "#00C49F"];

  const fetchParcelStats = async () => {
    const res = await axiosSecure.get(`/parcels/rider/status-counts?riderEmail=${riderEmail}`);
    return res.data;
  };

  const { data: parcelStats = { assigned: 0, pending: 0, delivered: 0 }, isLoading } = useQuery({
    queryKey: ['rider-parcel-stats', riderEmail],
    queryFn: fetchParcelStats,
    enabled: !!riderEmail, // prevents running before email loads
    refetchInterval: 5000,
    refetchOnWindowFocus: true
  });

  if (isLoading) {
    return <div className="text-center text-xl mt-10">Loading dashboard...</div>;
  }

  const pieData = [
    { name: 'Assigned', value: parcelStats.assigned },
    { name: 'Pending', value: parcelStats.pending },
    { name: 'Delivered', value: parcelStats.delivered }
  ];

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6">Rider Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold">Assigned Parcels</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">
            {parcelStats.assigned}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold">Pending Parcels</h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">
            {parcelStats.pending}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold">Delivered Parcels</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">
            {parcelStats.delivered}
          </p>
        </div>

      </div>

      {/* Pie Chart */}
      <div className="flex justify-center">

        <PieChart width={400} height={400}>

          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>

      </div>

    </div>
  );
};

export default RiderDashboardHome;