import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { SiGoogletasks } from 'react-icons/si';
import { FaRegCreditCard, FaUsers, FaTasks } from "react-icons/fa";
import { MdAssignmentAdd, MdOutlineDirectionsBike, MdOutlineHome } from 'react-icons/md';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import useRole from '../Hooks/useRole';
import { FaUser } from 'react-icons/fa6';
import { TbLogout } from "react-icons/tb";
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { LuMapPinHouse } from "react-icons/lu";
const DashboardLayout = () => {
    const { role } = useRole();
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out from your account!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#E39C13",
            cancelButtonColor: "#7EA00E",
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire({
                            title: "Logged Out!",
                            text: "You have successfully logged out.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        });
                        navigate("/login");
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    };


    return (
        <div className="drawer lg:drawer-open max-w-7xl mx-auto">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300 flex justify-between">
                    <div className="flex items-center gap-3">

                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <div className="px-4"> Dashboard</div>
                    </div>

                    <div className="pr-4">
                        <Link to="/dashboard/profile">
                            <img
                                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                alt="profile"
                                className="w-10 h-10 rounded-full border-2 border-secondary cursor-pointer"
                            />
                        </Link>
                    </div>

                </nav>

                {/* Page content here */}
                <div className='p-7'>
                    <Outlet></Outlet>
                </div>

            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 ">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow text-accent ">
                        {/* List item */}
                        <li className='mb-1 mt-9'>
                            <NavLink className={({ isActive }) =>
                                `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2
                                 ${isActive ? " text-secondary text-lg bg-accent/10" : ""}`
                            } data-tip="Home " to="/">
                                <LuMapPinHouse className='text-primary' />
                                <span className="is-drawer-close:hidden">Home</span>
                            </NavLink>
                        </li>
                        <li className='my-3'>
                             <NavLink className={({ isActive }) =>
                                `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2
                                 ${isActive ? " text-secondary text-lg bg-accent/10" : ""}`
                            } data-tip="DashBoard " to="/dashboard">
                                <MdOutlineHome className='text-primary' />
                                <span className="is-drawer-close:hidden">Dashboard</span>
                            </NavLink>
                        </li>

                        {/* our dashboard links */}
                        <li className='mb-3'>
                            <NavLink className={({ isActive }) =>
                                `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2
                                 ${isActive ? " text-secondary text-lg bg-accent/10" : ""}`
                            } data-tip="MyParcels " to="/dashboard/my-parcels">
                                <CiDeliveryTruck className='text-primary' />
                                <span className="is-drawer-close:hidden">My Parcels</span>
                            </NavLink>
                        </li>
                        <li className='mb-3'>
                            <NavLink className={({ isActive }) =>
                                `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2
                                 ${isActive ? " text-secondary text-lg bg-accent/10" : ""}`
                            } data-tip="Payment History " to="/dashboard/payment-history">
                                <FaRegCreditCard className='text-primary' />
                                <span className="is-drawer-close:hidden">Payment History</span>
                            </NavLink>
                        </li>
                        {
                            role === 'rider' && <>
                                <li className='mb-3'>
                                    <NavLink className={({ isActive }) =>
                                        `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2
                                 ${isActive ? " text-secondary text-lg bg-accent/10" : ""}`
                                    } data-tip="Assigned Deliveries " to="/dashboard/assigned-deliveries">
                                        <FaTasks className='text-primary' />
                                        <span className="is-drawer-close:hidden">Assigned Deliveries</span>
                                    </NavLink>
                                </li>

                                <li className='mb-3'>
                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Completed Deliveries" to="/dashboard/completed-deliveries">
                                        <SiGoogletasks className='text-primary' />
                                        <span className="is-drawer-close:hidden">Completed Deliveries</span>
                                    </NavLink>
                                </li>


                            </>
                        }

                        {
                            role === 'admin' && <>
                                <li className='mb-3'>
                                    <NavLink className={({ isActive }) =>
                                        `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2
                                 ${isActive ? " text-secondary text-lg bg-accent/10" : ""}`
                                    } data-tip="Approve Riders " to="/dashboard/approve-riders">
                                        <MdOutlineDirectionsBike className='text-primary' />
                                        <span className="is-drawer-close:hidden">Approve Riders</span>
                                    </NavLink>
                                </li>

                                <li className='mb-3'>
                                    <NavLink className={({ isActive }) =>
                                        `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2
                                 ${isActive ? " text-secondary text-lg bg-accent/10" : ""}`
                                    } data-tip="Assign Riders " to="/dashboard/assign-riders">
                                        <MdAssignmentAdd className='text-primary' />
                                        <span className="is-drawer-close:hidden">Assign Riders</span>
                                    </NavLink>
                                </li>

                                <li className='mb-3'>
                                    <NavLink className={({ isActive }) =>
                                        `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2
                                 ${isActive ? " text-secondary text-lg bg-accent/10" : ""}`
                                    } data-tip="Users Management " to="/dashboard/users-management">
                                        <FaUsers className='text-primary' />
                                        <span className="is-drawer-close:hidden">Users Management</span>
                                    </NavLink>
                                </li>

                            </>
                        }

                        <li className='mb-3'>
                            <NavLink className={({ isActive }) =>
                                `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2
                                 ${isActive ? " text-secondary text-lg bg-accent/10" : ""}`
                            } data-tip="profile " to="/dashboard/profile">
                                <FaUser className='text-primary' />
                                <span className="is-drawer-close:hidden">Profile</span>
                            </NavLink>
                        </li>



                        {/* List item */}
                        <li className='mb-3'>
                            <button
                                onClick={handleLogout}
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 w-full text-left hover:text-secondary"
                                data-tip="Log Out"
                            >
                                <TbLogout className='text-primary' />
                                <span className="is-drawer-close:hidden">Log out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;