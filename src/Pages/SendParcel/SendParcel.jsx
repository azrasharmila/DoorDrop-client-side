import { log } from 'firebase/firestore/pipelines';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const SendParcel = () => {

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    //console.log(regionsDuplicate);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,

    } = useForm();
    const {user}= useAuth();
    console.log(user);
    

    const axiosSecure = useAxiosSecure();


    const regions = [...new Set(regionsDuplicate)];

    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const receiverRegion = useWatch({ control, name: 'receiverRegion' })

    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }




    const handleSendParcel = data => {
        console.log(data);
        const isDocument = data.parcelType === 'document';
        const issameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight)


        let cost = 0;
        if (isDocument) {
            cost = issameDistrict ? 60 : 100;

        }
        else {
            if (parcelWeight < 3) {
                cost = issameDistrict ? 110 : 150;

            }
            else {
                const minCharge = issameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = issameDistrict ? extraWeight * 30 : extraWeight * 30 + 30;
                cost = minCharge + extraCharge;



            }
        }
        console.log('cost', cost);
        data.cost= cost;
        Swal.fire({
            title: "Are you agreeing with our cost?",
            text: `You've to pay ${cost} BDT`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Agreed"
        }).then((result) => {
            if (result.isConfirmed) {

                  axiosSecure.post('/parcels', data)
                    .then(res => {
                        console.log('after saving parcel', res.data);
                    })
                // Swal.fire({
                //     title: "Done!",
                //     text: "Your request has been confirmed",
                //     icon: "success"
               // });
            }
        });






    }
    return (
        <div>
            <h2 className="text-4xl font-semibold text-primary/90 bg-primary/10 inline-block p-3 rounded-2xl ">Send A Parcel</h2>
            <form onSubmit={handleSubmit(handleSendParcel)} className='mt-12 p-4 text-black'>
                <div>
                    <label className="label mr-4">
                        <input type="radio" {...register('parcelType')} value="document" className="radio" defaultChecked />
                        Document
                    </label>
                    <label className="label">
                        <input type="radio" {...register('parcelType')} value="non-document" className="radio" />
                        Non-Document
                    </label>
                </div>

                {/* parcel name */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg)</label>
                        <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>

                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold text-secondary mb-3">Sender Details</h4>
                        {/* sender name */}
                        <label className="label">Sender Name</label>
                        <input type="text" {...register('senderName', { required: true })}
                             defaultValue={user?.displayName}
                            className="input w-full" placeholder="Sender Name" />
                        {errors.senderName && (
                            <p className='text-red-500'>Name is required</p>
                        )}

                        {/* sender email */}
                        <label className="label">Sender Email</label>
                        <input type="text" {...register('senderEmail')}
                            defaultValue={user?.email}
                            className="input w-full" placeholder="Sender Email" />


                        {/* sender region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Regions</legend>
                            <select {...register('senderRegion')} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* sender districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Districts</legend>
                            <select {...register('senderDistrict')} defaultValue="Pick a district" className="select">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtsByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>



                        {/* sender Address */}
                        <label className="label mt-4">Sender Address</label>
                        <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />

                        <label className="label mt-4">Sender Mobile Number</label>

                        <input
                            type="tel"
                            {...register("senderMobile", {
                                required: "Sender mobile number is required",
                                pattern: {
                                    value: /^(?:\+8801|01)[3-9]\d{8}$/,
                                    message: "Enter a valid Bangladeshi mobile number"
                                }
                            })}
                            className="input w-full"
                            placeholder="01XXXXXXXXX"
                        />

                        {/* Error Message */}
                        {errors.senderMobile && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.senderMobile.message}
                            </p>
                        )}
                    </fieldset>


                    {/* receiver Details */}
                    <fieldset className="fieldset">
                        <h4 className="text-2xl font-semibold text-secondary mb-3">Receiver Details</h4>
                        {/* receiver name */}
                        <label className="label">Receiver Name</label>
                        <input type="text" {...register('receiverName', { required: true })} className="input w-full" placeholder="Receiver Name" />
                        {errors.senderName && (
                            <p className='text-red-500'>Name is required</p>
                        )}


                        {/* receiver email */}
                        <label className="label">Receiver Email</label>
                        <input type="text" {...register('receiverEmail')} className="input w-full" placeholder="Receiver Email" />

                        {/* receiver region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Regions</legend>
                            <select {...register('receiverRegion')} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* receiver districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Districts</legend>
                            <select {...register('receiverDistrict')} defaultValue="Pick a district" className="select">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtsByRegion(receiverRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>


                        {/* receiver address */}
                        <label className="label mt-4">Receiver Address</label>
                        <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />

                        <label className="label mt-4">Reciever Mobile Number</label>

                        <input
                            type="tel"
                            {...register("receiverMobile", {
                                required: "Receiver mobile number is required",
                                pattern: {
                                    value: /^(?:\+8801|01)[3-9]\d{8}$/,
                                    message: "Enter a valid mobile number"
                                }
                            })}
                            className="input w-full"
                            placeholder="01XXXXXXXXX"
                        />

                        {/* Error Message */}
                        {errors.receiverMobile && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.receiverMobile.message}
                            </p>
                        )}


                    </fieldset>
                </div>

                <input type="submit" className='btn btn-primary mt-8 text-black' value="Send Parcel" />


            </form>

        </div>
    );
};

export default SendParcel;