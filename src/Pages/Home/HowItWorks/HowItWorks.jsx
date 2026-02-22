import React from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { HiOutlineTruck } from 'react-icons/hi';
import { IoMdBicycle } from 'react-icons/io';
import { MdOutlinePayment } from 'react-icons/md';

const HowItWorks = () => {
    const processes = [
        {
            title: "Schedule Pickup & Delivery",
            description: "Easily arrange parcel pickup from your location and enjoy fast, reliable delivery to the destination.",
            icon:<HiOutlineTruck/>
        },
        {
            title: "Pay with Cash on Delivery",
            description: "Offer customers flexible payment options with secure cash collection upon successful delivery.",
            icon:<MdOutlinePayment />
        },
        {
            title: "Processing at Delivery Hub",
            description: "Packages are sorted and managed efficiently at our hubs to ensure accurate and timely dispatch.",
            icon:<IoMdBicycle />
        },
        {
            title: "Business & Corporate Booking",
            description: "Smart logistics solutions designed for SMEs and enterprises to handle bulk shipments seamlessly.",
            icon: <BsBoxSeam/>
        },
    ];
    return (


    <section className="bg-base-200 py-16 my-5 ">
      <div className=" mx-auto px-4 md:px-8">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-primary mb-10">
          How it Works
        </h2>

    
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 m-10">
          {processes.map((process, index) => (
            <div
              key={index}
              className="card bg-base-100 px-4 shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="card-body items-start text-left space-y-4">

                
                <div className="w-12 h-12 rounded-lg text-accent  bg-secondary/15 flex items-center justify-center">
                  {process.icon}
                </div>

                
                <h3 className="font-semibold text-lg">
                  {process.title}
                </h3>

                
                <p className="text-sm text-gray-500">
                  {process.description}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>

    );
};

export default HowItWorks;