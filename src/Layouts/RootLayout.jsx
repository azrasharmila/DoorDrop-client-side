import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Pages/Shared/navbar/NavBar';
import Footer from '../Pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (

        <div className='flex flex-col min-h-screen w-full '>
            <NavBar ></NavBar>
            <div className=' max-w-screen-2xl mx-auto w-full  py-10 px-4 md:px-8 lg:px-12'>
                <Outlet></Outlet>

            </div>
            <Footer></Footer>

        </div>
        
           
        
    );
};

export default RootLayout;