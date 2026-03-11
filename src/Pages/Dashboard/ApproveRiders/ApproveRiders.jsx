import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaUserCheck } from 'react-icons/fa';
import { RiDeleteBack2Fill } from "react-icons/ri";
import Swal from 'sweetalert2';
import { FaTrashCan } from 'react-icons/fa6';
import StatusCard from '../../../Components/StatusCard/StatusCard';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    })

    const totalRiders = riders.length;

    const approvedRiders = riders.filter(
        rider => rider.status === "approved"
    ).length;

    const rejectedRiders = riders.filter(
        rider => rider.status === "Rejected"
    ).length;

    const updateRiderStatus = (rider, status) => {

        const isApprove = status === "approved";

        Swal.fire({
            title: `${isApprove ? "Approve" : "Reject"} ${rider.name}?`,
            text: isApprove
                ? "This rider will be able to start working."
                : "This rider application will be rejected.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: `Yes, ${isApprove ? "Approve" : "Reject"}`,
            cancelButtonText: "Cancel",
            confirmButtonColor: isApprove
                ? "var(--color-secondary)"
                : "var(--color-primary)",
            cancelButtonColor: isApprove
                ? "var(--color-primary)"
                : "var(--color-secondary)"
        }).then((result) => {

            if (result.isConfirmed) {

                const updateInfo = { status: status, email: rider.email };

                axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `Rider status set to ${status}`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    });
            }
        });
    };

    const handleApproval = (rider) => {
        updateRiderStatus(rider, 'approved');

    }

    const handleReject = (rider) => {
        updateRiderStatus(rider, 'Rejected');

    }

    const handleRiderDelete = id => {
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/riders/${id}`)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.deletedCount) {

                            refetch();

                            Swal.fire({
                                title: "Deleted!",
                                text: "Rider has been deleted.",
                                icon: "success"
                            });
                        }

                    })


            }
        });

    }


    return (
        <div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                <StatusCard
                    title="Total Riders"
                    value={totalRiders}
                />

                <StatusCard
                    title="Apporoved Riders"
                    value={approvedRiders}
                />

                <StatusCard
                    title="Rejected Riders"
                    value={rejectedRiders}
                />

            </div>


            <div className="hidden md:block overflow-x-auto w-full">
                <table className="table table-zebra w-full min-w-[600px]">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>

                            <th >Name</th>
                            <th >District</th>
                            <th >License</th>
                            <th>Application status</th>
                            <th>Work Status</th>
                            <th >Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, index) => <tr key={index}>
                                <th >{index + 1}</th>

                                <td>{rider.name}</td>
                                <td >{rider.district}</td>
                                <td >{rider.license}</td>
                                <td>
                                    <p className={`${rider.status === 'approved' ? 'text-secondary' : 'text-primary'}`}>{rider.status}</p>
                                </td>
                                <td>
                                    {rider.status === 'approved' ? rider.workStatus : ''}
                                </td>
                                <td>


                                    <div className="tooltip tooltip-top" data-tip="Approve Rider">
                                        <button onClick={() => handleApproval(rider)}
                                            className='btn btn-square hover:bg-secondary'>
                                            <FaUserCheck />
                                        </button>

                                    </div>


                                    <div className="tooltip tooltip-top" data-tip="Reject Rider">
                                        <button onClick={() => handleReject(rider)}

                                            className='btn btn-square hover:bg-primary'>
                                            <RiDeleteBack2Fill />
                                        </button>
                                    </div>




                                    <div className="tooltip tooltip-top" data-tip="Delete Rider">
                                        <button
                                            onClick={() => handleRiderDelete(rider._id)}
                                            className="btn btn-square hover:bg-primary"
                                        >
                                            <FaTrashCan />
                                        </button>
                                    </div>




                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>


            <div className="block md:hidden">
                {riders.map((rider, index) => (
                    <div key={index} className="p-4 mb-4 shadow rounded-lg border border-gray-200">
                        <p><span className="font-bold">Name:</span> {rider.name}</p>
                        <p><span className="font-bold">District:</span> {rider.district}</p>
                        <p><span className="font-bold">License:</span> {rider.license}</p>
                        <p>
                            <span className="font-bold">Application Status:</span>
                            <span className={`${rider.status === 'approved' ? 'text-secondary' : 'text-primary'}`}>
                                {rider.status}
                            </span>
                        </p>
                        <p>
                            <span className="font-bold">Work Status:</span> {rider.status === 'approved' ? rider.workStatus : ''} 
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-2">
                            <button onClick={() => handleApproval(rider)}
                                className="btn btn-sm btn-square hover:bg-secondary"> <FaUserCheck /></button>
                            <button onClick={() => handleReject(rider)}
                                className="btn btn-sm btn-square hover:bg-primary"> <RiDeleteBack2Fill /></button>
                            <button onClick={() => handleRiderDelete(rider._id)}
                                className="btn btn-sm btn-square hover:bg-primary"> <FaTrashCan /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApproveRiders;