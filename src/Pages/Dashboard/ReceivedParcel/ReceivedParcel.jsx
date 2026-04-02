import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import Loading from '../../../Components/Loading/Loading';

const ReceivedParcels = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['receivedParcels', user?.email],
    enabled: !!user?.email, // important
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/receiver?email=${user.email}`
      );
      return res.data;
    }
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div>

      <h2 className="text-3xl font-semibold text-secondary m-4 bg-secondary/10 p-5 rounded-4xl">
        Received Parcels : {parcels.length}
      </h2>

      {
        parcels.length === 0 ? (
          <p className='text-primary font-bold m-8 text-xl'>No parcel have been received yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Parcel Name</th>
                  <th>Sender</th>
                  <th>Tracking ID</th>
                  <th>OTP</th>
                  <th>Delivery Status</th>
                </tr>
              </thead>

              <tbody>
                {
                  parcels.map((parcel, index) => (
                    <tr key={parcel._id}>
                      <td>{index + 1}</td>
                      <td>{parcel.parcelName}</td>
                      <td>{parcel.senderName}</td>

                      <td>
                        <Link
                          to={`/parcel-track/${parcel.trackingId}`}
                          className="text-blue-500 underline"
                        >
                          {parcel.trackingId}
                        </Link>
                      </td>

                      <td>
                        {parcel.deliveryStatus !== "parcel_delivered" ? (
                          <span className="font-bold text-primary">
                            {parcel.deliveryOTP}
                          </span>
                        ) : (
                          <span className="text-primary">Completed</span>
                        )}
                      </td>

                      <td>
                        {parcel.deliveryStatus === 'parcel_delivered'
                          ? <span className="text-secondary/80 ">Delivered </span>
                          : <span className="text-primary/80 font-bold">In Progress</span>
                        }
                      </td>
                    </tr>
                  ))
                }
              </tbody>

            </table>
          </div>
        )
      }

    </div>
  );
};

export default ReceivedParcels;