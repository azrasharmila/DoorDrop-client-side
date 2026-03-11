import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],

        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`)
            return res.data
        }

    })
    const handleDeliveryStatusUpdate = (parcel, status) => {
        console.log('Clicked parcel:', parcel);
        console.log('Parcel ID:', parcel._id);
        console.log('Status to update:', status);
        const statusInfo = {
            deliveryStatus: status,
            riderId: parcel.riderId,
            trackingId: parcel.trackingId
        };
        let message = `Parcel Status is updated with ${status.split('_').join(' ')}`



        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.error('Error updating delivery status:', err);
                Swal.fire({
                    icon: "error",
                    title: "Failed!",
                    text: "Could not update status."
                });
            });
    };
    return (
        <div>
            <h2 className="text-4xl text-secondary mb-5 font-bold">Parcels Pending Pickup: {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>

                            <th>Confirm</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, i) => <tr key={parcel._id}>
                            <th>{i + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>

                                {
                                    parcel.deliveryStatus === 'driver_assigned'
                                        ? <>
                                            <button
                                                onClick={() => handleDeliveryStatusUpdate(parcel, 'rider_arriving')}
                                                className='btn btn-primary text-black'>Accept</button>
                                            <button className='btn btn-warning text-black ms-2'>Reject</button>
                                        </>
                                        : <span>Accepted</span>
                                }



                            </td>
                            <td>
                                <button
                                    onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_picked_up')}
                                    className='btn btn-primary text-black'>Mark as Picked Up</button>

                                <button
                                    onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_delivered')}
                                    className='btn btn-primary text-black mx-2'>Mark as Delivered</button>
                            </td>
                        </tr>)}


                    </tbody>
                </table>
            </div>
        </div >
    );
};


export default AssignedDeliveries;