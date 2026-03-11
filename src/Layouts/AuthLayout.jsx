import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../Components/Logo/Logo';
import login from '../assets/others/login.png';

const AuthLayout = () => {
    return (
         <div className='max-w-7xl mx-auto  px-4 sm:px-6 md:px-8'>
            <Logo></Logo>
            <div className='flex flex-col md:flex-row items-center gap-8 mt-6'>
                <div className='flex-1 w-full'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1 hidden lg:flex justify-center'>
                    <img src={login} alt="" className='max-w-md w-full' />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;