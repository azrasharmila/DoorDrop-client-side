import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import StatusCard from '../../../Components/StatusCard/StatusCard';
import { FiShieldOff } from 'react-icons/fi';
import { FaUserShield } from 'react-icons/fa6';
import toast from 'react-hot-toast';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();

    const {refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
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


    const handleMakeAdmin = user =>{
        const roleInfo = {role:'admin'}
        axiosSecure.patch(`users/${user._id}`, roleInfo)
        .then(res =>{
            console.log(res.data);
            
            if(res.data.modifiedCount){
                refetch();
                toast.success(`${user.displayName} marked as an Admin`)

            }
        })
    }

    const handleRemoveAdmin = user =>{
         const roleInfo = {role:'user'}
        axiosSecure.patch(`users/${user._id}`, roleInfo)
        .then(res =>{
            console.log(res.data);
            
            if(res.data.modifiedCount){
                refetch();
                toast.success(`${user.displayName} has been removed from Admin`)

            }
        })
    }
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
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr>
                            <td>
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
                                        <div className="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.role}
                            </td>
                             <td>
                                {user.role === 'admin' ?
                                    <button
                                        onClick={() => handleRemoveAdmin(user)}
                                        className='btn bg-primary'>
                                        <FiShieldOff />
                                    </button> :
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className='btn bg-secondary'>
                                        <FaUserShield></FaUserShield>
                                    </button>
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