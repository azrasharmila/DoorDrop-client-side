import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`)

            return res.data;
        }
    })

    return (
        <div>
            <h2 className='text-4xl'>Completed Deliveries:{parcels.length} </h2>
        </div>
    );
};

export default CompletedDeliveries;