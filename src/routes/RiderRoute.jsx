import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Loading from '../Components/Loading/Loading';
import Forbidden from '../Components/Forbidden/Forbidden';

const RiderRoute = ({children}) => {
    const { loading,user}= useAuth();
     const {role,roleLoading}= useRole();
     if(loading || roleLoading || !user){
        return <Loading></Loading>
     }
     if( role !== 'rider'){
        return <Forbidden></Forbidden>
     }
    return children;
};



export default RiderRoute;