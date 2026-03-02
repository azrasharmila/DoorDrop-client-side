import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';

const Payment = () => {
     const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

    const handlePayment = async() => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        }

        const res= await axiosSecure.post('/create-checkout-session',paymentInfo)
        console.log(res.data);
        window.location.href = res.data.url;

    }
        




     if (isLoading) {
        return <div>
            <Loading></Loading>
        </div>
    }



    return (
        <div>
            <h2>please pay for ${parcel.cost} {parcel.parcelName}</h2>
            <button onClick={handlePayment} className='btn btn-secondary'>Pay</button>
        </div>
    );
};

export default Payment;