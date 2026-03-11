import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`)

            return res.data;
        }
    })

    const calculatePayout = parcel => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return parcel.cost * 0.8
        }
        else {
            return parcel.cost * 0.6;
        }
    }


    return (
        <div>
            <h2 className='text-3xl font-semibold text-secondary m-6 bg-secondary/10 p-5 rounded-4xl'>Completed Deliveries : {parcels.length} </h2>
            <div className="hidden md:block overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Pickup District</th>
                            <th>Cost</th>
                            <th>Payout</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => <tr key={parcel._id}>
                            <th>{index + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>{parcel.createdAt}</td>
                            <td>{parcel.senderDistrict}</td>
                            <td>{parcel.cost}</td>
                            <td>{calculatePayout(parcel)}</td>


                           
                        </tr>)}

                    </tbody>
                </table>
            </div>

            <div className="block md:hidden px-4">
                {parcels.map((parcel, index) => (
                    <div key={parcel._id} className="p-4 mb-4 shadow rounded-lg border border-gray-200">
                        <p><span className="font-bold">#</span> {index + 1}</p>
                        <p><span className="font-bold">Name:</span> {parcel.parcelName}</p>
                        <p><span className="font-bold">Created At:</span> {parcel.createdAt}</p>
                        <p><span className="font-bold">Pickup District:</span> {parcel.senderDistrict}</p>
                        <p><span className="font-bold">Cost:</span> {parcel.cost}</p>
                        <p><span className="font-bold">Payout:</span> {calculatePayout(parcel)}</p>
                    </div>
                ))}
            </div> 
        </div>
    );
}

export default CompletedDeliveries;