import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Legend, Pie, PieChart, Tooltip, Cell } from 'recharts';

const AdminDashboardHome = () => {
    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];
    const axiosSecure = useAxiosSecure();

    const { data: deliveryStats = [] } = useQuery({
        queryKey: ['delivery-status-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/delivery-status/stats');
            return res.data;
        }
    })

    console.log(deliveryStats);

    const getPieChartData = data => {
        return data
            .filter(item => item._id !== null)
            .map(item => ({
                name: item._id.replaceAll('_', ' '),
                value: item.count
            }));
    }

    const pieData = getPieChartData(deliveryStats);

    return (
        <div>
            <h2 className="text-4xl mb-9 text-secondary/60 font-semibold bg-secondary/10 p-5 rounded-3xl">Admin Dashboard</h2>

            <div className="stats shadow ">
                {
                    deliveryStats
                        .filter(stat => stat._id !== null)
                        .map(stat => <div key={stat._id} className="stat">
                            <div className="stat-figure text-secondary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-8 w-8 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </div>

                            <div className="stat-title text-xl text-primary">{stat._id}</div>
                            <div className="stat-value">{stat.count}</div>
                            <div className="stat-desc">Feb 1st - March 1st</div>
                        </div>)
                }
            </div>

            <div className='w-full h-[400px] mt-4'>
                <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
                    
                    <Pie
                        dataKey="value"
                        nameKey="name"
                        startAngle={180}
                        endAngle={0}
                        data={pieData}
                        cx="50%"
                        cy="100%"
                        outerRadius="120%"
                        label
                        isAnimationActive={true}
                    >
                        {
                            pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))
                        }
                    </Pie>

                    <Legend />
                    <Tooltip />

                </PieChart>
            </div>
        </div>
    );
}

export default AdminDashboardHome;