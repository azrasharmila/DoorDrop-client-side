import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
//import { Link, useLocation, useNavigate } from 'react-router';
import Social from '../Social/Social';
import { Link, useLocation, useNavigate } from 'react-router';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    // console.log('location', location);

    const navigate = useNavigate();


    const handleLogin = (data) => {
        console.log('form data', data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
                
      
         <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl md:text-3xl text-center mt-5 text-secondary">Welcome back</h3>
            <p className='text-center text-sm md:text-base text-primary'>Please Login</p>
            <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">
                    {/* email field */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input w-full" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                    }

                    {/* password field */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input w-full" placeholder="Password" />
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters  or longer </p>
                    }


                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4 w-full">Login</button>
                </fieldset>
                <p className='mt-2'>New to DoorDrop?  <Link
                    state={location.state}
                    className='text-blue-400 underline'
                    to="/register">Register</Link></p>
            </form>
            <Social></Social>
        </div>
         
         
    );
};

export default Login;