import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1 from "../../../assets/banner1.png";
import banner2 from "../../../assets/banner2.png";
import banner3 from "../../../assets/banner3.png";
import { LuArrowUpRight } from "react-icons/lu";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="bg-[#efecec] rounded-2xl">
      <Carousel autoPlay={true} infiniteLoop={true} interval={2000} showStatus={false} showThumbs={false} transitionTime={500} >


        {/* Slide 1 */}
        <div className="min-h-[420px] flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-10 gap-8 mb-12">
          <div className="flex-1 text-left">
            <p className="text-3xl font-bold mb-4 text-accent">
              From our <span className="text-secondary">hands to yours,</span> exactly when promised.
            </p>
            <p>Experience a delivery service built on precision, making sure your packages reach their destination safely & on time</p>


            <div className="flex flex-wrap items-center gap-4 pt-4 ">

              <Link to="/dashboard/my-parcels" className="flex items-center">
                <button className="btn btn-secondary rounded-full px-8 h-10 text-md font-bold border-none shadow-md">
                  Track Your Parcel
                </button>


                <div className="bg-accent text-white h-10 w-10 lg:h-12 lg:w-12 rounded-full -ml-3 lg:-ml-5 flex-shrink-0 z-10 flex items-center justify-center shadow-lg cursor-pointer hover:bg-black transition-all">
                  <LuArrowUpRight size={24} strokeWidth={2} />
                </div>
              </Link>


              {/* <button className="btn btn-outline border-2 border-gray-200 rounded-2xl h-10 px-8 text-md font-bold hover:bg-gray-50 hover:text-black normal-case">
                Be a Rider
              </button> */}
              <Link
                className='btn btn-outline border-2 border-gray-200 rounded-2xl h-10 px-8 text-md font-bold hover:bg-gray-50 hover:text-black normal-case'
                to="/rider">Be a Rider</Link>
            </div>

          </div>

          <div className="flex-1 flex justify-center">
            <img
              src={banner1}
              className="max-h-100 w-auto object-contain"
              alt=""
            />
          </div>
        </div>

        {/* Slide 2 */}
        <div className="min-h-[420px] flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-10 gap-8">
          <div className="flex-1 text-left">
            <p className="text-3xl font-bold mb-4 text-accent">
              Real-time <span className="text-primary">tracking for</span>  every delivery.
            </p>
            <p>Every mile is accounted for, ensuring a transparent and reliable journey for every single parcel.</p>

            <div className="flex flex-wrap items-center gap-4 pt-4 ">

              <Link to="/dashboard/my-parcels" className="flex items-center">
                <button className="btn btn-secondary rounded-full px-8 h-10 text-md font-bold border-none shadow-md">
                  Track Your Parcel
                </button>


                <div className="bg-accent text-white h-10 w-10 lg:h-12 lg:w-12 rounded-full -ml-4 lg:-ml-5 flex-shrink-0 z-10 flex items-center justify-center shadow-lg cursor-pointer hover:bg-black transition-all">
                  <LuArrowUpRight size={24} strokeWidth={2} />
                </div>
              </Link>


              <Link
                className='btn btn-outline border-2 border-gray-200 rounded-2xl h-10 px-8 text-md font-bold hover:bg-gray-50 hover:text-black normal-case'
                to="/rider">Be a Rider</Link>
            </div>

          </div>

          <div className="flex-1 flex justify-center">
            <img
              src={banner2}
              className="max-h-100 w-auto object-contain"
              alt=""
            />
          </div>
        </div>






        {/* Slide 3 */}
        <div className="min-h-[420px] flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-10 gap-8">
          <div className="flex-1 text-left">
            <p className="text-3xl font-bold text-accent mb-4">
              From small <span className="text-secondary">packages to big </span>dreams, we handle it all.
            </p>
            <p>Your trust is our top priority. Whether it's a document or a large box, we deliver with care and unmatched punctuality.</p>


            <div className="flex flex-wrap items-center gap-4 pt-4 ">

              <Link to="/dashboard/my-parcels" className="flex items-center">
                <button className="btn btn-secondary rounded-full px-8 h-10 text-md font-bold border-none shadow-md">
                  Track Your Parcel
                </button>


                <div className="bg-accent text-white h-10 w-10 lg:h-12 lg:w-12 rounded-full -ml-4 lg:-ml-5 flex-shrink-0 z-10 flex items-center justify-center shadow-lg cursor-pointer hover:bg-black transition-all">
                  <LuArrowUpRight size={24} strokeWidth={2} />
                </div>
              </Link>


              <Link
                className='btn btn-outline border-2 border-gray-200 rounded-2xl h-10 px-8 text-md font-bold hover:bg-gray-50 hover:text-black normal-case'
                to="/rider">Be a Rider</Link>
            </div>

          </div>

          <div className="flex-1 flex justify-center">
            <img
              src={banner3}
              className="max-h-100 w-auto object-contain"
              alt=""
            />
          </div>
        </div>









      </Carousel>
    </div>
  );
};

export default Banner;