import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../Components/Logo/Logo';
import login from '../assets/others/login.png';

const AuthLayout = () => {
    return (
         <div className='max-w-7xl mx-auto'>
            <Logo></Logo>
            <div className='flex items-center'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img src={login} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;