import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import StatusCard from '../../../Components/StatusCard/StatusCard';
import { FiShieldOff } from 'react-icons/fi';
import { FaUserShield } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('');

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        }
    })
    const totalUsers = users.length;

    const riderUsers = users.filter(
        user => user.role === "rider"
    ).length;

    const normalUsers = users.filter(
        user => !user.role || user.role === "user"
    ).length;




    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: `Make ${user.displayName} an Admin?`,
            text: "This user will get full admin access.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Make Admin",
            cancelButtonText: "Cancel",
            confirmButtonColor: "var(--color-primary)",
            cancelButtonColor: "var(--color-secondary)"
        }).then((result) => {
            if (result.isConfirmed) {
                const roleInfo = { role: 'admin' };

                axiosSecure.patch(`users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            toast.success(`${user.displayName} marked as Admin`);
                        }
                    });
            }
        });
    };

   const handleRemoveAdmin = (user) => {
    Swal.fire({
        title: `Remove ${user.displayName} from Admin?`,
        text: "This user will lose admin privileges.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Remove",
        cancelButtonText: "Cancel",
        confirmButtonColor: "var(--color-secondary)",
        cancelButtonColor: "var(--color-primary)"
    }).then((result) => {
        if (result.isConfirmed) {
            const roleInfo = { role: 'user' };

            axiosSecure.patch(`users/${user._id}/role`, roleInfo)
                .then(res => {
                    if (res.data.modifiedCount) {
                        refetch();
                        toast.success(`${user.displayName} removed from Admin`);
                    }
                });
        }
    });
};
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                <StatusCard
                    title="Total users"
                    value={totalUsers}
                />

                <StatusCard
                    title="Riders"
                    value={riderUsers}
                />

                <StatusCard
                    title="Regular Users"
                    value={normalUsers}
                />

            </div>

            <div className='flex justify-end mb-8'>
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input onChange={(e) => setSearchText(e.target.value)}

                        type="search"
                        className="grow"
                        placeholder="Search users" />

                </label>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="hidden md:table-cell">
                                #
                            </th>
                            <th>User</th>
                            <th className="hidden md:table-cell">Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr>
                            <td className="hidden md:table-cell">
                                {index + 1}
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.displayName}</div>
                                        <div className="text-sm opacity-50">Bangladesh</div>
                                    </div>
                                </div>
                            </td>
                            <td className="hidden md:table-cell">
                                {user.email}
                            </td>
                            <td>
                                {user.role}
                            </td>
                            <td>
                                {user.role === 'admin' ?
                                    <div className="tooltip tooltip-top" data-tip="Remove Admin"><button
                                        onClick={() => handleRemoveAdmin(user)}
                                        className='btn bg-primary'>
                                        <FiShieldOff />
                                    </button></div> :
                                    <div  className="tooltip tooltip-top" data-tip="Make Admin">
                                        <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className='btn bg-secondary'>
                                        <FaUserShield></FaUserShield>
                                    </button>
                                    </div>
                                }
                               
                            </td>

                        </tr>)}



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;