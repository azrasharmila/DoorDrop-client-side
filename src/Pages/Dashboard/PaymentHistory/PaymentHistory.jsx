import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <h2 className='text-3xl font-semibold text-secondary m-6 bg-secondary/10 p-5 rounded-4xl'>Payment history: {payments.length}</h2>

            <div className='overflow-x-auto'>
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th className="hidden md:table-cell">Customer Email</th>
                            <th className="hidden md:table-cell">Amount</th>
                            <th className="hidden md:table-cell">Paid Time</th>
                            <th>Transaction Id</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => <tr key={payment._id}>
                                <th className="hidden md:table-cell">{index + 1}</th>
                                <td>{payment.customerEmail}</td>
                                <td className="hidden md:table-cell">{payment.amount}</td>
                                <td className="hidden md:table-cell">{payment.paidAt}</td>
                                <td>{payment.transactionId}</td>
                                
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PaymentHistory;