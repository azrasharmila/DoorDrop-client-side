import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';
import Loading from '../../../Components/Loading/Loading';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Contexts/AuthContext';

const UserDashboardHome = () => {

  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const COLORS = ["#FFBB28", "#FF8042", "#00C49F"];

  // Fetch parcels of logged in user
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['user-parcels', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    refetchInterval: 5000
  });

  if (loading || isLoading) {
    return <Loading></Loading>
  }

  // Parcel statistics
  const total = parcels.length;

  const pending = parcels.filter(
    p => p.deliveryStatus !== 'parcel_delivered'
  ).length;

  const delivered = parcels.filter(
    p => p.deliveryStatus === 'parcel_delivered'
  ).length;

  const pieData = [
    { name: 'Total', value: total, fill: COLORS[0] },
    { name: 'Pending', value: pending, fill: COLORS[1] },
    { name: 'Delivered', value: delivered, fill: COLORS[2] },
  ];

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold  text-secondary/80 mb-9">
        User Dashboard
      </h2>

     

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-10">

        <div className="bg-primary/20 shadow p-6 sm:p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Parcels</h3>
          <p className="text-2xl sm:text-3xl font-bold mt-2">{total}</p>
        </div>

        <div className="bg-primary/20 shadow p-6 sm:p-6  rounded-lg text-center">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-2xl sm:text-3xl font-bold mt-2">{pending}</p>
        </div>

        <div className="bg-primary/20 shadow p-6 sm:p-6  rounded-lg text-center">
          <h3 className="text-lg font-semibold">Delivered</h3>
          <p className="text-2xl sm:text-3xl font-bold mt-2">{delivered}</p>
        </div>

      </div>


      {/* Pie Chart */}

      <div className="flex justify-center mb-10">

        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>

      </div>


      {/* Parcel Table */}

      <div className="bg-white shadow rounded-lg p-4">

        <h3 className="text-xl font-bold mb-4">
          Your Parcels
        </h3>

        <div className="overflow-x-auto">

          <table className="table w-full min-w-[500px] md:min-w-full">

            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Parcel Name</th>
                <th>Weight</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {parcels.map(parcel => (

                <tr key={parcel._id}>

                  <td>{parcel.trackingId}</td>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.parcelWeight}</td>
                  <td>{parcel.deliveryStatus}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default UserDashboardHome;