import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FiEdit } from 'react-icons/fi';
import { FaMagnifyingGlass, FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';
import StatusCard from '../../../Components/StatusCard/StatusCard';
import { FaStar } from 'react-icons/fa';

const MyParcels = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedParcel, setSelectedParcel] = useState(null);
    const navigate = useNavigate();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })

    const totalParcels = parcels.length;

    const paidParcels = parcels.filter(
        parcel => parcel.paymentStatus === "paid"
    ).length;

    const unpaidParcels = parcels.filter(
        parcel => parcel.paymentStatus !== "paid"
    ).length;

    const handleParcelDelete = id => {
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.deletedCount) {

                            refetch();

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel request has been deleted.",
                                icon: "success"
                            });
                        }

                    })


            }
        });

    }

    const handlePayment = async (parcel) => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
            trackingId: parcel.trackingId
        }
        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
        window.location.assign(res.data.url);


    }

    const handleReviewSubmit = (parcel) => {

        Swal.fire({
            title: "Write Your Review",
            html: `
            <input id="job" class="swal2-input" placeholder="Your profession">
            <textarea id="review" class="swal2-textarea" placeholder="Write your experience"></textarea>
        `,
            confirmButtonText: "Submit Review",
            showCancelButton: true,
            preConfirm: () => {

                const job = document.getElementById("job").value;
                const review = document.getElementById("review").value;

                if (!review) {
                    Swal.showValidationMessage("Please write a review");
                    return false;
                }

                return { job, review };
            }

        }).then(async (result) => {
            console.log("SweetAlert result:", result);

            if (result.isConfirmed) {


                const reviewData = {
                    userName: user.displayName,
                    user_photoURL: user.photoURL,
                    email: user.email,
                    job: result.value.job,
                    review: result.value.review,
                    parcelId: parcel._id
                };
                console.log("Sending review:", reviewData);

                const res = await axiosSecure.post('/reviews', reviewData);

                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Review submitted!",
                        timer: 1500,
                        showConfirmButton: false
                    });
                    refetch();
                }
            }

        });

    };
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                <StatusCard
                    title="Total Parcels"
                    value={totalParcels}
                />

                <StatusCard
                    title="Paid Parcels"
                    value={paidParcels}
                />

                <StatusCard
                    title="Unpaid Parcels"
                    value={unpaidParcels}
                />

            </div>

            <div className="hidden md:block overflow-x-auto w-full">
                <table className="table table-zebra w-full min-w-[700px]">
                    {/* head */}
                    <thead>
                        <tr className='text-secondary'>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th >Tracking Id</th>
                            <th >Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>

                                    {
                                        parcel.paymentStatus === 'paid' ?
                                            <span className='text-secondary'>Paid</span>
                                            :

                                            <button onClick={() => handlePayment(parcel)} className='btn btn-sm btn-primary text-black'>Pay</button>


                                    }
                                </td>
                                <td>
                                    <Link to={`/parcel-track/${parcel.trackingId}`}>{parcel.trackingId}</Link>
                                </td>

                                <td >{parcel.deliveryStatus}</td>
                                <td className="flex gap-1 md:gap-2">
                                    <button
                                        onClick={() => setSelectedParcel(parcel)}
                                        className='btn  btn-square hover:bg-primary'>
                                        <FaMagnifyingGlass />
                                    </button>

                                    <button
                                        disabled={parcel.paymentStatus === "paid"}
                                        onClick={() => navigate(`/edit-parcel/${parcel._id}`)}
                                        className={`btn  btn-square mx-2 
                                         ${parcel.paymentStatus === "paid"
                                                ? "btn-disabled cursor-not-allowed"
                                                : "hover:bg-primary"}`}
                                    >
                                        <FiEdit />
                                    </button>

                                    <button
                                        onClick={() => handleParcelDelete(parcel._id)}
                                        className='btn btn-square hover:bg-primary'>
                                        <FaTrashCan />
                                    </button>

                                    {
                                        parcel.deliveryStatus === "parcel_delivered" && (
                                            <button
                                                onClick={() => handleReviewSubmit(parcel)}
                                                className="btn  btn-square ml-2 hover:bg-primary"
                                                title="Add Review"
                                            >
                                                <FaStar />
                                            </button>
                                        )
                                    }
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
                </div>
                <div className="block md:hidden">
                    {parcels.map((parcel, index) => (
                        <div key={index} className="p-4 mb-4 shadow rounded-lg border border-gray-200">
                            <p><span className="font-bold">Name:</span> {parcel.parcelName}</p>
                            <p><span className="font-bold">Cost:</span> {parcel.cost}</p>
                            <p className='font-bold'>Tracking ID :</p>
                            <Link to={`/parcel-track/${parcel.trackingId}`}>{parcel.trackingId}</Link>
                            <Link to={`/parcel-track/${parcel.trackingId}`}>{parcel.trackingId}</Link>
                            
                            <p><span className="font-bold">Delivery Status:</span> {parcel.deliveryStatus}</p>
                            <p>
                                <span className="font-bold">Payment:</span>
                                {parcel.paymentStatus === 'paid'
                                    ? <span className="text-secondary">Paid</span>
                                    : <button onClick={() => handlePayment(parcel)} className="btn btn-sm btn-primary w-full text-black mt-1">Pay</button>
                                }
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <button onClick={() => setSelectedParcel(parcel)} className='btn btn-sm btn-square'>
                                    <FaMagnifyingGlass />
                                </button>
                                <button
                                    disabled={parcel.paymentStatus === "paid"}
                                    onClick={() => navigate(`/edit-parcel/${parcel._id}`)}
                                    className={`btn btn-sm btn-square ${parcel.paymentStatus === "paid" ? "btn-disabled cursor-not-allowed" : "hover:bg-primary"}`}
                                >
                                    <FiEdit />
                                </button>
                                <button onClick={() => handleParcelDelete(parcel._id)} className='btn btn-sm btn-square'>
                                    <FaTrashCan />
                                </button>
                                {parcel.deliveryStatus === "parcel_delivered" && (
                                    <button
                                        onClick={() => handleReviewSubmit(parcel)}
                                        className="btn btn-sm btn-square"
                                        title="Add Review"
                                    >
                                        <FaStar />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {selectedParcel && (
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg mb-4 text-primary">Parcel Details</h3>

                            <p><strong className='text-accent'>Name:</strong> {selectedParcel.parcelName}</p>
                            <p><strong className='text-accent'>Weight:</strong> {selectedParcel.parcelWeight}</p>
                            <p><strong className='text-accent'>Cost:</strong> {selectedParcel.cost}</p>
                            <p><strong className='text-accent'>Tracking ID:</strong> {selectedParcel.trackingId}</p>
                            <p><strong className='text-accent'>Delivery Status:</strong> {selectedParcel.deliveryStatus}</p>
                            <p><strong className='text-accent'>Payment Status:</strong> {selectedParcel.paymentStatus}</p>
                            <p><strong className='text-accent'>Receiver name:</strong> {selectedParcel.receiverName}</p>
                            <p><strong className='text-accent'>Receiver district:</strong> {selectedParcel.receiverDistrict}</p>
                            <p><strong className='text-accent'>Receiver Address:</strong> {selectedParcel.receiverAddress}</p>
                            <p><strong className='text-accent'>Receiver Contact:</strong> {selectedParcel.receiverMobile}</p>


                            <div className="modal-action">
                                <button
                                    onClick={() => setSelectedParcel(null)}
                                    className="btn btn-secondary text-black">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        
    );
};

export default MyParcels;