import React, { useEffect, useState } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const Reviews = ({ reviewsPromise }) => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        reviewsPromise.then(data => {
            setReviews(data);
        });
    }, [reviewsPromise]);

    return (
        <div className='my-24'>
            <div className='text-center mb-24'>
                <h3 className="text-3xl font-bold my-8 ">What our <span className='text-primary'>customers</span> say </h3>
                <p className='text-primary inline-block font-medium bg-primary/10 p-9 rounded-4xl'>Hear directly from our customers about their experience with our fast, reliable, and secure delivery service. <br />Their satisfaction drives everything we do.</p>
            </div>

            <Swiper className='mySwiper mb-20'
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    scale: 0.75,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
            >
                {
                    reviews.map(review => (
                        <SwiperSlide key={review.id}>
                            <ReviewCard review={review} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default Reviews;