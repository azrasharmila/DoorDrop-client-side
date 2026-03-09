import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useRef } from 'react';
import Swal from 'sweetalert2';

const AssignRiders = () => {

    const [selectedParcel, setSelectedParcel] = useState(null);
    const axiosSecure = useAxiosSecure();
    const riderModalRef = useRef();
    const queryClient = useQueryClient();
    const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup')
            return res.data;
        }
    })

    const { data: riders = [] } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const url = `/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`;

            console.log("Fetching riders from:", url);

            const res = await axiosSecure.get(url);
            return res.data;
        }
    })

    const openAssignRiderModal = parcel => {
        setSelectedParcel(parcel);

        riderModalRef.current.showModal()
    }


    const handleAssignRider = async (rider) => {
        try {
            console.log("Assign button clicked");

            const riderAssignInfo = {
                riderId: rider._id,
                riderEmail: rider.email,
                riderName: rider.name,
                parcelId: selectedParcel._id,
                trackingId: selectedParcel.trackingId
            };

            const res = await axiosSecure.patch(
                `/parcels/${selectedParcel._id}`,
                riderAssignInfo
            );

            console.log("Server response:", res.data);

            // await axiosSecure.patch(`/riders/${rider._id}`, { workStatus: "in_delivery" });
            riderModalRef.current.close();


            parcelsRefetch();
            queryClient.invalidateQueries(['riders', selectedParcel?.senderDistrict, 'available']);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Rider has been assigned.",
                showConfirmButton: false,
                timer: 1500
            });

        } catch (error) {
            console.error("Assign error:", error);

            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "Rider assignment failed."
            });
        }
    };

    return (
        <div>
            <h2 className='text-4xl text-secondary my-5 font-semibold'>Assign riders:{parcels.length}</h2>
            <div className="hidden md:block overflow-x-auto w-full">
                <table className="table table-zebra w-full min-w-[600px]">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th >Cost</th>
                            <th >Created At</th>
                            <th>Pickup District</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => <tr key={parcel._id}>
                            <th>{index + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td >{parcel.cost}</td>
                            <td >{parcel.createdAt}</td>
                            <td>{parcel.senderDistrict}</td>
                            <td>
                                <button onClick={() => openAssignRiderModal(parcel)}
                                    className='btn btn-sm btn-primary text-black'>Find Riders</button>
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
            <div className="block md:hidden">
                {parcels.map((parcel, index) => (
                    <div key={index} className="p-4 mb-4 shadow rounded-lg border border-gray-200">
                        <p><span className="font-bold">Name:</span> {parcel.parcelName}</p>
                        <p><span className="font-bold">Cost:</span> {parcel.cost}</p>
                        <p><span className="font-bold">Created At:</span> {parcel.createdAt}</p>
                        <p><span className="font-bold">Pickup District:</span> {parcel.senderDistrict}</p>
                        <div className="mt-2">
                            <button
                                onClick={() => openAssignRiderModal(parcel)}
                                className="btn btn-sm btn-primary w-full text-black"
                            >
                                Find Riders
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Riders: {riders.length}!</h3>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riders.map((rider, i) => <tr key={rider._id}>
                                    <th>{i + 1}</th>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>
                                        <button
                                            onClick={() => handleAssignRider(rider)}
                                            className='btn btn-primary text-black'>Assign</button>
                                    </td>
                                </tr>)}


                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRiders;