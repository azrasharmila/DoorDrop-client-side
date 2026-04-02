import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignedDeliveries = () => {
    const { user } = useAuth();
    const [otpInputs, setOtpInputs] = useState({});
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],

        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`)
            return res.data
        }

    })

     const handleOtpChange = (id, value) => {
        setOtpInputs(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleVerifyOtp = async (parcel) => {
        const enteredOtp = otpInputs[parcel._id];

        if (!enteredOtp) {
            return Swal.fire("Error", "Enter OTP first", "error");
        }

        try {
            const res = await axiosSecure.patch(
                `/parcels/${parcel._id}/verify-otp`,
                {
                    otp: enteredOtp,
                    trackingId: parcel.trackingId
                }
            );

            if (res.data.success) {
                refetch();

                Swal.fire({
                    icon: "success",
                    title: "Delivery Confirmed "
                });
            } else {
                Swal.fire("Wrong OTP.", " Please check and try again. ", "error");
            }

        } catch (err) {
            console.error(err);
        }
    };

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
            <h2 className="text-4xl  mb-8 font-semibold text-primary m-6 bg-secondary/10 p-5 rounded-4xl">Pending-Pickup : {parcels.length}</h2>
            <div className="hidden md:block overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>

                            <th>Confirm</th>
                            <th>Actions</th>
                            <th>OTP</th>
                            <th>Verify</th>
                            <th>Status</th>
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
                                            <button disabled={parcel.deliveryStatus !== 'driver_assigned'}

                                                onClick={() => handleDeliveryStatusUpdate(parcel, 'rider_arriving')}
                                                className='btn btn-secondary text-black disabled:opacity-50'>Accept</button>
                                            <button onClick={() => handleDeliveryStatusUpdate(parcel, 'pending-pickup')} className='btn btn-warning text-black ms-2'>Reject</button>
                                        </>
                                        : <span>Accepted</span>
                                }



                            </td>
                            <td>
                                <button
                                    disabled={parcel.deliveryStatus !== 'rider_arriving'}
                                    onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_picked_up')}
                                    className='btn btn-primary text-black disabled:opacity-50'>Mark as Picked Up</button>

                                {/* <button
                                    disabled={parcel.deliveryStatus !== 'parcel_picked_up'}
                                    onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_delivered')}
                                    className='btn btn-secondary text-black mx-2 disabled:opacity-50'>Mark as Delivered</button> */}
                            </td>

                             <td>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    className="input input-sm w-24"
                                    value={otpInputs[parcel._id] || ""}
                                    onChange={(e) => handleOtpChange(parcel._id, e.target.value)}
                                />
                            </td>

                            <td>
                                <button
                                    onClick={() => handleVerifyOtp(parcel)}
                                    className="btn btn-success btn-sm text-black"
                                >
                                    Verify
                                </button>
                            </td>

                            <td>
                                {parcel.otpVerified ? (
                                    <span className="text-green-500 font-bold">Delivered</span>
                                ) : (
                                    <span className="text-gray-400">Pending</span>
                                )}
                            </td>
                        </tr>)}


                    </tbody>
                </table>
            </div>

            <div className="block md:hidden px-4">

                {parcels.map((parcel, index) => (

                    <div
                        key={parcel._id}
                        className="p-4 mb-4 shadow rounded-lg border border-gray-200"
                    >

                        <p>
                            <span className="font-bold">Name:</span> {parcel.parcelName}
                        </p>

                        <p>
                            <span className="font-bold">Status:</span> {parcel.deliveryStatus}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">

                            {parcel.deliveryStatus === 'driver_assigned'
                                ?
                                <>
                                    <button
                                        disabled={parcel.deliveryStatus !== 'driver_assigned'}
                                        onClick={() => handleDeliveryStatusUpdate(parcel, 'rider_arriving')}
                                        className='btn btn-sm btn-secondary text-black'
                                    >
                                        Accept
                                    </button>

                                    <button
                                        onClick={() => handleDeliveryStatusUpdate(parcel, 'pending-pickup')}
                                        className='btn btn-sm btn-warning text-black'
                                    >
                                        Reject
                                    </button>
                                </>
                                :
                                <span className="text-secondary font-semibold">Accepted</span>
                            }

                        </div>


                        {/* Other actions */}
                        <div className="mt-3 flex flex-wrap gap-2">

                            <button
                                disabled={parcel.deliveryStatus !== 'rider_arriving'}
                                onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_picked_up')}
                                className='btn btn-sm btn-primary text-black'
                            >
                                Picked Up
                            </button>
                            <button
                                disabled={parcel.deliveryStatus !== 'parcel_picked_up'}
                                onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_delivered')}
                                className='btn btn-sm btn-secondary text-black'
                            >
                                Delivered
                            </button>

                        </div>

                    </div>

                ))}

            </div>



        </div >
    );
};


export default AssignedDeliveries;