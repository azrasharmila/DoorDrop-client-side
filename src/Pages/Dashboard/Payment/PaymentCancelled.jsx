import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2 className='text-3xl text-red-500'>Payment has been cancelled. please try again</h2>
            <Link to="/dashboard/my-parcels">
            <button className='btn btn-secondary text-accent'>Try Again</button></Link>
        </div>
    );
};

export default PaymentCancelled;