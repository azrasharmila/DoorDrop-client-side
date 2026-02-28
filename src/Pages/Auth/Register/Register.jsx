import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();



    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    //console.log('in register', location);
    const axiosSecure = useAxiosSecure();




    const handleRegister = (data) => {
        // console.log('after registration', data.photo[0]);
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {

                const formData = new FormData();
                formData.append('image', profileImg);
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
                // console.log("API KEY =", import.meta.env.VITE_image_host_key);

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        //create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL


                        }

                        axiosSecure.post('/users',userInfo)
                        .then(res =>{
                            if(res.data.insertedId){
                                console.log('user created in the db');
                                
                            }
                        })



                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('user profile updated done.')
                                navigate(location.state || '/');
                            })
                            .catch(error => console.log(error))
                    })

            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className='card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl'>
            <h3 className="text-3xl  text-center text-secondary">Welcome to DoorDrop</h3>
            <p className='text-center text-primary'>Please Register</p>

            <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">

                    {/* name */}
                    <label className="label">Name</label>
                    <input
                        type="text"
                        {...register('name', { required: true })}
                        className="input"
                        placeholder="Your Name"
                    />
                    {errors.name && (
                        <p className='text-red-500'>Name is required</p>
                    )}

                    {/* photo */}
                    <label className="label">Photo</label>
                    <input
                        type="file"
                        {...register('photo')}
                        className="file-input"
                        placeholder="Your Photo"
                    />


                    {/* email */}
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className="input"
                        placeholder="Your Email"
                    />
                    {errors.email && (
                        <p className='text-red-500'>Email is required</p>
                    )}

                    {/* password */}
                    <label className="label">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/
                        })}
                        className="input"
                        placeholder="Password"
                    />

                    {errors.password?.type === 'minLength' &&
                        <p className='text-red-500'>
                            Password must be 6 characters or longer
                        </p>
                    }

                    {errors.password?.type === 'pattern' &&
                        <p className='text-red-500'>
                            Password must contain at least one uppercase letter and one special character.
                        </p>
                    }

                    <button className="btn btn-neutral mt-4">
                        Register
                    </button>

                </fieldset>
                <p>Already have an account? <Link state={location.state} className='text-secondary underline ' to="/login">Login</Link></p>
            </form>
        </div>
    );
};

export default Register;