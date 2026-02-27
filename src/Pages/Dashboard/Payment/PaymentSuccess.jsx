import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
     const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();
    console.log(sessionId);

     useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                     setPaymentInfo({
                         transactionId: res.data.transactionId,
                         trackingId : res.data.trackingId
                     })
                })
        }

    }, [sessionId, axiosSecure])
    
    return (
        <div>
            <h2 className='text-3xl text-green-800'>Payment Successfull</h2>
            <p>Transaction ID: {paymentInfo.transactionId}</p>
            <p>Your parcel tracking Id: {paymentInfo.trackingId} </p>
        </div>
    );
};

export default PaymentSuccess;