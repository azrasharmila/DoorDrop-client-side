import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaRegCreditCard, FaUsers } from "react-icons/fa";
import { MdAssignmentAdd, MdOutlineDirectionsBike } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../Hooks/useRole';

const DashboardLayout = () => {
    const { role } = useRole();
    return (
        <div className="drawer lg:drawer-open max-w-7xl mx-auto">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4"> Dashboard</div>
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
                        <li className='my-3'>
                            <Link to="/" className={({ isActive }) =>
                                `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2
                                 ${isActive ? " text-secondary text-lg bg-accent/10" : ""}`
                            } data-tip="Homepage">
                                {/* Home icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4 text-primary "><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                <span className="is-drawer-close:hidden">Home</span>
                            </Link>
                        </li>

                        {/* our dashboard links */}
                        <li className='mb-3'>
                            <NavLink className={({ isActive }) =>
                                `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2
                                 ${isActive ? " text-secondary text-lg bg-accent/10" : ""}`
                            } data-tip="MyParcels " to="/dashboard/my-parcels">
                                <CiDeliveryTruck className='text-primary'/>
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
                            role === 'admin' && <>
                                <li className='mb-3'>
                                    <NavLink className={({ isActive }) =>
                                        `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2
                                 ${isActive ? " text-secondary text-lg bg-accent/10" : ""}`
                                    } data-tip="Approve Riders " to="/dashboard/approve-riders">
                                        <MdOutlineDirectionsBike className='text-primary'/>
                                        <span className="is-drawer-close:hidden">Approve Riders</span>
                                    </NavLink>
                                </li>

                                 <li className='mb-3'>
                                    <NavLink className={({ isActive }) =>
                                        `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2
                                 ${isActive ? " text-secondary text-lg bg-accent/10" : ""}`
                                    } data-tip="Assign Riders " to="/dashboard/assign-riders">
                                        <MdAssignmentAdd className='text-primary'/>
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



                        {/* List item */}
                        <li className='mb-3'>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                {/* Settings icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;