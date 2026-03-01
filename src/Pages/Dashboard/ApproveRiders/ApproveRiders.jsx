import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaUserCheck } from 'react-icons/fa';
import { RiDeleteBack2Fill } from "react-icons/ri";
import Swal from 'sweetalert2';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();

    const {refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    })

    const updateRiderStatus = (id,status) =>{
         const updateInfo = { status: status }
        axiosSecure.patch(`/riders/${id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Rider status is set to ${status}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })

    }

    const handleApproval = (id) => {
        updateRiderStatus(id,'approved');
       
    }

    const handleReject = (id)=>{
        updateRiderStatus(id,'Rejected');

    }

    
    return (
        <div>
            <h2>riders pending:{riders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>

                            <th>Name</th>
                            <th>District</th>
                            <th>License</th>
                            <th>status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, index) => <tr key={index}>
                                <th>{index + 1}</th>

                                <td>{rider.name}</td>
                                <td>{rider.district}</td>
                                <td>{rider.license}</td>
                                <td>
                                    <p className={`${rider.status === 'approved' ? 'text-green-800' : 'text-red-500'}`}>{rider.status}</p>
                                </td>
                                <td>
                                    <button onClick={() => handleApproval(rider._id)}
                                        className='btn'>
                                        <FaUserCheck />
                                    </button>
                                    <button onClick={() => handleReject(rider._id)}

                                        className='btn'>
                                        <RiDeleteBack2Fill />
                                    </button>

                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;