import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useRef } from 'react';

const AssignRiders = () => {

    const [selectedParcel, setSelectedParcel] = useState(null);
    const axiosSecure = useAxiosSecure();
    const riderModalRef = useRef();
    const { data: parcels = [] } = useQuery({
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
            const res = await axiosSecure.get(`/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`);
            return res.data;
        }
    })

    const openAssignRiderModal = parcel => {
        setSelectedParcel(parcel);

        riderModalRef.current.showModal()
    }


    return (
        <div>
            <h2 className='text-4xl'>Assign riders:{parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Created At</th>
                            <th>Pickup District</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => <tr key={parcel._id}>
                            <th>{index + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>{parcel.cost}</td>
                            <td>{parcel.createdAt}</td>
                            <td>{parcel.senderDistrict}</td>
                            <td>
                                <button onClick={() => openAssignRiderModal(parcel)}
                                    className='btn btn-sm btn-primary text-black'>Find Riders</button>
                            </td>
                        </tr>)}

                    </tbody>
                </table>
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