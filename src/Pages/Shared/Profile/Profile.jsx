import { useState } from 'react';
import coverImg from '../../../assets/others/cover.jpg'
import useAuth from '../../../Hooks/useAuth'
import useRole from '../../../Hooks/useRole';
import Swal from 'sweetalert2';

const Profile = () => {
    const { user, updateUserProfile } = useAuth()
    const { role } = useRole();

    const [name, setName] = useState(user?.displayName || '');
    const [imageFile, setImageFile] = useState(null);
    const image_hosting_key = import.meta.env.VITE_image_host_key;

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            let photoURL = user?.photoURL;

            
            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);

                const res = await fetch(
                   `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const data = await res.json();
                photoURL = data.data.display_url;
            }


            await updateUserProfile({
                displayName: name,
                photoURL: photoURL,
            });

            Swal.fire({
                icon: "success",
                title: "Profile Updated!",
                timer: 1500,
                showConfirmButton: false,
            });

            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };


    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
                <img
                    alt='cover photo'
                    src={coverImg}
                    className='w-full mb-4 rounded-t-lg h-56'
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                    <a href='#' className='relative block'>
                        <img
                            alt='profile'
                            src={user?.photoURL}
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />
                    </a>

                    <p className='p-2 px-4 text-xs text-white bg-secondary rounded-full'>
                        {role}
                    </p>
                    <p className='mt-2 text-xl font-medium text-gray-800 '>
                        User Id: {user?.uid}
                    </p>
                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='flex flex-wrap items-center justify-between text-sm text-accent '>
                            <p className='flex flex-col'>
                                Name
                                <span className='font-bold text-accent '>
                                    {user?.displayName}
                                </span>
                            </p>
                            <p className='flex flex-col'>
                                Email
                                <span className='font-bold text-gray-600 '>{user?.email}</span>
                            </p>

                            <div>

                               
                                <form onSubmit={handleUpdateProfile} className='my-4'>

                                    <input 
                                        type="text" className='btn mr-6'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                    <input className='btn'
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />

                                    <button type="submit" className='btn btn-primary rounded-2xl my-3 ml-4'>Update Profile</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
